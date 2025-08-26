import { Tag } from "antd";

export const TaskColumnPriority = ({ value }: { value: string }) => {
    const color =
        value === "high" ? "red" : value === "medium" ? "orange" : "green";

    return <Tag color={color}>{value.toUpperCase()}</Tag>;
};
