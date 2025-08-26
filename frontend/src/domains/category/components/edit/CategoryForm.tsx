
import { Form, Button, Card, Space } from "antd";
import { CategoryFormFields } from "../create";
import { useFormFields } from "@/hooks/useFormFields";


export const CategoryForm = () => {
    const {
        formProps,
        category
    } = useFormFields({
        resource: "categorias"
    })
    return <Card>
        <Form
            {...formProps}
            layout="vertical"
            initialValues={{
                nombre: category?.nombre,
                color: category?.color,
            }}
        >
            <CategoryFormFields />

            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    </Card >
}