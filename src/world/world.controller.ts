import { Controller, Get, Post } from '@nestjs/common';
import { WorldService } from './world.service';

@Controller('api/world')
export class WorldController {
  constructor(private readonly worldService: WorldService) {}

  // Khởi tạo thế giới
  @Post('init')
  async initWorld() {
    return this.worldService.initWorld();
  }

  // Tick thời gian (mỗi lần gọi là 1 chu kỳ)
  @Post('tick')
  async tickWorld() {
    return this.worldService.tick();
  }

  // Xem trạng thái hiện tại của thế giới
  @Get('state')
  async getWorldState() {
    return this.worldService.getWorldState();
  }
}
