import dataProviderSimpleRest from "@refinedev/simple-rest";
import { axiosInstance } from "@/providers/axios";
import { API_URL } from "@/utils/constants";
import { DataProvider } from "@refinedev/core";

export const baseProvider = dataProviderSimpleRest(API_URL, axiosInstance);

export const customDataProvider: DataProvider = {
    ...baseProvider,
    getList: async ({ resource, pagination, filters, sorters }: any) => {
        const params: Record<string, any> = {};

        if (pagination) {
            params.page = pagination.current;
            params.limit = pagination.pageSize;
        }


        filters?.forEach((filter: any) => {
            if (filter.field === "etiquetas" && Array.isArray(filter.value)) {

                params.etiquetas = filter.value;
            } else {
                params[filter.field] = filter.value;
            }
        });

        if (sorters?.length) {
            params.ordenar = sorters[0].field;
            params.direccion = sorters[0].order;
        }

        const response = await axiosInstance.get(`/${resource}`, { params });



        return {
            data: response.data.items,
            total: response.data.total,
        };
    },
};

export const dataProvider = customDataProvider;

