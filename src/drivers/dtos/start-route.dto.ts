import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';

export class StartRouteDto {
  @IsUUID()
  @IsNotEmpty()
  routeId: string;

  @IsArray()
  @ValidateNested()
  @Type(() => Number)
  latLng: [number, number];
}
