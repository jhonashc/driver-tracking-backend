import { Socket } from 'socket.io';

export interface ConnnectedUser {
  socket: Socket;
  user: User;
}

export interface User {
  id: string;
  username: string;
}
