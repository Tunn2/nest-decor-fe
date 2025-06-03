import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../redux/features/authSlice";
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
          <li>
            <NavLink to="/profile" end>📄 Overview</NavLink>
          </li>
          <li>
            <NavLink to="/profile/settings">⚙️ Settings</NavLink>
          </li>
          <li>
            <NavLink to="/profile/security">🔒 Security</NavLink>
          </li>
          <li>
            <NavLink to="/profile/orders">🧾 Orders</NavLink>
          </li>
          <li className={styles.logout} onClick={handleLogout}>
            🔓 Logout
          </li>
        </ul>
      </aside>

      <div className={styles.profileContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
