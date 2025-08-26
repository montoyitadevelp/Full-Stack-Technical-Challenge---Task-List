import { Card, Flex, Tag, Typography } from "antd";
import { ContainerOutlined } from "@ant-design/icons";

export const TaskTagsCard = ({ task }: any) => (
    <Card bordered={false} title={<Flex gap={12} align="center"><ContainerOutlined /><Typography.Text>Etiquetas</Typography.Text></Flex>} style={{ marginTop: "32px", padding: 0 }}>
        <Flex wrap gap={8} style={{ padding: "16px" }}>
            {task?.etiquetas?.map((e: any) => <Tag key={e.etiquetaId} color={e.etiqueta.color}>{e.etiqueta.nombre}</Tag>)}
        </Flex>
    </Card>
);
