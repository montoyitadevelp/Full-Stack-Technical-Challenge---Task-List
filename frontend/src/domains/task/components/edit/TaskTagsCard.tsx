import { Card, Flex, Tag, Typography } from "antd";
import { ContainerOutlined } from "@ant-design/icons";
import { Task } from "@/types";

interface TaskTagsCardProps {
    task: Task | undefined
}

export const TaskTagsCard = ({ task }: TaskTagsCardProps) => (
    <Card bordered={false} title={<Flex gap={12} align="center"><ContainerOutlined /><Typography.Text>Etiquetas</Typography.Text></Flex>} style={{ marginTop: "32px", padding: 0 }}>
        <Flex wrap gap={8} style={{ padding: "16px" }}>
            {task?.etiquetas?.map((e: any) => <Tag key={e.etiquetaId} color={e.etiqueta.color}>{e.etiqueta.nombre}</Tag>)}
        </Flex>
    </Card>
);
