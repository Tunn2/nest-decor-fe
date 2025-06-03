import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import styles from "../../styles/Login.module.css";
import Header from "../../components/Header";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const loginRes = await fetch("https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!loginRes.ok) throw new Error("Login failed");
      const loginData = await loginRes.json();
      const userId = loginData.userId;

      const userRes = await fetch(`https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net/api/Users/${userId}`);
      if (!userRes.ok) throw new Error("Failed to fetch user info");

      const user = await userRes.json();
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({ type: "auth/setUser", payload: user });

      setSuccessMessage("Login successful!");
      setTimeout(() => {
        setSuccessMessage("");
        if (user.email === "admin@gmail.com") navigate("/admin/furniture");
        else navigate("/");
      }, 1500);

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    }
  };

  return (
    <>
      {successMessage && (
        <div className={styles.topSuccess}>
          <FaCheckCircle className={styles.successIcon} />
          <span>{successMessage}</span>
        </div>
      )}

      <Header />

      <div className={styles.loginWrapper}>
        <div className={styles.loginBox}>
          <h2>Login</h2>
          {error && <p className={styles.error}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className={styles.passwordField}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit">Login</button>
          </form>

          <p>
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
