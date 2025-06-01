import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectLoading, selectError } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Login.module.css";
import Header from "../../components/Header";
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(resultAction)) {
      setSuccessMessage("Login successful!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 1500);
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
              <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
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
