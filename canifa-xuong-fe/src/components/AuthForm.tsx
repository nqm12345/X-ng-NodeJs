// AuthForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import instance from "../api";
import { useAuth } from "../contexts/AuthContext";
import { User } from "../interfaces/User";
import { loginSchema, registerSchema } from "../utils/validation";
import { Link } from "react-router-dom";
import { useState } from "react";
import '../../styles/authForm.scss';

type Props = {
  isLogin?: boolean;
};

const AuthForm = ({ isLogin }: Props) => {
  const { login: contextLogin } = useAuth();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<User>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const onSubmit = async (data: User) => {
    try {
      if (isLogin) {
        const res = await instance.post(`/auth/login`, data);
        contextLogin(res.data.accessToken, res.data.user);
      } else {
        const res = await instance.post(`/auth/register`, {
          email: data.email,
          password: data.password,
        });
        alert(res.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Đã xảy ra lỗi!");
      } else {
        alert("Đã xảy ra lỗi không xác định.");
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-content">
          <h2 className="title animate-fade-in">{isLogin ? "Chào mừng quay lại" : "Tạo tài khoản mới"}</h2>
          <p className="subtitle animate-fade-in">
            {isLogin
              ? "Đăng nhập bằng email và mật khẩu của bạn."
              : "Đăng ký để theo dõi những xu hướng thời trang mới nhất."}
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form animate-fade-in">
            <input
              type="email"
              className="form-input"
              placeholder="Nhập email của bạn"
              {...register("email")}
            />
            {errors.email && <span className="error-text">{errors.email.message}</span>}

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="Nhập mật khẩu"
                {...register("password")}
              />
              <span className="toggle-password" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            {errors.password && <span className="error-text">{errors.password.message}</span>}

            {!isLogin && (
              <>
                <div className="password-field">
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    className="form-input"
                    placeholder="Nhập lại mật khẩu"
                    {...register("confirmPass")}
                  />
                  <span className="toggle-password" onClick={() => setShowConfirmPass((prev) => !prev)}>
                    {showConfirmPass ? "🙈" : "👁️"}
                  </span>
                </div>
                {errors.confirmPass && (
                  <span className="error-text">{errors.confirmPass.message}</span>
                )}
              </>
            )}

            {isLogin && (
              <div className="form-links">
                <Link to="/request-password-reset">Quên mật khẩu?</Link>
              </div>
            )}

            <button type="submit" className="form-button">
              {isLogin ? "Đăng nhập" : "Đăng ký"}
            </button>
          </form>
          <div className="form-footer">
            {isLogin ? (
              <p>Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
            ) : (
              <p>Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
            )}
          </div>
        </div>
        <div className="auth-image animate-slide-in" />
      </div>
    </div>
  );
};

export default AuthForm;
