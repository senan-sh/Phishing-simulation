export interface User {
  _id: string;
  name: string;
  surname: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

enum Role {
  User = "user",
  Admin = "admin",
}
