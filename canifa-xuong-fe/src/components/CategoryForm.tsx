import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { categorySchema } from "../utils/validation";
import { Category } from "../interfaces/Category";
import { useContext, useEffect } from "react";
import { CategoryContext, CategoryContextType } from "../contexts/CategoryContext";
import instance from "../api";

const CategoryForm = () => {
  const { id } = useParams();
  const { handleCategory } = useContext(CategoryContext) as CategoryContextType;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Category>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await instance.get(`/categories/${id}`);
          reset(data.data);
        } catch (error) {
          console.error("Error fetching category data:", error);
        }
      })();
    }
  }, [id, reset]);

  const onSubmit = (data: Category) => {
    handleCategory({ ...data, _id: id }); // Xử lý dữ liệu gửi
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{id ? "Edit category" : "Add category"}</h1>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          className="form-control"
          type="text"
          {...register("title", { required: true })}
        />
        {errors.title && <span className="text-danger">{errors.title.message}</span>}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={4}
          {...register("description")}
        />
      </div>

      <div className="mb-3">
        <button className="btn btn-primary w-100">
          {id ? "Edit category" : "Add category"}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
