import { MoveUp } from "lucide-react";
import styles from "./Overview.module.css";
// import { useNotifications } from "@/hooks/useNotifications";
import { useNotifications } from "@/features/notifications/queries";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useNotificationRead } from "@/features/notifications/mutations";

const Overview = () => {
  const markRead = useNotificationRead();

  const navigate = useNavigate();

  const { notifications, isLoading, isError, error } = useNotifications();

  const unreadNotifications = notifications.filter(
    (notification) => notification.read === false,
  );

  const handleNotificationRead = (id: string) => {
    markRead.mutate(id);
  };

  return (
    <div className={styles.overviewContainer}>
      <section className={styles.overviewHeader}>
        <div>
          <p className={styles.overviewDateText}>Tuesday, 13 of October</p>
          <h1 className={styles.overviewWelcomeText}>
            Welcome, {useAuthStore.getState().user?.username}
          </h1>
        </div>
        <div className={styles.overviewButtonMenu}>
          <button className={styles.newExpButton}>New experiment</button>
          <button className={styles.bookingButton}>
            Book a laboratory <MoveUp className={styles.moveUp} />
          </button>
        </div>
      </section>
      <section className={styles.infoSectionContainer}>
        <section className={styles.infoSection}>
          <header className={styles.infoSectionHeader}>
            <h2 className={styles.infoSectionTitle}>Nearest bookings</h2>
            <p className={styles.infoSectionLink}>All bookings</p>
          </header>
        </section>
        <section className={styles.infoSection}>
          <header className={styles.infoSectionHeader}>
            <h2 className={styles.infoSectionTitle}>My experiments</h2>
            <p className={styles.infoSectionLink}>All experiments</p>
          </header>
        </section>
        <section className={styles.infoSection}>
          <header className={styles.infoSectionHeader}>
            <h2 className={styles.infoSectionTitle}>Unread notifications</h2>
            <p
              className={styles.infoSectionLink}
              onClick={() => navigate("/notifications")}
            >
              All notifications
            </p>
          </header>
          {unreadNotifications.map((notification) => (
            <div key={notification.id} className={styles.unreadNotification}>
              <p className={styles.reminderDescription}>
                {notification.remindAt}
              </p>
              <p className={styles.reminderTitle}>{notification.title}</p>
              <button
                className={styles.reminderButton}
                onClick={() => handleNotificationRead(notification.id)}
              >
                Mark as read
              </button>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
};

export default Overview;
