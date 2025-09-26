import { User } from "../../domain/entities/User";
import { IUserService } from "../../domain/services/IUserService";

export class UserService implements IUserService {
  assignProfile(user: User): User {
    if (user.email.endsWith("@company.com")) {
      user.profile = "ADMIN";
    } else {
      user.profile = "STANDARD";
    }
    return user;
  }
}
