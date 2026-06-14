import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth0Guard } from '../../common/guards/auth0.guard';

@ApiTags('characters')
@ApiBearerAuth()
@UseGuards(Auth0Guard)
@Controller('account/characters')
export class CharactersController {
  @Get()
  listCharacterSummaries() {
    return {
      characters: [
        { externalCharacterId: 'preview-barbarian', name: 'Rook', className: 'Barbarian', level: 12 },
      ],
      gameAuthority: 'Live inventory, combat, movement, and world state are owned by the game backend.',
    };
  }
}
