import type { Request, Response } from "express";
import { adminService } from "../services/admin.service.ts";

export const adminController = {
  getStats: async (_req: Request, res: Response) => {
    const stats = await adminService.getStats();
    res.json(stats);
  },

  getAllUsers: async (_req: Request, res: Response) => {
    const users = await adminService.getAllUsers();
    res.json(users);
  },

  getAllProducts: async (_req: Request, res: Response) => {
    const products = await adminService.getAllProducts();
    res.json(products);
  },

  deleteUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    await adminService.deleteUser(id as string);
    res.status(204).json({ message: "User deleted" });
  },

  deleteProduct: async (req: Request, res: Response) => {
    const { id } = req.params;
    await adminService.deleteProduct(id as string);
    res.status(204).json({ message: "Product deleted" });
  },

  updateUserRole: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role } = req.body;
    if (!role || !["Student", "Admin"].includes(role)) {
      res.status(400).json({ message: "Role must be 'Student' or 'Admin'" });
      return;
    }
    const user = await adminService.updateUserRole(id as string, role);
    res.json(user);
  },
};
