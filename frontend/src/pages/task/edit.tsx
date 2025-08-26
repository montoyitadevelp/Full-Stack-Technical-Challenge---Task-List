import { Show, DeleteButton } from "@refinedev/antd";
import { Row, Col, Flex, Form } from "antd";
import { TaskFormFields, TaskStatusCard, TaskCategoryCard, TaskTagsCard } from "@/domains/task/components/edit";
import { useTaskEdit } from "@/domains/task/hooks/useTaskEdit";


export const TasksPageEdit = () => {
  const {
    formProps,
    task,
    isLoading,
    categoriaSelectProps,
    etiquetasSelectProps,
    initialValues,
    handleFinish,
    handleDeleteSuccess,
  } = useTaskEdit();

  return (
    <Show title="Task" goBack contentProps={{ style: { background: "transparent", boxShadow: "none" } }}>
      <Form {...formProps} layout="vertical" initialValues={initialValues} onFinish={handleFinish}>
        <Row>
          <Col span={24}>
            <Flex gap={16}>
              <TaskFormFields isLoading={isLoading} categoriaSelectProps={categoriaSelectProps} etiquetasSelectProps={etiquetasSelectProps} />
            </Flex>
          </Col>
        </Row>

        <Row gutter={32} style={{ marginTop: "32px" }}>
          <Col xs={{ span: 24 }} xl={{ span: 8 }}>
            <DeleteButton type="text" style={{ marginTop: "16px" }} resource="tareas" recordItemId={task?.id} onSuccess={handleDeleteSuccess}>
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
