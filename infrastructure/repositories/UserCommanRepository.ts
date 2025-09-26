import { IUserCommandRepository } from "../../domain/repositories/IUserCommandRepository";
import { User } from "../../domain/entities/User";

export class UserCommandRepository implements IUserCommandRepository {
  private users: Map<string, User> = new Map();

  async create(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  async update(user: User): Promise<User> {
    if (!this.users.has(user.id)) {
      throw new Error("User not found");
    }
    this.users.set(user.id, user);
    return user;
  }

  async delete(id: string): Promise<void> {
    if (!this.users.has(id)) {
      throw new Error("User not found");
    }
    this.users.delete(id);
  }

  // Méthode interne pour tests ou QueryRepository
  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }
}
