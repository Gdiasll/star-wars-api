import { Module } from '@nestjs/common';
import { PlanetaRepositoryModule } from 'src/persistence/planeta/planeta-repository.module';
import { SwapiRepositoryModule } from 'src/persistence/swapi/swapi-repository.module';
import { PlanetaService } from './planeta.service';

@Module({
    imports: [
        PlanetaRepositoryModule,
        SwapiRepositoryModule
    ],
    providers: [PlanetaService],
    exports: [PlanetaService]
})
export class PlanetaModule {}
