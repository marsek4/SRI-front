import styles from "./Overview.module.css";
import commonStyles from "@/styles/shared.module.css";
import { useNotifications } from "@/features/notifications/queries";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useNotificationRead } from "@/features/notifications/mutations";
import { useExperiments } from "@/features/experiments/queries";
import { formatDateTime, formatDate, formatTime } from "@/utils/utils";
import RedButton from "@/components/SharedComponents/RedButton";
import { useBookings } from "@/features/bookings/queries";

const Overview = () => {
  const markRead = useNotificationRead();
  const experiments = useExperiments();
  const { notifications, isLoading, isError, error } = useNotifications();
  const { bookings } = useBookings();

  const navigate = useNavigate();

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
          <h1 className={commonStyles.sectionHeaderText}>
            Welcome, {useAuthStore.getState().user?.username}
          </h1>
        </div>
        <div className={styles.overviewButtonMenu}>
          <button
            className={commonStyles.transparentButton}
            onClick={() => navigate("/experiments/new-experiment")}
          >
            New experiment
          </button>
          <RedButton
            buttonText="Book a laboratory"
            onClickFunction={() => navigate("/laboratories")}
          />
        </div>
      </section>
      <section className={styles.infoSectionContainer}>
        <section className={styles.infoSection}>
          <header className={styles.infoSectionHeader}>
            <h2 className={commonStyles.smallHeaderText}>Nearest bookings</h2>
            <p
              className={styles.infoSectionLink}
              onClick={() => navigate("/my-bookings")}
            >
              All bookings
            </p>
          </header>
          {bookings.map((booking) => (
            <div className={styles.bookingContainer}>
              <div className={styles.bookingTextContainer}>
                <p className={styles.bookingUpperText}>
                  {formatDate(booking.startTime)}
                </p>
                <p className={styles.bookingBottomTextTime}>
                  {`${formatTime(booking.startTime)}-${formatTime(booking.endTime)}`}
                </p>
              </div>
              <div className={styles.bookingTextContainer}>
                <p className={styles.bookingUpperText}>{booking.labId}</p>
                <p className={styles.bookingBottomText}>{booking.purpose}</p>
              </div>
            </div>
          ))}
        </section>
        <section className={styles.infoSection}>
          <header className={styles.infoSectionHeader}>
            <h2 className={commonStyles.smallHeaderText}>My experiments</h2>
            <p
              className={styles.infoSectionLink}
              onClick={() => navigate("/experiments")}
            >
              All experiments
            </p>
          </header>
          {experiments.experiments.map((exp) => (
            <div key={exp.id} className={styles.experimentContainer}>
              <div className={styles.experimentTitle}>{exp.title}</div>
              <div
                className={`${exp.status === "EXPERIMENT_STATUS_PLANNED" ? styles.experimentStatusPlanned : ""}`}
              >
                {exp.status === "EXPERIMENT_STATUS_PLANNED"
                  ? "PLANNED"
                  : "other status"}
              </div>
              <div className={styles.experimentBottomTextContainer}>
                <p className={styles.experimentText}>
                  {exp.labId} · {exp.createdAt}
                </p>
                {/* <p className={styles.experimentDate}>{exp.createdAt}</p> */}
              </div>
            </div>
          ))}
        </section>
        <section className={styles.infoSection}>
          <header className={styles.infoSectionHeader}>
            <h2 className={commonStyles.smallHeaderText}>
              Unread notifications
            </h2>
            <p
              className={styles.infoSectionLink}
              onClick={() => navigate("/notifications")}
            >
              All notifications
            </p>
          </header>
          {unreadNotifications.map((notification) => (
            <div key={notification.id} className={styles.unreadNotification}>
              <div className={styles.redBlock}></div>
              <div className={styles.textContainer}>
                <p className={styles.reminderDescription}>
                  {formatDateTime(notification.remindAt)}
                </p>
                <p className={styles.reminderTitle}>{notification.title}</p>
                <button
                  className={styles.reminderButton}
                  onClick={() => handleNotificationRead(notification.id)}
                >
                  Mark as read
                </button>
              </div>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
};

export default Overview;
