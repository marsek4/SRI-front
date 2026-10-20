import { useState } from "react";
import styles from "./Notifications.module.css";
import { MoveUp, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { useNotifications } from "@/features/notifications/queries";
import { useNotificationRead } from "@/features/notifications/mutations";
import { type Reminder } from "@/features/reminders/types";

type NotificationType = "all" | "unread";

const conformity: Record<string, string> = {
  NOTIFICATION_KIND_BOOKING: "BOOKING",
  NOTIFICATION_KIND_REMINDER: "REMINDER",
  NOTIFICATION_KIND_SYSTEM: "SYSTEM",
};

const Notifications = () => {
  const qc = useQueryClient();

  const markRead = useNotificationRead();

  // const {
  //   subscriptions,
  //   isLoading: isSubscriptionsLoading,
  //   isError: isSubscriptionsError,
  //   error: errorSubscriptions,
  // } = useSubscriptions();
  const {
    notifications,
    unreadCount,
    isLoading: isNotificationsLoading,
    isError: isNotificationsError,
    error: errorNotifications,
  } = useNotifications();

  const [notificationFilter, setNotificationFilter] =
    useState<NotificationType>("all");
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [remindAt, setRemindAt] = useState<string>();

  const mutationReminders = useMutation({
    mutationFn: async (data: Reminder) => {
      const token = useAuthStore.getState().accessToken;
      const res = await fetch("/api/v1/reminders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        console.log("Ошибка при создании напоминания");
        return;
      }

      console.log("Успешное создание напоминания");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const handleNotificationRead = (id: string) => {
    markRead.mutate(id);
  };

  const createReminder = () => {
    if (!remindAt) return;

    mutationReminders.mutate({
      title,
      body,
      remindAt: new Date(remindAt).toISOString(),
    });
  };

  return (
    <div className={styles.notificationsContainer}>
      <header className={styles.notificationHeaderContainer}>
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
              className={`${styles.notificationFilterOption} ${notificationFilter === "all" ? styles.activeFilterOption : ""}`}
              onClick={() => setNotificationFilter("all")}
            >
              All {notifications.length}
            </span>
            <span
              className={`${styles.notificationFilterOption} ${notificationFilter === "unread" ? styles.activeFilterOption : ""}`}
              onClick={() => setNotificationFilter("unread")}
            >
              Unread
            </span>
          </div>
          {notificationFilter === "all" &&
            notifications.map((item) => (
              <div key={item.id} className={styles.reminderContainer}>
                <div
                  className={`${styles.readIndicator} ${item.read === false ? styles.readIndicatorVisible : ""}`}
                ></div>

                <div className={styles.innerContainer}>
                  <div className={styles.firstLineText}>
                    {" "}
                    <span className={styles.notificationTypeText}>
                      {conformity[item.kind].toUpperCase()}
                    </span>
                    <span>YESTERDAY, 11:11AM</span>
                  </div>
                  <span className={styles.innerContainerTitle}>
                    {item.title}
                  </span>
                  <span>{item.topic}</span>
                  {item.remindAt && (
                    <span className={styles.reminderText}>
                      Remind at: {item.remindAt}
                    </span>
                  )}
                </div>
                {item.read === false && (
                  <button
                    type="button"
                    onClick={() => handleNotificationRead(item.id)}
                    className={styles.markReadButton}
                  >
                    Mark as read
                  </button>
                )}
              </div>
            ))}
          {notificationFilter === "unread" &&
            notifications
              .filter((item) => item.read === false)
              .map((item) => (
                <div key={item.id} className={styles.reminderContainer}>
                  <div
                    className={`${styles.readIndicator} ${item.read === false ? styles.readIndicatorVisible : ""}`}
                  ></div>

                  <div className={styles.innerContainer}>
                    <div className={styles.firstLineText}>
                      {" "}
                      <span className={styles.notificationTypeText}>
                        {conformity[item.kind].toUpperCase()}
                      </span>
                      <span>YESTERDAY, 11:11AM</span>
                    </div>
                    <span className={styles.innerContainerTitle}>
                      {item.title}
                    </span>
                    <span>{item.topic}</span>
                    {item.remindAt && (
                      <span className={styles.reminderText}>
                        Remind at: {item.remindAt}
                      </span>
                    )}
                  </div>
                  {item.read === false && (
                    <button
                      type="button"
                      onClick={() => handleNotificationRead(item.id)}
                      className={styles.markReadButton}
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              ))}
        </section>
        <section className={styles.newNotifications}>
          <h2 className={styles.newNotificationsHeader}>New reminder</h2>
          <p className={styles.notificationsDescription}>Visible only to you</p>
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
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className={styles.textareaField}
            />
          </label>
          <label className={styles.inputContainer}>
            When to remind{" "}
            <input
              type="datetime-local"
              value={remindAt}
              onChange={(e) => setRemindAt(e.target.value)}
              className={styles.inputField}
            />
          </label>
          <button
            type="button"
            onClick={createReminder}
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
              {/* {subscriptions && subscriptions.length > 0 ? (
                subscriptions.map((item) => (
                  <div key={item.id}>{item.topic}</div>
                ))
              ) : (
                <p className={styles.noSubscriptions}>No subscriptions yet</p>
              )} */}
            </div>
            {}
            <label className={styles.selectContainer}>
              Add subscription{" "}
              <div className={styles.selectContainerButtons}>
                <select className={styles.selectField}>
                  <option>Choose a lab</option>
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
