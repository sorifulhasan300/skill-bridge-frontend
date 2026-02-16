export type Session = {
  user: {
    id: string;
    email: string;
    image: string;
    role: "ADMIN" | "STUDENT" | "TUTOR";
  };
};
