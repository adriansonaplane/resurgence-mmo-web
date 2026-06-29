import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { DirectusService } from '../directus/directus.service';

@ApiTags('content')
@Public()
@Controller('content')
export class ContentController {
  constructor(private readonly directusService: DirectusService) {}

  @Get('docs')
  docs() {
    return {
      docs: this.directusService.publishedCollection('docs'),
      sourceOfTruth: 'Directus',
      directusUrl: this.directusService.publicUrl,
    };
  }

  @Get('docs/:slug')
  doc(@Param('slug') slug: string) {
    return {
      doc: this.directusService.publishedItem('docs', slug) ?? { slug, title: slug, body: null },
      sourceOfTruth: 'Directus',
      directusUrl: this.directusService.publicUrl,
    };
  }

  @Get('portfolio')
  portfolio() {
    return { projects: this.directusService.publishedCollection('portfolio'), sourceOfTruth: 'Directus', directusUrl: this.directusService.publicUrl };
  }

  @Get('media-gallery')
  mediaGallery() {
    return { assets: this.directusService.publishedCollection('media_gallery'), sourceOfTruth: 'Directus', directusUrl: this.directusService.publicUrl };
  }

  @Get('alpha-info')
  alphaInfo() {
    return {
      alpha: this.directusService.publishedItem('alpha_info', 'alpha-status') ?? { status: 'not_announced' },
      sourceOfTruth: 'Directus',
      directusUrl: this.directusService.publicUrl,
    };
  }
}
