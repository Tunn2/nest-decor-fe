"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import "./index.css";

// Icons
function Filter({ className = "", ...props }) {
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

function Star({ className = "", filled = false, ...props }) {
  return (
    <svg
      className={`star-icon ${
        filled ? "star-filled" : "star-empty"
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

function ChevronDown({ className = "", ...props }) {
  return (
    <svg
      className={`sort-icon ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <polyline points="6,9 12,15 18,9" />
    </svg>
  );
}

// Product Card Component
function ProductCard({ product }) {
  const renderStars = (rating, reviewCount) => {
    return (
      <div className="product-rating">
        <div className="rating-stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} filled={i < rating} />
          ))}
        </div>
        <span className="rating-count">({reviewCount})</span>
      </div>
    );
  };

  return (
    <Card className="product-card">
      <CardContent className="card-content" style={{ padding: 0 }}>
        <div className="product-image-container">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="product-image"
            />
          </Link>
          <Badge variant="new" className="product-badge">
            New
          </Badge>
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          {renderStars(product.rating, product.reviewCount)}
          <div className="product-footer">
            <span className="product-price">${product.price}</span>
            <Button size="sm">Add to Cart</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Main Shop Component
function Shop() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: "299",
      rating: 5,
      reviewCount: 5,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      price: "45",
      rating: 4,
      reviewCount: 4,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      price: "199",
      rating: 5,
      reviewCount: 5,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",
    },
    {
      id: 4,
      name: "Leather Wallet",
      price: "89",
      rating: 4,
      reviewCount: 4,
      image:
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=200&fit=crop",
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      price: "129",
      rating: 5,
      reviewCount: 8,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop",
    },
    {
      id: 6,
      name: "Running Shoes",
      price: "159",
      rating: 4,
      reviewCount: 12,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop",
    },
    {
      id: 7,
      name: "Coffee Mug Set",
      price: "35",
      rating: 5,
      reviewCount: 6,
      image:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=200&fit=crop",
    },
    {
      id: 8,
      name: "Laptop Stand",
      price: "79",
      rating: 4,
      reviewCount: 9,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop",
    },
    {
      id: 9,
      name: "Yoga Mat",
      price: "49",
      rating: 5,
      reviewCount: 15,
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop",
    },
  ];

  const categories = [
    { name: "Electronics", checked: false },
    { name: "Clothing", checked: false },
    { name: "Accessories", checked: false },
    { name: "Home", checked: false },
    { name: "Fitness", checked: false },
  ];

  const priceRanges = [
    { name: "Under $50", value: "under-50" },
    { name: "$50 - $100", value: "50-100" },
    { name: "$100 - $200", value: "100-200" },
    { name: "Over $200", value: "over-200" },
  ];

  const handleCategoryChange = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <div className="shop-container">
      <div className="shop-content">
        <div className="shop-layout">
          {/* Sidebar */}
          <div className="shop-sidebar">
            <div className="sidebar-header">
              <Filter />
              <h2 className="sidebar-title">Filters</h2>
            </div>

            {/* Categories */}
            <div className="filter-section">
              <h3 className="filter-title">Categories</h3>
              <div className="filter-options">
                {categories.map((category) => (
                  <label key={category.name} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.name)}
                      onChange={() => handleCategoryChange(category.name)}
                      className="filter-checkbox"
                    />
                    <span className="filter-label">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="filter-section">
              <h3 className="filter-title">Price Range</h3>
              <div className="filter-options">
                {priceRanges.map((range) => (
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

          {/* Main Content */}
          <div className="shop-main">
            {/* Header */}
            <div className="shop-header">
              <p className="results-count">Showing 9 of 9 products</p>
              <div className="sort-dropdown">
                <span className="sort-text">Sort by: Featured</span>
                <ChevronDown />
              </div>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
