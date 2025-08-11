import * as z from "zod";

export const productSchema = z.object({
  title: z.string().min(6, { message: "Tên sản phẩm phải có ít nhất 6 ký tự" }),
  newprice: z.number().min(0, { message: "Giá mới không được nhỏ hơn 0" }),
  oldprice: z.number().min(0, { message: "Giá cũ không được nhỏ hơn 0" }).optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  size: z.array(z.string()).nonempty({ message: "Vui lòng chọn ít nhất một size" }),
  color: z.array(z.string()).optional(),
  image: z.string().url({ message: "Ảnh chính phải là một URL hợp lệ" }).optional(),
  thumbnail: z.array(z.string().url({ message: "Ảnh phụ phải là URL hợp lệ" })).optional(),
  stock: z.number().min(0, { message: "Tồn kho không được nhỏ hơn 0" }).optional(),
});

export const categorySchema = z.object({
  title: z.string().min(6, { message: "Tên danh mục phải có ít nhất 6 ký tự" }),
  description: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z
    .string()
    .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
    .max(255, { message: "Mật khẩu không được vượt quá 255 ký tự" }),
});

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Email không hợp lệ" }),
    password: z
      .string()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
      .max(255, { message: "Mật khẩu không được vượt quá 255 ký tự" }),
    confirmPass: z
      .string()
      .min(6, { message: "Xác nhận mật khẩu phải có ít nhất 6 ký tự" })
      .max(255, { message: "Xác nhận mật khẩu không được vượt quá 255 ký tự" }),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "Mật khẩu và xác nhận mật khẩu phải giống nhau",
    path: ["confirmPass"],
  });

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, { message: "Token không được để trống" }),
    newPassword: z
      .string()
      .min(6, { message: "Mật khẩu mới phải có ít nhất 6 ký tự" })
      .max(255, { message: "Mật khẩu mới không được vượt quá 255 ký tự" }),
    confirmNewPassword: z
      .string()
      .min(6, { message: "Xác nhận mật khẩu phải có ít nhất 6 ký tự" })
      .max(255, { message: "Xác nhận mật khẩu không được vượt quá 255 ký tự" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu mới và xác nhận mật khẩu phải giống nhau",
    path: ["confirmNewPassword"],
  });
