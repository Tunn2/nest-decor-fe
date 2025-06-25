import React from "react";
import styles from "../../styles/About.module.css";

const About = () => {
  return (
    <>
      <div className={styles.about}>
        <section className={styles.hero}>
          <h1>Về chúng tôi</h1>
        </section>

        <section className={styles.services}>
          {[
            {
              title: "Mua sắm trực tuyến",
              icon: "🛒",
              desc: "Dễ dàng tìm kiếm và đặt hàng mọi lúc, mọi nơi.",
            },
            {
              title: "Miễn phí vận chuyển",
              icon: "🚚",
              desc: "Giao hàng miễn phí cho các đơn đủ điều kiện trên toàn quốc.",
            },
            {
              title: "Chính sách đổi trả",
              icon: "↩️",
              desc: "Đổi trả nhanh chóng trong vòng 7 ngày.",
            },
            {
              title: "Thanh toán",
              icon: "💳",
              desc: "Thanh toán an toàn với nhiều hình thức tiện lợi.",
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
            alt="Video giới thiệu"
            className={styles.videoBg}
          />
        </section>

        <section className={styles.skills}>
          <div className={styles.text}>
            <h2>
              Tính năng <br />
              và sự hoàn hảo
            </h2>
            <p>
              Chúng tôi kết hợp giữa sáng tạo và chất lượng, mang đến trải nghiệm
              hoàn hảo cho không gian sống của bạn. Thiết kế hiện đại, tiện nghi,
              dễ dàng tùy chỉnh phù hợp với mọi nhu cầu.
            </p>
          </div>
          <div className={styles.bars}>
            {[
              { label: "Sáng tạo", value: 72 },
              { label: "Quảng bá", value: 84 },
              { label: "Thiết kế", value: 72 },
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
          <h3>Bài viết mới nhất</h3>
          <div className={styles.blogList}>
            <div className={styles.blogCard}>
              <img src="/assets/ab3.jpg" alt="Góc làm việc ấm cúng" />
              <p className={styles.date}>26 Tháng 9, 2022</p>
              <h4>Tạo góc làm việc ấm cúng với tông màu tự nhiên</h4>
              <a href="#">Xem thêm</a>
            </div>

            <div className={styles.blogCard}>
              <img src="/assets/ab4.webp" alt="Ghế xanh dương" />
              <p className={styles.date}>3 Tháng 10, 2022</p>
              <h4>Vì sao xanh dương là màu tạo cảm giác thư giãn nhất</h4>
              <a href="#">Xem thêm</a>
            </div>

            <div className={styles.blogCard}>
              <img src="/assets/ab5.jpg" alt="Không gian tối giản" />
              <p className={styles.date}>15 Tháng 10, 2022</p>
              <h4>Mẹo thiết kế nội thất tối giản cho ngôi nhà sáng hơn</h4>
              <a href="#">Xem thêm</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
