
export interface Type {
    name: string;
    label: string;
}

export interface RecursoDto {
    description: string;
    password: string;
    type: Type[];
    id: string;
    logo: string;
    name: string;
    licence: boolean;
    videos?: Array<string>
}
