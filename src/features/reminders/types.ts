export type Reminder = {
  title: string;
  body: string;
  remindAt?: string;
};

export type FullReminder = {
  id: string;
  kind: string;
  title: string;
  body: string;
  topic: string;
  read: boolean;
  createdAt: string;
  remindAt: string;
};
