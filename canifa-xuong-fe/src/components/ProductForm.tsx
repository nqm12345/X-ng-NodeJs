import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { productSchema } from "../utils/validation";
import { Product } from "../interfaces/Product";
import { useContext, useEffect, useState } from "react";
import { ProductContext, ProductContextType } from "../contexts/ProductContext";
import instance from "../api";
import { Category } from "../interfaces/Category";
import { useImageUpload } from "../hooks/useImageUpload";

const ProductForm = () => {
  const { handleProduct } = useContext(ProductContext) as ProductContextType;
  const [categories, setCategories] = useState<Category[]>([]);
  const { imagePreview, setImagePreview, thumbnailUrls, setThumbnailUrls, handleImageUpload, removeImage } = useImageUpload();
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      image: "",
      thumbnail: []
    }
  });

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await instance.get(`/products/${id}`);
          reset({
            ...data.data,
            category: data.data.category?._id || "",
            thumbnail: data.data.thumbnail || [],
            image: data.data.image || "",
          });
          setThumbnailUrls(data.data.thumbnail || []);
          setImagePreview(data.data.image || null);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      })();
    }
  }, [id, reset, setThumbnailUrls, setImagePreview]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`/categories`);
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    })();
  }, []);

  const onSubmit = (data: Product) => {
    handleProduct({ ...data, _id: id });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{id ? "Edit product" : "Add product"}</h1>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input id="title" className="form-control" type="text" {...register("title")} />
        {errors.title && <span className="text-danger">{errors.title.message}</span>}
      </div>

      <div className="mb-3">
        <label htmlFor="newprice" className="form-label">New Price</label>
        <input id="newprice" className="form-control" type="number" {...register("newprice", { valueAsNumber: true })} />
        {errors.newprice && <span className="text-danger">{errors.newprice.message}</span>}
      </div>

      <div className="mb-3">
        <label htmlFor="oldprice" className="form-label">Old Price</label>
        <input id="oldprice" className="form-control" type="number" {...register("oldprice", { valueAsNumber: true })} />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea id="description" className="form-control" rows={4} {...register("description")} />
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <select id="category" {...register("category")} className="form-control">
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="imageFile" className="form-label">Upload Image</label>
        <input
          id="imageFile"
          className="form-control"
          type="file"
          onChange={(e) => handleImageUpload(e.target.files, "image", setValue)}
        />
        {imagePreview && (
          <div className="mt-2">
            <img src={imagePreview} alt="product image" className="img-thumbnail" width={200} />
            <button type="button" className="btn btn-danger" onClick={() => removeImage("image", setValue)}>Remove Image</button>
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="thumbnailFile" className="form-label">Upload Thumbnail</label>
        <input
          id="thumbnailFile"
          className="form-control"
          type="file"
          onChange={(e) => handleImageUpload(e.target.files, "thumbnail", setValue)}
        />
        <div className="mt-2">
          {thumbnailUrls.map((url, index) => (
            <div key={index} className="mb-2">
              <img src={url} alt={`thumbnail-${index}`} className="img-thumbnail" width={100} />
              <button type="button" className="btn btn-danger" onClick={() => removeImage("thumbnail", setValue, index)}>Remove Thumbnail</button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};

export default ProductForm;
