import { Form, Input } from "antd";

export const CategoryFormFields = () => {
    return (
        <>
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
        </>
    );
};
