import { useSelect } from "@refinedev/core";
import { Flex, Form, Input, DatePicker, Select, Switch } from "antd";
import { PRIORITIES } from "../../constants/main";


export const TaskFormFields = () => {
    const categoriaSelectProps = useSelect({
        resource: "categorias",
        optionLabel: "nombre",
        optionValue: "id",
    });

    const etiquetaSelectProps = useSelect({
        resource: "etiquetas",
        optionLabel: "nombre",
        optionValue: "id",
    });
    return (
        <Flex vertical gap={16}>
            <Form.Item
                name="titulo"
                label="Title"
                rules={[{ required: true, message: "Title is required" }]}
            >
                <Input placeholder="Enter task title" />
            </Form.Item>

            <Form.Item name="descripcion" label="Description">
                <Input.TextArea rows={3} placeholder="Enter description" />
            </Form.Item>

            <Form.Item name="prioridad" label="Priority">
                <Select
                    placeholder="Select priority"
                    options={PRIORITIES}
                />
            </Form.Item>

            <Form.Item name="fechaVencimiento" label="Due Date">
                <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="categoriaId" label="Category">
                <Select {...categoriaSelectProps} placeholder="Select category" />
            </Form.Item>

            <Form.Item name="etiquetas" label="Tags">
                <Select {...etiquetaSelectProps} mode="multiple" placeholder="Select tags" />
            </Form.Item>

            <Form.Item name="completada" label="Completed" valuePropName="checked">
                <Switch />
            </Form.Item>
        </Flex>
    );
};
