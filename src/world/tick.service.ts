import { Injectable, Logger } from '@nestjs/common';
import { WorldStateService } from './state.service';
import { ElementType } from './world-state.schema';

@Injectable()
export class WorldTickService {
  private readonly logger = new Logger(WorldTickService.name);

  // Thiết lập cấu hình tick
  private decayRate = 0.002; // Tỷ lệ phân rã ngũ hành mỗi tick
  private qiRegen = 1;       // Số điểm linh khí mỗi hành được phục hồi từ hỗn độn mỗi tick

  constructor(private readonly worldStateService: WorldStateService) {}

  async tick() {
    const world = await this.worldStateService.getCurrentState();

    this.logger.log(`⏳ Tick thời gian | Tuổi vũ trụ: ${world.age}, Chu kỳ: ${world.cycle}`);

    // 1. Giảm ngũ hành theo decayRate
    const decayDelta: Partial<Record<ElementType, number>> = {};
    for (const element of ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'] as ElementType[]) {
      const current = world.elements[element];
      const decay = Math.floor(current * this.decayRate);
      decayDelta[element] = -decay;
    }
    await this.worldStateService.updateElements(decayDelta);

    // 2. Bổ sung linh khí từ hỗn độn
    const qiDelta: Partial<Record<ElementType, number>> = {
      Kim: this.qiRegen,
      Mộc: this.qiRegen,
      Thủy: this.qiRegen,
      Hỏa: this.qiRegen,
      Thổ: this.qiRegen,
    };
    await this.worldStateService.updateSpiritualQi(qiDelta);

    // 3. Cập nhật thời gian
    const updated = await this.worldStateService.getCurrentState();
    updated.age += 1;
    await updated.save();

    thi
