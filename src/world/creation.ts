import { Injectable, Logger } from '@nestjs/common';
import { WorldStateService } from './state.service';

@Injectable()
export class WorldCreationService {
  private readonly logger = new Logger(WorldCreationService.name);

  constructor(private readonly worldStateService: WorldStateService) {}

  async initializeWorld() {
    const existing = await this.worldStateService.getCurrentState();
    if (existing.age > 0) {
      this.logger.warn('🌍 Thế giới đã tồn tại, bỏ qua khởi tạo.');
      return existing;
    }

    this.logger.log('☯️ Hỗn Độn phân tách Quang – Ám...');
    this.logger.log('🌀 Thái Cực sinh ra Ngũ Hành...');

    const created = await this.worldStateService.createInitialState();
    this.logger.log('🌏 Thế giới sơ khai đã hình thành.');
    return created;
  }
}
