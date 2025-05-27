import React from "react";
import styles from "../styles/Blog.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.widget}>
        <h4>Search</h4>
        <input type="text" placeholder="Search..." className={styles.searchInput} />
      </div>

      <div className={styles.widget}>
        <h4>Featured Highlight</h4>
        <img src="/assets/bl3.webp" alt="Side Sofa" className={styles.sideImage} />
        <p>Discover our best-selling sofa set for modern living spaces, now trending in 2025.</p>
      </div>

      <div className={styles.widget}>
        <h4>Categories</h4>
        <ul className={styles.categoryList}>
          <li>Ceiling (25)</li>
          <li>Floor (25)</li>
          <li>LED (25)</li>
          <li>Modern (25)</li>
          <li>Retro (25)</li>
          <li>Wood (25)</li>
        </ul>
      </div>

      <div className={styles.widget}>
        <h4>Recent Posts</h4>
        <ul className={styles.recentList}>
          <li>New Wooden Furniture Arrivals</li>
          <li>Top 5 Living Room Essentials</li>
          <li>How to Design a Cozy Minimalist Space</li>
        </ul>
      </div>

      <div className={styles.widget}>
        <h4>Tags</h4>
        <div className={styles.tags}>
          <span>sofa</span>
          <span>clean</span>
          <span>wood</span>
          <span>interior</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
