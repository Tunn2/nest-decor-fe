import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import styles from "../../styles/Login.module.css";
import Header from "../../components/Header";
import { loginUser, selectError, selectLoading } from "../../redux/features/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    const action = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(action)) {
      const user = action.payload;
      setSuccessMessage("Đăng nhập thành công!");
      setTimeout(() => {
        setSuccessMessage("");
        if (user.email === "admin@gmail.com") {
          navigate("/admin/furniture");
        } 
        else if (user.email === "staff@gmail.com") {
          navigate("/staff/order");
        } else {
          navigate("/");
        }
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
          <h2>Đăng nhập</h2>

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
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <p>
            Chưa có tài khoản?{" "}
            <a href="/register" className={styles.registerLink}>
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
