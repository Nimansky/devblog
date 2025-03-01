import { Schema, model, models } from 'mongoose';

interface IPost {
    url: string;
    title: string;
    date: Date;
    content: string;
}

const postSchema = new Schema<IPost>({
    url: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true},
    content: { type: String, required: true },
});

export const Post = models.Post || model<IPost>('Post', postSchema);