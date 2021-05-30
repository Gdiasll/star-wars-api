import { Module } from '@nestjs/common';
import { PlanetaRepositoryModule } from 'src/persistence/planeta/planeta-repository.module';
import { PlanetaService } from './planeta.service';

@Module({
    imports: [
        PlanetaRepositoryModule,
    ],
    providers: [PlanetaService],
    exports: [PlanetaService]
})
export class PlanetaModule {}
