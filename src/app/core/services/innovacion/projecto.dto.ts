import { DocumentReference } from "firebase/firestore";

export type State = "approved" | "disapproved" | "in-review" | 'changed' | 'low';

export interface AcademicFaculties {
    id: string;
    name: string;
    dean: {
        name: string;
        email: string;
    };
    vicedean: {
        name: string;
        email: string;
    };
}

export interface Budget {
    id?: string;
    name: String;
    price: String;
    quantity: Number;
}


export interface Team {
    id: number;
    name?: string;
    collaborator: {
        displayName: string;
        reference: any;
    };
    subject: {
        name: string;
        reference: any;
    };
    degree: {
        name: string;
        area?: any;
    };
    student: {
        total: number;
        men: number;
        women: number;
    }
    modality: {
        value: string,
        name: string
    };
}

export interface ProyectoDto {
    nro?: number,
    id?: string;
    academicPeriods?: Array<any>;
    periods?: any; // Base de datos Antigua
    areas?: {
        name?: string;
        label?: string;
        reference: DocumentReference;
    }[];
    faculties?: AcademicFaculties[];
    update?: Date;
    state?: State;
    review?: boolean;
    continuation?: boolean;
    collaborators: Team[];
    subjectString: string;
    subject?: {
        name: string;
        reference: any;
    }[];
    commet?: string;
    coordinator: {
        name: string;
        reference: any;
    };
    evidences: Array<string>;
    introduction: string;
    objetivesGeneral: string;
    objetivesSpecific: Array<string>;
    keyWords: {
        name: string;
    }[];
    keyWordsString?: string; //Base Anterior
    results: Array<string>;
    strategicLine: string | {
        id?: string;
        name?: string;
        label?: string;
        reference: any;
    };
    pedagogicStategy?: {
        id?: string;
        name?: string;
        label?: string;
        reference: any;
    };
    title: string;
    description?: string;
    schedule?: string;
    resources: {
        infographic?: string;
        podcast?: string;
        report?: string;
        video?: string;
    };
    material?: string;
    budget: Array<Budget>;
    type: {
        id?: string;
        name?: string;
        period?: string;
    };
    potential?: string; // Potencial de la innovacion
    created: any;
    inform?: boolean; //si subioo informe
    peer?: string[];
    changed?: boolean;
}

export interface Path {
    segments: string[];
    offset: number;
    len: number;
}

export interface Key {
    path: Path;
}

export interface Options {
    projectId: string;
    appId: string;
    databaseURL: string;
    storageBucket: string;
    locationId: string;
    apiKey: string;
    authDomain: string;
    messagingSenderId: string;
    measurementId: string;
}

export interface Config {
    name: string;
    automaticDataCollectionEnabled: boolean;
}

export interface Providers {
}

export interface Container {
    name: string;
    providers: Providers;
}

export interface App {
    _isDeleted: boolean;
    _options: Options;
    _config: Config;
    _name: string;
    _automaticDataCollectionEnabled: boolean;
    _container: Container;
}

export interface DatabaseId {
    projectId: string;
    database: string;
}

export interface Settings {
    host: string;
    ssl: boolean;
    ignoreUndefinedProperties: boolean;
    cacheSizeBytes: number;
    experimentalForceLongPolling: boolean;
    experimentalAutoDetectLongPolling: boolean;
    useFetchStreams: boolean;
}

export interface Area {
    name: string;
    reference: DocumentReference;
}

export interface Coordinator {
    name: string;
}

export interface Collaborator {
    name: string;
}

export interface Type {
    name: string;
    id: string;
    period: string;
}


