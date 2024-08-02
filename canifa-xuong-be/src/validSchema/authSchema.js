import Joi from "joi";

// Định nghĩa schema
export const authSchema = Joi.object({
  email: Joi.string().required().email().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be a valid email",
  }),
  password: Joi.string().required().min(6).max(255).messages({
    "string.base": "Password must be a string",
    "string.empty": "Password cannot be empty",
    "string.min": "Password must have at least 6 characters",
    "string.max": "Password must have at most 255 characters",
  }),
});

export const requestPasswordResetSchema = Joi.object({
  email: Joi.string().required().email().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be a valid email",
  }),
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required().messages({
    "string.base": "Token must be a string",
    "string.empty": "Token cannot be empty",
  }),
  newPassword: Joi.string().required().min(6).max(255).messages({
    "string.base": "New password must be a string",
    "string.empty": "New password cannot be empty",
    "string.min": "New password must have at least 6 characters",
    "string.max": "New password must have at most 255 characters",
  }),
});
