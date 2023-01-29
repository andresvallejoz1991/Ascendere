import { Timestamp } from "firebase/firestore";

export interface TrainerDto {
    id: string;
    name?: string;
    country?: string;
    email?: string;
    institution?: string;
    position?: string;
    bio?: string;
    img?: string;
}

export interface CursoDto {
    id: string;
    banner?: string;
    content?: string;
    // creator_id?: FirestoreUser;
    created?: any;
    date_end?: Timestamp;
    date_postulation?: Timestamp;
    date_start?: Timestamp;
    description?: string;
    duration?: number;
    modality?: string;
    priority?: string;
    quota?: number;
    title?: string;
    topic?: string;
    addressedTo?: string;
    instructors?: Array<TrainerDto>;
    evaluations?: {
        name: string;
        // reference: FirestoreEvaluation;
    }[];
    activate?: boolean;
    resources?: {
        name: string;
        // reference: FirestoreResource;
    }[];
    skills?: {
        name: string;
        // reference?: FirestoreSkill;
    }[];
    // inscriptions?: Array<Inscription>;
    itinerary?: string;
    places: {
        name: string;
        // reference: FirestorePlace;
        forum?: number;
        id?: string;
        label?: string;
        nickname?: string;
    }[];
    state?: string;
    // Link provisioonal de inscripcion
    link?: string;
    module?: {
        name?: string;
        id?: string;
        label?: string;
        // reference?: FirestoreModule;
    };
    training_axes?: {
        name: string;
        // reference?: FirestoreTrainingAxis;
    };
    synchronous_sessions?: string;
    schedule?: string;
    background?: any;
    type?: string;
    zoom?: string;
}
