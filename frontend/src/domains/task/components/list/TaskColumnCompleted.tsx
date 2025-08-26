import { Switch } from "antd";
import { useToggleComplete } from "../../hooks/useTask";
import type { Task } from "@/types";

export const TaskColumnCompleted = ({ value, record }: { value: boolean; record: Task }) => {
    const toggleComplete = useToggleComplete();

    return (
        <Switch
            checked={record.completada}
            onChange={(checked) => {
                record.completada = checked
                toggleComplete.mutate({ id: record.id, values: { completada: checked } })
            }
            }
        />
    );
};
