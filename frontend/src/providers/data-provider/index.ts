import dataProviderSimpleRest from "@refinedev/simple-rest";
import { axiosInstance } from "@/providers/axios";
import { API_URL } from "@/utils/constants";
import { DataProvider } from "@refinedev/core";

export const baseProvider = dataProviderSimpleRest(API_URL, axiosInstance);

export const customDataProvider: DataProvider = {
    ...baseProvider,
    getList: async ({ resource, pagination, filters, sorters }: any) => {
        const params: Record<string, any> = {};


        if (pagination && pagination.mode !== "off") {
            params.page = pagination.current;
            params.pageSize = pagination.pageSize;
        }


        filters?.forEach((filter: any) => {
            if (filter.value === undefined || filter.value === null || filter.value === "") return;

            switch (filter.field) {
                case "completada":
                    params.completed = filter.value === "Si"
                    break;
                case "categoriaId":
                    params.category = filter.value;
                    break;
                case "prioridad":
                    params.priority = filter.value;
                    break;
                case "etiquetas":
                    if (Array.isArray(filter.value)) {
                        filter.value.forEach((t: any) => {
                            const tagId = typeof t === "object" ? t.id || t.value : t;
                            if (!params.tags) params.tags = [];
                            params.tags.push(tagId);
                        });
                    }
                    break;
                case "fechaVencimiento":
                    if (Array.isArray(filter.value)) {

                        if (filter.value.length > 0) {
                            params.dueDateStart = filter.value[0];
                            params.dueDateEnd = filter.value[filter.value.length - 1];
                        }
                    }
                    break;
                case "search":
                    params.search = filter.value;
                    break;
                default:
                    params[filter.field] = filter.value;
                    break;
            }
        });


        if (sorters?.length) {
            params.ordenar = sorters[0].field;
            params.direccion = sorters[0].order;
        }

        const queryParams = { ...params };
        if (params.tags) {
            delete queryParams.tags;
        }

        const queryString = params.tags
            ? params.tags.map((t: string) => `tags=${t}`).join("&")
            : "";

        const response = await axiosInstance.get(`/${resource}?${queryString}`, {
            params: queryParams,
        });


        return {
            data: response.data.items ?? response.data,
            total: response.data.total ?? response.data?.length ?? 0,
        };
    },
};

export const dataProvider = customDataProvider;