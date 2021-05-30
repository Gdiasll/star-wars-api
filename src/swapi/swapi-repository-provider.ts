import { Provider } from '@nestjs/common';
import { SwapiRepository } from './swapi-repository';

export const SwapiRepositoryProvider: Provider = {
    provide: 'SwapiRepo',
    useClass: SwapiRepository,
}