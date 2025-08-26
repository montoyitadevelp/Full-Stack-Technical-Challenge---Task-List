import { Modal, Form, Input } from "antd";

import { CategoryFormFields } from "@/domains/category/components/create/CategoryFormFields";
import { useGo } from "@refinedev/core";
import { useFormFields } from "@/hooks/useFormFields";

export const CategoryPageCreate = () => {
  const {
    formProps
  } = useFormFields({
    resource: "categorias"
  })
  const go = useGo()

  return (
    <Modal
      okButtonProps={{ form: "create-category-form", htmlType: "submit" }}
      title="Crear nueva categoría"
      open
      onCancel={() => {
        go({
          to: { resource: "categorias", action: "list" },
          options: { keepQuery: true },
        });
      }}
    >
      <Form
        layout="vertical"
        id="create-category-form"
        {...formProps}
        onFinish={(values) => formProps.onFinish?.(values)}
      >
        <CategoryFormFields />
      </Form>
    </Modal>
  );
};
