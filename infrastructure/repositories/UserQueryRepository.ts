import { IUserQueryRepository } from "../../domain/repositories/IUserQueryRepository";
import { User } from "../../domain/entities/User";
import { UserCommandRepository } from "./UserCommanRepository";

export class UserQueryRepository implements IUserQueryRepository {
  // Pour simplifier, on partage la Map du CommandRepository
  constructor(private commandRepo: UserCommandRepository = new UserCommandRepository()) {}

  async findById(id: string): Promise<User | null> {
    const user = this.commandRepo.getAllUsers().find(u => u.id === id);
    return user || null;
  }

  async findAll(): Promise<User[]> {
    return this.commandRepo.getAllUsers();
  }
}
