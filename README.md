
## Giới Thiệu

Steve-Jobless là một hệ thống quản lý dịch vụ vận chuyển, kết nối khách hàng, tài xế. Dự án giúp kết nối tài xế và khách hàng một cách nhanh chóng và hiệu quả. Hệ thống chia thành 3 vai trò chính:
- **Khách hàng**: Đặt xe, theo dõi lịch sử chuyến đi và thanh toán.
- **Tài xế**: Nhận yêu cầu chuyến đi, hoàn thành chuyến đi, theo dõi thông tin khách hàng.
- **Admin**: Quản lý hệ thống, người dùng, tài xế và khách hàng.

## Chức Năng

- **Khách hàng:**
  - Đăng ký và đăng nhập vào hệ thống.
  - Đặt xe, theo dõi tình trạng chuyến đi.
  - Xem lịch sử chuyến đi, đánh giá tài xế sau khi hoàn thành chuyến đi.
  - Thanh toán trực tuyến.

- **Tài xế:**
  - Đăng nhập vào hệ thống và nhận yêu cầu chuyến đi.
  - Theo dõi lộ trình và thông tin khách hàng.
  - Hoàn thành chuyến đi và cập nhật trạng thái.

- **Admin:**
  - Quản lý người dùng (Khách hàng, Tài xế).
  - Xem báo cáo về các chuyến đi, lịch sử giao dịch.
  - Quản lý các cài đặt của hệ thống.

## Đường Link Đăng Nhập

### 1. Đăng Nhập Khách Hàng

- **URL đăng nhập**: http://localhost:3000/login/customer

### 2. Đăng Nhập Tài Xế

- **URL đăng nhập**: http://localhost:3000/login/driver

### 3. Đăng Nhập Quản Trị Viên

- **URL đăng nhập**: http://localhost:3000/login/admin


## Hướng Dẫn Cài Đặt

### Cài Đặt Môi Trường

Để chạy dự án này trên máy của bạn, bạn cần cài đặt Node.js và npm (Node Package Manager). Nếu chưa có, bạn có thể tải và cài đặt từ [Node.js Official Website](https://nodejs.org/).

### Dựng database

Để chạy dự án này, bạn cần có MySQL trên máy, và dựng 1 Database sử dụng file `fall2024c56g8_crab.sql` trong này. Sau đó, bạn cần vào file `src/lib/db.js` và chỉnh sửa theo nội dung sau:

- host: 'localhost' nếu bạn chạy MySQL ở máy bạn, hoặc đường link dẫn đến MySQL online
- user: Tên người dùng MySQL của bạn, mặc định là 'root' ở local
- password: Mật khẩu MySQL của bạn
- database: Tên Database được tạo sử dụng file `fall2024c56g8_crab.sql`.

### Thử nghiệm dự án:

```bash
# 1. Clone repository về máy của bạn
git clone https://github.com/VuseKaylous/Steve-Jobless.git

# 2. Chuyển vào thư mục dự án
cd Steve-Jobless

# 3. Cài đặt các dependencies
npm install

# 4. Chạy dự án
npm run dev

```

### Chạy dự án:

```bash
# 1. Clone repository về máy của bạn
git clone https://github.com/VuseKaylous/Steve-Jobless.git

# 2. Chuyển vào thư mục dự án
cd Steve-Jobless

# 3. Cài đặt các dependencies
npm install

# 4. Tạo file bulid
npm run build

# 5. Chạy dự án
npm run start

```