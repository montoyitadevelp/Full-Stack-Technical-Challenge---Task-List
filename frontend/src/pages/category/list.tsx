import type { PropsWithChildren } from "react";
import { List, useTable } from "@refinedev/antd";
import { CategoryTable } from "@/domains/category/components/list/CategoryTable";


export const CategoryPageList = ({ children }: PropsWithChildren) => {
    const { tableProps } = useTable<any>({
        pagination: { mode: "off" },
    });

    return (
        <List title="Categorías">
            <CategoryTable tableProps={tableProps} />
            {children}
        </List>
    );
};
