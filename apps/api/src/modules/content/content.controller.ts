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
      docs: [],
      sourceOfTruth: 'Directus',
      directusUrl: this.directusService.publicUrl,
    };
  }

  @Get('docs/:slug')
  doc(@Param('slug') slug: string) {
    return {
      doc: { slug, title: slug, body: null },
      sourceOfTruth: 'Directus',
      directusUrl: this.directusService.publicUrl,
    };
  }

  @Get('portfolio')
  portfolio() {
    return { projects: [], sourceOfTruth: 'Directus', directusUrl: this.directusService.publicUrl };
  }

  @Get('media-gallery')
  mediaGallery() {
    return { assets: [], sourceOfTruth: 'Directus', directusUrl: this.directusService.publicUrl };
  }

  @Get('alpha-info')
  alphaInfo() {
    return { alpha: { status: 'not_announced' }, sourceOfTruth: 'Directus', directusUrl: this.directusService.publicUrl };
  }
}
