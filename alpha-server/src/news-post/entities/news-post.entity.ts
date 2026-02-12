import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { NewsPostStatus } from '../dto/create-news-post.dto';
import { FeaturedImageDto } from '../dto/featured-image.dto';

export type NewsPostDocument = NewsPost & Document;


@Schema({ timestamps: true })
export class NewsPost {
    @Prop({
        required: true,
        trim: true,
        maxlength: 200
    })
    title: string;

    @Prop({
        required: true,
        unique: true,
        lowercase: true,
        index: true,
        trim: true
    })
    slug: string;

    @Prop({
        maxlength: 500
    })
    summary?: string;

    @Prop({
        required: true
    })
    content: string;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    })
    author: Types.ObjectId;

    @Prop({
        index: true
    })
    category?: string;

    @Prop({
        type: [String],
        lowercase: true,
        trim: true,
        index: true
    })
    tags?: string[];

    @Prop({
        enum: NewsPostStatus,
        default: NewsPostStatus.DRAFT,
        index: true
    })
    status: NewsPostStatus;

    @Prop({
        type: Date
    })
    publishedAt?: Date;

    @Prop({
        default: false,
        index: true
    })
    isBreaking: boolean;

    @Prop({
        default: 0
    })
    views: number;

    @Prop({
        type: {
            url: { type: String, required: true },
            alt: { type: String }
        },
        _id: false
    })
    featuredImage?: FeaturedImageDto
}

export const NewsPostSchema = SchemaFactory.createForClass(NewsPost);
