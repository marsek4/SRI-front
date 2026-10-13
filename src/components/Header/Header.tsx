import styles from "./Header.module.css";
import { Bell, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const navItems = [
  { to: "/overview", label: "Overview" },
  { to: "/laboratories", label: "Laboratories" },
  { to: "/my-bookings", label: "My bookings" },
  { to: "/experiments", label: "Experiments" },
  { to: "/notifications", label: "Notifications" },
];

const Header = () => {
  const handleLoguot = () => {
    useAuthStore.getState().logout();
  };

  return (
    <>
      <div className={styles.headerContainer}>
        <span className={styles.header}>
          <span className={styles.headerLogo}>SRI</span>
          <div className={styles.headerTextContainer}>
            <div className={styles.headerText}>Lab Portal</div>
            <span className={styles.headerSubText}>
              Scientific Research Institute
            </span>
          </div>
        </span>
        <span className={styles.userHeaderPart}>
          <button className={styles.notificationButton}>
            <Bell
              width={16}
              height={16}
              strokeWidth={1}
              color="rgb(96, 93, 93)"
            />
          </button>

          <span className={styles.userSymbols}>АИ</span>

          <div className={styles.profileTextBlock}>
            <p className={styles.userNameText}>
              {useAuthStore.getState().user?.username}
            </p>
            <p className={styles.userRole}>
              {useAuthStore.getState().user?.role} ·{" "}
              <span className={styles.userLogin}>
                {useAuthStore.getState().user?.displayName}
              </span>
            </p>
          </div>

          <button className={styles.logoutButton} onClick={handleLoguot}>
            <LogOut
              width={18}
              height={18}
              strokeWidth={1}
              color="rgb(96, 93, 93)"
            />{" "}
            <span className={styles.logoutButtonText}>Logout</span>
          </button>
        </span>
      </div>
      <header>
        <nav className={styles.navbar}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${styles.navbarItem} ${isActive ? styles.navbarItemActive : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
    </>
  );
};

export default Header;
