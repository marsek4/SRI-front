import styles from "./Header.module.css";
import commonStyles from "@/styles/shared.module.css";
import { Bell, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useNotifications } from "@/features/notifications/queries";

const navItems = [
  { to: "/overview", label: "Overview" },
  { to: "/laboratories", label: "Laboratories" },
  { to: "/my-bookings", label: "My bookings" },
  { to: "/experiments", label: "Experiments" },
  { to: "/notifications", label: "Notifications" },
];

const Header = () => {
  const { notifications } = useNotifications();

  let unreadNotifications = notifications.filter(
    (notifications) => notifications.read === false,
  );

  const createInitials = () => {
    const name = useAuthStore.getState().user?.username;
    if (!name) return "";

    const parts = name.split(" ").filter(Boolean);

    if (parts.length === 2) {
      return parts
        .map((w) => w[0])
        .join("")
        .toUpperCase();
    }

    return parts[0]?.[0]?.toUpperCase() ?? "";
  };

  const handleLoguot = () => {
    useAuthStore.getState().logout();
  };

  return (
    <>
      <div className={styles.headerContainer}>
        <span className={styles.header}>
          <span className={styles.headerLogo}>SRI</span>
          <div className={styles.headerTextContainer}>
            <div className={commonStyles.boldGolosText}>Lab portal</div>
            <span className={commonStyles.smallThinText}>
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

          <span className={styles.userSymbols}>{createInitials()}</span>

          <div className={styles.profileTextBlock}>
            <p className={commonStyles.boldGolosText}>
              {useAuthStore.getState().user?.username}
            </p>
            <p className={commonStyles.smallThinText}>
              {useAuthStore.getState().user?.role} ·{" "}
              <span className={commonStyles.smallThinTextMono}>
                {useAuthStore.getState().user?.displayName}
              </span>
            </p>
          </div>

          <button className={styles.logoutButton} onClick={handleLoguot}>
            <LogOut
              width={18}
              height={18}
              strokeWidth={1}
              color="var(--color-grey)"
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
              {item.label === "Notifications" &&
                unreadNotifications.length > 0 && (
                  <div className={styles.unreadNotificationsAmount}>
                    {unreadNotifications.length}
                  </div>
                )}
            </NavLink>
          ))}
        </nav>
      </header>
    </>
  );
};

export default Header;
