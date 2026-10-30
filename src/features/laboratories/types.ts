export type Lab = {
  id: string;
  name: string;
  building: string;
  capacity: number;
  equipment: string[];
  description: string;
};

export type Labs = {
  labs: Lab[];
};

export type LabBusyInterval = {
  startTime: string;
  endTime: string;
  mine: boolean;
};

export type LabSchedule = {
  labId: string;
  busy: LabBusyInterval[];
};
