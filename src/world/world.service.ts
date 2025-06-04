import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorldState, WorldStateDocument } from './schemas/world-state.schema';
import { INITIAL_ELEMENTS, INITIAL_LINH_KHI, GAS_REGEN_RATE } from './constants/base-values';

@Injectable()
export class WorldService {
  constructor(
    @InjectModel(WorldState.name) private worldModel: Model<WorldStateDocument>,
  ) {}

  async initWorld() {
    const exists = await this.worldModel.findOne();
    if (exists) throw new Error('World already initialized.');

    const world = new this.worldModel({
      age: 0,
      totalElements: { ...INITIAL_ELEMENTS },
      availableElements: { ...INITIAL_ELEMENTS },
      totalLinhKhi: INITIAL_LINH_KHI,
      availableLinhKhi: INITIAL_LINH_KHI,
      stability: 100,
    });

    return world.save();
  }

  async tick() {
    const world = await this.worldModel.findOne();
    if (!world) throw new NotFoundException('World not initialized.');

    world.age += 1;

    // Tái sinh một lượng nhỏ khí từ hỗn độn
    for (const key of Object.keys(world.availableElements)) {
      const regen = world.totalElements[key] * GAS_REGEN_RATE;
      world.availableElements[key] += regen;
    }

    // Tái sinh linh khí
    const linhRegen = world.totalLinhKhi * GAS_REGEN_RATE;
    world.availableLinhKhi += linhRegen;

    // Tính lại độ ổn định vũ trụ
    const elements = Object.values(world.availableElements);
    const avg = elements.reduce((sum, v) => sum + v, 0) / elements.length;
    const deviation = elements.reduce((sum, v) => sum + Math.abs(v - avg), 0);
    world.stability = Math.max(0, 100 - deviation / (avg * 0.1)); // Deviation càng lớn thì stability càng giảm

    return world.save();
  }

  async getWorldState() {
    const world = await this.worldModel.findOne();
    if (!world) throw new NotFoundException('World not initialized.');
    return world;
  }
}
