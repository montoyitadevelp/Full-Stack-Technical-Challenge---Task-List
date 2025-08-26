import { Divider, Card } from "antd";
import {
    BookOutlined,
    FlagOutlined,
    CalendarOutlined,
    CheckCircleOutlined,
    ContainerOutlined
} from "@ant-design/icons";
import {
    FormItemEditableInputText,
    FormItemEditableSelect,
} from "@/components/form";
import { useSelect } from "@refinedev/core";
import { PRIORITIES } from "../../constants/main";

interface TaskFormFieldsProps {
    isLoading: boolean | undefined
}

export const TaskFormFields = ({
    isLoading,
}: TaskFormFieldsProps) => {
    const categoriaSelectProps = useSelect({
        resource: "categorias",
        optionLabel: "nombre",
        optionValue: "id",
        pagination: { mode: "off" },
    });

    const etiquetasSelectProps = useSelect({
        resource: "etiquetas",
        optionLabel: "nombre",
        optionValue: "id",
        pagination: { mode: "off" },
    });

    return (
        <Card bordered={false}>
            <FormItemEditableInputText
                loading={isLoading}
                icon={<BookOutlined />}
                placeholder="Añadir descripción"
                formItemProps={{ name: "descripcion", label: "Descripción" }}
            />
            <Divider style={{ margin: 0 }} />

            <FormItemEditableInputText
                loading={isLoading}
                icon={<CalendarOutlined />}
                placeholder="Añadir fecha de vencimiento"
                formItemProps={{ name: "fechaVencimiento", label: "Fecha vencimiento" }}
            />
            <Divider style={{ margin: 0 }} />

            <FormItemEditableSelect
                loading={isLoading}
                icon={<CheckCircleOutlined />}
                formItemProps={{ name: "completada", label: "Estado", rules: [{ required: true }] }}
                selectProps={{ options: [{ label: "Pendiente", value: false }, { label: "Completada", value: true }] }}
            />
            <Divider style={{ margin: 0 }} />

            <FormItemEditableSelect
                loading={isLoading}
                icon={<FlagOutlined />}
                formItemProps={{ name: "prioridad", label: "Prioridad" }}
                selectProps={{
                    options: PRIORITIES
                }}
            />
            <Divider style={{ margin: 0 }} />

            <FormItemEditableSelect
                loading={isLoading}
                icon={<ContainerOutlined />}
                formItemProps={{ name: "categoriaId", label: "Categoría" }}
                selectProps={{ ...categoriaSelectProps, allowClear: true, placeholder: "Selecciona una categoría", labelInValue: true }}
            />
            <Divider style={{ margin: 0 }} />

            <FormItemEditableSelect
                loading={isLoading}
                icon={<ContainerOutlined />}
                formItemProps={{ name: "etiquetas", label: "Etiquetas" }}
                selectProps={{ ...etiquetasSelectProps, mode: "multiple", allowClear: true, placeholder: "Selecciona o elimina etiquetas" }}
            />
        </Card>
    );
};
