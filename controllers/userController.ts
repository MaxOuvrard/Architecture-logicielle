import { Request, Response } from 'express';
import { IUser } from '../models/user.interface';
import service from '../services/userService';

function toIUser(user: any): IUser {
  return {
    id: user.id,
    username: user.username || user.firstName + ' ' + user.lastName,
    email: user.email,
    password: user.password || '',
  };
}

class UserController {
  async create(req: Request, res: Response) {
    try {
      const created = await service.create(req.body);
      res.status(201).json(toIUser(created));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  }

  async list(req: Request, res: Response) {
    const users = await service.list();
    res.json(users.map(toIUser));
  }

  async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = await service.get(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(toIUser(user));
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await service.update(id, req.body);
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json(toIUser(updated));
  }

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    const removed = await service.remove(id);
    if (!removed) return res.status(404).json({ error: 'User not found' });
    res.json({ deleted: true });
  }
}

export default new UserController();
