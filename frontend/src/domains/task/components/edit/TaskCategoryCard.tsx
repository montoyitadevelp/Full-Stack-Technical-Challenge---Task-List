import { Card, Flex, Tag, Typography } from "antd";
import { ContainerOutlined } from "@ant-design/icons";

export const TaskCategoryCard = ({ task }: any) => (
    <Card bordered={false} title={<Flex gap={12} align="center"><ContainerOutlined /><Typography.Text>Categoría</Typography.Text></Flex>} style={{ marginTop: "32px", padding: 0 }}>
        <Flex wrap gap={8} style={{ padding: "16px" }}>
            {task?.categoria && <Tag color={task.categoria.color}>{task.categoria.nombre}</Tag>}
        </Flex>
    </Card>
);
