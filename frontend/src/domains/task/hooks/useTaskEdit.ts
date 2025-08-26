import { useForm, useSelect } from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import type { Task, TaskForm } from "@/types";
import type { HttpError } from "@refinedev/core";

export const useTaskEdit = () => {
    const go = useGo();

    const { formProps, query: queryResult } = useForm<Task, HttpError, TaskForm>({ redirect: false });
    const task = queryResult?.data?.data;
    const isLoading = queryResult?.isLoading;


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

        handleFinish,
        handleDeleteSuccess,
    };
};
