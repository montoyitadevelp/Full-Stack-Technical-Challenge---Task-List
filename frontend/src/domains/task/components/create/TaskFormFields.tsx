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
                label="Titulo"
                rules={[{ required: true, message: "Titulo es requerido" }]}
            >
                <Input placeholder="Escribe un titulo" />
            </Form.Item>

            <Form.Item name="descripcion" label="Descripción">
                <Input.TextArea rows={3} placeholder="Escribe una descripción" />
            </Form.Item>

            <Form.Item name="prioridad" label="Prioridad">
                <Select
                    placeholder="Seleccionar prioridad"
                    options={PRIORITIES}
                />
            </Form.Item>

            <Form.Item name="fechaVencimiento" label="Fecha de vencimiento">
                <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="categoriaId" label="Categoria">
                <Select {...categoriaSelectProps} placeholder="Selecionar categoria" />
            </Form.Item>

            <Form.Item name="etiquetas" label="Etiquetas">
                <Select {...etiquetaSelectProps} mode="multiple" placeholder="Selecionar etiquetas" />
            </Form.Item>

            <Form.Item name="completada" label="Completedado" valuePropName="checked">
                <Switch />
            </Form.Item>
        </Flex>
    );
};
