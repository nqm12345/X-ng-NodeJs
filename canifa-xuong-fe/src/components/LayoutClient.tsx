// LayoutClient.tsx
import { Outlet, useLocation, Navigate } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Main_slider from "./layouts/Main_slider";
import Latest_Blogs from "./layouts/Latest_Blogs";
import Deal_ofthe_week from "./layouts/Deal_ofthe_week";
import Benefit from "./layouts/Benefit";
import Best_Sellers from "./layouts/Best_Sellers";
import { useMemo } from "react";

const LayoutClient = () => {
	const location = useLocation();
	const isHomePage = location.pathname === "/";

	// lấy user từ localStorage
	const user = useMemo(() => {
		try {
			const stored = localStorage.getItem("user");
			return stored ? JSON.parse(stored) : null;
		} catch {
			return null;
		}
	}, []);

	// Nếu là admin → redirect về /admin
	if (user?.role === "admin") {
		return <Navigate to="/admin" replace />;
	}

	return (
		<>
			<Header />
			{isHomePage && <Main_slider />}
			<main className="main">
				<Outlet />
			</main>
			{isHomePage && (
				<>
					<Deal_ofthe_week />
					<Best_Sellers />
					<Latest_Blogs />
				</>
			)}
			<Benefit />
			<Footer />
		</>
	);
};

export default LayoutClient;
