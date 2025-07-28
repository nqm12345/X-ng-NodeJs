import { Category } from "./Category";

export interface Product {
  _id?: string;
  title: string;
  newprice: number;
  oldprice?: number;
  category?: Category;
  description?: string;
  image?: string;
  thumbnail?: string[];      // Danh sách ảnh
  stock?: number;
  createdAt?: string;        // ➕ Thêm dòng này để tránh lỗi
  updatedAt?: string;        // ➕ (Tuỳ chọn, nếu bạn dùng ở chỗ khác)
}
