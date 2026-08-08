import {
  type Request,
  type Response,
  type NextFunction,
  type RequestHandler,
} from "express";

export function asyncHandler(fn: RequestHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next));
  };
}
