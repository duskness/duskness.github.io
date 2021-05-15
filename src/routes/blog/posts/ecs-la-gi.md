+++
title = "ECS là gì?"
description = "ECS là viết tắt của Entity Component System, là một mô hình kiến trúc thường được sử dụng trong lập trình game."
draft = true
date = 2021-05-04T21:00:00+07:00
+++

**E**ntity **C**omponent **S**ystem ([wiki][esc]) bao gồm:

- Entity (thực thể): Mỗi một đối tượng trong game là một thực thể. Thực thể thường chỉ chứa định danh (ID) của đối tượng (ví dụ: Người chơi, Quái vật A, Quái vật B, Súng, Đạn, ...).
- Component (thành phần): Chứa dữ liệu hoặc trạng thái của thực thể ở dạng "thô" (raw data). Và có thể được thay đổi runtime bởi các system.
- System: Nơi thực hiện các logic trong game(method, function, ...)

**ECS** tuân theo [composition over inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance) (tổng hợp thay vì kế thừa) nên cho phép code linh hoạt hơn (flexibility) và tốt cho reusable, loại bỏ các vấn đề mơ hồ của việc kế thừa đa cấp, cho phép bảo trì và mở rộng dễ dàng.

Các phương pháp sử dụng ECS có tính tương thích cao và thường được kết hợp với kỹ thuật thiết kế hướng tổ chức dữ liệu (data oriented design - tránh nhầm lẫn với data driven design) để truy cập hiệu quả nhất dữ liệu.

[esc]: https://en.wikipedia.org/wiki/Entity_component_system
