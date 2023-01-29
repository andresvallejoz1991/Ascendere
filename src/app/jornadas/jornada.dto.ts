export interface JornadaDto {
    id: string;
    title: string;
    content: string;
    date: any;
    resources?: {
        name: string;
        link: string;
    }[];
}
