import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ApiModule } from './api/api.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ApiModule,
    DomainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
