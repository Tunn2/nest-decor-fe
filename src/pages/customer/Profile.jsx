import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Profile.module.css";

const Profile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={styles.profileContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <img
            src="https://static.vecteezy.com/ti/vetor-gratis/p1/2608327-mobile-application-avatar-web-button-menu-digital-silhouette-style-icon-gratis-vetor.jpg"
            alt="avatar"
            className={styles.avatar}
          />
          <h4>{user?.fullName || "User Name"}</h4>
          <p>{user?.email || "user@example.com"}</p>
        </div>
        <ul className={styles.navList}>
          <li><span role="img" aria-label="overview">📄</span> Overview</li>
          <li><span role="img" aria-label="settings">⚙️</span> Settings</li>
          <li><span role="img" aria-label="security">🔒</span> Security</li>
          <li><span role="img" aria-label="orders">🧾</span> Orders</li>
          <li className={styles.logout} onClick={handleLogout}>
            <span role="img" aria-label="logout">🔓</span> Logout
          </li>
        </ul>
      </aside>

      <div className={styles.profileContent}>
        <div className={styles.profileCard}>
          <h2>User Details</h2>
          <div className={styles.profileInfo}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Username:</span>
              <span>{user?.userName || "-"}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Full Name:</span>
              <span>{user?.fullName || "-"}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Email:</span>
              <span>{user?.email || "-"}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Phone Number:</span>
              <span>{user?.phoneNumber || "-"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
