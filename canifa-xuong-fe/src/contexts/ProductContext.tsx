import { createContext, useEffect, useReducer } from "react";
import { Product } from "../interfaces/Product";
import productReducer from "../reducers/productReducer";
import instance from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Định nghĩa các kiểu hành động
type Action =
  | { type: 'GET_PRODUCTS'; payload: Product[] }
  | { type: 'REMOVE_PRODUCT'; payload: string }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'ADD_PRODUCT'; payload: Product };

// Định nghĩa kiểu cho ProductContextType
export type ProductContextType = {
  state: { products: Product[] };
  dispatch: React.Dispatch<Action>;
  removeProduct: (id: string | undefined) => void;
  handleProduct: (data: Product) => void;
};

export const ProductContext = createContext<ProductContextType>({} as ProductContextType);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, { products: [] });
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`/products`);
        dispatch({ type: "GET_PRODUCTS", payload: data.data });
      } catch (error) {
        toast.error("Failed to fetch products");
      }
    })();
  }, []);

  const removeProduct = async (id: string | undefined) => {
    if (!id) {
      toast.error("ID sản phẩm không hợp lệ");
      return;
    }

    try {
      await instance.delete(`/products/${id}`);
      dispatch({ type: "REMOVE_PRODUCT", payload: id });
      toast.success("Xóa sản phẩm thành công");
    } catch (error) {
      toast.error("Xóa sản phẩm thất bại");
    }
  };

  const handleProduct = async (product: Product) => {
    try {
      // Tạo bản sao của sản phẩm và loại bỏ thuộc tính _id
      const productToSend = { ...product };
      if (productToSend._id) {
        delete productToSend._id;
      }

      if (product._id) {
        console.log("Updating product:", product);
        const { data } = await instance.patch(
          `/products/${product._id}`,
          productToSend // Gửi bản sao không có _id
        );
        dispatch({ type: "UPDATE_PRODUCT", payload: data.data });
        toast.success("Sửa sản phẩm thành công");
      } else {
        console.log("Adding new product:", product);
        const { data } = await instance.post(`/products`, product);
        dispatch({ type: "ADD_PRODUCT", payload: data.data });
        toast.success("Thêm sản phẩm thành công");
      }

      // Chuyển hướng sau khi thành công
      setTimeout(() => {
        nav("/admin");
      }, 2000);
    } catch (error) {
      console.error("Error response:", (error as { response?: { data?: string } }).response?.data);
      toast.error("Xử lý sản phẩm thất bại");
    }
  };

  return (
    <ProductContext.Provider
      value={{ state, dispatch, removeProduct, handleProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
