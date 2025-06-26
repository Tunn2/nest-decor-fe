"use client";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  selectCartItems,
  selectCartTotal,
  selectCartQuantity,
  removeFromCart,
  updateQuantity,
  updateCustomDimensions,
} from "../../../redux/features/cartSlice";
import "./index.css";
import axios from "axios";
const formatPriceVND = (price) => {
  return price?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫";
};

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotal);
  const totalQuantity = useSelector(selectCartQuantity);
  const user = JSON.parse(localStorage.getItem("user"));

  // State for managing which items have expanded dimension controls
  const [expandedItems, setExpandedItems] = useState(new Set());

  // State for shipping details
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
  });

  const [shippingErrors, setShippingErrors] = useState({});

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleUpdateDimensions = (id, dimensions) => {
    dispatch(updateCustomDimensions({ id, dimensions }));
  };

  const toggleDimensionControls = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const resetDimensions = (item) => {
    const defaultDimensions = {
      customHeight: item.defaultDimensions?.height || 0,
      customWidth: item.defaultDimensions?.width || 0,
      customLength: item.defaultDimensions?.length || 0,
    };
    handleUpdateDimensions(item.id, defaultDimensions);
  };

  const validateShippingDetails = () => {
    const errors = {};

    if (!shippingDetails.fullName.trim()) {
      errors.fullName = "Họ tên là bắt buộc";
    }

    if (!shippingDetails.address.trim()) {
      errors.address = "Địa chỉ là bắt buộc";
    }

    if (!shippingDetails.city.trim()) {
      errors.city = "Thành phố là bắt buộc";
    }

    if (!shippingDetails.postalCode.trim()) {
      errors.postalCode = "Mã bưu điện là bắt buộc";
    }

    if (!shippingDetails.phoneNumber.trim()) {
      errors.phoneNumber = "Số điện thoại là bắt buộc";
    } else if (!/^[0-9+\-\s()]+$/.test(shippingDetails.phoneNumber)) {
      errors.phoneNumber = "Số điện thoại không hợp lệ";
    }

    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleShippingChange = (field, value) => {
    setShippingDetails((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (shippingErrors[field]) {
      setShippingErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleCheckout = async () => {
    if (!validateShippingDetails()) {
      alert("Vui lòng điền đầy đủ thông tin giao hàng!");
      return;
    }

    const checkoutData = {
      userId: user.id,
      orderItems: cartItems.map((item) => ({
        furnitureId: item.id,
        quantity: item.quantity,
        customHeight: item.customHeight || item.defaultDimensions?.height || 0,
        customWidth: item.customWidth || item.defaultDimensions?.width || 0,
        customLength: item.customLength || item.defaultDimensions?.length || 0,
      })),
      shippingDetail: shippingDetails,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/Orders`,
        checkoutData
      );
      const paymentLink = res.data.paymentUrl;

      window.location.href = paymentLink;

      console.log(res);
    } catch (error) {
      console.log(error);
    }

    // Navigate to success page instead of showing alert
    // navigate("/checkout-success");
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <div className="empty-icon">
            <svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M9 19C7.9 19 7 19.9 7 21S7.9 23 9 23 11 22.1 11 21 10.1 19 9 19ZM20 19C18.9 19 18 19.9 18 21S18.9 23 20 23 22 22.1 22 21 21.1 19 20 19Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2>Giỏ hàng trống</h2>
          <p>Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!</p>
          <Link to="/shop" className="continue-shopping-empty">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 7H16V6C16 3.8 14.2 2 12 2S8 3.8 8 6V7H5C3.9 7 3 7.9 3 9V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9C21 7.9 20.1 7 19 7ZM10 6C10 4.9 10.9 4 12 4S14 4.9 14 6V7H10V6Z"
                fill="currentColor"
              />
            </svg>
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <div className="cart-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <span>Giỏ hàng</span>
        </div>
        <h1>Giỏ hàng của bạn</h1>
        <div className="cart-stats">
          <span className="cart-count">{totalQuantity} sản phẩm</span>
          <span className="cart-total-preview">
            {formatPriceVND(totalAmount)}
          </span>
        </div>
      </div>

      <div className="cart-content">
        <div className="cart-items-section">
          <div className="cart-items-header">
            <h2>Sản phẩm đã chọn</h2>
            <button
              className="clear-cart-btn"
              onClick={() =>
                cartItems.forEach((item) => handleRemoveItem(item.id))
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 6H5H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 6V4C8 3.4 8.4 3 9 3H15C15.6 3 16 3.4 16 4V6M19 6V20C19 20.6 18.6 21 18 21H6C5.4 21 5 20.6 5 20V6H19Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Xóa tất cả
            </button>
          </div>

          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className="cart-item"
                style={{ "--delay": `${index * 0.1}s` }}
              >
                <div className="cart-item-image-wrapper">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="cart-item-image"
                    loading="lazy"
                  />
                  <div className="item-badge">{item.quantity}</div>
                </div>

                <div className="cart-item-details">
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <div className="cart-item-meta">
                      <span className="cart-item-price">
                        {formatPriceVND(item.price)}
                      </span>
                      <span className="price-per-unit">/ sản phẩm</span>
                    </div>

                    {/* Current Dimensions Display */}
                    <div className="current-dimensions">
                      <span className="dimensions-label">
                        Kích thước hiện tại:
                      </span>
                      <span className="dimensions-value">
                        {item.customHeight ||
                          item.defaultDimensions?.height ||
                          0}{" "}
                        ×{" "}
                        {item.customWidth || item.defaultDimensions?.width || 0}{" "}
                        ×{" "}
                        {item.customLength ||
                          item.defaultDimensions?.length ||
                          0}{" "}
                        cm
                      </span>
                    </div>

                    {/* Dimension Controls Toggle */}
                    <button
                      className="dimension-toggle-btn"
                      onClick={() => toggleDimensionControls(item.id)}
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21.3 8.7l-6-6c-.4-.4-1-.4-1.4 0l-10 10c-.4.4-.4 1 0 1.4l6 6c.4.4 1 .4 1.4 0l10-10c.4-.4.4-1 0-1.4z" />
                        <path d="m7 17 5-5" />
                        <path d="m12 12 5-5" />
                        <path d="m17 7 2-2" />
                      </svg>
                      <span>Tùy chỉnh kích thước</span>
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        className={expandedItems.has(item.id) ? "rotated" : ""}
                      >
                        <polyline points="6,9 12,15 18,9" />
                      </svg>
                    </button>

                    {/* Expandable Dimension Controls */}
                    {expandedItems.has(item.id) && (
                      <div className="dimension-controls">
                        <div className="dimension-controls-header">
                          <h4>Tùy chỉnh kích thước</h4>
                          <button
                            className="reset-dimensions-btn"
                            onClick={() => resetDimensions(item)}
                          >
                            Đặt lại mặc định
                          </button>
                        </div>

                        <div className="dimension-inputs">
                          <div className="dimension-field">
                            <label>Chiều cao</label>
                            <div className="dimension-input-wrapper">
                              <input
                                type="number"
                                value={item.customHeight || ""}
                                placeholder={
                                  item.defaultDimensions?.height?.toString() ||
                                  "0"
                                }
                                onChange={(e) =>
                                  handleUpdateDimensions(item.id, {
                                    ...item,
                                    customHeight:
                                      Number.parseFloat(e.target.value) || 0,
                                  })
                                }
                                min="0.1"
                                step="0.1"
                              />
                              <span className="dimension-unit">cm</span>
                            </div>
                          </div>

                          <div className="dimension-field">
                            <label>Chiều rộng</label>
                            <div className="dimension-input-wrapper">
                              <input
                                type="number"
                                value={item.customWidth || ""}
                                placeholder={
                                  item.defaultDimensions?.width?.toString() ||
                                  "0"
                                }
                                onChange={(e) =>
                                  handleUpdateDimensions(item.id, {
                                    ...item,
                                    customWidth:
                                      Number.parseFloat(e.target.value) || 0,
                                  })
                                }
                                min="0.1"
                                step="0.1"
                              />
                              <span className="dimension-unit">cm</span>
                            </div>
                          </div>

                          <div className="dimension-field">
                            <label>Chiều dài</label>
                            <div className="dimension-input-wrapper">
                              <input
                                type="number"
                                value={item.customLength || ""}
                                placeholder={
                                  item.defaultDimensions?.length?.toString() ||
                                  "0"
                                }
                                onChange={(e) =>
                                  handleUpdateDimensions(item.id, {
                                    ...item,
                                    customLength:
                                      Number.parseFloat(e.target.value) || 0,
                                  })
                                }
                                min="0.1"
                                step="0.1"
                              />
                              <span className="dimension-unit">cm</span>
                            </div>
                          </div>
                        </div>

                        <div className="dimension-note">
                          * Để trống để sử dụng kích thước mặc định
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn quantity-decrease"
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 12H19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        className="quantity-btn quantity-increase"
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 5V19M5 12H19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                      title="Xóa sản phẩm"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 6L6 18M6 6L18 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="cart-item-total">
                  <span className="total-label">Thành tiền</span>
                  <span className="total-amount">
                    {formatPriceVND(item.totalPrice)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-summary">
          <div className="summary-header">
            <h3>Tóm tắt đơn hàng</h3>
            <div className="summary-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 11H15M9 15H15M17 21H7C5.9 21 5 20.1 5 19V5C5 3.9 5.9 3 7 3H12.6C13.1 3 13.6 3.2 13.9 3.5L18.4 8C18.8 8.4 19 8.9 19 9.4V19C19 20.1 18.1 21 17 21Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="summary-content">
            <div className="summary-row">
              <span className="summary-label">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 11V7C16 4.8 14.2 3 12 3S8 4.8 8 7V11C6.9 11 6 11.9 6 13V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V13C18 11.9 17.1 11 16 11Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Tổng số sản phẩm
              </span>
              <span className="summary-value">{totalQuantity}</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2V22M17 5H9.5C8.1 5 7 6.1 7 7.5S8.1 10 9.5 10H14.5C15.9 10 17 11.1 17 12.5S15.9 15 14.5 15H7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Tổng tiền hàng
              </span>
              <span className="summary-value">
                {formatPriceVND(totalAmount)}
              </span>
            </div>

            <div className="summary-row">
              <span className="summary-label">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5 7 1 12 1S21 5 21 10Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Phí vận chuyển
              </span>
              <span className="summary-value free-shipping">Miễn phí</span>
            </div>

            {/* Shipping Details Form */}
            <div className="shipping-details-section">
              <h4 className="shipping-title">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5 7 1 12 1S21 5 21 10Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Thông tin giao hàng
              </h4>

              <div className="shipping-form">
                <div className="form-group">
                  <label className="form-label">Họ và tên *</label>
                  <input
                    type="text"
                    className={`form-input ${
                      shippingErrors.fullName ? "error" : ""
                    }`}
                    placeholder="Nhập họ và tên"
                    value={shippingDetails.fullName}
                    onChange={(e) =>
                      handleShippingChange("fullName", e.target.value)
                    }
                  />
                  {shippingErrors.fullName && (
                    <span className="error-message">
                      {shippingErrors.fullName}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Địa chỉ *</label>
                  <input
                    type="text"
                    className={`form-input ${
                      shippingErrors.address ? "error" : ""
                    }`}
                    placeholder="Nhập địa chỉ chi tiết"
                    value={shippingDetails.address}
                    onChange={(e) =>
                      handleShippingChange("address", e.target.value)
                    }
                  />
                  {shippingErrors.address && (
                    <span className="error-message">
                      {shippingErrors.address}
                    </span>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Thành phố *</label>
                    <input
                      type="text"
                      className={`form-input ${
                        shippingErrors.city ? "error" : ""
                      }`}
                      placeholder="Thành phố"
                      value={shippingDetails.city}
                      onChange={(e) =>
                        handleShippingChange("city", e.target.value)
                      }
                    />
                    {shippingErrors.city && (
                      <span className="error-message">
                        {shippingErrors.city}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Mã bưu điện *</label>
                    <input
                      type="text"
                      className={`form-input ${
                        shippingErrors.postalCode ? "error" : ""
                      }`}
                      placeholder="Mã bưu điện"
                      value={shippingDetails.postalCode}
                      onChange={(e) =>
                        handleShippingChange("postalCode", e.target.value)
                      }
                    />
                    {shippingErrors.postalCode && (
                      <span className="error-message">
                        {shippingErrors.postalCode}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Số điện thoại *</label>
                  <input
                    type="tel"
                    className={`form-input ${
                      shippingErrors.phoneNumber ? "error" : ""
                    }`}
                    placeholder="Nhập số điện thoại"
                    value={shippingDetails.phoneNumber}
                    onChange={(e) =>
                      handleShippingChange("phoneNumber", e.target.value)
                    }
                  />
                  {shippingErrors.phoneNumber && (
                    <span className="error-message">
                      {shippingErrors.phoneNumber}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="summary-divider"></div>

            <div className="cart-total">
              <span className="total-label">Tổng thanh toán</span>
              <span className="total-amount">
                {formatPriceVND(totalAmount)}
              </span>
            </div>

            <div className="checkout-actions">
              <button className="checkout-btn" onClick={handleCheckout}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9 16.9 21 12 21S3 16.9 3 12 7.1 3 12 3 21 7.1 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Thanh toán ngay
              </button>

              <Link to="/shop" className="continue-shopping">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 12H5M12 19L5 12L12 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>

          <div className="security-badge">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22S8 18 8 13V7L12 5L16 7V13C16 18 12 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 12L11 14L15 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Thanh toán an toàn & bảo mật</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
