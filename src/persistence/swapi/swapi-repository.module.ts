import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { SwapiRepositoryProvider } from './swapi-repository-provider';

@Module({
    imports: [
        ConfigModule,
        HttpModule
    ],
    providers: [
        SwapiRepositoryProvider
    ],
    exports: [
        SwapiRepositoryProvider
    ]
})
export class SwapiRepositoryModule {}
