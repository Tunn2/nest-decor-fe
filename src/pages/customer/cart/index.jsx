"use client";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotal,
  selectCartQuantity,
  removeFromCart,
  updateQuantity,
} from "../../../redux/features/cartSlice";
import "./index.css";

const formatPriceVND = (price) => {
  return price?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫";
};

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotal);
  const totalQuantity = useSelector(selectCartQuantity);

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

            <div className="summary-divider"></div>

            <div className="cart-total">
              <span className="total-label">Tổng thanh toán</span>
              <span className="total-amount">
                {formatPriceVND(totalAmount)}
              </span>
            </div>

            <div className="checkout-actions">
              <button className="checkout-btn">
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
