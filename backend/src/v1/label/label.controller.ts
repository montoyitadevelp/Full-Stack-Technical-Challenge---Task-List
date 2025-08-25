import { NextFunction, Request, Response } from "express";
import { LabelTaskService } from "./label.service";

const service = new LabelTaskService();

export async function listLabels(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.userId!;
    const etiquetas = await service.list(userId);
    res.status(200).json(etiquetas);
  } catch (err) {
    next(err);
  }
}

export async function createLabel(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.userId!;
    const { nombre, color } = req.body;
    const etiqueta = await service.create(userId, nombre, color);
    res.status(201).json(etiqueta);
  } catch (err) {
    next(err);
  }
}


