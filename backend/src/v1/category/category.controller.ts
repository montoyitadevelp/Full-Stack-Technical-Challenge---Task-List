import { Request, Response, NextFunction } from "express";
import { CategoryService } from "./category.service";

const service = new CategoryService();


export async function getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
        const category = await service.getById(req.userId!, req.params.id);
        res.json(category);
    } catch (err) {
        next(err);
    }
}

export async function listCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const categories = await service.list(req.userId!);
        res.json(categories);
    } catch (err) {
        next(err);
    }
}

export async function createCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const { nombre, color } = req.body;
        const category = await service.create(req.userId!, nombre, color);
        res.status(201).json(category);
    } catch (err) {
        next(err);
    }
}

export async function updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const categoria = await service.update(req.userId!, id, req.body);
        res.json(categoria);
    } catch (err) {
        next(err);
    }
}

export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        await service.remove(req.userId!, id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}
