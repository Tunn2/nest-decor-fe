import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.column}>
                <h3>DecoNest</h3>
                <h4>About Us</h4>
                <p>
                    At DecoNest, we help you create a home that reflects your lifestyle. Explore carefully curated furniture and decor that blend comfort, style, and function.
                </p>
            </div>

            <div className={styles.column}>
                <h4>Customer Service</h4>
                <p>FAQs</p>
                <p>Shipping & Delivery</p>
                <p>Returns & Refunds</p>
                <p>Order Tracking</p>
                <p>Contact Support</p>
            </div>

            <div className={styles.column}>
                <h4>Follow Us</h4>
                <p>Instagram</p>
                <p>Facebook</p>
                <p>Pinterest</p>
                <p>Youtube</p>
                <p>TikTok</p>
            </div>

            <div className={styles.column}>
                <h4>Contact</h4>
                <p>Have questions or need help?</p>
                <p>Email: support@deconest.com</p>
                <p>Phone: +1 800 123 456</p>
                <p>Working hours: 9:00 - 18:00 (Mon - Sat)</p>
            </div>
        </footer>
    );
};

export default Footer;
