/* eslint-disable no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  selectCartQuantity,
  clearCart,
} from "../../../redux/features/cartSlice";
import "./index.css";

const formatPriceVND = (price) => {
  return price?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫";
};

function CheckoutSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotal);
  const totalQuantity = useSelector(selectCartQuantity);

  const [countdown, setCountdown] = useState(5);
  const [orderNumber] = useState(
    () => `ORD-${Date.now().toString().slice(-8)}`
  );

  useEffect(() => {
    // Clear cart after successful checkout
    dispatch(clearCart());

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, dispatch]);

  const handleRedirectNow = () => {
    navigate("/");
  };

  return (
    <div className="checkout-success-container">
      <div className="success-content">
        {/* Success Icon and Message */}
        <div className="success-header">
          <div className="success-icon">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M9 12l2 2 4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="success-title">Đặt hàng thành công!</h1>
          <p className="success-subtitle">
            Cảm ơn bạn đã tin tưởng và mua sắm tại cửa hàng của chúng tôi
          </p>
        </div>

        {/* Order Details */}
        <div className="order-details">
          <div className="order-info-card">
            <div className="order-header">
              <h2>Thông tin đơn hàng</h2>
              <span className="order-number">#{orderNumber}</span>
            </div>

            <div className="order-summary">
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

              <div className="total-row">
                <span className="total-label">Tổng thanh toán</span>
                <span className="total-amount">
                  {formatPriceVND(totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="next-steps-card">
            <h3>Bước tiếp theo</h3>
            <div className="steps-list">
              <div className="step-item">
                <div className="step-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 8L12 13L21 8M3 8L12 3L21 8M3 8V16L12 21L21 16V8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="step-content">
                  <h4>Xác nhận đơn hàng</h4>
                  <p>
                    Chúng tôi sẽ gửi email xác nhận đơn hàng trong vòng 15 phút
                  </p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 21V5C16 4.4 15.6 4 15 4H9C8.4 4 8 4.4 8 5V21L12 18L16 21Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="step-content">
                  <h4>Chuẩn bị hàng</h4>
                  <p>
                    Đơn hàng sẽ được chuẩn bị và đóng gói trong 1-2 ngày làm
                    việc
                  </p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 3H5L7 11H17L19 3H8M7 11L5 3H1M7 11L9 13H15L17 11M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="step-content">
                  <h4>Giao hàng</h4>
                  <p>
                    Hàng sẽ được giao đến địa chỉ của bạn trong 3-5 ngày làm
                    việc
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Redirect Section */}
        <div className="redirect-section">
          <div className="countdown-display">
            <div className="countdown-circle">
              <span className="countdown-number">{countdown}</span>
            </div>
            <p className="countdown-text">
              Tự động chuyển về trang chủ sau <strong>{countdown}</strong> giây
            </p>
          </div>

          <div className="action-buttons">
            <button
              className="redirect-btn primary"
              onClick={handleRedirectNow}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9L12 2L21 9V20C21 20.6 20.6 21 20 21H4C3.4 21 3 20.6 3 20V9Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="9,22 9,12 15,12 15,22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Về trang chủ ngay
            </button>

            <Link to="/shop" className="redirect-btn secondary">
              <svg
                width="18"
                height="18"
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

        {/* Contact Support */}
        <div className="support-section">
          <div className="support-card">
            <div className="support-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 15C21 15.5 20.8 16 20.5 16.4L18.9 18C18.5 18.4 18 18.6 17.5 18.6C16.1 18.6 14.8 18.2 13.7 17.6C12.6 17 11.6 16.1 10.8 15.3C10 14.5 9.1 13.5 8.5 12.4C7.9 11.3 7.5 10 7.5 8.6C7.5 8.1 7.7 7.6 8.1 7.2L9.7 5.6C10.1 5.2 10.6 5 11.1 5C11.4 5 11.7 5.1 11.9 5.3L14.1 7.5C14.3 7.7 14.4 8 14.4 8.3C14.4 8.6 14.3 8.9 14.1 9.1L13.2 10C13.1 10.1 13.1 10.2 13.1 10.3C13.1 10.5 13.2 10.6 13.3 10.7C13.9 11.6 14.7 12.4 15.6 13C15.7 13.1 15.8 13.2 16 13.2C16.1 13.2 16.2 13.2 16.3 13.1L17.2 12.2C17.4 12 17.7 11.9 18 11.9C18.3 11.9 18.6 12 18.8 12.2L21 14.4C21.2 14.6 21.3 14.9 21.3 15.2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="support-content">
              <h4>Cần hỗ trợ?</h4>
              <p>
                Liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi nào về đơn hàng
              </p>
              <div className="support-contacts">
                <span>📞 1900-1234</span>
                <span>📧 support@shop.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccess;
