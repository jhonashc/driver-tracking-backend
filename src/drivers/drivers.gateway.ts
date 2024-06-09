import { WebSocketGateway } from '@nestjs/websockets';

import { DriversService } from './drivers.service';

@WebSocketGateway()
export class DriversGateway {
  constructor(private readonly driversService: DriversService) {}
}
