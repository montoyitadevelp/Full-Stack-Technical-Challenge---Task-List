import type { PropsWithChildren } from "react";
import { List, useTable } from "@refinedev/antd";
import { LabelTable } from "@/domains/label/components/list/LabelTable";



export const LabelPageList = ({ children }: PropsWithChildren) => {
    const { tableProps } = useTable<any>({
        pagination: {
            mode: "off",
        },
    });
  
   

    return (
        <List title="Etiquetas">
            <LabelTable tableProps={tableProps} />
            {children}
        </List>
    );
};
