import { Category } from "./Category";

export interface Product {
  _id?: string;
  title: string;
  newprice: number;
  oldprice?: number;
  category?: Category;
  description?: string;
  image?: string;
  thumbnail?: string[];  // Cập nhật thành mảng
  stock?: number;
}
