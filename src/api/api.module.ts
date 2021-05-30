import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import { PlanetaController } from './planeta/planeta.controller';

@Module({
  controllers: [PlanetaController],
  imports: [DomainModule]
})
export class ApiModule {}
