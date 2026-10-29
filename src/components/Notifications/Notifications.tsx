import styles from "./Notifications.module.css";
import commonStyles from "@/styles/shared.module.css";
import LabelInput from "../SharedComponents/LabelInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoveUp } from "lucide-react";
import { useNotifications } from "@/features/notifications/queries";
import { useNotificationRead } from "@/features/notifications/mutations";
import { useLabs } from "@/features/laboratories/queries";
import { useSubscribe } from "@/features/subscriptions/mutations";
import { useSubscriptions } from "@/features/subscriptions/queries";
import { useCreateReminder } from "@/features/reminders/mutations";
import { useDeleteSubscription } from "@/features/subscriptions/mutations";
import { formatDateTime } from "@/utils/utils";

type NotificationType = "all" | "unread";

const conformity: Record<string, string> = {
  NOTIFICATION_KIND_BOOKING: "BOOKING ",
  NOTIFICATION_KIND_REMINDER: "REMINDER ",
  NOTIFICATION_KIND_SYSTEM: "SYSTEM ",
  NOTIFICATION_KIND_EXPERIMENT: "EXPERIMENT ",
};

const Notifications = () => {
  const navigate = useNavigate();

  const markRead = useNotificationRead();
  const createReminder = useCreateReminder();
  const deleteSubscription = useDeleteSubscription();

  const { notifications } = useNotifications();
  const { labs } = useLabs();
  const { subscriptions } = useSubscriptions();
  const subscribeToLab = useSubscribe();

  const [notificationFilter, setNotificationFilter] =
    useState<NotificationType>("all");
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [remindAt, setRemindAt] = useState<string>();
  const [selectedLab, setSelectedLab] = useState<string>("");

  const handleSubscribe = () => {
    const correctName = "lab:" + selectedLab;
    if (selectedLab) {
      subscribeToLab.mutate({ topic: correctName });
    }
  };

  const handleUnsubscribe = (subscriptionId: string) => {
    deleteSubscription.mutate(subscriptionId);
  };

  const handleNotificationRead = (id: string) => {
    markRead.mutate(id);
  };

  const createNewReminder = () => {
    if (!remindAt) return;

    createReminder.mutate({
      title,
      body,
      remindAt: new Date(remindAt).toISOString(),
    });
  };

  return (
    <div className={styles.notificationsContainer}>
      <header className={styles.notificationHeaderContainer}>
        <h1 className={commonStyles.sectionHeaderText}>Notifications</h1>
        <p className={commonStyles.sectionHeaderSubText}>
          {" "}
          System messages, booking and experiment events, personal reminders
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
                      {item.kind === "SYSTEM" && <span>{item.id}</span>}
                      <span>
                        {formatDateTime(item.createdAt).toUpperCase()}
                      </span>
                    </span>
                  </div>
                  <span className={styles.innerContainerTitle}>
                    {item.title}
                  </span>
                  <span>{item.body}</span>
                  {item.remindAt && (
                    <span className={styles.reminderText}>
                      Remind at: {formatDateTime(item.remindAt)}
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
                        {conformity[item.kind]}
                        {item.kind === "SYSTEM" && <span>{item.id}</span>}
                      </span>
                      <span>
                        {formatDateTime(item.createdAt).toUpperCase()}
                      </span>
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

          <LabelInput upperText="Title" value={title} setValue={setTitle} />
          <LabelInput
            upperText="Text"
            isTextarea={true}
            value={body}
            setValue={setBody}
          />

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
            onClick={createNewReminder}
            // disabled={isPending}
            className={styles.submitButton}
          >
            <p className={styles.buttonText}>Create reminder</p>
            <MoveUp className={styles.buttonArrow} />
          </button>

          <section className={styles.labSubscriptionPanel}>
            <div className={styles.firstBlock}>
              <h2 className={commonStyles.smallHeaderText}>
                Laboratory subscriptions
              </h2>
              <p className={styles.notificationsDescription}>
                Notifications regarding bookings and announcements for selected
                laboratories
              </p>
            </div>
            {subscriptions.map((sub) => (
              <div className={styles.subContainer} key={sub.id}>
                <div>
                  <p
                    className={styles.subLabName}
                    onClick={() =>
                      navigate(`/laboratories/${sub.topic.slice(4)}`)
                    }
                  >
                    {sub.labName}
                  </p>
                  <p className={styles.subTopic}>{sub.topic}</p>
                </div>

                <button
                  type="button"
                  className={commonStyles.transparentButton}
                  onClick={() => handleUnsubscribe(sub.id)}
                >
                  Unsubscribe
                </button>
              </div>
            ))}
            <label className={styles.selectContainer}>
              Add subscription{" "}
              <div className={styles.selectContainerButtons}>
                <select
                  className={styles.selectField}
                  value={selectedLab}
                  onChange={(e) => setSelectedLab(e.target.value)}
                >
                  <option>Choose a lab</option>
                  {labs.map((lab) => (
                    <option key={lab.id} value={lab.id}>
                      {lab.name}
                    </option>
                  ))}
                </select>
                <button
                  className={commonStyles.transparentButton}
                  onClick={handleSubscribe}
                >
                  Subscribe
                </button>
              </div>
            </label>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Notifications;
