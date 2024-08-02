import * as z from "zod";

export const productSchema = z.object({
  title: z.string().min(6, { message: "Title must have at least 6 characters" }),
  newprice: z.number().min(0, { message: "New price minimum value is 0" }),
  oldprice: z.number().min(0, { message: "Old price minimum value is 0" }).optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  image: z.string().url({ message: "Image URL must be a valid URL" }).optional(),
  thumbnail: z.array(z.string().url({ message: "Thumbnail URL must be a valid URL" })).optional(),
  stock: z.number().min(0, { message: "Stock minimum value is 0" }).optional(), // Make stock optional
});
export const categorySchema = z.object({
  title: z.string().min(6, { message: "Title must have at least 6 characters" }),
  description: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must have at least 6 characters" }).max(255, { message: "Password must have at most 255 characters" }),
});

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must have at least 6 characters" }).max(255, { message: "Password must have at most 255 characters" }),
    confirmPass: z.string().min(6, { message: "Password confirmation must have at least 6 characters" }).max(255, { message: "Password confirmation must have at most 255 characters" }),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "Password and confirm password must be the same",
    path: ["confirmPass"],
  });

  export const resetPasswordSchema = z.object({
    token: z.string().min(1, { message: "Token không được để trống" }),
    newPassword: z.string()
      .min(6, { message: "Mật khẩu mới phải có ít nhất 6 ký tự" })
      .max(255, { message: "Mật khẩu mới chỉ được tối đa 255 ký tự" }),
    confirmNewPassword: z.string()
      .min(6, { message: "Xác nhận mật khẩu phải có ít nhất 6 ký tự" })
      .max(255, { message: "Xác nhận mật khẩu chỉ được tối đa 255 ký tự" }),
  }).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu mới và mật khẩu xác nhận phải giống nhau",
    path: ["confirmNewPassword"],
  });