"use client";

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import "./index.css";

// Icons
function Star({ className = "", filled = false, ...props }) {
  return (
    <svg
      className={`star-detail ${
        filled ? "star-filled-detail" : "star-empty-detail"
      } ${className}`}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

function Heart({ className = "", ...props }) {
  return (
    <svg
      className={`heart-icon ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function ArrowLeft({ className = "", ...props }) {
  return (
    <svg
      className={`back-icon ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12,19 5,12 12,5" />
    </svg>
  );
}

function Minus({ className = "", ...props }) {
  return (
    <svg
      className={`icon-sm ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function Plus({ className = "", ...props }) {
  return (
    <svg
      className={`icon-sm ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// Product Card Component for Related Products
function ProductCard({ product, isSmall = false }) {
  const renderStars = (rating, reviewCount) => {
    return (
      <div className="related-product-rating">
        <div className="rating-stars-detail">
          {[...Array(5)].map((_, i) => (
            <Star key={i} filled={i < rating} />
          ))}
        </div>
        {!isSmall && (
          <span className="rating-count-detail">({reviewCount})</span>
        )}
      </div>
    );
  };

  return (
    <Card className="related-product-card">
      <CardContent style={{ padding: 0 }}>
        <div className="product-image-container">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="product-image"
            />
          </Link>
          {!isSmall && (
            <Badge variant="new" className="product-badge">
              New
            </Badge>
          )}
        </div>
        <div className="related-product-info">
          <h3 className="related-product-name">{product.name}</h3>
          {renderStars(product.rating, product.reviewCount)}
          <div className="related-product-footer">
            <span className="related-product-price">${product.price}</span>
            {!isSmall && <Button size="sm">Add to Cart</Button>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  // Mock product data - in real app, fetch by ID
  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: "299",
      rating: 5,
      reviewCount: 5,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
      category: "Electronics",
      sku: "WH-001",
      tags: ["wireless", "premium", "audio"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et volutpat libero enim donec adipiscing nibh. Consectetur in ac elementum aliquam imperdiet tellus.",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=400&fit=crop",
      ],
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      price: "45",
      rating: 4,
      reviewCount: 4,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop",
      category: "Clothing",
      sku: "TS-002",
      tags: ["organic", "cotton", "casual"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et volutpat libero enim donec adipiscing nibh. Consectetur in ac elementum aliquam imperdiet tellus.",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=400&fit=crop",
      ],
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      price: "199",
      rating: 5,
      reviewCount: 5,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop",
      category: "Electronics",
      sku: "SW-003",
      tags: ["smart", "fitness", "watch"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et volutpat libero enim donec adipiscing nibh. Consectetur in ac elementum aliquam imperdiet tellus.",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&h=400&fit=crop",
      ],
    },
    {
      id: 4,
      name: "Leather Wallet",
      price: "89",
      rating: 4,
      reviewCount: 4,
      image:
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=400&fit=crop",
      category: "Accessories",
      sku: "LW-004",
      tags: ["leather", "wallet", "premium"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et volutpat libero enim donec adipiscing nibh. Consectetur in ac elementum aliquam imperdiet tellus.",
      images: [
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1506629905607-d9c36e0a3f90?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=600&h=400&fit=crop",
      ],
    },
  ];

  const relatedProducts = [
    {
      id: 5,
      name: "Modern sofa",
      price: "95",
      rating: 5,
      reviewCount: 8,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
    },
    {
      id: 6,
      name: "Modern sofa",
      price: "120",
      rating: 4,
      reviewCount: 12,
      image:
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300&h=200&fit=crop",
    },
    {
      id: 7,
      name: "Modern sofa",
      price: "85",
      rating: 5,
      reviewCount: 6,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop",
    },
    {
      id: 8,
      name: "Modern sofa",
      price: "110",
      rating: 4,
      reviewCount: 9,
      image:
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300&h=200&fit=crop",
    },
  ];

  const product =
    products.find((p) => p.id === Number.parseInt(id)) || products[0];

  const renderStars = (rating, reviewCount) => {
    return (
      <div className="product-rating-detail">
        <div className="rating-stars-detail">
          {[...Array(5)].map((_, i) => (
            <Star key={i} filled={i < rating} />
          ))}
        </div>
        <span className="rating-count-detail">({reviewCount})</span>
      </div>
    );
  };

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-content">
        {/* Back Button */}
        <Link to="/" className="back-button">
          <ArrowLeft />
          Back to Shop
        </Link>

        <div className="product-layout">
          {/* Product Images */}
          <div className="image-gallery">
            {/* Thumbnail Images */}
            <div className="thumbnail-list">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`thumbnail-button ${
                    selectedImage === index
                      ? "thumbnail-active"
                      : "thumbnail-inactive"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Product ${index + 1}`}
                    className="thumbnail-image"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="main-image-container">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="main-image"
              />
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="product-title">{product.name}</h1>

            {renderStars(product.rating, product.reviewCount)}

            <div className="price-container">
              <span className="price-currency">$</span>
              <span className="price-amount">{product.price}.00</span>
            </div>

            <p className="product-description">{product.description}</p>

            {/* Quantity and Add to Cart */}
            <div className="quantity-cart-container">
              <div className="quantity-selector">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="quantity-button"
                >
                  <Minus />
                </button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(1, Number.parseInt(e.target.value) || 1)
                    )
                  }
                  className="quantity-input"
                  min="1"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="quantity-button"
                >
                  <Plus />
                </button>
              </div>
              <button className="add-to-cart-button">Add to cart</button>
            </div>

            {/* Add to Wishlist */}
            <button className="wishlist-button">
              <Heart />
              Add to wishlist
            </button>

            {/* Product Meta */}
            <div className="product-meta">
              <div>
                <span className="meta-label">Sku: </span>
                <span className="meta-value">{product.sku}</span>
              </div>
              <div>
                <span className="meta-label">Category: </span>
                <span className="meta-value">{product.category}</span>
              </div>
              <div>
                <span className="meta-label">Tag: </span>
                <span className="meta-value">{product.tags.join(", ")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="product-tabs">
          <div className="tabs-nav">
            <nav className="tabs-list">
              {["description", "additional", "preview"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-button ${
                    activeTab === tab ? "tab-active" : "tab-inactive"
                  }`}
                >
                  {tab === "additional"
                    ? "Additional information"
                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="tab-content">
            {activeTab === "description" && <p>{product.description}</p>}
            {activeTab === "additional" && (
              <div>
                <p>Additional product information would go here.</p>
              </div>
            )}
            {activeTab === "preview" && (
              <div>
                <p>Product preview content would go here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products">
          <h2 className="related-title">Related products</h2>
          <div className="related-grid">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} isSmall={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
