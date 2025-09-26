import { User } from "../entities/User";

export interface IUserService {
  assignProfile(user: User): User;
}
