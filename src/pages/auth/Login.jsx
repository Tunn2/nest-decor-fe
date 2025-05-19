import React from 'react';
import styles from '../../styles/Login.module.css';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Logged in!');
    navigate('/');
  };

  return (
    <>
      <Header />
      <div className={styles.loginWrapper}>
        <div className={styles.loginBox}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
          <p>Don't have an account? <a href="#">Register</a></p>
        </div>
      </div>
    </>
  );
};

export default Login;
