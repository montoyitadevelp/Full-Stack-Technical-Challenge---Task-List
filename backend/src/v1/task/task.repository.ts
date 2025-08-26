import { Repository, prisma } from "../core/repository";
import { tarea } from "@prisma/client";
import { TaskDTO } from "./task.dto";


export class TaskRepository extends Repository<tarea> {
  protected model = prisma.tarea;

  findByIdWithRelations(id: string, userId: string) {
    return this.model.findFirst({
      where: { id, usuarioId: userId },
      include: {
        categoria: true,
        etiquetas: { include: { etiqueta: true } },
      },
    });
  }

  async findAllWithFilters(params: TaskDTO) {
    const {
      usuarioId,
      completada,
      categoriaId,
      prioridad,
      fechaInicio,
      fechaFin,
      busqueda,
      etiquetasIds,
      ordenar = "createdAt",
      direccion = "desc",
      page = 1,
      pageSize = 10,
    } = params;

    const where: any = { usuarioId };

    if (completada !== undefined) where.completada = completada;
    if (categoriaId) where.categoriaId = categoriaId;
    if (prioridad) where.prioridad = prioridad;
    if (fechaInicio || fechaFin) {
      where.fechaVencimiento = {};
      if (fechaInicio) where.fechaVencimiento.gte = fechaInicio;
      if (fechaFin) where.fechaVencimiento.lte = fechaFin;
    }

    if (busqueda?.trim()) {
      const search = busqueda.trim();

      where.OR = [
        { titulo: { contains: search, mode: "insensitive" } },
        { descripcion: { contains: search, mode: "insensitive" } },
      ];
    }

    if (etiquetasIds && etiquetasIds.length > 0) {
      where.etiquetas = { some: { etiquetaId: { in: etiquetasIds } } };
    }

    const orderBy = {};
    orderBy[ordenar] = direccion;

    const skip = (page - 1) * pageSize;
    const take = pageSize;


    const [items, total] = await Promise.all([
      this.model.findMany({
        where,
        include: {
          categoria: true,
          etiquetas: { include: { etiqueta: true } },
        },
        orderBy,
        skip,
        take,
      }),
      this.model.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

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
        usuarioId: data.usuarioId,
        titulo: data.titulo,
        descripcion: data.descripcion,
        prioridad: data.prioridad as any,
        fechaVencimiento: data.fechaVencimiento,
        categoriaId: data.categoriaId || null,
        etiquetas: data.etiquetas
          ? {
            create: data.etiquetas.map((id) => ({ etiquetaId: id })),
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
        completada: data.completada,
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
