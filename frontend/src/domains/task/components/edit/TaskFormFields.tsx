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
    FormItemEditableText,
} from "@/components/form";

export const TaskFormFields = ({
    isLoading,
    categoriaSelectProps,
    etiquetasSelectProps
}: any) => {
    return (
        <Card bordered={false} style={{ padding: 0 }}>
            <FormItemEditableText
                loading={isLoading}
                formItemProps={{ name: "titulo", label: "Título", rules: [{ required: true }] }}
            />
            <Divider style={{ margin: 0 }} />

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
                    options: [
                        { label: "Baja", value: "low" },
                        { label: "Media", value: "medium" },
                        { label: "Alta", value: "high" },
                    ]
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
