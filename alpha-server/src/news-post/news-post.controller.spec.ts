import { Test, TestingModule } from '@nestjs/testing';
import { NewsPostController } from './news-post.controller';

describe('NewsPostController', () => {
  let controller: NewsPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsPostController],
    }).compile();

    controller = module.get<NewsPostController>(NewsPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
