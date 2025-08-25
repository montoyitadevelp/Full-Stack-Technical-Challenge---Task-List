import { NextFunction, Request, Response } from "express";
import { TaskService } from "./task.service";

const service = new TaskService();

export async function getTasks(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId!;
        const tasks = await service.getAll(userId);
        res.json(tasks);
    } catch (err) { next(err); }
}

export async function createTask(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId!;
        const task = await service.create(userId, req.body);
        res.status(201).json(task);
    } catch (err) { next(err); }
}

export async function updateTask(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId!;
        const task = await service.update(userId, req.params.id, req.body);
        res.json(task);
    } catch (err) { next(err); }
}

export async function deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId!;
        await service.delete(userId, req.params.id);
        res.status(204).send();
    } catch (err) { next(err); }
}

export async function toggleTaskCompletion(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId!;
        const task = await service.toggleComplete(userId, req.params.id);
        res.json(task);
    } catch (err) { next(err); }
}
