export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export type User = {
  id: string;
  email: string;
  image: string | null;
  name: string;
  role: string;
  createdAt: string;
  status: UserStatus;
};

export interface SessionUser {
  name: string;
  image: string;
  email?: string;
  role?: string;
}
