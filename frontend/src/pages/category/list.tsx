import type { PropsWithChildren } from "react";
import { CreateButton, List, useTable } from "@refinedev/antd";
import { CategoryTable } from "@/domains/category/components/list/CategoryTable";
import { useGo } from "@refinedev/core";


export const CategoryPageList = ({ children }: PropsWithChildren) => {
    const { tableProps } = useTable<any>({
        pagination: { mode: "off" },
    });
    const go = useGo();

    return (
        <List title="Categorías"
            headerButtons={() => (
                <CreateButton
                    size="large"
                    onClick={() => go({ to: { resource: "categorias", action: "create" }, options: { keepQuery: true } })}
                >
                    Añadir nueva tarea
                </CreateButton>
            )}
        >
            <CategoryTable tableProps={tableProps} />
            {children}
        </List>
    );
};
