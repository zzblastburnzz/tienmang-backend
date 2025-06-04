import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorldState, ElementType } from './world-state.schema';

@Injectable()
export class WorldStateService {
  private readonly logger = new Logger(WorldStateService.name);

  constructor(
    @InjectModel(WorldState.name)
    private readonly worldModel: Model<WorldState>,
  ) {}

  async getCurrentState(): Promise<WorldState> {
    let world = await this.worldModel.findOne().exec();

    if (!world) {
      world = await this.createInitialState();
    }

    return world;
  }

  async createInitialState(): Promise<WorldState> {
    const elements: Record<ElementType, number> = {
      Kim: 10000,
      Mộc: 10000,
      Thủy: 10000,
      Hỏa: 10000,
      Thổ: 10000,
    };

    const spiritualQi: Record<ElementType, number> = {
      Kim: 100,
      Mộc: 100,
      Thủy: 100,
      Hỏa: 100,
      Thổ: 100,
    };

    this.logger.log('🌌 Khởi tạo thế giới hỗn độn → Thái cực → Ngũ hành');

    const newWorld = new this.worldModel({
      chaos: 100,
      cycle: 0,
      age: 0,
      elements,
      stability: 100,
      spiritualQi,
    });

    return await newWorld.save();
  }

  async updateElements(delta: Partial<Record<ElementType, number>>) {
    const world = await this.getCurrentState();
    for (const key in delta) {
      world.elements[key as ElementType] += delta[key as ElementType] ?? 0;
    }
    world.updatedAt = new Date();
    return await world.save();
  }

  async updateSpiritualQi(delta: Partial<Record<ElementType, number>>) {
    const world = await this.getCurrentState();
    if (!world.spiritualQi) world.spiritualQi = { Kim: 0, Mộc: 0, Thủy: 0, Hỏa: 0, Thổ: 0 };
    for (const key in delta) {
      world.spiritualQi[key as ElementType] += delta[key as ElementType] ?? 0;
    }
    world.updatedAt = new Date();
    return await world.save();
  }
}
