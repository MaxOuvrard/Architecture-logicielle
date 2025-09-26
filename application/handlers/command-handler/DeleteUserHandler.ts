import { DeleteUserCommand } from "../../command/DeleteUserCommand";
import { IUserCommandRepository } from "../../../domain/repositories/IUserCommandRepository";

export class DeleteUserHandler {
  constructor(private userRepository: IUserCommandRepository) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    await this.userRepository.delete(command.id);
  }
}
