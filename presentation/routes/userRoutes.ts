import { Router } from "express";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { UserService } from "../../infrastructure/services/UserService";
import { CreateUserUseCase } from "../../application/useCase/CreateUserUseCase";
import { GetUserUseCase } from "../../application/useCase/GetUserUseCase";
import { UpdateUserUseCase } from "../../application/useCase/UpdateUserCase";
import { DeleteUserUseCase } from "../../application/useCase/DeleteUserUseCase";
import { UserController } from "../controllers/UserController";

const router = Router();

const repo = new UserRepository();
const service = new UserService();

const controller = new UserController(
  new CreateUserUseCase(repo, service),
  new GetUserUseCase(repo),
  new UpdateUserUseCase(repo),
  new DeleteUserUseCase(repo)
);

router.post("/", controller.create);
router.get("/:id", controller.get);
router.put("/", controller.update);
router.delete("/:id", controller.delete);

export default router;
