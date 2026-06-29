import { Module } from '@nestjs/common';
import { DirectusModule } from '../directus/directus.module';
import { NewsController } from './news.controller';

@Module({
  imports: [DirectusModule],
  controllers: [NewsController],
})
export class NewsModule {}
