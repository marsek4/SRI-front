export type Notification = {
  id: string;
  kind: string;
  title: string;
  body: string;
  topic: string;
  read: boolean;
  createdAt: string;
  remindAt: string;
};

// type Detail = {
//     '@type': string;
//     additionalProp1: string;
//     additionalProp2: string;
//     additionalProp3: string;
// }

// export type

export type NotificationRespond = {};

export type Notifications = {
  notifications: Notification[];
  unreadCount: number;
};
