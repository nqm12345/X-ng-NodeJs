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

// 🆕 AOS
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Shop from "./pages/Shop";

function App() {
	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
		});
	}, []);

	return (
		<>
			<Routes>
				<Route path="/" element={<LayoutClient />}>
					<Route index element={<Home />} />
					 <Route path="shop" element={<Shop />} /> 
					<Route path="product-detail/:id" element={<Product_details />} />
				</Route>

				<Route path="/login" element={<AuthForm isLogin />} />
				<Route path="/register" element={<AuthForm />} />
				<Route path="/request-password-reset" element={<RequestPasswordReset />} />
				<Route path="/reset-password/:token" element={<ResetPassword />} />
				<Route path="/admin" element={<LayoutAdmin />}>
					<Route index element={<Dashboard />} />
					<Route path="/admin/product-add" element={<ProductForm />} />
					<Route path="/admin/product-edit/:id" element={<ProductForm />} />

					<Route path="/admin/categories" element={<CategoryList />} />
					<Route path="/admin/category-add" element={<CategoryForm />} />
					<Route path="/admin/category-edit/:id" element={<CategoryForm />} />
				</Route>

				<Route path="*" element={<Notfound />} />
			</Routes>
		</>
	);
}

export default App;
