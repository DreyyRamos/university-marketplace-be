export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "student" | "seller" | "admin";
  createdAt: Date;
}

export type SafeUser = Omit<User, "password">;

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}
