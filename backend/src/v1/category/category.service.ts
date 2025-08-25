import { CategoryRepository } from "./category.repository";
import { BadRequestError, NotFoundError } from "../core/errors";

export class CategoryService {
    private categorias = new CategoryRepository();

    async list(userId: string) {
        return this.categorias.findAllByUser(userId);
    }

    async create(userId: string, nombre: string, color?: string) {
        const exists = await this.categorias.findByName(userId, nombre);
        if (exists) throw new BadRequestError("Category already exists");
        return this.categorias.create({ usuarioId: userId, nombre, color });
    }

    async update(userId: string, id: string, data: { nombre?: string; color?: string }) {
        const cat = await this.categorias.findById(id);
        if (!cat || cat.usuarioId !== userId) throw new NotFoundError("Category not found");
        return this.categorias.update(id, data);
    }

    async remove(userId: string, id: string) {
        const cat = await this.categorias.findById(id);
        if (!cat || cat.usuarioId !== userId) throw new NotFoundError("Category not found");
        return this.categorias.delete(id);
    }
}
