export type Subscription = {
  id: string;
  topic: string;
  createdAt: string;
  labName: string;
};

export type Subscriptions = {
  subscriptions: Subscription[];
};

export type SubscriptionPayload = {
  topic: string;
};
