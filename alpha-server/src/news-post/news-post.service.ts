import { Injectable } from '@nestjs/common';
import { CreateNewsPostDto, NewsFilterDto, NewsPostStatus } from './dto/create-news-post.dto';
import { Model, PipelineStage } from 'mongoose';
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

    // async findAll() {
    //     return await this.newsPostModel.find({status:NewsPostStatus.PUBLISHED}).populate('author', ['-password', '-email', '-mobileNumber', '-role', '-createdAt', '-updatedAt', '-__v', '-address']);
    // }

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


    async findAll(params: NewsFilterDto) {
        const { search, category, tags, page = 1, limit = 10 } = params;

        const filter: any = {};

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ];
        }

        if (category) {
            filter.category = category;
        }

        if (tags && tags.length > 0) {
            filter.tags = { $in: tags };
        }

        const skip = (page - 1) * limit;

        const pipeline: PipelineStage[] = [
            { $match: filter },

            {
                $facet: {
                    data: [
                        { $sort: { publishedAt: -1 } },
                        { $skip: skip },
                        { $limit: limit },
                        {
                            $addFields: {
                                author: { $toObjectId: "$author" }
                            }
                        },
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'author',
                                foreignField: '_id',
                                as: 'author'
                            }
                        },
                        {
                            $unwind: {
                                path: '$author',
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $project: {
                                title: 1,
                                slug: 1,
                                summary: 1,
                                content: 1,
                                category: 1,
                                tags: 1,
                                status: 1,
                                publishedAt: 1,
                                isBreaking: 1,
                                views: 1,
                                featuredImage: 1,
                                author: {
                                    _id: 1,
                                    name: 1,
                                    email: 1
                                }
                            }
                        }
                    ],

                    totalCount: [
                        { $count: 'count' }
                    ]
                }
            }
        ];

        const result = await this.newsPostModel.aggregate(pipeline);

        const data = result[0]?.data || [];
        const total = result[0]?.totalCount[0]?.count || 0;
        const totalPages = Math.ceil(total / limit);

        return {
            data,
            pagination: {
                total,
                page: Number(page),
                limit,
                totalPages
            }
        };
    }

}
