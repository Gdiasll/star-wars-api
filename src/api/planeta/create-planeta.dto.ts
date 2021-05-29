import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanetaDto {

  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly nome: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly clima: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly terreno: string;
}