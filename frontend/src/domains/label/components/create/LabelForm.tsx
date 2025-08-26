import { Form } from "antd";
import { CategoryFormFields } from "@/domains/category/components/create";
import { useFormFields } from "@/hooks/useFormFields";
export const LabelForm = () => {
    const { formProps } = useFormFields({
        resource: "etiquetas"
    })
    return (
        <Form
            layout="vertical"
            id="create-category-form"
            {...formProps}
            onFinish={(values) => formProps.onFinish?.(values)}
        >
            <CategoryFormFields />
        </Form>
    )
}