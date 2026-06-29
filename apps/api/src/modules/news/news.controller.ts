import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { DirectusService } from '../directus/directus.service';

@ApiTags('news')
@Public()
@Controller('news')
export class NewsController {
  constructor(private readonly directusService: DirectusService) {}

  @Get()
  list() {
    return { posts: this.directusService.publishedCollection('news_posts') };
  }
}
