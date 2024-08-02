import { createContext, useReducer, useEffect } from "react";
import { Category } from "../interfaces/Category";

import instance from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import categoryReducer from "../reducers/categoryReducer";

export type CategoryContextType = {
  state: { categories: Category[] };
  dispatch: React.Dispatch<any>;
  removeCategory: (id: string | undefined) => void;
  handleCategory: (data: Category) => void;
};

export const CategoryContext = createContext({} as CategoryContextType);

const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(categoryReducer, { categories: [] });
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`/categories`);
        dispatch({ type: "GET_CATEGORIES", payload: data.data });
      } catch (error) {
        toast.error("Không thể tải danh sách danh mục.");
      }
    })();
  }, []);

  const removeCategory = async (id: string | undefined) => {
    if (!id) {
      toast.error("ID danh mục không hợp lệ");
      return;
    }

    try {
      await instance.delete(`/categories/${id}`);
      dispatch({ type: "REMOVE_CATEGORY", payload: id });
      toast.success("Xóa danh mục thành công");
    } catch (error: any) {
      toast.error("Xóa danh mục thất bại");
    }
  };

  const handleCategory = async (category: Category) => {
    try {
      const categoryToSend = { ...category };
      if (categoryToSend._id) {
        delete categoryToSend._id; // Loại bỏ _id trước khi gửi PATCH
      }

      if (category._id) {
        console.log("Updating category:", category);
        const { data } = await instance.patch(
          `/categories/${category._id}`,
          categoryToSend // Gửi payload không có _id
        );
        dispatch({ type: "UPDATE_CATEGORY", payload: data.data });
        toast.success("Sửa danh mục thành công");
      } else {
        console.log("Adding new category:", category);
        const { data } = await instance.post(`/categories`, category);
        dispatch({ type: "ADD_CATEGORY", payload: data.data });
        toast.success("Thêm danh mục thành công");
      }

      // Chuyển hướng sau khi thành công
      setTimeout(() => {
        nav("/admin/categories");
      }, 2000);
    } catch (error: any) {
      console.error("Error response:", error.response?.data);
      toast.error("Xử lý danh mục thất bại");
    }
  };

  return (
    <CategoryContext.Provider
      value={{ state, dispatch, removeCategory, handleCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
