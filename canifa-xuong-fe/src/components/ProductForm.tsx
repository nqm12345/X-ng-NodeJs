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
const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const AVAILABLE_COLORS = ["Red", "Blue", "Green", "Black", "White", "Yellow"];

const ProductForm = () => {
  const { handleProduct } = useContext(ProductContext) as ProductContextType;
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    imagePreview,
    setImagePreview,    
    thumbnailUrls,
    setThumbnailUrls,
    handleImageUpload,
    removeImage,
  } = useImageUpload();
  const { id } = useParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      newprice: 0,
      oldprice: 0,
      description: "",
      category: "",
      brand: "",
      size: [],
      color: [],
      image: "",
      thumbnail: [],
      stock: 0,
    },
  });

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await instance.get(`/products/${id}`);
          const product = data.data;
          reset({
            ...product,
            category: product.category?._id || "",
            image: product.image || "",
            thumbnail: product.thumbnail || [],
            size: product.size || [],
            color: product.color || [],
          });
          setImagePreview(product.image || null);
          setThumbnailUrls(product.thumbnail || []);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      })();
    }
  }, [id, reset, setImagePreview, setThumbnailUrls]);

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

      {/* Title */}
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input id="title" className="form-control" type="text" {...register("title")} />
        {errors.title && <span className="text-danger">{errors.title.message}</span>}
      </div>

      {/* New Price */}
      <div className="mb-3">
        <label htmlFor="newprice" className="form-label">New Price</label>
        <input id="newprice" className="form-control" type="number" {...register("newprice", { valueAsNumber: true })} />
        {errors.newprice && <span className="text-danger">{errors.newprice.message}</span>}
      </div>

      {/* Old Price */}
      <div className="mb-3">
        <label htmlFor="oldprice" className="form-label">Old Price</label>
        <input id="oldprice" className="form-control" type="number" {...register("oldprice", { valueAsNumber: true })} />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea id="description" className="form-control" rows={4} {...register("description")} />
      </div>

      {/* Category */}
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <select id="category" {...register("category")} className="form-control">
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div className="mb-3">
        <label htmlFor="brand" className="form-label">Brand</label>
        <input id="brand" className="form-control" type="text" {...register("brand")} />
        {errors.brand && <span className="text-danger">{errors.brand.message}</span>}
      </div>

      {/* Stock */}
      <div className="mb-3">
        <label htmlFor="stock" className="form-label">Stock</label>
        <input id="stock" className="form-control" type="number" {...register("stock", { valueAsNumber: true })} />
        {errors.stock && <span className="text-danger">{errors.stock.message}</span>}
      </div>

      {/* Sizes */}
      <div className="mb-3">
        <label className="form-label">Sizes (chọn ít nhất 1)</label>
        <div className="d-flex flex-wrap gap-3">
          {AVAILABLE_SIZES.map((sizeOption) => (
            <div key={sizeOption} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`size-${sizeOption}`}
                checked={watch("size")?.includes(sizeOption)}
                onChange={(e) => {
                  const selectedSizes = watch("size") || [];
                  if (e.target.checked) {
                    setValue("size", [...selectedSizes, sizeOption]);
                  } else {
                    setValue("size", selectedSizes.filter((s) => s !== sizeOption));
                  }
                }}
              />
              <label className="form-check-label" htmlFor={`size-${sizeOption}`}>
                {sizeOption}
              </label>
            </div>
          ))}
        </div>
        {errors.size && <span className="text-danger">{(errors.size as any).message}</span>}
      </div>

      {/* Colors */}
      <div className="mb-3">
        <label className="form-label">Colors (tùy chọn)</label>
        <div className="d-flex flex-wrap gap-3">
          {AVAILABLE_COLORS.map((colorOption) => (
            <div key={colorOption} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`color-${colorOption}`}
                checked={watch("color")?.includes(colorOption)}
                onChange={(e) => {
                  const selectedColors = watch("color") || [];
                  if (e.target.checked) {
                    setValue("color", [...selectedColors, colorOption]);
                  } else {
                    setValue("color", selectedColors.filter((c) => c !== colorOption));
                  }
                }}
              />
              <label className="form-check-label" htmlFor={`color-${colorOption}`}>
                {colorOption}
              </label>
            </div>
          ))}
        </div>
        {errors.color && <span className="text-danger">{(errors.color as any).message}</span>}
      </div>

      {/* Image Upload */}
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
            <button type="button" className="btn btn-danger mt-1" onClick={() => removeImage("image", setValue)}>Remove Image</button>
          </div>
        )}
      </div>

      {/* Thumbnail Upload */}
      <div className="mb-3">
        <label htmlFor="thumbnailFile" className="form-label">Upload Thumbnails</label>
        <input
          id="thumbnailFile"
          className="form-control"
          type="file"
          multiple
          onChange={(e) => handleImageUpload(e.target.files, "thumbnail", setValue)}
        />
        <div className="mt-2">
          {thumbnailUrls.map((url, index) => (
            <div key={index} className="mb-2 d-flex align-items-center gap-2">
              <img src={url} alt={`thumbnail-${index}`} className="img-thumbnail" width={100} />
              <button type="button" className="btn btn-danger" onClick={() => removeImage("thumbnail", setValue, index)}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="mb-3">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};

export default ProductForm;
