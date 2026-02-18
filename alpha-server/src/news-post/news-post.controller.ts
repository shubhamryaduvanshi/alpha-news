import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req } from '@nestjs/common';
import { CreateNewsPostDto, NewsFilterDto, NewsPostStatus, PublishPostDto } from './dto/create-news-post.dto';
import { NewsPostService } from './news-post.service';
import { UpdateNewsPostDto } from './dto/update-news-post.dto';
import { Public } from 'src/auth/auth.constant';

@Controller('news-post')
export class NewsPostController {
    constructor(private readonly newsPostService: NewsPostService) { }

    @Post()
    async create(@Body() createNewsPostDto: CreateNewsPostDto) {
        return await this.newsPostService.create(createNewsPostDto);
    }

    @Public()
    @Get('all')
    async findAll(@Query() queryObjects: NewsFilterDto) {
        return await this.newsPostService.findAll(queryObjects);
    }


    @Get()
    async findMyPosts(@Req() req: Request) {
        const userId = req['user'].userId;
        return this.newsPostService.findMyPosts(userId);
    }

    @Patch('publish')
    async publish(@Body() publishPost: PublishPostDto, @Req() req: Request) {
        const userId = req['user'].userId;
        return await this.newsPostService.publish(publishPost.postId, userId);
    }

    @Put(':postId')
    async update(@Param('postId') postId: string, @Body() updateNewsPost: UpdateNewsPostDto) {
        updateNewsPost._id = postId;
        return this.newsPostService.update(updateNewsPost);
    }

    @Delete(':postId')
    async delete(@Param('postId') postId: string) {
        return this.newsPostService.delete(postId);
    }



}
