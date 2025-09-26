import { UpdateUserCommand } from "../../command/UpdateUserCommand";
import { IUserCommandRepository } from "../../../domain/repositories/IUserCommandRepository";
import { IUserQueryRepository } from "../../../domain/repositories/IUserQueryRepository";
import { IUserService } from "../../../domain/services/IUserService";
import { User } from "../../../domain/entities/User";

export class UpdateUserHandler {
  constructor(
    private commandRepo: IUserCommandRepository,
    private queryRepo: IUserQueryRepository,
    private userService: IUserService
  ) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    // Vérifier que l'utilisateur existe
    const existingUser = await this.queryRepo.findById(command.id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    // Mettre à jour les champs si fournis
    if (command.firstName !== undefined) existingUser.firstName = command.firstName;
    if (command.lastName !== undefined) existingUser.lastName = command.lastName;
    if (command.email !== undefined) existingUser.email = command.email;
    if (command.phone !== undefined) existingUser.phone = command.phone;

    // Réappliquer la logique métier si nécessaire
    const updatedUser = this.userService.assignProfile(existingUser);

    // Sauvegarde via le repository Command
    return await this.commandRepo.update(updatedUser);
  }
}
