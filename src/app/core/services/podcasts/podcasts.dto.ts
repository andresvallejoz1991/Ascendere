import { FieldValue, Timestamp } from "@angular/fire/firestore";

export interface PodcastDto {
    thumbnail: string;
    id: string;
    dislike?: number;
    created: Timestamp;
    enclosure: { type: string, link: string };
    area: string;
    title: string;
    like?: number;
    content: string;
    link?: number;
    likesList?: Array<string>;
    dislikesList?: Array<string>;
}

export type PodcastUpdateLikes = Record<keyof Pick<PodcastDto, 'likesList' | 'dislikesList'>, FieldValue>;
