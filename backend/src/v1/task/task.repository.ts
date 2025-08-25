import { Repository, prisma } from "../core/repository";
import { tarea } from "@prisma/client";

export class TaskRepository extends Repository<tarea> {
  protected model = prisma.tarea;

  findAllByUser(userId: string) {
    return this.model.findMany({
      where: { usuarioId: userId },
      include: {
        categoria: true,
        etiquetas: { include: { etiqueta: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  updateCompletion(id: string, completada: boolean) {
    return this.model.update({
      where: { id },
      data: { completada, completedAt: completada ? new Date() : null },
    });
  }

  create(data: Record<string, any>) {
    return this.model.create({
      data: {
        usuarioId: data.userId,
        titulo: data.titulo,
        descripcion: data.descripcion,
        prioridad: data.prioridad as any,
        fechaVencimiento: data.fechaVencimiento,
        categoriaId: data.categoryId || null,
        etiquetas: data.labels
          ? {
            create: data.labels.map((id) => ({ etiquetaId: id })),
          }
          : undefined,
      },
      include: { etiquetas: { include: { etiqueta: true } }, categoria: true },
    });
  }

  updateWithLabels(id: string, data: Record<string, any>) {
    return this.model.update({
      where: { id },
      data: {
        titulo: data.titulo,
        descripcion: data.descripcion,
        prioridad: data.prioridad as any,
        fechaVencimiento: data.fechaVencimiento,
        categoriaId: data.categoryId || null,
        etiquetas: data.labels
          ? {
            deleteMany: {},
            create: data.labels.map((labelId: string) => ({ etiquetaId: labelId })),
          }
          : undefined,
      },
      include: { etiquetas: { include: { etiqueta: true } }, categoria: true },
    });
  }
}
