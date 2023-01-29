
export type IRequest<T> = {
    data: T | null;
    loading: boolean;
    error: Error | null | any;
}; 