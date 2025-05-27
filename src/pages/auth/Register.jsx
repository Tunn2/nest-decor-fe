import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, selectLoading, selectError } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Register.module.css";
import Header from "../../components/Header";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    phoneNumber: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);
    return hasUpper && hasLower && hasSymbol;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password" && value !== "") {
      setPasswordError(
        validatePassword(value)
          ? ""
          : "Password must contain uppercase, lowercase, and a special character."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      setPasswordError("Password does not meet requirements");
      return;
    }

    const resultAction = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(resultAction)) {
      navigate("/login");
    }
  };

  return (
    <>
      <Header />
      <div className={styles.registerWrapper}>
        <div className={styles.registerBox}>
          <h2>Register</h2>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
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
            {passwordError && <p className={styles.error}>{passwordError}</p>}
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
