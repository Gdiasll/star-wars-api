import { Provider } from '@nestjs/common';
import { PlanetaRepository } from './planeta-repository';

export const PlanetaRepoProvider: Provider = {
    provide: 'PlanetaRepo',
    useClass: PlanetaRepository
}