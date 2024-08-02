import Joi from "joi";

export const productSchema = Joi.object({
  title: Joi.string().required().min(6).max(255).messages({
    "string.base": "Title must be a string",
    "string.empty": "Title cannot be empty",
    "string.min": "Title must have at least 6 characters",
    "string.max": "Title must have at most 255 characters",
  }),
  newprice: Joi.number().required().min(0).messages({
    "number.base": "New price must be a number",
    "number.empty": "New price cannot be empty",
    "number.min": "New price minimum value is 0",
  }),
  oldprice: Joi.number().min(0).messages({
    "number.base": "Old price must be a number",
    "number.min": "Old price minimum value is 0",
  }),
  description: Joi.string().messages({
    "string.base": "Description must be a string",
  }),
  category: Joi.string().messages({
    "string.base": "Category must be a string",
  }),
  image: Joi.string().uri().optional().messages({
    "string.base": "Image must be a string",
    "string.uri": "Image must be a valid URI",
  }),
  thumbnail: Joi.array().items(Joi.string().uri()).optional().messages({
    "array.base": "Thumbnail must be an array of strings",
    "string.uri": "Each thumbnail URL must be a valid URI",
  }),
  stock: Joi.number().min(0).optional().messages({
    "number.base": "Stock must be a number",
    "number.min": "Stock minimum value is 0",
  }), // Make stock optional
});
