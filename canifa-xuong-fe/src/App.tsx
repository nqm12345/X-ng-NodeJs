import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthForm from "./components/AuthForm";
import LayoutAdmin from "./components/LayoutAdmin";
import LayoutClient from "./components/LayoutClient";
import ProductForm from "./components/ProductForm";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import CategoryList from "./components/CategoryList";
import CategoryForm from "./components/CategoryForm";
import Product_details from "./pages/Product_details";
import RequestPasswordReset from "./components/auth/RequestPasswordReset";
import ResetPassword from "./components/auth/ResetPassword";
import Shop from "./pages/Shop";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	useEffect(() => {
		AOS.init({ duration: 1000, once: true });
	}, []);

	return (
		<>
			<Routes>
				{/* 👤 Client routes */}
				<Route path="/" element={<LayoutClient />}>
					<Route index element={<Home />} />
					<Route path="shop" element={<Shop />} />
					<Route path="product-detail/:id" element={<Product_details />} />
				</Route>

				{/* 🔐 Auth */}
				<Route path="/login" element={<AuthForm isLogin />} />
				<Route path="/register" element={<AuthForm />} />
				<Route path="/request-password-reset" element={<RequestPasswordReset />} />
				<Route path="/reset-password/:token" element={<ResetPassword />} />

				{/* 🛠 Admin routes */}
				<Route
					path="/admin"
					element={
						<ProtectedRoute role="admin">
							<LayoutAdmin />
						</ProtectedRoute>
					}
				>
					<Route index element={<Dashboard />} />
					<Route path="product-add" element={<ProductForm />} />
					<Route path="product-edit/:id" element={<ProductForm />} />
					<Route path="categories" element={<CategoryList />} />
					<Route path="category-add" element={<CategoryForm />} />
					<Route path="category-edit/:id" element={<CategoryForm />} />
				</Route>

				{/* ❌ Not found */}
				<Route path="*" element={<Notfound />} />
			</Routes>

			{/* ✅ Toast container đặt ở đây */}
			<ToastContainer position="top-center" autoClose={2000} />
		</>
	);
}

export default App;
