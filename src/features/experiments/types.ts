type Measurement = {
  name: string;
  value: number;
  unit: string;
};

export type Experiment = {
  id: string;
  ownerId: string;
  ownerUsername: string;
  title: string;
  labId: string;
  status: string;
  visibility: string;
  tags: string[];
  sampleCount: number;
  summary: string;
  measurements: Measurement[];
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type Experiments = {
  experiments: Experiment[];
};

export type NewExperiment = {
  title: string;
  labId: string;
  visibility: string;
  tags: string[];
  sampleCount: number;
  summary: string;
  notes: string;
};

export type ExperimentPatch = {
  status?: string;
  summary?: string;
  addMeasurements?: Measurement[];
};
