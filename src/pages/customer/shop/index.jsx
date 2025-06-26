import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cartSlice";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { toast } from "react-toastify";
import "./index.css";

const dinhDangGiaVND = (gia) => {
  return gia?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫";
};

function BoLoc({ className = "", ...props }) {
  return (
    <svg
      className={`icon filter-icon ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
    </svg>
  );
}

function Sao({ className = "", filled = false, ...props }) {
  return (
    <svg
      className={`star-icon ${filled ? "star-filled" : "star-empty"} ${className}`}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

function TheSanPham({ product }) {
  const dispatch = useDispatch();
  const [dangThem, setDangThem] = useState(false);

  const xuLyThemVaoGio = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDangThem(true);

    try {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.basePrice,
          quantity: 1,
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
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      toast.error("Có lỗi xảy ra!");
    } finally {
      setDangThem(false);
    }
  };

  return (
    <Card className="product-card">
      <CardContent className="card-content" style={{ padding: 0 }}>
        <div className="product-image-container">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              className="product-image"
            />
          </Link>
          <Badge variant="new" className="product-badge">
            Mới
          </Badge>
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-rating">
            <div className="rating-stars">
              {[...Array(5)].map((_, i) => (
                <Sao key={i} filled={i < 4} />
              ))}
            </div>
            <span className="rating-count">(5)</span>
          </div>
          <div className="product-footer">
            <span className="product-price">
              {dinhDangGiaVND(product.basePrice)}
            </span>
            <Button
              size="sm"
              onClick={xuLyThemVaoGio}
              disabled={dangThem}
              className={dangThem ? "loading" : ""}
            >
              {dangThem ? "Đang thêm..." : "Thêm vào giỏ hàng"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [sortOption, setSortOption] = useState("featured");

  const API_BASE = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [furnitureRes, categoriesRes] = await Promise.all([
          axios.get(`${API_BASE}/Furniture`),
          axios.get(`${API_BASE}/Categories`),
        ]);

        setProducts(furnitureRes.data.items);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
      }
    };

    fetchData();
  }, []);

  const khoangGia = [
    { name: "Dưới 500.000₫", value: "under-500000" },
    { name: "500.000₫ - 1.000.000₫", value: "500000-1000000" },
    { name: "1.000.000₫ - 2.000.000₫", value: "1000000-2000000" },
    { name: "Trên 2.000.000₫", value: "over-2000000" },
  ];

  const chonDanhMuc = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const danhSachDaLoc = Array.isArray(products)
    ? products
        .filter((sp) => {
          const matchCategory =
            selectedCategories.length === 0 || selectedCategories.includes(sp.categoryId);
          const gia = sp.basePrice;
          const matchPrice =
            selectedPriceRange === "" ||
            (selectedPriceRange === "under-500000" && gia < 500000) ||
            (selectedPriceRange === "500000-1000000" && gia >= 500000 && gia <= 1000000) ||
            (selectedPriceRange === "1000000-2000000" && gia > 1000000 && gia <= 2000000) ||
            (selectedPriceRange === "over-2000000" && gia > 2000000);
          return matchCategory && matchPrice;
        })
        .sort((a, b) => {
          if (sortOption === "price-low-high") return a.basePrice - b.basePrice;
          if (sortOption === "price-high-low") return b.basePrice - a.basePrice;
          return 0;
        })
    : [];

  return (
    <div className="shop-container">
      <div className="shop-content">
        <div className="shop-layout">
          <div className="shop-sidebar">
            <div className="sidebar-header">
              <BoLoc />
              <h2 className="sidebar-title">Bộ lọc</h2>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Danh mục</h3>
              <div className="filter-options">
                {categories.map((dm) => (
                  <label key={dm.id} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(dm.id)}
                      onChange={() => chonDanhMuc(dm.id)}
                      className="filter-checkbox"
                    />
                    <span className="filter-label">{dm.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Khoảng giá</h3>
              <div className="filter-options">
                {khoangGia.map((range) => (
                  <label key={range.value} className="filter-option">
                    <input
                      type="radio"
                      name="priceRange"
                      value={range.value}
                      checked={selectedPriceRange === range.value}
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                      className="filter-radio"
                    />
                    <span className="filter-label">{range.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="shop-main">
            <div className="shop-header">
              <p className="results-count">
                Hiển thị {danhSachDaLoc.length} / {products.length} sản phẩm
              </p>

              <select
                value={sortOption}
                onChange={(e) => {
                  const value = e.target.value;
                  setSortOption(value);
                  if (value === "all") {
                    setSelectedPriceRange("");
                  }
                }}
                className="sort-select"
              >
                <option value="all">Tất cả</option>
                <option value="price-low-high">Giá thấp đến cao</option>
                <option value="price-high-low">Giá cao đến thấp</option>
              </select>
            </div>

            <div className="products-grid">
              {danhSachDaLoc.map((sp) => (
                <TheSanPham key={sp.id} product={sp} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
