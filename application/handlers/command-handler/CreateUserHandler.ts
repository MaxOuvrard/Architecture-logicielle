import { CreateUserCommand } from "../../command/CreateUserCommand";
import { IUserCommandRepository } from "../../../domain/repositories/IUserCommandRepository";
import { IUserService } from "../../../domain/services/IUserService";
import { User } from "../../../domain/entities/User";
import { v4 as uuidv4 } from "uuid";

export class CreateUserHandler {
  constructor(
    private userRepository: IUserCommandRepository,
    private userService: IUserService
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    // Création de l'entité User
    const user = new User(
      uuidv4(),
      command.firstName,
      command.lastName,
      command.email,
      command.phone || "" // si phone est undefined, on met une chaîne vide
    );

    // Attribution du profil automatiquement
    const profiledUser = this.userService.assignProfile(user);

    // Sauvegarde via le repository Command
    return await this.userRepository.create(profiledUser);
  }
}
