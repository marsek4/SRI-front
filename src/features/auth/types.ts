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
