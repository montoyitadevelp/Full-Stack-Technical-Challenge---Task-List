export interface TaskDTO {
    usuarioId: string;
    completada?: boolean;
    categoriaId?: string;
    prioridad?: string;
    fechaInicio?: Date;
    fechaFin?: Date;
    busqueda?: string;
    etiquetasIds?: string[];
    ordenar?: "createdAt" | "fechaVencimiento" | "prioridad" | "titulo";
    direccion?: "asc" | "desc";
    page?: number;
    pageSize?: number;
}



export function toTaskDTO(task: Record<string, any>): TaskDTO {
   
    return {
        usuarioId: task.usuarioId,
        completada: task.completed !== undefined ? Boolean(task.completed === 'true') : undefined,
        categoriaId: task.category,
        prioridad: task.priority,
        fechaInicio: task.dueDateStart ? new Date(task.dueDateStart) : undefined,
        fechaFin: task.dueDateEnd ? new Date(task.dueDateEnd) : undefined,
        busqueda: task.search,
        etiquetasIds: task.tags
            ? (Array.isArray(task.tags) ? task.tags : task.tags.split(","))
            : undefined,
        ordenar: task.ordenar,
        direccion: task.direccion,
        page: task.page ? Number(task.page) : 1,
        pageSize: task.pageSize ? Number(task.pageSize) : 10,
    };
}
