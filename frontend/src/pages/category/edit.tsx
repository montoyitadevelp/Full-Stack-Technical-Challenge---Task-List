

import { Show } from "@refinedev/antd";
import { CategoryForm } from "@/domains/category/components/edit/CategoryForm";

export const CategoryPageEdit = () => {
    return (
        <Show title="Editar Categoría" goBack>
            <CategoryForm />
        </Show>
    );
};
