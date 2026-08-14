import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.ts";
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

  getCurrentUser: async (req: AuthRequest, res: Response) => {
    const currentUserId = req.user!.id;
    const currentUser = await usersService.getCurrentUser(currentUserId);
    res.json(currentUser);
  },

  getCurrentUserListing: async (req: AuthRequest, res: Response) => {
    const currentUserId = req.user!.id;
    const userListings = await usersService.getUserListings(currentUserId);
    res.json(userListings);
  },

  register: async (req: Request, res: Response) => {
    const user = await usersService.createUser(req.body);
    res.status(201).json(user);
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { user, token } = await usersService.login(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ user });
  },

  logout: async (req: Request, res: Response) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
  },
};
