import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.column}>
                <h3>DecoNest</h3>
                <h4>Về Chúng Tôi</h4>
                <p>
                    Tại DecoNest, chúng tôi giúp bạn tạo nên một không gian sống phản ánh phong cách cá nhân. Khám phá nội thất và đồ trang trí được tuyển chọn kỹ lưỡng, kết hợp giữa sự thoải mái, thẩm mỹ và chức năng.
                </p>
            </div>

            <div className={styles.column}>
                <h4>Chăm Sóc Khách Hàng</h4>
                <p>Câu hỏi thường gặp</p>
                <p>Giao hàng & Vận chuyển</p>
                <p>Đổi trả & Hoàn tiền</p>
                <p>Theo dõi đơn hàng</p>
                <p>Liên hệ hỗ trợ</p>
            </div>

            <div className={styles.column}>
                <h4>Kết Nối Với Chúng Tôi</h4>
                <p>Instagram</p>
                <p>Facebook</p>
                <p>Pinterest</p>
                <p>Youtube</p>
                <p>TikTok</p>
            </div>

            <div className={styles.column}>
                <h4>Liên Hệ</h4>
                <p>Bạn có câu hỏi hay cần hỗ trợ?</p>
                <p>Email: support@deconest.com</p>
                <p>Điện thoại: +1 800 123 456</p>
                <p>Thời gian làm việc: 9:00 - 18:00 (Thứ 2 - Thứ 7)</p>
            </div>
        </footer>
    );
};

export default Footer;
