import { type Request, type Response, type NextFunction } from "express";
import { clerkMiddleware, getAuth } from "@clerk/express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.ts";
import { ApiError } from "../utils/ApiError.ts";
import { UserModel } from "../models/user.model.ts";

export const attachClerkAuth = clerkMiddleware();

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export function requireClerkAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const auth = getAuth(req);
  if (!auth.userId) {
    throw new ApiError(401, "Unauthorized");
  }
  next();
}

// export function authMiddleware(
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction,
// ) {
//   const header = req.headers.authorization;
//   const token = header?.startsWith("Bearer ") ? header.split(" ")[1] : null;

//   if (!token) throw new ApiError(401, "No token provided");

//   try {
//     const payload = jwt.verify(token, env.JWT_SECRET) as {
//       id: string;
//       role: string;
//     };
//     req.user = payload;

//     next();
//   } catch {
//     throw new ApiError(401, "Invalid or expired token");
//   }
//}

export function requireRole(...roles: string[]) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { userId } = getAuth(req);
    if (!userId) throw new ApiError(401, "Unauthorized");

    const user = await UserModel.findByClerkId(userId);

    if (!user || !roles.includes(user.role)) {
      throw new ApiError(403, "Insufficient permissions");
    }
    next();
  };
}
