import { Flex } from "antd";
import { EditButton, DeleteButton } from "@refinedev/antd";
import { EditOutlined } from "@ant-design/icons";
import { AnyObject } from "antd/es/_util/type";

export const TaskColumnActions = ({ record }: AnyObject) => (
    <Flex align="center" gap={8}>
        <EditButton hideText recordItemId={record.id} icon={<EditOutlined />} />
        <DeleteButton hideText recordItemId={record.id} resource="tareas" />
    </Flex>
);
