import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WorldState, WorldStateSchema } from './world-state.schema';
import { WorldStateService } from './state.service';
import { WorldCreationService } from './creation';
import { WorldTickService } from './tick.service';
import { WorldController } from './world.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WorldState.name, schema: WorldStateSchema }]),
  ],
  controllers: [WorldController],
  providers: [
    WorldStateService,
    WorldCreationService,
    WorldTickService,
  ],
})
export class WorldModule {}
