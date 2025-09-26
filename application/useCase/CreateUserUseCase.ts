import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IUserService } from "../../domain/services/IUserService";
import { UserDTO } from "../DTO/UserDTO";
import { v4 as uuidv4 } from "uuid";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private userService: IUserService
  ) {}

  async execute(dto: UserDTO): Promise<User> {
    const user = new User(
      uuidv4(),
      dto.firstName,
      dto.lastName,
      dto.email,
      dto.phone
    );

    // Attribution du profil automatiquement
    const profiledUser = this.userService.assignProfile(user);

    return await this.userRepository.create(profiledUser);
  }
}
