import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './data/config/database.config';
import { DevicesModule } from './api/devices/devices.module';
import { SchedulesModule } from './api/schedules/schedules.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => typeOrmConfig,
      }),
      DevicesModule, SchedulesModule],
  // TypeOrmModule.forRoot({
  //     type: 'mysql',
  //     host: 'localhost',
  //     port: 3306,
  //     username: 'root',
  //     password: '',
  //     database: 'rdmprueba',
  //     entities: [DevicesModule, SchedulesModule],
  //     synchronize: true,
  //   }),
  //   DevicesModule, SchedulesModule 
  // ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
