import { type HttpError, useGo } from "@refinedev/core";
import { useForm } from "@refinedev/antd";
import { Modal, Form, Input } from "antd";

export const LabelPageCreate = () => {
    const go = useGo();

    const { formProps } = useForm<
        { nombre: string; color: string },
        HttpError
    >({
        redirect: false,
        onMutationSuccess: () => {
            go({
                to: { resource: "etiquetas", action: "list" },
                options: { keepQuery: true },
            });
        },
    });

    return (
        <Modal
            okButtonProps={{ form: "create-category-form", htmlType: "submit" }}
            title="Crear nueva etiqueta"
            open
            onCancel={() => {
                go({
                    to: { resource: "etiquetas", action: "list" },
                    options: { keepQuery: true },
                });
            }}
        >
            <Form
                layout="vertical"
                id="create-category-form"
                {...formProps}
                onFinish={(values) => formProps.onFinish?.(values)}
            >
                <Form.Item
                    name="nombre"
                    label="Nombre"
                    rules={[{ required: true, message: "El nombre es obligatorio" }]}
                >
                    <Input placeholder="Nombre de la categoría" />
                </Form.Item>

                <Form.Item
                    name="color"
                    label="Color"
                    rules={[{ required: true, message: "El color es obligatorio" }]}
                >
                    <Input type="color" style={{ width: 80, padding: 0 }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
