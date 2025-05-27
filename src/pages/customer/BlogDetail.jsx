import React from "react";
import styles from "../../styles/Blog.module.css";
import Sidebar from "../../components/Sidebar";

const BlogDetail = () => {
  return (
    <div className={styles.blogContainer}>
      <div className={styles.contentWrapper}>
        <main className={styles.mainContent}>
          <img src="/assets/blog.webp" alt="Modern Sofa" className={styles.mainImage} />

          <div className={styles.meta}>
            <span>Sep 26, 2022</span> |
            <span> Home decor, furniture, interior </span> |
            <span> By DecoNest Team </span> |
            <span> 💗 5 </span> |
            <span> 💬 3 </span>
          </div>

          <h1>Welcome to DecoNest – Where Your Home Begins</h1>

          <p>
            DecoNest is your trusted destination for modern furniture, home decoration, and interior design inspiration.
            We offer carefully curated collections that help you transform any space into a cozy, functional, and elegant home.
            From minimalist sofas to handcrafted wooden pieces, our platform empowers you to create a lifestyle that reflects your taste and values.
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
            <textarea placeholder="Your comment"></textarea>
            <input type="text" placeholder="Your name" />
            <input type="email" placeholder="Your email" />
            <input type="text" placeholder="Website" />
            <div>
              <input type="checkbox" /> Save my name, email, and website in this browser for the next time I comment.
            </div>
            <button>Submit</button>
          </section>
        </main>

        <Sidebar />
      </div>
    </div>
  );
};

export default BlogDetail;
