import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  const statusCode =
    error.message === "Release not found." ? 404 : 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};
