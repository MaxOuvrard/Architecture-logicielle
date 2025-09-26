import { User } from "../entities/User";

export interface IUserQueryRepository {
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}
