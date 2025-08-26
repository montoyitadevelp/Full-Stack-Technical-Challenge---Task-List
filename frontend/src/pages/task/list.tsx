import type { PropsWithChildren } from "react";
import { List, CreateButton } from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import { useTasksTable } from "@/domains/task/hooks/useTask";
import { TaskTable } from "@/domains/task/components/list/TaskTable";


export const TasksPageList = ({ children }: PropsWithChildren) => {
  const go = useGo();
  const { tableProps, categoriaSelectProps, etiquetasSelectProps } = useTasksTable();

  return (
    <List
      title="Tareas"
      headerButtons={() => (
        <CreateButton
          size="large"
          onClick={() => go({ to: { resource: "tareas", action: "create" }, options: { keepQuery: true } })}
        >
          Añadir nueva tarea
        </CreateButton>
      )}
    >
      <TaskTable tableProps={tableProps} categoriaSelectProps={categoriaSelectProps} etiquetasSelectProps={etiquetasSelectProps} />
      {children}
    </List>
  );
};
