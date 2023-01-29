import { DocumentReference } from "@angular/fire/firestore";

export interface EncuentroDto {
    id?: string;
    banner?: string;
    created?: string;
    date?: any;
    description?: string;
    link?: {
        zoom?: string;
    }
    title: string;
    type?: string;
    places?: {
        name: string;
        reference: DocumentReference;
    }[];
    guests?: {
        name: string;
        description?: string;
        reference?: DocumentReference;
    }[];
}

