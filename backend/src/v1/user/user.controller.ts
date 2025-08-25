import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";

const service = new UserService();

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
      user: any
    }
  }
}
export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { nombre, email, password } = req.body;
    const user = await service.register(nombre, email, password);
    res.status(201).json(user);
  } catch (err) { next(err); }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const token = await service.login(email, password);
    res.status(200).json({ token });
  } catch (err) { next(err); }
}

export async function profile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.userId!;
    const me = await service.getProfile(userId);
    res.status(200).json(me);
  } catch (err) { next(err); }
}
