import { Provider } from '@nestjs/common';
import { PlanetaRepository } from './repository';

export const PlanetaRepoProvider: Provider = {
    provide: 'PlanetaRepo',
    useClass: PlanetaRepository
}