import { Table, Tag, Flex } from "antd";
import { DeleteButton } from "@refinedev/antd";

type LabelTableProps = {
    tableProps: Record<string, any>;
};

export const LabelTable = ({ tableProps }: LabelTableProps) => {
    return (
        <Table {...tableProps} rowKey="id" scroll={{ x: 600 }}>
            <Table.Column
                title="Nombre"
                dataIndex="nombre"
                key="nombre"
                render={(value: string) => <span>{value}</span>}
            />

            <Table.Column
                title="Color"
                dataIndex="color"
                key="color"
                render={(value: string) => (
                    <Tag color={value} style={{ borderRadius: 4 }}>
                        {value}
                    </Tag>
                )}
            />

            <Table.Column
                title="Acciones"
                key="actions"
                render={(_, record: any) => (
                    <Flex align="center" gap={8}>
                        <DeleteButton hideText recordItemId={record.id} />
                    </Flex>
                )}
            />
        </Table>
    );
};
