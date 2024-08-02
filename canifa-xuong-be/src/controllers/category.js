import Category from "../models/Category.js";
import slugify from "slugify";
import Product from "../models/Product.js";

export const createCategory = async (req, res, next) => {
  try {
    const slug = slugify(req.body.title, {
      replacement: "-",
      lower: true,
      strict: true,
      locale: "vi",
      trim: true,
    });
    console.log(slug);
    const data = await Category.create({ ...req.body, slug });
    if (data) {
      return res.status(201).json({
        success: true,
        data,
        message: "Tao danh muc thanh cong!",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateCategoryById = async (req, res, next) => {
  try {
    const data = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // findByIdAndUpdate = patch;
    // findByIdAndReplace = put;
    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "Update danh muc thanh cong!",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const removeCategoryById = async (req, res, next) => {
  try {
    // Thay thế giá trị này bằng ID thực tế của danh mục mặc định trong cơ sở dữ liệu của bạn
    const defaultCategoryId = "66a0edf810218f82a1fd8b1d"; 

    // Kiểm tra nếu danh mục cần xóa là danh mục mặc định
    if (req.params.id === defaultCategoryId) {
      return res.status(400).json({
        message: "Khong xoa dk danh muc mac dinh",
        success: false,
      });
    }

    // Xóa danh mục
    const data = await Category.findByIdAndDelete(req.params.id);

    // Nếu không tìm thấy danh mục để xóa
    if (!data) {
      return res.status(404).json({
        message: "Danh muc khong ton tai",
        success: false,
      });
    }

    // Chuyển toàn bộ sản phẩm thuộc danh mục bị xóa về danh mục mặc định
    const productToUpdate = await Product.find({ category: req.params.id });
    await Promise.all(
      productToUpdate.map(async (product) => {
        product.category = defaultCategoryId; // Đặt sản phẩm về danh mục mặc định
        await product.save();
      })
    );

    return res.status(200).json({
      success: true,
      data,
      message: "Remove danh muc thanh cong!",
    });
  } catch (error) {
    next(error);
  }
};


export const getCategoryById = async (req, res, next) => {
  try {
    console.log("alo");
    const data = await Category.findById(req.params.id).populate("products");
    console.log(data);
    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "Tim danh muc thanh cong!",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllCategorys = async (req, res, next) => {
  try {
    const data = await Category.find();
    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "Lay danh muc thanh cong!",
      });
    }
  } catch (error) {
    next(error);
  }
};
