import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/useCase/CreateUserUseCase";
import { GetUserUseCase } from "../../application/useCase/GetUserUseCase";
import { UpdateUserUseCase } from "../../application/useCase/UpdateUserCase";
import { DeleteUserUseCase } from "../../application/useCase/DeleteUserUseCase";

export class UserController {
  constructor(
    private createUser: CreateUserUseCase,
    private getUser: GetUserUseCase,
    private updateUser: UpdateUserUseCase,
    private deleteUser: DeleteUserUseCase
  ) {}

  create = async (req: Request, res: Response) => {
    try {
      const user = await this.createUser.execute(req.body);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      const user = await this.getUser.execute(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const user = await this.updateUser.execute(req.body);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const result = await this.deleteUser.execute(req.params.id);
      if (result === null) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}
