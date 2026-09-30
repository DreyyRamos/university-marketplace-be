import { AdminModel } from "../models/admin.model.ts";
import { UserModel } from "../models/user.model.ts";
import { ProductModel } from "../models/product.model.ts";
import { ApiError } from "../utils/ApiError.ts";

function toSafeUser(user: any) {
  const { password, ...safe } = user;
  return safe;
}

export const adminService = {
  getStats: async () => {
    return AdminModel.getStats();
  },

  getAllUsers: async () => {
    const users = await AdminModel.getAllUsers();
    return users.map(toSafeUser);
  },

  getAllProducts: async () => {
    return AdminModel.getAllProducts();
  },

  deleteUser: async (userId: string) => {
    const user = await UserModel.findById(userId);
    if (!user) throw new ApiError(404, "User not found");
    return AdminModel.deleteUser(userId);
  },

  deleteProduct: async (productId: string) => {
    const product = await ProductModel.findById(productId);
    if (!product) throw new ApiError(404, "Product not found");
    return AdminModel.deleteProduct(productId);
  },

  updateUserRole: async (userId: string, role: "Student" | "Admin") => {
    const user = await UserModel.findById(userId);
    if (!user) throw new ApiError(404, "User not found");
    return AdminModel.updateUserRole(userId, role);
  },
};
