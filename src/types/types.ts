export type LoginData = {
  username: string;
  password: string;
};

export type RegisterData = {
  username: string;
  displayName: string;
  password: string;
};

export type UserData = {
  id: string;
  username: string;
  displayName: string;
  role: string;
  createdAt: string;
};

export type FullUserData = {
  accessToken: string;
  expiresAt: string;
  user: UserData;
};

export type Subscription = {
  id: string;
  topic: string;
  createdAt: string;
};

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

export type Notifications = {
  notifications: Notification[];
  unreadCount: number;
};

export type Lab = {
  id: string;
  name: string;
  building: string;
  capacity: number;
  equipment: string[];
  description: string;
};

// export type Labs = {
//   laboratories: Lab[];
// };

export type Labs = Lab[];

type LabBusyInterval = {
  startTime: string;
  endTime: string;
};

export type LabSchedule = {
  labId: string;
  busy: LabBusyInterval[];
};
