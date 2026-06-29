import { Module } from '@nestjs/common';
import { DirectusModule } from '../directus/directus.module';
import { ContentController } from './content.controller';

@Module({
  imports: [DirectusModule],
  controllers: [ContentController],
})
export class ContentModule {}
