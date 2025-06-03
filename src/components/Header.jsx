import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../redux/features/authSlice";
import styles from "../styles/Header.module.css";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaShoppingCart,
  FaSearch,
  FaTools,
} from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser) || JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.email === "admin@gmail.com";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>DecoNest</div>

      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About us</Link>
        <Link to="/blog">Blog</Link>
        {isAdmin && (
          <Link to="/admin/furniture" className={styles.adminLink}>
            <FaTools className={styles.iconInline} />
            Shop Management
          </Link>
        )}
      </nav>

      <div className={styles.icons}>
        <button className={styles.iconBtn} title="Search">
          <FaSearch />
        </button>

        <button className={styles.iconBtn} title="Cart">
          <FaShoppingCart />
        </button>

        {!user ? (
          <>
            <button
              className={styles.loginBtn}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className={styles.loginBtn}
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        ) : (
          <div className={styles.userSection}>
            {!isAdmin && (
              <button
                className={styles.iconBtn}
                onClick={goToProfile}
                title="Profile"
              >
                <FaUserCircle className={styles.userIcon} />
              </button>
            )}
            <button
              className={styles.logoutBtn}
              onClick={handleLogout}
              title="Logout"
            >
              <FaSignOutAlt />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
