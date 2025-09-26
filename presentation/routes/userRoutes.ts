import { Router } from "express";
import { UserCommandRepository } from "../../infrastructure/repositories/UserCommanRepository";
import { UserQueryRepository } from "../../infrastructure/repositories/USerQueryRepository";
import { UserService } from "../../infrastructure/services/UserService";

import { CreateUserHandler } from "../../application/handlers/command-handler/CreateUserHandler";
import { UpdateUserHandler } from "../../application/handlers/command-handler/UpdateUserHandler";
import { DeleteUserHandler } from "../../application/handlers/command-handler/DeleteUserHandler";
import { GetUserHandler } from "../../application/handlers/query-handler/GetUserHandler";

import { UserController } from "../controllers/UserController";

const router = Router();

// 🔹 Instanciation des repositories et service
const commandRepo = new UserCommandRepository();
const queryRepo = new UserQueryRepository();
const service = new UserService();

// 🔹 Instanciation des Handlers
const createUserHandler = new CreateUserHandler(commandRepo, service);
const updateUserHandler = new UpdateUserHandler(commandRepo, queryRepo, service);
const deleteUserHandler = new DeleteUserHandler(commandRepo);
const getUserHandler = new GetUserHandler(queryRepo);

// 🔹 Contrôleur
const controller = new UserController(
  createUserHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler
);

// 🔹 Routes
router.post("/", controller.create);
router.get("/:id", controller.get);
router.put("/", controller.update);
router.delete("/:id", controller.delete);

export default router;
