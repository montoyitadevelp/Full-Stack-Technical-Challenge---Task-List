import { useTable, useSelect } from "@refinedev/antd";
import type { Task } from "@/types";
import { useUpdate } from "@refinedev/core";

export const useTasksTable = () => {
    const table = useTable<Task>({
        sorters: { initial: [{ field: "updatedAt", order: "desc" }] },
        filters: {
            initial: [
                { field: "completada", operator: "eq", value: undefined },
                { field: "prioridad", operator: "eq", value: undefined },
                { field: "categoriaId", operator: "eq", value: undefined },
            ],
        },
    });

    const categoriaSelectProps = useSelect({
        resource: "categorias",
        optionLabel: "nombre",
        optionValue: "id",
        pagination: { mode: "off" },
    }).selectProps;

    const etiquetasSelectProps = useSelect({
        resource: "etiquetas",
        optionLabel: "nombre",
        optionValue: "id",
        pagination: { mode: "off" },
    }).selectProps;

    return { ...table, categoriaSelectProps, etiquetasSelectProps };
};

export const useToggleComplete = () => {
    return useUpdate<Task>({
        resource: "tareas/completar",
        mutationMode: "optimistic",
    });
};
