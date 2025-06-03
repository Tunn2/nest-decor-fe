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
      alert("Please enter a comment!");
      return;
    }

    if (!user) {
      alert("You need to log in to post a comment.");
      return;
    }

    setIsSaving(true);

    try {
      await axios.post(
        "https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net/api/Reviews",
        {
          furnitureId: 1,
          userId: user.id,
          rating: commentData.rating,
          comment: commentData.comment,
        }
      );

      alert("✅ Your comment has been submitted!");
      setCommentData({ comment: "", name: "", rating: 5 });
    } catch (error) {
      console.error("❌ Failed to submit comment:", error);
      alert("❌ An error occurred while submitting your comment.");
    }

    setIsSaving(false);
  };

  return (
    <div className={styles.blogContainer}>
      <div className={styles.contentWrapper}>
        <main className={styles.mainContent}>
          <img src="/assets/blog.webp" alt="Modern Sofa" className={styles.mainImage} />

          <div className={styles.meta}>
            <span>Sep 26, 2022</span> | <span>Home decor, furniture, interior</span> | <span>By DecoNest Team</span> | <span>💗 5</span> | <span>💬 3</span>
          </div>

          <h1>Welcome to DecoNest – Where Your Home Begins</h1>

          <p>
            DecoNest is your trusted destination for modern furniture, home decoration, and interior design inspiration.
            We offer carefully curated collections that help you transform any space into a cozy, functional, and elegant home.
          </p>

          <blockquote>
            “Design is not just what it looks like and feels like. Design is how it works.” – Steve Jobs
          </blockquote>

          <div className={styles.relatedImages}>
            <img src="/assets/blog1.webp" alt="Sofa 1" />
            <img src="/assets/bl2.jpg" alt="Sofa 2" />
          </div>

          <div className={styles.navigation}>
            <button>← Explore Wooden Furniture</button>
            <button>Styling Your Natural Office →</button>
          </div>

          <section className={styles.commentSection}>
            <h3>Post a comment</h3>

            <textarea
              name="comment"
              placeholder="Your comment"
              value={commentData.comment}
              onChange={handleChange}
            ></textarea>

            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={commentData.name}
              onChange={handleChange}
            />

            <div style={{ marginTop: "1rem" }}>
              <label>Rating: </label>
              <ReactStars
                count={5}
                value={commentData.rating}
                size={24}
                color2={"#ffd700"}
                onChange={handleRatingChange}
              />
            </div>

            <button onClick={handleSubmit} disabled={isSaving}>
              {isSaving ? "Submitting..." : "Submit"}
            </button>
          </section>
        </main>

        <Sidebar />
      </div>
    </div>
  );
};

export default BlogDetail;
