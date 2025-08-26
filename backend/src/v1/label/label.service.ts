import { LabelTaskRepository } from "./label.repository";
import { BadRequestError, NotFoundError } from "../core/errors";

export class LabelTaskService {
    private labels = new LabelTaskRepository();

    async list(userId: string) {
        return this.labels.findByUser(userId);
    }

    async create(userId: string, nombre: string, color?: string) {
        const exists = await this.labels.findByUserAndName(userId, nombre);
        if (exists) {
            throw new BadRequestError("Label already exists!");
        }

        return this.labels.create({
            nombre,
            color,
            usuarioId: userId,
        });
    }

    async remove(userId: string, id: string) {
        const cat = await this.labels.findById(id);
        if (!cat || cat.usuarioId !== userId) throw new NotFoundError("Label not found");
        return this.labels.delete(id);
    }


}
