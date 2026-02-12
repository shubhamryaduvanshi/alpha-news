import { Injectable } from '@nestjs/common';
import { CreateNewsPostDto, NewsPostStatus } from './dto/create-news-post.dto';
import { Model } from 'mongoose';
import { NewsPost } from './entities/news-post.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateNewsPostDto } from './dto/update-news-post.dto';

@Injectable()
export class NewsPostService {
    constructor(
        @InjectModel(NewsPost.name)
        private readonly newsPostModel: Model<NewsPost>
    ) { }

    async create(createNewsPostDto: CreateNewsPostDto) {
        try {
            await this.newsPostModel.create(createNewsPostDto);
            return {
                message: 'News post created successfully'
            }
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        return await this.newsPostModel.find({status:NewsPostStatus.PUBLISHED}).populate('author', ['-password', '-email', '-mobileNumber', '-role', '-createdAt', '-updatedAt', '-__v', '-address']);
    }

    async findMyPosts(userId: string) {
        return await this.newsPostModel.find({ author: userId }).populate('author', ['-password', '-email', '-mobileNumber', '-role', '-createdAt', '-updatedAt', '-__v', '-address']);
    }

    async publish(postId: string, userId: string) {
        const post = await this.newsPostModel.findById(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        if (post.author.toString() !== userId) {
            throw new Error('Unauthorized to publish this post');
        }
        post.status = NewsPostStatus.PUBLISHED;
        await post.save();
        return {
            message: 'Post published successfully'
        }
    }


    async update(updateNewsPost: UpdateNewsPostDto) {
        try {
            const updatedPost = await this.newsPostModel.findByIdAndUpdate(updateNewsPost._id, updateNewsPost, { new: true });
            return updatedPost;
        } catch (error) {
            throw error;
        }
    }


    async delete(postId: string) {
        try {
            await this.newsPostModel.findByIdAndDelete(postId);
            return {
                message: 'Post deleted successfully'
            }
        } catch (error) {
            throw error;
        }
    }


}
