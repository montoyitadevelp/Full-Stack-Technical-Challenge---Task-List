import { Task } from "@/types";

export const getTaskInitialValues = (task?: Task) => {
    if (!task) return {};

    return {
        ...task,
        completada: !!task.completada,
        categoriaId: task.categoria?.id ?? null,
        etiquetas: task.etiquetas?.map((e: any) => e.etiqueta.id) ?? [],
    };
};