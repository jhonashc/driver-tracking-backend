import { IsNotEmpty, IsUUID } from 'class-validator';

export class JoinRouteDto {
  @IsUUID()
  @IsNotEmpty()
  routeId: string;
}
