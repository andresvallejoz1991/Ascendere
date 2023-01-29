import { Timestamp } from "firebase/firestore";

export interface ScheduleDto {
    id?: string;
    title: string;
    banner?: string;
    description?: string;
    start?: Timestamp;
    end?: Timestamp;
    created: Timestamp;
    link?: {
        inscription?: string;
        related?: string;
        zoom?: string;
        facebook: string;
        path?: string;
    };
    flyer?: string;
    type?: string;
    speaker?: {
        name: string;
        jobTitle: string;
    }
}
