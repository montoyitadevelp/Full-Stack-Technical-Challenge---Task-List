import { Repository, prisma } from "../core/repository";
import { categoria } from "@prisma/client";

export class CategoryRepository extends Repository<categoria> {
    protected model = prisma.categoria;

   findByIdWithRelations(id: string, userId: string) {
        return this.model.findFirst({
            where: { id, usuarioId: userId },
        });
    }

    findAllByUser(userId: string) {
        return this.model.findMany({
            where: { usuarioId: userId },
            orderBy: { createdAt: "desc" },
        });
    }

    findByName(userId: string, nombre: string) {
        return this.model.findFirst({
            where: { usuarioId: userId, nombre },
        });
    }
}
