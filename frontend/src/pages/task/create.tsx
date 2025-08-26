import { Modal } from "antd";
import { TaskForm } from "@/domains/task/components/create";
import { useSelect } from "@refinedev/core";
import { useFormFields } from "@/hooks/useFormFields";


export const TasksPageCreate = () => {
  const { formProps, handleCancel } = useFormFields({
    resource: "tareas"
  });

  return (
    <Modal
      okButtonProps={{ form: "create-task-form", htmlType: "submit" }}
      title="Añadir nueva tarea"
      open
      onCancel={handleCancel}
    >
      <TaskForm
        formProps={formProps}
      />
    </Modal>
  );
};
