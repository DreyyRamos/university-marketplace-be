import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.ts";
import { ApiError } from "../utils/ApiError.ts";

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.split(" ")[1] : null;

  if (!token) throw new ApiError(401, "No token provided");

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as {
      id: string;
      role: string;
    };
    req.user = payload;

    next();
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }
}

export function requireRole(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ApiError(403, "Insufficient permissions");
    }
    next();
  };
}
