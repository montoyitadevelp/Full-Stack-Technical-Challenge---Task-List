import { type HttpError, useGo } from "@refinedev/core";
import { useForm, useSelect } from "@refinedev/antd";
import { Flex, Form, Input, Modal, DatePicker, Select, Switch } from "antd";
import { Task, TaskForm } from "@/types";


export const TasksPageCreate = () => {
  const go = useGo();

  const { formProps } = useForm<Task, HttpError, TaskForm>({
    redirect: false,
    onMutationSuccess: () => {
      go({
        to: { resource: "tareas", action: "list" },
        options: { keepQuery: true },
      });
    },
  });


  const { selectProps: categoriaSelectProps } = useSelect({
    resource: "categorias",
    optionLabel: "nombre",
    optionValue: "id",
  });


  const { selectProps: etiquetaSelectProps } = useSelect({
    resource: "etiquetas",
    optionLabel: "nombre",
    optionValue: "id",
  });

  return (
    <Modal
      okButtonProps={{ form: "create-task-form", htmlType: "submit" }}
      title="Add new task"
      open
      onCancel={() => {
        go({
          to: { resource: "tareas", action: "list" },
          options: { keepQuery: true },
        });
      }}

    >
      <Form
        layout="vertical"
        id="create-task-form"
        {...formProps}
        onFinish={(values) => formProps.onFinish?.(values as TaskForm)}
      >
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
              options={[
                { label: "High", value: "high" },
                { label: "Medium", value: "medium" },
                { label: "Low", value: "low" },
              ]}
            />
          </Form.Item>

          <Form.Item name="fechaVencimiento" label="Due Date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="categoriaId"
            label="Category"
          >
            <Select {...categoriaSelectProps} placeholder="Select category" />
          </Form.Item>

          <Form.Item
            name="etiquetas"
            label="Tags"
          >
            <Select
              {...etiquetaSelectProps}
              mode="multiple"
              placeholder="Select tags"
            />
          </Form.Item>

          <Form.Item
            name="completada"
            label="Completed"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};
