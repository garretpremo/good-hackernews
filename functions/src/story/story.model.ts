import { AppComment } from '../comment/comment.model';

export interface Story {
    id: number;
    by: string;
    descendants: number;
    score: number;
    time: number;
    title: string;
    kids?: number[];
    text?: string;
    url?: string;
    comments?: AppComment[];
}
