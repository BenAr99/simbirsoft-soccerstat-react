export type PaginationProps = {
    count: number;
    perPage: number;
    maxPagesView?: number;
    onChange: (range: [number, number]) => void;
};