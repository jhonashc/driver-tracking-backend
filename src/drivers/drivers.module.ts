import { Module } from '@nestjs/common';

import { DriversService } from './drivers.service';
import { DriversGateway } from './drivers.gateway';

@Module({
  providers: [DriversGateway, DriversService],
})
export class DriversModule {}
