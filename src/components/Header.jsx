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
  const user =
    useSelector(selectUser) || JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.email === "admin@gmail.com";
  const isStaff = user?.email === "staff@gmail.com";

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
        <Link to="/">Trang chủ</Link>
        <Link to="/shop">Cửa hàng</Link>
        <Link to="/about">Về chúng tôi</Link>
        <Link to="/blog">Blog</Link>
        {isAdmin && (
          <Link to="/admin/dashboard" className={styles.adminLink}>
            <FaTools className={styles.iconInline} />
            Quản lý shop
          </Link>
        )}
        {isStaff && (
          <Link to="/staff/order" className={styles.adminLink}>
            <FaTools className={styles.iconInline} />
            Quản lý cho nhân viên
          </Link>
        )}
      </nav>

      <div className={styles.icons}>
        <button className={styles.iconBtn} title="Tìm kiếm">
          <FaSearch />
        </button>

        {!isAdmin && (
          <button
            className={styles.iconBtn}
            title="Giỏ hàng"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart />
          </button>
        )}

        {!user ? (
          <>
            <button
              className={styles.loginBtn}
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </button>
            <button
              className={styles.loginBtn}
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </button>
          </>
        ) : (
          <div className={styles.userSection}>
            {!isAdmin && (
              <button
                className={styles.iconBtn}
                onClick={goToProfile}
                title="Trang cá nhân"
              >
                <FaUserCircle className={styles.userIcon} />
              </button>
            )}
            <button
              className={styles.logoutBtn}
              onClick={handleLogout}
              title="Đăng xuất"
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
