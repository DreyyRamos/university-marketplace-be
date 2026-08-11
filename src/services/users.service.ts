import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.ts";
import { UserModel } from "../models/user.model.ts";
import { ApiError } from "../utils/ApiError.ts";
import type { CreateUserPayload, SafeUser, User } from "../types/user.types.ts";

function toSafeUSer(user: any): SafeUser {
  const { password, ...safe } = user;
  return safe as SafeUser;
}

export const usersService = {
  getAll: async (): Promise<SafeUser[]> => {
    const users = await UserModel.findAll();
    return users.map(toSafeUSer);
  },

  getById: async (id: string): Promise<SafeUser> => {
    const user = await UserModel.findById(id);
    if (!user) throw new ApiError(404, "User not found");
    return toSafeUSer(user);
  },

  createUser: async (payload: CreateUserPayload): Promise<SafeUser> => {
    const existingUser = await UserModel.findByEmail(payload.email);

    if (existingUser) throw new ApiError(409, "Email already exist");

    const hashed = await bcrypt.hash(payload.password, 10);
    console.log("password: ", hashed);
    const user = await UserModel.createUser({
      ...payload,
      password: hashed,
      role: "Student",
      user_rating: 0,
      profile_image: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return toSafeUSer(user);
  },

  login: async (
    email: string,
    password: string,
  ): Promise<{ user: SafeUser; token: string }> => {
    const user = await UserModel.findByEmail(email);
    if (!user) throw new ApiError(401, "Invalid email or password");

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) throw new ApiError(401, "Invalid email or password");

    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return { user: toSafeUSer(user), token };
  },

  getCurrentUser: async (currentUserId: string): Promise<SafeUser> => {
    const currentUser = await UserModel.currentUser(currentUserId);
    if (!currentUser) throw new ApiError(404, "No user found");
    return toSafeUSer(currentUser);
  }
};
