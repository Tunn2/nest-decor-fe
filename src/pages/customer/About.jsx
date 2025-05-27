import React from "react";
import styles from "../../styles/About.module.css";

const About = () => {
  return (
    <>
      <div className={styles.about}>
        <section className={styles.hero}>
          <h1>About us</h1>
        </section>

        <section className={styles.services}>
          {[
            {
              title: "Shop online",
              icon: "🛒",
              desc: "Easily browse and order products anytime, anywhere.",
            },
            {
              title: "Free shipping",
              icon: "🚚",
              desc: "Free delivery for eligible orders nationwide.",
            },
            {
              title: "Return policy",
              icon: "↩️",
              desc: "Fast and easy returns within 7 days.",
            },
            {
              title: "PAYMENT",
              icon: "💳",
              desc: "Secure checkout with multiple payment methods.",
            },
          ].map((item, idx) => (
            <div key={idx} className={styles.service}>
              <div className={styles.icon}>{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </section>

        <section className={styles.videoSection}>
          <img
            src="/assets/ab2.jpg"
            alt="About video"
            className={styles.videoBg}
          />
        </section>

        <section className={styles.skills}>
          <div className={styles.text}>
            <h2>
              Functionality <br />
              meets perfection
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse massa libero, mattis volutpat id. Egestas adipiscing
              placerat eleifend a nascetur. Mattis proin enim, nam porttitor
              vitae.
            </p>
          </div>
          <div className={styles.bars}>
            {[
              { label: "Creativity", value: 72 },
              { label: "Advertising", value: 84 },
              { label: "Design", value: 72 },
            ].map((bar, idx) => (
              <div key={idx} className={styles.bar}>
                <div className={styles.barLabel}>
                  {bar.label} <span>{bar.value}%</span>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${bar.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.blog}>
          <h3>Last blog post</h3>
          <div className={styles.blogList}>
            <div className={styles.blogCard}>
              <img src="/assets/ab3.jpg" alt="Cozy Work Corner" />
              <p className={styles.date}>Sep 26, 2022</p>
              <h4>Create a cozy corner in your office with natural tones</h4>
              <a href="#">Read more</a>
            </div>

            <div className={styles.blogCard}>
              <img src="/assets/ab4.webp" alt="Blue Chair Design" />
              <p className={styles.date}>Oct 3, 2022</p>
              <h4>Why blue is the calmest color for your workspace</h4>
              <a href="#">Read more</a>
            </div>

            <div className={styles.blogCard}>
              <img src="/assets/ab5.jpg" alt="Minimalist Interior" />
              <p className={styles.date}>Oct 15, 2022</p>
              <h4>Minimalist interior tips for a brighter home</h4>
              <a href="#">Read more</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
