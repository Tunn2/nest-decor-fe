import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>DecoNest</div>

      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About us</Link>
        <Link to="/blog">Blog</Link>
      </nav>

      <div className={styles.icons}>
        <button className={styles.iconBtn}>
          <span role="img" aria-label="search">🔍</span>
        </button>
        <button className={styles.iconBtn}>
          <span role="img" aria-label="cart">🛍️</span>
        </button>
        <button className={styles.loginBtn} onClick={() => navigate('/login')}>
          Login
        </button>
        <button className={styles.loginBtn} onClick={() => navigate('/register')}>
          Register
        </button>
      </div>
    </header>
  );
};

export default Header;
