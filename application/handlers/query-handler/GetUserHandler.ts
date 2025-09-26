import { GetUserQuery } from "../../queries/GetUserQuery";
import { IUserQueryRepository } from "../../../domain/repositories/IUserQueryRepository";
import { User } from "../../../domain/entities/User";

export class GetUserHandler {
  constructor(private userRepository: IUserQueryRepository) {}

  async execute(query: GetUserQuery): Promise<User | null> {
    return await this.userRepository.findById(query.id);
  }
}
