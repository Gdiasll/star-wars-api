import { Module } from '@nestjs/common';
import { PlanetaRepositoryModule } from './planeta/planeta-repository.module';

@Module({
  imports: [PlanetaRepositoryModule],
  exports: [PlanetaRepositoryModule]
})
export class PersistenceModule {}
