import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { DriverEvent } from './enums/drivers.enum';

import { DriversService } from './drivers.service';
import { JoinRouteDto, LeaveRouteDto } from './dtos';

@WebSocketGateway({ cors: true, namespace: 'drivers' })
export class DriversGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  public server: Server;

  constructor(private readonly driversService: DriversService) {}

  handleConnection(client: Socket): void {
    const { token, userId } = client.handshake.auth;

    if (!token) {
      client.disconnect();
      return;
    }

    // TODO: Get userId from token
    this.driversService.addClient(userId, client);
  }

  handleDisconnect(client: Socket): void {
    const { userId } = client.handshake.auth;
    this.driversService.removeClient(userId);
  }

  @SubscribeMessage(DriverEvent.JOIN_ROUTE)
  handleJoinRoute(
    @MessageBody() joinRouteDto: JoinRouteDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { routeId } = joinRouteDto;
    console.log(DriverEvent.JOIN_ROUTE, joinRouteDto);
    client.join(routeId);
  }

  @SubscribeMessage(DriverEvent.LEAVE_ROUTE)
  handleLeaveRoute(
    @MessageBody() leaveRouteDto: LeaveRouteDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { routeId } = leaveRouteDto;
    console.log(DriverEvent.LEAVE_ROUTE, leaveRouteDto);
    client.leave(routeId);
  }
}
