export const TaskColumnDueDate = ({ value }: { value: string }) =>
    value ? new Date(value).toLocaleDateString() : "-";
