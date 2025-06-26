import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/authSlice";
import Sidebar from "../../components/Sidebar";
import ReactStars from "react-stars";
import styles from "../../styles/Blog.module.css";

const BlogDetail = () => {
  const user = useSelector(selectUser);
  const [commentData, setCommentData] = useState({
    comment: "",
    name: "",
    rating: 5,
  });
  const [isSaving, setIsSaving] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleChange = (e) => {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (newRating) => {
    setCommentData({ ...commentData, rating: newRating });
  };

  const handleSubmit = async () => {
    if (!commentData.comment.trim()) {
      alert("Vui lòng nhập bình luận!");
      return;
    }

    if (!user) {
      alert("Bạn cần đăng nhập để bình luận.");
      return;
    }

    setIsSaving(true);

    try {
      await axios.post(`${API_BASE_URL}/Reviews`, {
        furnitureId: 1,
        userId: user.id,
        rating: commentData.rating,
        comment: commentData.comment,
      });

      alert("✅ Bình luận của bạn đã được gửi!");
      setCommentData({ comment: "", name: "", rating: 5 });
    } catch (error) {
      console.error("❌ Gửi bình luận thất bại:", error);
      alert("❌ Có lỗi xảy ra khi gửi bình luận.");
    }

    setIsSaving(false);
  };

  return (
    <div className={styles.blogContainer}>
      <div className={styles.contentWrapper}>
        <main className={styles.mainContent}>
          <img src="/assets/blog.webp" alt="Sofa hiện đại" className={styles.mainImage} />

          <div className={styles.meta}>
            <span>26 Tháng 9, 2022</span> | <span>Trang trí nhà cửa, nội thất</span> | <span>Bởi đội ngũ DecoNest</span> | <span>💗 5</span> | <span>💬 3</span>
          </div>

          <h1>Chào mừng đến với DecoNest – Nơi bắt đầu tổ ấm của bạn</h1>

          <p>
            DecoNest là điểm đến đáng tin cậy của bạn cho nội thất hiện đại, trang trí nhà cửa và cảm hứng thiết kế không gian sống.
            Chúng tôi mang đến các bộ sưu tập được tuyển chọn kỹ lưỡng để giúp bạn biến mọi không gian thành một ngôi nhà ấm cúng, tiện nghi và tinh tế.
          </p>

          <blockquote>
            “Thiết kế không chỉ là vẻ ngoài và cảm giác. Thiết kế là cách nó hoạt động.” – Steve Jobs
          </blockquote>

          <div className={styles.relatedImages}>
            <img src="/assets/blog1.webp" alt="Sofa 1" />
            <img src="/assets/bl2.jpg" alt="Sofa 2" />
          </div>

          <div className={styles.navigation}>
            <button>← Khám phá đồ gỗ nội thất</button>
            <button>Trang trí góc làm việc tự nhiên →</button>
          </div>

          <section className={styles.commentSection}>
            <h3>Viết bình luận</h3>

            <textarea
              name="comment"
              placeholder="Nhập nội dung bình luận..."
              value={commentData.comment}
              onChange={handleChange}
            ></textarea>

            <input
              type="text"
              name="name"
              placeholder="Tên của bạn"
              value={commentData.name}
              onChange={handleChange}
            />

            <div style={{ marginTop: "1rem" }}>
              <label>Đánh giá: </label>
              <ReactStars
                count={5}
                value={commentData.rating}
                size={24}
                color2={"#ffd700"}
                onChange={handleRatingChange}
              />
            </div>

            <button onClick={handleSubmit} disabled={isSaving}>
              {isSaving ? "Đang gửi..." : "Gửi bình luận"}
            </button>
          </section>
        </main>

        <Sidebar />
      </div>
    </div>
  );
};

export default BlogDetail;
