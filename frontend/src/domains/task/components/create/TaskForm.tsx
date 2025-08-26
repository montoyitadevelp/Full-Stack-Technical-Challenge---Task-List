import { Form } from "antd";
import { TaskFormFields } from "@/domains/task/components/create";

interface TaskFormProps {
    formProps: Record<string, any>
}

export const TaskForm = ({
    formProps,
}: TaskFormProps) => {
    return (
        <Form
            layout="vertical"
            id="create-task-form"
            {...formProps}
            onFinish={(values: any) => formProps.onFinish?.(values)}
        >
            <TaskFormFields />
        </Form>
    )
}