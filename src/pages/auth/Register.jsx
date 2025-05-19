import React from 'react';
import styles from '../../styles/Register.module.css';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header";

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        alert('Registered successfully!');
        navigate('/login');
    };

    return (
        <>
            <Header />
            <div className={styles.registerWrapper}>
                <div className={styles.registerBox}>
                    <h2>Register</h2>
                    <form onSubmit={handleRegister}>
                        <input type="text" placeholder="Full Name" required />
                        <input type="email" placeholder="Email" required />
                        <input type="password" placeholder="Password" required />
                        <button type="submit">Register</button>
                    </form>
                    <p>Already have an account? <a href="/login">Login here</a></p>
                </div>
            </div>
        </>
    );
};

export default Register;
