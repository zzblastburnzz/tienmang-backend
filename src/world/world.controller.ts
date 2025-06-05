import { 
  Controller, 
  Get, 
  Post, 
  Param, 
  BadRequestException 
} from '@nestjs/common';
import { WorldService } from './world.service';
import { ELEMENT_TYPES } from './constants/base-values';

@Controller('world')
export class WorldController {
  constructor(private readonly worldService: WorldService) {}

  @Post('init')
  async initializeWorld() {
    return this.worldService.initializeWorld();
  }

  @Post('tick')
  async tickWorld() {
    return this.worldService.tickWorld();
  }

  @Get('state')
  async getWorldState() {
    return this.worldService.getWorldState();
  }

  @Get('element-decay/:element')
  async getElementDecayInfo(@Param('element') element: string) {
    if (!ELEMENT_TYPES.includes(element as any)) {
      throw new BadRequestException('Invalid element type');
    }
    return this.worldService.getElementDecayInfo(element as any);
  }

  @Get('decay-rates')
  async getAllDecayRates() {
    const rates = {};
    for (const element of ELEMENT_TYPES) {
      rates[element] = await this.worldService.getElementDecayInfo(element);
    }
    return rates;
  }
}