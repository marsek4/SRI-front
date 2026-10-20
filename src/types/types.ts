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

// export type Lab = {
//   id: string;
//   name: string;
//   building: string;
//   capacity: number;
//   equipment: string[];
//   description: string;
// };

// // export type Labs = {
// //   laboratories: Lab[];
// // };

// export type Labs = Lab[];

// type LabBusyInterval = {
//   startTime: string;
//   endTime: string;
// };

// export type LabSchedule = {
//   labId: string;
//   busy: LabBusyInterval[];
// };

// export type BookingData = {
//   labId: string;
//   startTime: string;
//   endTime: string;
//   purpose: string;
//   accessNote: string;
// };

// export type Booking = {
//   id: string;
//   labId: string;
//   ownerId: string;
//   ownerUsername: string;
//   startTime: string;
//   endTime: string;
//   purpose: string;
//   accessNote: string;
//   status: string;
//   createdAt: string;
// };
