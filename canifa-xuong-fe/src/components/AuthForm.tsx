import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import instance from "../api";
import { useAuth } from "../contexts/AuthContext";
import { User } from "../interfaces/User";
import { loginSchema, registerSchema } from "../utils/validation";
import { Link } from "react-router-dom";
import '../../styles/authForm.scss'; // Ensure you have the corresponding CSS file

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
        alert(error.response?.data?.message || "Error!");
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="container-form">
      <div className="left">
        <div className="header">
          <h2 className="animation a1">{isLogin ? "Welcome Back" : "Join Us"}</h2>
          <h4 className="animation a2">
            {isLogin ? "Log in to your account using email and password" : "Create your account using email and password"}
          </h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <input
            type="email"
            className="form-field animation a3"
            placeholder="Email Address"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span className="text-danger">{errors.email.message}</span>}
          <input
            type="password"
            className="form-field animation a4"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <span className="text-danger">{errors.password.message}</span>}
          {!isLogin && (
            <>
              <input
                type="password"
                className="form-field animation a4"
                placeholder="Confirm Password"
                {...register("confirmPass", { required: "Please confirm your password" })}
              />
              {errors.confirmPass && <span className="text-danger">{errors.confirmPass.message}</span>}
            </>
          )}
          {isLogin && (
            <p className="animation a5">
                 <Link to="/request-password-reset">Forgot Password?</Link>
            </p>
          )}
          <button type="submit" className="animation a6">{isLogin ? "LOGIN" : "REGISTER"}</button>
        </form>
        {isLogin ? <Link to="/register">Register</Link> : <Link to="/login">Login</Link>}
      </div>
      <div className="right" />
    </div>
  );
};

export default AuthForm;
