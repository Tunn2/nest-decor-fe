import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/HomePage.module.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        const res = await fetch(
          "https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net/api/Furniture"
        );
        const data = await res.json();
        const limitedProducts = (data.items || []).slice(0, 4);
        setProducts(limitedProducts);
      } catch (err) {
        console.error("Failed to fetch furniture data:", err);
      }
    };

    fetchFurniture();
  }, []);

  const formatVND = (value) =>
    `${new Intl.NumberFormat("vi-VN").format(value)} ₫`;

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>ALL FOR YOUR HOME</h1>
          <p>
            Turn your living space into a true home with sophisticated,
            luxurious and inspiring furniture and decoration products.
          </p>
          <button>View more →</button>
        </div>
      </section>

      <section className={styles.productsWeek}>
        <h2>PRODUCTS OF THE WEEK</h2>
        <p>
          Discover this week's trending and recommended products handpicked for
          you.
        </p>
        <div className={styles.productGrid}>
          {products.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className={styles.productCard}
            >
              <img
                src={item.imageUrl || "/placeholder.png"}
                alt={item.name}
              />
              <h3>{item.name}</h3>
              <p>{formatVND(item.basePrice)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.bannerSection}>
        <div className={styles.bannerContent}>
          <p>
            Illuminate your space with contemporary lights that blend style and
            comfort seamlessly.
          </p>
          <button>View more →</button>
        </div>
      </section>

      <section className={styles.stylishChairs}>
        <div className={styles.chairContent}>
          <h2>STYLISH CHAIRS</h2>
          <p>
            Elevate your interior with sleek, modern chairs that combine style
            and comfort in perfect harmony.
          </p>
          <button>View more →</button>
        </div>
        <div className={styles.chairImage}>
          <img
            src="https://furniture123.co.uk/Images/BUNKOR00195433_3_Supersize.jpg?v=79"
            alt="Stylish Chair"
          />
        </div>
      </section>

      <section className={styles.tableSection}>
        <div className={styles.tableImage}>
          <img
            src="https://mysleepyhead.com/media/catalog/product/s/l/sleepyhead_product_ls_309_new.jpg"
            alt="Table"
          />
        </div>
        <div className={styles.tableContent}>
          <h2>TABLE</h2>
          <p>
            Functional and elegant tables designed to fit perfectly into your
            modern lifestyle and home space.
          </p>
          <button>View more →</button>
        </div>
      </section>

      <section className={styles.contemporaryLamps}>
        <div className={styles.lampContent}>
          <h2>CONTEMPORARY LAMPS</h2>
          <p>
            Brighten your home with sleek, minimalist lamps that reflect modern
            elegance and everyday functionality.
          </p>
          <button>View more →</button>
        </div>
        <div className={styles.lampImage}>
          <img
            src="https://www.livingandhome.co.uk/cdn/shop/products/1_21c04911-4665-449a-b182-86162a75fa31.jpg?v=1694060842"
            alt="Contemporary Lamp"
          />
        </div>
      </section>

      <div className={styles.deliveryBanner}>
        <p>Order now for an express delivery in 24h!</p>
        <button>View more →</button>
      </div>

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

      <section className={styles.blog}>
        {[1, 2].map((id) => (
          <div key={id} className={styles.blogPost}>
            <img src={`/assets/blog${id}.jpg`} alt={`Blog ${id}`} />
            <p className={styles.date}>29 sep,2022 / by soroush norozy</p>
            <h4>Your office should have only natural materials</h4>
            <a href="#">read more</a>
          </div>
        ))}
      </section>

      <section className={styles.quote}>
        <span className={styles.quoteIcon}>❝</span>
        <p className={styles.quoteText}>
          “Design is not just what it looks like and feels like. <br />
          Design is how it works.”
        </p>
        <div className={styles.arrows}>
          <span className={styles.arrow}>‹</span>
          <span className={styles.arrow}>›</span>
        </div>
        <p className={styles.author}>
          <span>Designer</span>
          <br />
          <strong>Steve Jobs</strong>
        </p>
      </section>
    </div>
  );
};

export default HomePage;
