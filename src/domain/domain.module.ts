import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/persistence/persistence.module';
import { PlanetaModule } from './planeta/planeta.module';

@Module({
  imports: [PlanetaModule, PersistenceModule],
  exports: [PlanetaModule]
})
export class DomainModule {}
