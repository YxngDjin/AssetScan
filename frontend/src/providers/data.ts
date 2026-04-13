import { createDataProvider, CreateDataProviderOptions } from '@refinedev/rest';
import { BACKEND_BASE_URL } from '@/constants';
import { ListResponse, GetOneResponse, CreateResponse } from '@/types';

const options: CreateDataProviderOptions = {
  getList: {
    getEndpoint: ({ resource }) => resource,

    buildQueryParams: async ({ resource, pagination, filters }) => {
      const params: Record<string, string |number> = {};

      if (pagination?.mode !== "off") {
        const page = pagination?.currentPage ?? 1;
        const pageSize = pagination?.pageSize ?? 10;

        params.page = page;
        params.limit = pageSize;
      }

      filters?.forEach((filter) => {
        const field = "field" in filter ? filter.field : "";
        const value = String(filter.value);

        if (resource === "items") {
          if (
            field === "name" ||
            field === "description" ||
            field === "category"
          ) {
            params.search = value;
          }
        }
      });
      return params;
    },

    mapResponse: async (response) => {
      const payload: ListResponse = await response.json();
      return payload.data ?? [];
    },

    getTotalCount: async (response) => {
      const payload: ListResponse = await response.json();
      return payload.pagination?.total ?? payload.data?.length ?? 0;
    },
  },

  create: {
    getEndpoint: ({ resource }) => resource,

    buildBodyParams: async ({ variables }) => variables,

    mapResponse: async (response) => {
      const json: CreateResponse = await response.json();
      return json.data ?? {};
    },
  },

  getOne: {
    getEndpoint: ({ resource, id }) => `${resource}/${id}`,

    mapResponse: async (response) => {
      const json: GetOneResponse = await response.json();
      return json.data ?? {};
    },
  },
  deleteOne: {
    getEndpoint: ({ resource, id }) => `${resource}/${id}`,
  },

  update: {
    getEndpoint: ({ resource, id }) => `${resource}/${id}`,

    buildBodyParams: async ({ variables }) => variables,

    mapResponse: async (response) => {
      const json: GetOneResponse = await response.json();
      return json.data ?? {};
    },
  }
};

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);

export { dataProvider };


