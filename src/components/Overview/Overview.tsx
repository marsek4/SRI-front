import { MoveUp } from "lucide-react";
import styles from "./Overview.module.css";
import { useNotifications } from "@/hooks/useNotifications";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";

const Overview = () => {
  const qc = useQueryClient();

  const navigate = useNavigate();

  const { notifications, isLoading, isError, error } = useNotifications();

  const unreadNotifications = notifications.filter(
    (notification) => notification.read === false,
  );

  const mutationNotificationsRead = useMutation({
    mutationFn: async (id: string) => {
      const token = useAuthStore.getState().accessToken;
      const res = await fetch(`/api/v1/notifications/${id}:read`, {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      if (!res.ok) {
        console.log("Ошибка при прочтении напоминания");
        return;
      }

      console.log("Успешное прочтение напоминания");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const handleNotificationRead = (id: string) => {
    mutationNotificationsRead.mutate(id);
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
              {/* <span></span> */}
              {/* <div> */}
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
              {/* </div> */}
            </div>
          ))}
        </section>
      </section>
    </div>
  );
};

export default Overview;
