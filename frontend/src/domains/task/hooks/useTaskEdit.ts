import { useForm, useSelect } from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import type { Task, TaskForm } from "@/types";
import type { HttpError } from "@refinedev/core";

export const useTaskEdit = () => {
    const go = useGo();

    const { formProps, query: queryResult } = useForm<Task, HttpError, TaskForm>({ redirect: false });
    const task = queryResult?.data?.data;
    const isLoading = queryResult?.isLoading;


    const categoriaSelectProps = useSelect({
        resource: "categorias",
        optionLabel: "nombre",
        optionValue: "id",
        pagination: { mode: "off" },
    });

    const etiquetasSelectProps = useSelect({
        resource: "etiquetas",
        optionLabel: "nombre",
        optionValue: "id",
        pagination: { mode: "off" },
    });


    const initialValues = task
        ? {
            ...task,
            completada: !!task.completada,
            categoriaId: task.categoria?.id ?? null,
            etiquetas: task.etiquetas?.map((e) => e.etiqueta.id) ?? [],
        }
        : {};


    const handleFinish = (values: any) => {
        const payload = {
            ...values,
            categoriaId: values.categoriaId?.value ? values.categoriaId?.value : null || values.categoriaId,
            etiquetas: values.etiquetas ?? [],
        };
        formProps.onFinish?.(payload);
    };


    const handleDeleteSuccess = () => {
        go({ to: { resource: "tareas", action: "list" } });
    };

    return {
        formProps,
        task,
        isLoading,
        categoriaSelectProps,
        etiquetasSelectProps,
        initialValues,
        handleFinish,
        handleDeleteSuccess,
    };
};
