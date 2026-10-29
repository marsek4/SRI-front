import styles from "./MyBookings.module.css";
import commonStyles from "@/styles/shared.module.css";
import { MoveUp } from "lucide-react";

const MyBookings = () => {
  return (
    <div className={styles.myBookingsContainer}>
      <header className={styles.myBookingsHeader}>
        <div className={styles.myBookingsHeaderTextContainer}>
          <h1 className={commonStyles.sectionHeaderText}>My bookings</h1>
          <p className={commonStyles.sectionHeaderSubText}>
            Upcoming bookings can be cancelled before they end
          </p>
        </div>
        <button type="button" className={commonStyles.redButtonWithArrow}>
          New booking <MoveUp className={commonStyles.redButtonArrow} />
        </button>
      </header>
    </div>
  );
};

export default MyBookings;
