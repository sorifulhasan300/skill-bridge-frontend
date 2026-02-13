export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export type User = {
  email: string;
  image: string | null;
  name: string;
  status: UserStatus;
};
