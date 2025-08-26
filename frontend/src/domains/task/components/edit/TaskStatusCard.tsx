import { Card, Flex, Typography, Tag } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

export const TaskStatusCard = ({ task }: any) => (
    <Card bordered={false} title={<Flex gap={12} align="center"><CheckCircleOutlined /><Typography.Text>Estado</Typography.Text></Flex>} style={{ padding: 0 }}>
        <Typography.Paragraph style={{ padding: "16px" }}>
            {task?.completada ? <Tag color="green">Completada</Tag> : <Tag color="red">Pendiente</Tag>}
        </Typography.Paragraph>
    </Card>
);
