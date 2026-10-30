import styles from "./MyBookings.module.css";
import commonStyles from "@/styles/shared.module.css";
import RedButton from "@/components/SharedComponents/RedButton";
import { useNavigate } from "react-router-dom";
import { useBookings } from "@/features/bookings/queries";
import Table from "@/components/SharedComponents/Table";

const MyBookings = () => {
  const navigate = useNavigate();
  const { bookings } = useBookings();

  const bookingsForTable = bookings.map((booking) => {
    return {
      time: { start: booking.startTime, end: booking.endTime },
      laboratory: booking.labId, // надо сделать labName
      purpose: booking.purpose,
      access: booking.id,
      status: booking.status,
    };
  });

  return (
    <div className={styles.myBookingsContainer}>
      <header className={styles.myBookingsHeader}>
        <div className={styles.myBookingsHeaderTextContainer}>
          <h1 className={commonStyles.sectionHeaderText}>My bookings</h1>
          <p className={commonStyles.sectionHeaderSubText}>
            Upcoming bookings can be cancelled before they end
          </p>
        </div>
        <RedButton
          buttonText="New booking"
          onClickFunction={() => navigate("/laboratories")}
        />
      </header>
      <section className={styles.myExpSection}>
        {/* <p>{experiments.length} notes</p> */}
        <p>{}</p>
        <Table
          headRow={["TIME", "LABORATORY", "PURPOSE", "ACCESS", "STATUS"]}
          variant="bookings"
          body={bookings}
          // body={bookingsForTable}
        />
      </section>
    </div>
  );
};

export default MyBookings;
