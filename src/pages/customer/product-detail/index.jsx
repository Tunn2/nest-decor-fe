import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Input } from "../../../components/ui/input";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cartSlice";
import { toast } from "react-toastify";
import "./index.css";

const API_BASE = import.meta.env.VITE_BASE_URL;

function Star({ filled = false }) {
  return (
    <svg className={`star-detail ${filled ? "star-filled-detail" : "star-empty-detail"}`} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12,19 5,12 12,5" />
    </svg>
  );
}

function Minus() {
  return (
    <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function Plus() {
  return (
    <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function Heart() {
  return (
    <svg className="heart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE}/Furniture/${id}`);
        setProduct(res.data);

        if (res.data.categoryId) {
          const cat = await axios.get(`${API_BASE}/Categories/${res.data.categoryId}`);
          setCategoryName(cat.data.name);
        }
      } catch (err) {
        console.error("❌ Lỗi khi lấy sản phẩm hoặc danh mục:", err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.basePrice,
        quantity,
        image: product.imageUrl || "/placeholder.svg",
        categoryId: product.categoryId,
        defaultDimensions: {
          height: product.sizeConfig?.defaultHeight || 0,
          width: product.sizeConfig?.defaultWidth || 0,
          length: product.sizeConfig?.defaultLength || 0,
        },
      })
    );

    toast.success("Đã thêm vào giỏ hàng!");
  };

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const formatVND = (value) => {
    return `${new Intl.NumberFormat("vi-VN").format(value)} ₫`;
  };

  if (!product) return <div>Đang tải sản phẩm...</div>;

  const images = product?.images?.length ? product.images : [product.imageUrl];

  return (
    <div className="product-detail-container">
      <div className="product-detail-content">
        <Link to="/shop" className="back-button">
          <ArrowLeft />
          Quay lại cửa hàng
        </Link>

        <div className="product-layout">
          <div className="image-gallery">
            <div className="thumbnail-list">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`thumbnail-button ${selectedImage === i ? "thumbnail-active" : "thumbnail-inactive"}`}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Ảnh ${i}`}
                    className="thumbnail-image"
                    onError={(e) => (e.target.src = "/placeholder.svg")}
                  />
                </button>
              ))}
            </div>
            <div className="main-image-container">
              <img
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="main-image"
                onError={(e) => (e.target.src = "/placeholder.svg")}
              />
            </div>
          </div>

          <div>
            <h1 className="product-title">{product.name}</h1>

            <div className="product-rating-detail">
              <div className="rating-stars-detail">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} filled={i < 4} />
                ))}
              </div>
              <span className="rating-count-detail">(5)</span>
            </div>

            <div className="price-container">
              <span className="price-amount">{formatVND(product.basePrice)}</span>
            </div>

            <p className="product-description">{product.description || "Không có mô tả"}</p>

            <div className="quantity-cart-container">
              <div className="quantity-selector">
                <button onClick={() => handleQuantityChange(-1)} className="quantity-button"><Minus /></button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                  className="quantity-input"
                  min="1"
                />
                <button onClick={() => handleQuantityChange(1)} className="quantity-button"><Plus /></button>
              </div>
              <button className="add-to-cart-button" onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </button>
            </div>

            <button className="wishlist-button">
              <Heart /> Thêm vào yêu thích
            </button>

            <div className="product-meta">
              <div>
                <span className="meta-label">Danh mục: </span>
                <span className="meta-value">{categoryName || "Không rõ"}</span>
              </div>
              <div>
                <span className="meta-label">Màu sắc: </span>
                <span className="meta-value">
                  {product.color || "Không rõ"}
                  {product.color && (
                    <span
                      className="color-chip"
                      style={{ backgroundColor: product.color.toLowerCase() }}
                      title={product.color}
                    />
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="product-tabs">
          <div className="tabs-nav">
            <nav className="tabs-list">
              {["description", "additional", "preview"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-button ${activeTab === tab ? "tab-active" : "tab-inactive"}`}
                >
                  {tab === "additional"
                    ? "Thông tin bổ sung"
                    : tab === "description"
                    ? "Mô tả"
                    : "Xem trước"}
                </button>
              ))}
            </nav>
          </div>

          <div className="tab-content">
            {activeTab === "description" && <p>{product.description || "Không có mô tả chi tiết."}</p>}
            {activeTab === "additional" && (
              <div>
                <p>Chất liệu: {product.material || "Không rõ"}</p>
                <p>Màu sắc: {product.color || "Không rõ"}</p>
                <p>Kích thước (cm): {product.sizeConfig?.defaultLength} x {product.sizeConfig?.defaultWidth} x {product.sizeConfig?.defaultHeight}</p>
              </div>
            )}
            {activeTab === "preview" && <p>Phần xem trước sẽ được hiển thị tại đây.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
