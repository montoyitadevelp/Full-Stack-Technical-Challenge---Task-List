import { useGo } from "@refinedev/core";
import { Modal } from "antd";
import { LabelForm } from "@/domains/label/components/create/LabelForm";

export const LabelPageCreate = () => {
    const go = useGo();

    return (
        <Modal
            okButtonProps={{ form: "create-category-form", htmlType: "submit" }}
            title="Crear nueva etiqueta"
            open
            onCancel={() => {
                go({
                    to: { resource: "etiquetas", action: "list" },
                    options: { keepQuery: true },
                });
            }}
        >
            <LabelForm />
        </Modal>
    );
};
