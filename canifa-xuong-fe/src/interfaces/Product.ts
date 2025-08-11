import { Category } from "./Category";

export interface Product {
  _id?: string;
  title: string;
  newprice: number;
  oldprice?: number;
  description?: string;
  category?: Category | string; // Có thể là ID hoặc object (khi populate)
  brand?: string;
  size: string[];               // Bắt buộc có size
  color?: string[];             // Tuỳ chọn
  image?: string;               // Ảnh chính
  thumbnail?: string[];         // Danh sách ảnh phụ
  stock?: number;
  createdAt?: string;
  updatedAt?: string;
}
