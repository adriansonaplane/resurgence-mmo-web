import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('news')
@Public()
@Controller('news')
export class NewsController {
  @Get()
  list() {
    return { posts: [] };
  }
}
