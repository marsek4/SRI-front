import { useState, useEffect } from "react";
import styles from "./Notifications.module.css";
import { MoveUp } from "lucide-react";

type NotificationType = "all" | "unread";

const Notifications = () => {
  // const

  const [notificationFilter, setNotificationFilter] =
    useState<NotificationType>("all");
  const [title, setTitle] = useState<string>("");
  const [notificationText, setNotificationText] = useState<string>("");
  const [date, setDate] = useState<string>();

  const handleSubmit = () => {
    console.log(123);
  };

  return (
    <div className={styles.notificationsContainer}>
      <header>
        <h1 className={styles.notificationsHeaders}>Notifications</h1>
        <p className={styles.notificationsDescription}>
          {" "}
          System messages, booking and experiment events, personal reminders.
        </p>
      </header>
      <div className={styles.notificationsPanel}>
        <section className={styles.currentNotifications}>
          <div className={styles.currentNotificationsHeader}>
            <span
              className={styles.notificationFilterOption}
              onClick={() => setNotificationFilter("all")}
            >
              All
            </span>
            <span
              className={styles.notificationFilterOption}
              onClick={() => setNotificationFilter("unread")}
            >
              Unread
            </span>
          </div>
          <div> DIV FOR NOTIFICATIONS</div>
        </section>
        <section className={styles.newNotifications}>
          <h2 className={styles.newNotificationsHeader}>New reminder</h2>
          <p className={styles.newNotificationsDescription}>
            visible only to you
          </p>
          <label className={styles.inputContainer}>
            Title{" "}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.inputField}
            />
          </label>
          <label className={styles.inputContainer}>
            Text{" "}
            <textarea
              //   type="text"
              value={notificationText}
              onChange={(e) => setNotificationText(e.target.value)}
              className={styles.textareaField}
            />
          </label>
          <label className={styles.inputContainer}>
            When to remind{" "}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={styles.inputField}
            />
          </label>
          <button
            type="button"
            onClick={handleSubmit}
            className={styles.submitButton}
          >
            <p className={styles.buttonText}>Create reminder</p>
            <MoveUp className={styles.buttonArrow} />
          </button>

          <section className={styles.labSubscriptionPanel}>
            <div className={styles.firstBlock}>
              <h2>Laboratory subscriptions</h2>
              <p className={styles.notificationsDescription}>
                Notifications regarding bookings and announcements for selected
                laboratories
              </p>
            </div>
            {}
            <label className={styles.selectContainer}>
              Add subscription{" "}
              <div>
                <select className={styles.selectField}>
                  <option>Choose the lab</option>
                </select>
                <button className={styles.subscribeButton}>Subscribe</button>
              </div>
            </label>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Notifications;

{
  /* <div className={styles.notificationsContainerHeader}>
        <h1>Notifications</h1>
        <p>
          System messages, booking and experiment events, personal reminders.
        </p>
      </div>
      <div className={styles.notificationPanelContainer}>
        <section className={styles.currentNotifications}>
          <div className={styles.currentNotificationsHeader}>
            <span
              className={styles.notificationFilterOption}
              onClick={() => setNotificationFilter("all")}
            >
              All
            </span>
            <span
              className={styles.notificationFilterOption}
              onClick={() => setNotificationFilter("unread")}
            >
              Unread
            </span>
          </div>
          <div></div>
        </section>
        <section></section>
      </div> */
}
