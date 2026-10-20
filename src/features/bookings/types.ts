export type Booking = {
  id: string;
  labId: string;
  ownerId: string;
  ownerUsername: string;
  startTime: string;
  endTime: string;
  purpose: string;
  accessNote: string;
  status: string;
  createdAt: string;
};

export type Bookings = {
  bookings: Booking[];
};

export type BookingData = {
  labId: string;
  startTime: string;
  endTime: string;
  purpose: string;
  accessNote: string;
};
