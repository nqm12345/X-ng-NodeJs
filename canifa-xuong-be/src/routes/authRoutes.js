import { Router } from "express";
import { requestPasswordReset, resetPassword } from "../controllers/authController.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { authSchema, resetPasswordSchema, requestPasswordResetSchema } from "../validSchema/authSchema.js";
import { showProfile } from "../controllers/user.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { register, login } from "../controllers/auth.js";

const authRouter = Router();

// Route đăng ký và đăng nhập
authRouter.post("/register", validBodyRequest(authSchema), register);
authRouter.post("/login", validBodyRequest(authSchema), login);

// Route yêu cầu đặt lại mật khẩu và đặt lại mật khẩu
authRouter.post("/request-password-reset", validBodyRequest(requestPasswordResetSchema), requestPasswordReset);
authRouter.post("/reset-password", validBodyRequest(resetPasswordSchema), resetPassword);

// Các route yêu cầu xác thực
authRouter.use("/", checkAuth);
authRouter.get("/me", showProfile);
// authRouter.patch("/me", updateProfile);

export default authRouter;
