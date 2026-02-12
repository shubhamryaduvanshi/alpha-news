import { Module } from '@nestjs/common';
import { NewsPostController } from './news-post.controller';
import { NewsPostService } from './news-post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsPostSchema } from './entities/news-post.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'NewsPost', schema: NewsPostSchema }]),

  ],
  controllers: [NewsPostController],
  providers: [NewsPostService]
})
export class NewsPostModule { }
