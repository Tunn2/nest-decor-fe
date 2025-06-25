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
        console.error("Không thể lấy dữ liệu sản phẩm:", err);
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
          <h1>MỌI THỨ CHO TỔ ẤM CỦA BẠN</h1>
          <p>
            Biến không gian sống thành ngôi nhà thực thụ với nội thất và đồ trang trí tinh tế, sang trọng và đầy cảm hứng.
          </p>
          <Link to="/shop">
            <button>Xem thêm →</button>
          </Link>
        </div>
      </section>

      <section className={styles.productsWeek}>
        <h2>SẢN PHẨM NỔI BẬT TRONG TUẦN</h2>
        <p>
          Khám phá những sản phẩm được yêu thích và đề xuất trong tuần này dành riêng cho bạn.
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
            Thắp sáng không gian với những mẫu đèn hiện đại, kết hợp hài hòa giữa phong cách và sự tiện nghi.
          </p>
          <Link to="/lighting">
            <button>Xem thêm →</button>
          </Link>
        </div>
      </section>

      <section className={styles.stylishChairs}>
        <div className={styles.chairContent}>
          <h2>GHẾ PHONG CÁCH</h2>
          <p>
            Nâng tầm nội thất với những chiếc ghế hiện đại, mang lại sự thoải mái và thẩm mỹ hoàn hảo.
          </p>
          <Link to="/chairs">
            <button>Xem thêm →</button>
          </Link>
        </div>
        <div className={styles.chairImage}>
          <img
            src="https://furniture123.co.uk/Images/BUNKOR00195433_3_Supersize.jpg?v=79"
            alt="Ghế hiện đại"
          />
        </div>
      </section>

      <section className={styles.tableSection}>
        <div className={styles.tableImage}>
          <img
            src="https://mysleepyhead.com/media/catalog/product/s/l/sleepyhead_product_ls_309_new.jpg"
            alt="Bàn"
          />
        </div>
        <div className={styles.tableContent}>
          <h2>BÀN</h2>
          <p>
            Những chiếc bàn tiện dụng và tinh tế, phù hợp với phong cách sống hiện đại của bạn.
          </p>
          <Link to="/tables">
            <button>Xem thêm →</button>
          </Link>
        </div>
      </section>

      <section className={styles.contemporaryLamps}>
        <div className={styles.lampContent}>
          <h2>ĐÈN HIỆN ĐẠI</h2>
          <p>
            Thắp sáng ngôi nhà của bạn với những mẫu đèn tối giản, thanh lịch và đầy tính ứng dụng.
          </p>
          <Link to="/lamps">
            <button>Xem thêm →</button>
          </Link>
        </div>
        <div className={styles.lampImage}>
          <img
            src="https://www.livingandhome.co.uk/cdn/shop/products/1_21c04911-4665-449a-b182-86162a75fa31.jpg?v=1694060842"
            alt="Đèn hiện đại"
          />
        </div>
      </section>

      <div className={styles.deliveryBanner}>
        <p>Đặt hàng ngay để nhận giao hàng hỏa tốc trong 24h!</p>
        <Link to="/delivery">
          <button>Xem thêm →</button>
        </Link>
      </div>

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
            desc: "Giao hàng miễn phí với các đơn đủ điều kiện toàn quốc.",
          },
          {
            title: "Chính sách hoàn trả",
            icon: "↩️",
            desc: "Đổi trả dễ dàng trong vòng 7 ngày.",
          },
          {
            title: "Thanh toán",
            icon: "💳",
            desc: "Thanh toán an toàn với nhiều phương thức linh hoạt.",
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
            <p className={styles.date}>29 Tháng 9, 2022 / bởi Soroush Norozy</p>
            <h4>Văn phòng của bạn nên sử dụng vật liệu tự nhiên</h4>
            <a href="#">Xem thêm</a>
          </div>
        ))}
      </section>

      <section className={styles.quote}>
        <span className={styles.quoteIcon}>❝</span>
        <p className={styles.quoteText}>
          “Thiết kế không chỉ là những gì bạn nhìn thấy và cảm nhận. <br />
          Thiết kế là cách nó hoạt động.”
        </p>
        <div className={styles.arrows}>
          <span className={styles.arrow}>‹</span>
          <span className={styles.arrow}>›</span>
        </div>
        <p className={styles.author}>
          <span>Nhà thiết kế</span>
          <br />
          <strong>Steve Jobs</strong>
        </p>
      </section>
    </div>
  );
};

export default HomePage;
