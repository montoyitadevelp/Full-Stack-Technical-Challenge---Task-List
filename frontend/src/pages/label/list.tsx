import type { PropsWithChildren } from "react";
import { CreateButton, List, useTable } from "@refinedev/antd";
import { LabelTable } from "@/domains/label/components/list/LabelTable";
import { useGo } from "@refinedev/core";



export const LabelPageList = ({ children }: PropsWithChildren) => {
    const { tableProps } = useTable<any>({
        pagination: {
            mode: "off",
        },
    });
    const go = useGo();



    return (
        <List title="Etiquetas"
            headerButtons={() => (
                <CreateButton
                    size="large"
                    onClick={() => go({ to: { resource: "etiquetas", action: "create" }, options: { keepQuery: true } })}
                >
                    Añadir nueva etiqueta
                </CreateButton>
            )}
        >
            <LabelTable tableProps={tableProps} />
            {children}
        </List>
    );
};
