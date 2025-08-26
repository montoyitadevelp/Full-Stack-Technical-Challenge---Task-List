import { Flex, Tag } from "antd";

export const TaskColumnTags = ({ tags }: { tags: any[] }) => (
    <Flex wrap="wrap" gap={4}>
        {tags?.map((t) => (
            <Tag
                key={t.etiquetaId}
                style={{
                    backgroundColor: t.etiqueta.color,
                    color: "#fff",
                    fontWeight: 500,
                    borderRadius: 8,
                }}
            >
                {t.etiqueta.nombre}
            </Tag>
        ))}
    </Flex>
);
