export type ListResponse<T = unknown> = {
    data?: T[];
    pagination?: {
        page: number;
        limit: number
        total: number;
        totalPages: number;
        createdAt?: string;
        updatedAt?: string;
    };
};

export type CreateResponse<T = unknown> = {
    data?: T;
}

export type GetOneResponse<T = unknown> = {
    data?: T;
}