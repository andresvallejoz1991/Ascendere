import { FieldValue, Timestamp } from "firebase/firestore";

export interface NewsDto {
    description: string;
    img: string;
    relatedContent: string;
    created: Timestamp;
    title: string;
    publishAt: string;
    html: string;
    id: string;

    like?: number;
    dislike?: number;

    likesList?: Array<string>;
    dislikesList?: Array<string>;
}

export type NewsUpdateLikes = Record<keyof Pick<NewsDto, 'likesList' | 'dislikesList'>, FieldValue>;

