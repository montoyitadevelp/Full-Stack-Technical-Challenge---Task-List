import { type HttpError, useGo } from "@refinedev/core";
import { Form, Input, Button, Card, Tag, Space } from "antd";
import { Show, useForm } from "@refinedev/antd";

export const CategoryPageEdit = () => {
    const go = useGo();

    const { formProps, query } = useForm<
        { nombre: string; color: string },
        HttpError
    >({
        redirect: false,
        onMutationSuccess: () => {
            go({
                to: { resource: "categorias", action: "list" },
                options: { keepQuery: true },
            });
        },
    });

    const category = query?.data?.data;

    return (
        <Show title="Editar Categoría" goBack>
            <Card>
                <Form
                    {...formProps}
                    layout="vertical"
                    initialValues={{
                        nombre: category?.nombre,
                        color: category?.color,
                    }}
                >
                    <Form.Item
                        label="Nombre"
                        name="nombre"
                        rules={[{ required: true, message: "El nombre es obligatorio" }]}
                    >
                        <Input placeholder="Nombre de la categoría" />
                    </Form.Item>

                    <Form.Item
                        label="Color"
                        name="color"
                        rules={[{ required: true, message: "El color es obligatorio" }]}
                    >
                        <Input type="color" style={{ width: 80, padding: 0 }} placeholder="Color (ej: #ff0000)" />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Guardar
                            </Button>

                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </Show>
    );
};
