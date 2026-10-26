import styles from "./MyBookings.module.css";
import { MoveUp } from "lucide-react";

const MyBookings = () => {
  return (
    <div className={styles.myBookingsContainer}>
      <header className={styles.myBookingsHeader}>
        <div className={styles.myBookingsHeaderTextContainer}>
          <h1 className={styles.myBookingsHeaderText}>My bookings</h1>
          <p className={styles.myBookingsHeaderSubtext}>
            Upcoming bookings can be cancelled before they end.
          </p>
        </div>
        <button
          type="button"
          className={styles.myBookingButton}
          // onClick={handleNewExperiment}
        >
          New experiment <MoveUp className={styles.arrow} />
        </button>
      </header>
    </div>
  );
};

export default MyBookings;
