export type LoginData = {
  username: string;
  password: string;
};

export type User = {
  id: string;
  username: string;
  displayName: string;
  role: string;
  createdAt: string;
};

export type FullUserData = {
  accessToken: string;
  expiresAt: string;
  user: User;
};
