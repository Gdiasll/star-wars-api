import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanetaDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  readonly nome: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  readonly clima: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  readonly terreno: string;
}