import { useForm } from "@refinedev/antd";
import { HttpError, useGo } from "@refinedev/core";

interface useFormFieldsProps {
    resource: string;
}

export const useFormFields = ({ resource }: useFormFieldsProps) => {
    const go = useGo();

    const { formProps, query } = useForm<
        { nombre: string; color: string },
        HttpError
    >({
        redirect: false,
        onMutationSuccess: () => {
            go({
                to: { resource, action: "list" },
                options: { keepQuery: true },
            });
        },
    });

    const handleCancel = () => {
        go({
            to: { resource, action: "list" },
            options: { keepQuery: true },
        });
    };

    const category = query?.data?.data;

    return {
        formProps,
        category,
        handleCancel
    }
}