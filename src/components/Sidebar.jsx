import React from "react";
import styles from "../styles/Blog.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.widget}>
        <h4>Tìm kiếm</h4>
        <input type="text" placeholder="Nhập từ khóa..." className={styles.searchInput} />
      </div>

      <div className={styles.widget}>
        <h4>Nổi bật</h4>
        <img src="/assets/bl3.webp" alt="Ghế Sofa bên cạnh" className={styles.sideImage} />
        <p>Bộ sofa bán chạy nhất cho không gian sống hiện đại, đang là xu hướng năm 2025.</p>
      </div>

      <div className={styles.widget}>
        <h4>Danh mục</h4>
        <ul className={styles.categoryList}>
          <li>Trần nhà (25)</li>
          <li>Sàn nhà (25)</li>
          <li>Đèn LED (25)</li>
          <li>Hiện đại (25)</li>
          <li>Phong cách cổ (25)</li>
          <li>Gỗ (25)</li>
        </ul>
      </div>

      <div className={styles.widget}>
        <h4>Bài viết gần đây</h4>
        <ul className={styles.recentList}>
          <li>Hàng mới: Nội thất gỗ cao cấp</li>
          <li>Top 5 vật dụng không thể thiếu cho phòng khách</li>
          <li>Cách thiết kế không gian tối giản ấm cúng</li>
        </ul>
      </div>

      <div className={styles.widget}>
        <h4>Thẻ phổ biến</h4>
        <div className={styles.tags}>
          <span>sofa</span>
          <span>làm sạch</span>
          <span>gỗ</span>
          <span>nội thất</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
