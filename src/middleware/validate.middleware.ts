import { type Request, type Response, type NextFunction } from "express";
import { ZodSchema } from "zod/v3";
import { ApiError } from "../utils/ApiError.ts";

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new ApiError(400, result.error.errors[0].message);
    }

    req.body = result.data;
    next();
  };
}