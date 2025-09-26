import { User } from "../entities/User";

export interface IUserCommandRepository {
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
