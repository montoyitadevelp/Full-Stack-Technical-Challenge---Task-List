import { Show, DeleteButton } from "@refinedev/antd";
import { Row, Col, Form } from "antd";
import { TaskFormFields, TaskStatusCard, TaskCategoryCard, TaskTagsCard, TaskTitle } from "@/domains/task/components/edit";
import { useTaskEdit } from "@/domains/task/hooks/useTaskEdit";
import { getTaskInitialValues } from "@/domains/task/utils/main";

export const TasksPageEdit = () => {
  const {
    formProps,
    task,
    isLoading,
    handleFinish,
    handleDeleteSuccess,
  } = useTaskEdit();

  const initialValues = getTaskInitialValues(task)
  
  return (
    <Show title="Task" goBack contentProps={{ style: { background: "transparent", boxShadow: "none" } }}>
      <Form {...formProps} layout="vertical" initialValues={initialValues} onFinish={handleFinish}>
        <TaskTitle isLoading={isLoading} />

        <Row gutter={32}
          style={{
            marginTop: "32px",
          }}
        >
          <Col xs={{ span: 24 }} xl={{ span: 8 }}>
            <TaskFormFields isLoading={isLoading} />
            <DeleteButton
              type="text"
              style={{ marginTop: 16 }}
              resource="tareas"
              recordItemId={task?.id}
              onSuccess={handleDeleteSuccess}
            >
              Eliminar tarea
            </DeleteButton>
          </Col>

          <Col xs={{ span: 24 }} xl={{ span: 16 }}>

            <TaskStatusCard task={task} />
            <TaskCategoryCard task={task} />
            <TaskTagsCard task={task} />

          </Col>
        </Row>
      </Form>
    </Show>
  );
};
