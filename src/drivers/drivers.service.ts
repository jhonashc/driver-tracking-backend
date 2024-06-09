import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import crypto from 'crypto';

import { ConnnectedUser, User } from './interfaces/drivers.interface';

@Injectable()
export class DriversService {
  private connectedClients: Record<string, ConnnectedUser> = {};

  addClient(userId: string, client: Socket): void {
    // TODO: Get user from database
    const user: User = {
      id: userId,
      username: `user-${crypto.randomUUID()}`,
    };

    this.connectedClients[userId] = {
      socket: client,
      user,
    };
  }

  removeClient(userId: string): void {
    delete this.connectedClients[userId];
  }
}
