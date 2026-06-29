import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { Auth0Guard } from '../../common/guards/auth0.guard';
import { ProfileService } from './profile.service';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(Auth0Guard)
  me(@CurrentUser() user: CurrentUser) {
    return { profile: this.profileService.getMyProfile(user.sub, user.email) };
  }

  @Patch('settings')
  @ApiBearerAuth()
  @UseGuards(Auth0Guard)
  updateSettings(
    @CurrentUser() user: CurrentUser,
    @Body() body: { publicName?: string; displayName?: string; visibility?: 'private' | 'public' },
  ) {
    return { profile: this.profileService.updateSettings(user.sub, body) };
  }

  @Public()
  @Get(':publicName')
  publicProfile(@Param('publicName') publicName: string) {
    return { profile: this.profileService.findPublicProfile(publicName) };
  }

  @Public()
  @Get(':publicName/characters')
  characters(@Param('publicName') publicName: string) {
    return this.profileService.listCharacters(publicName);
  }

  @Public()
  @Get(':publicName/achievements')
  achievements(@Param('publicName') publicName: string) {
    return this.profileService.listAchievements(publicName);
  }
}
