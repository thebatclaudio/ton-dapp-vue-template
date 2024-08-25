import { User } from "../models/User";

export interface UserResponse {
  user: User;
  token: string;
}