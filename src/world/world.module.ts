import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorldController } from './world.controller';
import { WorldService } from './world.service';
import { WorldState, WorldStateSchema } from './world-state.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorldState.name, schema: WorldStateSchema }
    ]),
  ],
  controllers: [WorldController],
  providers: [WorldService],
  exports: [WorldService],
})
export class WorldModule {}