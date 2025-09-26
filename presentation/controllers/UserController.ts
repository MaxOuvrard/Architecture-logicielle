import { Request, Response } from "express";
import { CreateUserHandler } from "../../application/handlers/command-handler/CreateUserHandler";
import { GetUserHandler } from "../../application/handlers/query-handler/GetUserHandler";
import { UpdateUserHandler } from "../../application/handlers/command-handler/UpdateUserHandler";
import { DeleteUserHandler } from "../../application/handlers/command-handler/DeleteUserHandler";

import { CreateUserCommand } from "../../application/command/CreateUserCommand";
import { UpdateUserCommand } from "../../application/command/UpdateUserCommand";
import { DeleteUserCommand } from "../../application/command/DeleteUserCommand";
import { GetUserQuery } from "../../application/queries/GetUserQuery";

export class UserController {
  constructor(
    private createUserHandler: CreateUserHandler,
    private getUserHandler: GetUserHandler,
    private updateUserHandler: UpdateUserHandler,
    private deleteUserHandler: DeleteUserHandler
  ) {}

  // 📌 CREATE
  async create(req: Request, res: Response) {
    try {
      const command = new CreateUserCommand(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.phone
      );
      const user = await this.createUserHandler.execute(command);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  }

  // 📌 READ
  async get(req: Request, res: Response) {
    try {
      const query = new GetUserQuery(req.params.id);
      const user = await this.getUserHandler.execute(query);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  }

  // 📌 UPDATE
  async update(req: Request, res: Response) {
    try {
      const command = new UpdateUserCommand(
        req.body.id,
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.phone
      );
      const user = await this.updateUserHandler.execute(command);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  }

  // 📌 DELETE
  async delete(req: Request, res: Response) {
    try {
      const command = new DeleteUserCommand(req.params.id);
      await this.deleteUserHandler.execute(command);
      res.status(204).send();
    } catch (err) {
      if ((err as Error).message === "User not found") {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(500).json({ message: (err as Error).message });
    }
  }
}
