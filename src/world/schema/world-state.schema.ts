import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorldStateDocument = WorldState & Document;

@Schema()
export class WorldState {
  @Prop({ default: 0 })
  age: number; // Tuổi vũ trụ (tick count)

  @Prop({ type: Object, required: true })
  totalElements: Record<string, number>; // Tổng lượng khí khởi tạo (bất biến)

  @Prop({ type: Object, required: true })
  availableElements: Record<string, number>; // Khí còn khả dụng

  @Prop({ required: true })
  totalLinhKhi: number;

  @Prop({ required: true })
  availableLinhKhi: number;

  @Prop({ default: 100 })
  stability: number; // Độ ổn định vũ trụ
}

export const WorldStateSchema = SchemaFactory.createForClass(WorldState);
