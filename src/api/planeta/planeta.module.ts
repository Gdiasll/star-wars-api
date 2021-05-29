import { Module } from '@nestjs/common';
import { PlanetaController } from './planeta.controller';

@Module({
  controllers: [PlanetaController]
})
export class PlanetaModule {}
