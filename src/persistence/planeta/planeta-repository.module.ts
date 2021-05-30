import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PlanetaRepoProvider } from './planeta-persistence.provider';

@Module({
    imports: [DatabaseModule],
    providers: [PlanetaRepoProvider],
    exports: [PlanetaRepoProvider]
})
export class PlanetaRepositoryModule {}
