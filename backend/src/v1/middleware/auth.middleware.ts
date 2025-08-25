
import config from "../../config";
import { UnauthorizedError } from "../core/errors";
import { UserRepository } from "../user/user.repository";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload extends jwt.JwtPayload {
  id: string;
}

export default async function authHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return next(new UnauthorizedError("Missing token"));

    // verify and decode token
    const payload = jwt.verify(token, config.jwt.secret) as JwtPayload;

    // fetch user from DB
    const userRepo = new UserRepository();
    const user = await userRepo.findById(payload.id);

    if (!user) {
      return next(new UnauthorizedError("User not found or inactive"));
    }

    // attach user object (or just id) to request
    req.userId = user.id;
    req.user = user;

    next();
  } catch (err) {
    next(new UnauthorizedError("Invalid or expired token"));
  }
}
