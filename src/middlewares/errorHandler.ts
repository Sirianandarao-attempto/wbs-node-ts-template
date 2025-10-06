import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ error: "ValidationError", details: err.errors });
  }

  if (err.name === "MongoServerError" && err.code === 11000) {
    return res
      .status(409)
      .json({ error: "DuplicateKey", details: err.keyValue });
  }

  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
}
