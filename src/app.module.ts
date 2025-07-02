import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './data/config/database.config';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => typeOrmConfig,
    }),
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
