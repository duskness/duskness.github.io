import type { SupabaseClient } from '@supabase/supabase-js';

export interface Locals {
	userid?: string;
	supabase: SupabaseClient;
}
