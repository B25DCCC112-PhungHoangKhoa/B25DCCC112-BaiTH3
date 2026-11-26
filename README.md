# ShopMini

Ứng dụng cửa hàng mini xây dựng bằng React, TypeScript, Vite, React Router và Redux Toolkit.

## Chạy ứng dụng

```bash
npm install
npm run dev
```

Sản phẩm được tải từ [Fake Store API](https://fakestoreapi.com/products). Giá sản phẩm giữ nguyên đơn vị USD do API cung cấp.

## Tài khoản thử nghiệm

- Tên người dùng: nhập tên bất kỳ
- Mật khẩu: `123456`

Đây là đăng nhập giả lập; tài khoản chỉ tồn tại trong phiên hiện tại.

## Quản lý state

State được đặt ở nơi phù hợp với phạm vi sử dụng: state ngắn hạn của một màn hình dùng `useState`, state chia sẻ giữa nhiều màn hình dùng Context API, còn dữ liệu cửa hàng và giỏ hàng dùng Redux Toolkit.

| Nơi lưu | Dữ liệu | Lý do |
| --- | --- | --- |
| `useState` trong `HomePage` | Từ khóa tìm kiếm và danh mục đang chọn | Chỉ phục vụ bộ lọc tại trang chủ, không cần chia sẻ với trang khác. |
| `useState` trong `LoginPage` | Tên đăng nhập, mật khẩu và lỗi xác thực | Là dữ liệu tạm của form; không cần đưa vào state toàn cục. |
| `useState` trong `CheckoutPage` | Trạng thái đơn hàng đã được đặt | Chỉ điều khiển màn hình xác nhận sau khi đặt hàng. |
| `useState` trong `ThemeProvider` | Theme sáng/tối | Theme được dùng ở nhiều trang và components; Context giúp toàn ứng dụng đọc/chuyển theme. Theme được lưu ở `localStorage` để giữ lựa chọn sau khi tải lại. |
| `useState` trong `AuthProvider` | Người dùng hiện tại hoặc `null` | Thông tin đăng nhập giả lập được Header, route bảo vệ và trang đăng nhập sử dụng chung. |
| `useState` trong `ToastProvider` | Toast đang hiển thị | Provider dùng chung để thông báo thêm giỏ hàng từ cả danh sách và trang chi tiết; tự ẩn sau 2,6 giây. |
| Redux `products` slice | Danh sách sản phẩm, trạng thái tải (`idle`, `loading`, `succeeded`, `failed`) và lỗi | Sản phẩm được tải bất đồng bộ từ API và cần dùng ở trang chủ, trang chi tiết; Redux giữ một nguồn dữ liệu nhất quán. |
| Redux `cart` slice | Các sản phẩm trong giỏ và số lượng | Giỏ được truy cập từ Header, trang giỏ, trang thanh toán và trang chi tiết; Redux quản lý các thao tác thêm, xóa, đổi số lượng và xóa toàn bộ. |

`selectCartItemCount` và `selectCartTotal` trong `cartSlice` tính tổng số lượng và tổng tiền từ state giỏ hàng, tránh lưu các giá trị có thể suy ra riêng biệt. `useAppDispatch` và `useAppSelector` trong `app/hooks.ts` là typed hooks dùng `AppDispatch` và `RootState`, không dùng `any`.

## Các trang

- `/` — danh sách sản phẩm, lọc danh mục và tìm kiếm theo tên
- `/products/:id` — chi tiết sản phẩm
- `/cart` — quản lý giỏ hàng và số lượng
- `/login` — đăng nhập giả lập
- `/checkout` — thanh toán, chỉ truy cập sau khi đăng nhập
- Các đường dẫn khác hiển thị trang 404

## Cấu trúc chính

```text
src/
├── app/                 # Redux store và typed hooks
├── components/          # Header, product card và route guard
├── contexts/            # Theme, auth, toast và custom hooks
├── features/
│   ├── cart/            # Giỏ hàng
│   └── products/        # Tải và lưu trạng thái sản phẩm
├── layouts/             # Layout dùng chung
├── pages/               # Các trang theo route
└── types/               # Kiểu dữ liệu dùng chung
```

## Kiểm tra

```bash
npm run build
npm run lint
```
