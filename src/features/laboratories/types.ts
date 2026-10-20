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

export type Labs = {
  labs: Lab[];
};

type LabBusyInterval = {
  startTime: string;
  endTime: string;
};

export type LabSchedule = {
  labId: string;
  busy: LabBusyInterval[];
};
