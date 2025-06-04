import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EntityDocument = Entity & Document;

@Schema()
export class Entity {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 0 })
  age: number;

  @Prop({ default: 'active' }) // 'active' | 'decaying' | 'dead'
  status: string;

  @Prop({ type: Object, required: true })
  composition: Record<string, number>; // Khí ngũ hành tạo thành vật thể

  @Prop({ default: 0 })
  linhKhiAbsorbed: number; // Tổng linh khí đã hấp thu

  @Prop({ default: 1000 })
  lifespan: number; // Tuổi thọ tối đa của vật thể (sau đó sẽ thoái hóa hoặc triệt tiêu)
}

export const EntitySchema = SchemaFactory.createForClass(Entity);
