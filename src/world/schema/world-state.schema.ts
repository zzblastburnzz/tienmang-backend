import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ElementType, ELEMENT_TYPES, STABILITY_THRESHOLDS } from '../constants/base-values';

export type WorldStateDocument = WorldState & Document;

@Schema({ timestamps: true })
export class WorldState {
  @Prop({ default: 0 })
  age: number;

  @Prop({ type: Object, required: true })
  totalElements: Record<ElementType, number>;

  @Prop({ type: Object, required: true })
  availableElements: Record<ElementType, number>;

  @Prop({ required: true })
  totalLinhKhi: number;

  @Prop({ required: true })
  availableLinhKhi: number;

  @Prop({ default: STABILITY_THRESHOLDS.MAX })
  stability: number;

  @Prop({ default: 'stable' })
  stabilityStatus: 'critical' | 'unstable' | 'stable';

  @Prop({ type: Object })
  elementHistory: Record<ElementType, number[]>;

  @Prop({ type: Object })
  regenHistory: Record<string, Array<{
    tick: number;
    rate: number;
    amount: number;
  }>>;

  @Prop({ type: Object })
  elementHalfLives: Record<ElementType, number>;

  @Prop({ default: 0 })
  totalEntities: number;
}

export const WorldStateSchema = SchemaFactory.createForClass(WorldState);