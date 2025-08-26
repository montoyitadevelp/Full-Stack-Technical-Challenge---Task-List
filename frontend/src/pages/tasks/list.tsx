import type { PropsWithChildren } from "react";
import { getDefaultFilter, useGo } from "@refinedev/core";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  NumberField,
  getDefaultSortOrder,
  useSelect,
  useTable,
} from "@refinedev/antd";
import { EditOutlined, } from "@ant-design/icons";
import { Avatar, Flex, Input, Select, Table, Tag } from "antd";
import { getRandomColorFromString } from "@/utils/get-random-color";
import type { Task } from "@/types";

export const TasksPageList = ({ children }: PropsWithChildren) => {
  const go = useGo();

  const { tableProps, filters, sorters } = useTable<Task>({
    sorters: {
      initial: [{ field: "updatedAt", order: "desc" }],
    },
    filters: {
      initial: [
        {
          field: "completada",
          operator: "eq",
          value: undefined,
        },
        {
          field: "prioridad",
          operator: "eq",
          value: undefined,
        },
        {
          field: "categoriaId",
          operator: "eq",
          value: undefined,
        },
      ],
    },
  });

  const { selectProps: categoriaSelectProps } = useSelect({
    resource: "categorias",
    optionLabel: "nombre",
    optionValue: "id",
  });
  const { selectProps: etiquetasSelectProps } = useSelect({
    resource: "etiquetas",
    optionLabel: "nombre",
    optionValue: "id",
  });

  const { selectProps: prioridadSelectProps } = useSelect({
    resource: "tareas",
    optionLabel: "prioridad",
    optionValue: "prioridad",
    defaultValue: ["low", "medium", "high"],
  });

  return (
    <>
      <List
        title="Tareas"
        headerButtons={() => (
          <CreateButton
            size="large"
            onClick={() =>
              go({
                to: { resource: "tareas", action: "create" },
                options: { keepQuery: true },
              })
            }
          >
            Añadir nueva tarea
          </CreateButton>
        )}
      >
        <Table
          {...tableProps}
          rowKey="id"
          pagination={{
            ...tableProps.pagination,
            showSizeChanger: true,
          }}
          scroll={{ x: 1000 }}
        >
          <Table.Column
            title="Título"
            dataIndex="titulo"
            key="titulo"
            sorter
            defaultSortOrder={getDefaultSortOrder("titulo", sorters)}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Buscar título" />
              </FilterDropdown>
            )}
          />

          <Table.Column
            title="Descripción"
            dataIndex="descripcion"
            key="descripcion"
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Buscar descripción" />
              </FilterDropdown>
            )}
          />

          <Table.Column
            title="Categoría"
            dataIndex={["categoria", "nombre"]}
            key="categoriaId"
            filterDropdown={(props) => (
              <FilterDropdown {...props} mapValue={(value) => ({ field: "categoriaId", value })}>
                <Select
                  placeholder="Filtrar por categoría"
                  style={{ width: 220 }}
                  {...categoriaSelectProps}
                />
              </FilterDropdown>
            )}
            render={(value, record: Task) =>
              record.categoria ? (
                <Tag color={record.categoria.color || "blue"}>
                  {record.categoria.nombre}
                </Tag>
              ) : (
                "-"
              )
            }
          />

          <Table.Column
            title="Prioridad"
            dataIndex="prioridad"
            key="prioridad"
            sorter
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  mode="multiple"
                  placeholder="Filtrar por prioridad"
                  style={{ width: 180 }}
                  {...prioridadSelectProps}
                />
              </FilterDropdown>
            )}
            render={(value: string) => (
              <Tag
                color={
                  value === "high"
                    ? "red"
                    : value === "medium"
                      ? "orange"
                      : "green"
                }
              >
                {value.toUpperCase()}
              </Tag>
            )}
          />


          <Table.Column
            title="Completada"
            dataIndex="completada"
            key="completada"
            sorter
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  placeholder="Filtrar por completada"
                  style={{ width: 150 }}
                  value={props.selectedKeys.length ? props.selectedKeys[0] : undefined} // selecciona el valor actual
                  onChange={(value) => {
                    props.setSelectedKeys(value !== undefined ? [value] : []);
                    props.confirm();
                  }}
                  allowClear
                  onClear={() => {
                    props.setSelectedKeys([]);
                    props.confirm();
                  }}
                >
                  <Select.Option value={true}>Sí</Select.Option>
                  <Select.Option value={false}>No</Select.Option>
                </Select>
              </FilterDropdown>
            )}
            render={(value: boolean) =>
              value ? (
                <Tag color="green">Sí</Tag>
              ) : (
                <Tag color="red">No</Tag>
              )
            }
          />

          <Table.Column
            title="Vencimiento"
            dataIndex="fechaVencimiento"
            key="fechaVencimiento"
            sorter
            render={(value: string) =>
              value ? new Date(value).toLocaleDateString() : "-"
            }
          />

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
                />
              </FilterDropdown>
            )}
            render={(tags: any[]) => (
              <Flex wrap="wrap" gap={4}>
                {tags?.map((t) => (
                  <Tag color={t.etiqueta.color || "blue"} key={t.etiquetaId}>
                    {t.etiqueta.nombre}
                  </Tag>
                ))}
              </Flex>
            )}
          />

          <Table.Column
            title="Acciones"
            key="actions"
            fixed="right"
            align="end"
            width={120}
            render={(_, record: Task) => (
              <Flex align="center" gap={8}>
                <EditButton hideText recordItemId={record.id} icon={<EditOutlined />} />
                <DeleteButton hideText recordItemId={record.id} resource="tareas" />
              </Flex>
            )}
          />
        </Table>
      </List>
      {children}
    </>
  );
};
