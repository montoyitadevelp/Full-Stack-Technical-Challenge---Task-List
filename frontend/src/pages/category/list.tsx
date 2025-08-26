import type { PropsWithChildren } from "react";
import { List, EditButton, DeleteButton, useTable } from "@refinedev/antd";
import { Flex, Table, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";

export const CategoryPageList = ({ children }: PropsWithChildren) => {

    const { tableProps } = useTable<any>({
        pagination: {
            mode: "off"
        },
    });

    return (
        <List
            title="Categorías"
        >
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
                            <EditButton
                                hideText
                                recordItemId={record.id}
                                icon={<EditOutlined />}
                            />
                            <DeleteButton hideText recordItemId={record.id}  />
                        </Flex>
                    )}
                />
            </Table>
            {children}
        </List>
    );
};
