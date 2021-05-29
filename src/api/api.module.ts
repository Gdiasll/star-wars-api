import { Module } from '@nestjs/common';
import { PlanetaModule } from './planeta/planeta.module';

@Module({
  imports: [PlanetaModule]
})
export class ApiModule {}
