-------------------------------------------
-- Create a table for Public Profiles
create table profiles (
  id uuid references auth.users not null,
  updated_at timestamp with time zone,
  username text unique,
  avatar_url text,
  website text,
  primary key (id),
  unique(username),
  constraint username_length check (char_length(username) >= 3)
);
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for
select using (true);
create policy "Users can insert their own profile." on profiles for
insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for
update using (auth.uid() = id);
-- create profile when insert new user
create function public.handle_new_user() returns trigger as $$ begin
insert into public.profiles (id)
values (new.id);
return new;
end;
$$ language plpgsql security definer;
-- trigger the function every time a user is created
create trigger on_auth_user_created
after
insert on auth.users for each row execute procedure public.handle_new_user();
-------------------------------------------
-- Set up Realtime!
-- Remove default pulication for all tables
begin;
drop publication if exists supabase_realtime;
create publication supabase_realtime;
commit;
-- Re-ddd publication
alter publication supabase_realtime
add table profiles;
-------------------------------------------
-- Set up Storage!
insert into storage.buckets (id, name)
values ('avatars', 'avatars');
create policy "Avatar images are publicly accessible." on storage.objects for
select using (bucket_id = 'avatars');
create policy "Anyone can upload an avatar." on storage.objects for
insert with check (bucket_id = 'avatars');