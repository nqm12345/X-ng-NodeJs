export interface User {
	id?: string | number;
	email: string;
	password: string;
	confirmPass: string;
	role?: "admin" | "member" | "guest";

	username?: string; // 👈 Thêm tên người dùng
	avatar?: string;   // 👈 Thêm ảnh đại diện (URL)
}
