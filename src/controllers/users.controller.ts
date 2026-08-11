import type { Request, Response } from "express";
import { usersService } from "../services/users.service.ts";

export const usersController = {
  getAll: async (req: Request, res: Response) => {
    const users = await usersService.getAll();
    res.json(users);
  },

  getById: async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const user = await usersService.getById(id);
    res.json(user);
  },

  register: async (req: Request, res: Response) => {
    const user = await usersService.createUser(req.body);
    res.status(201).json(user);
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { user, token } = await usersService.login(email, password);
    res.json({ user, token });
  },
};
