import { Repository, prisma } from "../core/repository";
import { etiqueta } from "@prisma/client";

export class LabelTaskRepository extends Repository<etiqueta> {
  protected model = prisma.etiqueta;

  findByUser(userId: string) {
    return this.model.findMany({
      where: { usuarioId: userId },
      orderBy: { createdAt: "desc" },
    });
  }
  findByIdAndUser(id: string, userId: string) {
    return this.model.findFirst({
      where: { id, usuarioId: userId },
    });
  }

  findByUserAndName(userId: string, nombre: string) {
    return this.model.findFirst({
      where: { usuarioId: userId, nombre },
    });
  }

  findByIdsAndUser(ids: string[], userId: string) {
    return this.model.findMany({
      where: {
        id: { in: ids },
        usuarioId: userId,
      },
    });
  }
}
