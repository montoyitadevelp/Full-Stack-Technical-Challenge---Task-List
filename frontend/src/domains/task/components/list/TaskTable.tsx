import { Table, Input, Select, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { FilterDropdown } from "@refinedev/antd";
import type { Task } from "@/types";
import {
    TaskColumnTitle,
    TaskColumnTags,
    TaskColumnActions,
    TaskColumnCategory,
    TaskColumnCompleted,
    TaskColumnDueDate,
    TaskColumnPriority
} from "@/domains/task/components/list";

export const TaskTable = ({ tableProps, categoriaSelectProps, etiquetasSelectProps }: any) => {
    const { RangePicker } = DatePicker;

    return (
        <Table
            {...tableProps}
            rowKey="id"
            pagination={{ ...tableProps.pagination, showSizeChanger: true }}
            scroll={{ x: 1000 }}
        >
            {/* Completada */}
            <Table.Column
                title="Completada"
                dataIndex="completada"
                key="completada"
                sorter
                render={(value: boolean, record: Task) => <TaskColumnCompleted value={value} record={record} />}
            />

            {/* Título y descripción */}
            <Table.Column
                title="Título y Descripción"
                key="search"
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Input
                            placeholder="Buscar en título y descripción"
                            prefix={<SearchOutlined />}
                            value={props.selectedKeys?.[0] || ""}
                            onChange={(e) => props.setSelectedKeys(e.target.value ? [e.target.value] : [])}
                            onPressEnter={() => props.confirm()}
                            onBlur={() => props.confirm()}
                            allowClear
                            onClear={() => { props.setSelectedKeys([]); props.confirm(); }}
                        />
                    </FilterDropdown>
                )}
                render={(_, record: Task) => <TaskColumnTitle record={record} />}
            />

            {/* Etiquetas */}
            <Table.Column
                title="Etiquetas"
                dataIndex="etiquetas"
                key="etiquetas"
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Select
                            mode="multiple"
                            placeholder="Filtrar por etiquetas"
                            style={{ width: 220 }}
                            {...etiquetasSelectProps}
                            value={props.selectedKeys || []}
                            onChange={(value) => props.setSelectedKeys(value || [])}
                            allowClear
                            onClear={() => { props.setSelectedKeys([]); props.confirm(); }}
                            onBlur={() => props.confirm()}
                        />
                    </FilterDropdown>
                )}
                render={(tags) => <TaskColumnTags tags={tags} />}
            />

            {/* Categoría */}
            <Table.Column
                title="Categoría"
                key="categoriaId"
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Select
                            placeholder="Filtrar por categoría"
                            style={{ width: 220 }}
                            options={categoriaSelectProps.options}
                            value={(props.selectedKeys ?? [])[0]}
                            onChange={(value) => { props.setSelectedKeys(value ? [value] : []); props.confirm(); }}
                            allowClear
                            onClear={() => { props.setSelectedKeys([]); props.confirm(); }}
                        />
                    </FilterDropdown>
                )}
                render={(value, record) => <TaskColumnCategory record={record} />}
            />

            {/* Prioridad */}
            <Table.Column
                title="Prioridad"
                dataIndex="prioridad"
                key="prioridad"
                sorter
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Select
                            placeholder="Filtrar por prioridad"
                            style={{ width: 180 }}
                            options={[
                                { label: "Alta", value: "high" },
                                { label: "Media", value: "medium" },
                                { label: "Baja", value: "low" },
                            ]}
                            value={props.selectedKeys || []}
                            onChange={(value) => props.setSelectedKeys(value || [])}
                            allowClear
                            onClear={() => { props.setSelectedKeys([]); props.confirm(); }}
                        />
                    </FilterDropdown>
                )}
                render={(value) => <TaskColumnPriority value={value} />}
            />

            {/* Vencimiento */}
            <Table.Column
                title="Vencimiento"
                dataIndex="fechaVencimiento"
                key="fechaVencimiento"
                sorter
                filterDropdown={(props: any) => {
                    const startValue = props.selectedKeys?.find(f => f.operator === "gte")?.value;
                    const endValue = props.selectedKeys?.find(f => f.operator === "lte")?.value;

                    return (
                        <FilterDropdown {...props}>
                            <RangePicker
                                style={{ width: 280 }}
                                placeholder={["Fecha inicio", "Fecha fin"]}
                                value={startValue || endValue ? [startValue ? dayjs(startValue) : null, endValue ? dayjs(endValue) : null] : undefined}
                                onChange={(dates) => {
                                    const keys: any[] = [];
                                    if (dates) {
                                        if (dates[0]) keys.push({ field: "fechaVencimiento", operator: "gte", value: dates[0].format("YYYY-MM-DD") });
                                        if (dates[1]) keys.push({ field: "fechaVencimiento", operator: "lte", value: dates[1].format("YYYY-MM-DD") });
                                    }
                                    props.setSelectedKeys(keys);
                                    props.confirm();
                                }}
                                allowClear
                                onClear={() => { props.setSelectedKeys([]); props.confirm(); }}
                            />
                        </FilterDropdown>
                    );
                }}
                render={(value) => <TaskColumnDueDate value={value} />}
            />

            {/* Acciones */}
            <Table.Column
                title="Acciones"
                key="actions"
                fixed="right"
                align="end"
                width={120}
                render={(_, record) => <TaskColumnActions record={record} />}
            />
        </Table>
    );
};
