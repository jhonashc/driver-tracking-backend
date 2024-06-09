import { IsNotEmpty, IsUUID } from 'class-validator';

export class LeaveRouteDto {
  @IsUUID()
  @IsNotEmpty()
  routeId: string;
}
