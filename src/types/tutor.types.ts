export type Tutor = {
  id: string;
  bio: string;
  hourlyRate: number;
  image: string | null;
  availability: string;
  user: {
    name: string;
    email: string;
  };
};
