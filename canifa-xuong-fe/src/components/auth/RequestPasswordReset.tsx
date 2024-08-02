import { useState } from "react";
import axios from "axios";
import instance from "../../api/index.ts";

const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await instance.post("/auth/request-password-reset", { email });
      setMessage(response.data.message);
      setError("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage("");
        setError(error.response?.data?.message || "Error sending reset email.");
      } else {
        setMessage("");
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="container-form">
      <h2>Request Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default RequestPasswordReset;
