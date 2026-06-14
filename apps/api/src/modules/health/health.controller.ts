import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('health')
@Public()
@Controller()
export class HealthController {
  @Get('health')
  health() {
    return { status: 'ok', service: 'website-api' };
  }

  @Get('ready')
  ready() {
    return {
      status: 'ready',
      checks: {
        config: true,
        database: Boolean(process.env.DATABASE_URL),
      },
    };
  }
}
