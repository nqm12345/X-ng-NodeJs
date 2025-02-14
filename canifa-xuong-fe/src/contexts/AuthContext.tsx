import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../interfaces/User";
import { useNavigate } from "react-router-dom";

export interface AuthContextType {
	user: User | null;
	login: (token: string, user: User) => void;
	logout: () => void;
	isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const nav = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		const userString = localStorage.getItem("user");

		if (token && userString) {
			try {
				const parsedUser = JSON.parse(userString);
				setUser(parsedUser);
			} catch (error) {
				console.error("Error parsing user JSON:", error);
				// Xóa dữ liệu không hợp lệ khỏi localStorage
				localStorage.removeItem("accessToken");
				localStorage.removeItem("user");
			}
		}
	}, []);

	const login = (token: string, user: User) => {
		localStorage.setItem("accessToken", token);
		localStorage.setItem("user", JSON.stringify(user));
		setUser(user);
		nav(user.role === "admin" ? "/admin" : "/");
	};

	const logout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("user");
		setUser(null);
		nav("/");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === "admin" }}>
			{children}
		</AuthContext.Provider>
	);
};
