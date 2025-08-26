import { type HttpError, useGo, useNavigation } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  NumberField,
  Show,
  useForm,
  useSelect,
} from "@refinedev/antd";
import { Card, Divider, Flex, Form, Table, Typography, Tag, Switch } from "antd";
import {
  ProfileOutlined,
  BookOutlined,
  FlagOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ExportOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import {
  FormItemEditableInputText,
  FormItemEditableSelect,
  FormItemEditableText,
} from "@/components/form";
import type { Task, TaskForm } from "@/types";

export const TasksPageEdit = () => {
  const { formProps, query: queryResult } = useForm<
    Task,
    HttpError,
    TaskForm
  >({
    redirect: false
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
  const go = useGo();

  const task = queryResult?.data?.data;
  const isLoading = queryResult?.isLoading;

  const initialValues = task
    ? {
      ...task,
      completada: !!task.completada,
      etiquetas: task.etiquetas?.map((e) => e.etiquetaId),
    }
    : {};


  return (
    <Show
      title="Task"
      goBack
    
      contentProps={{
        styles: {
          body: {
            padding: 0,
          },
        },
        style: {
          background: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <Form
        {...formProps}
        layout="vertical"
        initialValues={initialValues}
      >
        <Row>
          <Col span={24}>
            <Flex gap={16}>
              <FormItemEditableText
                loading={isLoading}
                formItemProps={{
                  name: "titulo",
                  label: "Título",
                  rules: [{ required: true }],
                }}
              />
            </Flex>
          </Col>
        </Row>

        <Row
          gutter={32}
          style={{
            marginTop: "32px",
          }}
        >
          <Col xs={{ span: 24 }} xl={{ span: 8 }}>
            <Card
              bordered={false}
              styles={{ body: { padding: 0 } }}
              title={
                <Flex gap={12} align="center">
                  <ProfileOutlined />
                  <Typography.Text>Task Info</Typography.Text>
                </Flex>
              }
            >
              <FormItemEditableInputText
                loading={isLoading}
                icon={<BookOutlined />}
                placeholder="Add description"
                formItemProps={{
                  name: "descripcion",
                  label: "Descripción",
                }}
              />
              <Divider style={{ margin: 0 }} />
              <FormItemEditableInputText
                loading={isLoading}
                icon={<CalendarOutlined />}
                placeholder="Add due date"
                formItemProps={{
                  name: "fechaVencimiento",
                  label: "Fecha vencimiento",
                }}
              />
              <Divider style={{ margin: 0 }} />

              <FormItemEditableSelect
                loading={isLoading}
                icon={<CheckCircleOutlined />}
                formItemProps={{
                  name: "completada",
                  label: "Estado",
                  rules: [{ required: true }],
                }}
                selectProps={{
                  options: [
                    { label: "Pendiente", value: false },
                    { label: "Completada", value: true },
                  ],
                }}
              />
              <Divider style={{ margin: 0 }} />
              <FormItemEditableSelect
                loading={isLoading}
                icon={<FlagOutlined />}
                formItemProps={{
                  name: "prioridad",
                  label: "Prioridad",
                }}
                selectProps={{
                  options: [
                    { label: "Baja", value: "low" },
                    { label: "Media", value: "medium" },
                    { label: "Alta", value: "high" },
                  ],
                }}
              />
              <Divider style={{ margin: 0 }} />

              <FormItemEditableSelect
                loading={isLoading}
                icon={<ContainerOutlined />}
                formItemProps={{
                  name: "categoriaId",
                  label: "Categoría",
                }}
                selectProps={{
                  ...categoriaSelectProps,
                  allowClear: true,
                  placeholder: "Selecciona una categoría",
                }}
              />
              <Divider style={{ margin: 0 }} />

              <FormItemEditableSelect
                loading={isLoading}
                icon={<ContainerOutlined />}
                formItemProps={{
                  name: "etiquetas",
                  label: "Etiquetas",

                }}
                selectProps={{
                  ...etiquetasSelectProps,
                  mode: "multiple",
                  allowClear: true,
                  placeholder: "Selecciona o elimina etiquetas",
                }}
              />

            </Card>

            <DeleteButton
              type="text"
              style={{
                marginTop: "16px",
              }}
              resource="tareas"
              recordItemId={task?.id}
              onSuccess={() => {
                go({
                  to: { resource: "tareas", action: "list" },
                });
              }}

            >
              Delete task
            </DeleteButton>
          </Col>

          <Col xs={{ span: 24 }} xl={{ span: 16 }}>
            <Card
              bordered={false}
              title={
                <Flex gap={12} align="center">
                  <CheckCircleOutlined />
                  <Typography.Text>Estado</Typography.Text>
                </Flex>
              }
              styles={{
                header: {
                  padding: "0 16px",
                },
                body: {
                  padding: "0",
                },
              }}
            >
              <Typography.Paragraph style={{ padding: "16px" }}>
                {task?.completada ? (
                  <Tag color="green">Completada</Tag>
                ) : (
                  <Tag color="red">Pendiente</Tag>
                )}
              </Typography.Paragraph>
            </Card>

            <Card
              bordered={false}
              title={
                <Flex gap={12} align="center">
                  <ContainerOutlined />
                  <Typography.Text>Categoría</Typography.Text>
                </Flex>
              }
              style={{ marginTop: "32px" }}
              styles={{
                header: {
                  padding: "0 16px",
                },
                body: {
                  padding: 0,
                },
              }}
            >
              <Typography.Paragraph style={{ padding: "16px" }}>
                {task?.categoria?.nombre}{" "}
                <Tag color={task?.categoria?.color}>{task?.categoria?.color}</Tag>
              </Typography.Paragraph>
            </Card>

            <Card
              bordered={false}
              title={
                <Flex gap={12} align="center">
                  <ContainerOutlined />
                  <Typography.Text>Etiquetas</Typography.Text>
                </Flex>
              }
              style={{ marginTop: "32px" }}
              styles={{
                header: {
                  padding: "0 16px",
                },
                body: {
                  padding: 0,
                },
              }}
            >
              <Flex wrap gap={8} style={{ padding: "16px" }}>
                {task?.etiquetas?.map((e) => (
                  <Tag key={e.etiquetaId} color={e.etiqueta.color}>
                    {e.etiqueta.nombre}
                  </Tag>
                ))}
              </Flex>
            </Card>
          </Col>
        </Row>
      </Form>
    </Show>
  );
};
