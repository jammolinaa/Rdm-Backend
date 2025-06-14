import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './data/config/database.config';
import { DevicesModule } from './api/devices/devices.module';
import { SchedulesModule } from './api/schedules/schedules.module';
import { ConditionsModule } from './api/conditions/conditions.module';
import { AlertsModule } from './api/alerts/alerts.module';
import { TypeModule } from './api/type/type.module';
import { SourcesModule } from './api/sources/sources.module';
import { SystemModule } from './api/system/system.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => typeOrmConfig,
      }),
      DevicesModule, SchedulesModule, ConditionsModule, 
      AlertsModule, TypeModule, SourcesModule, SystemModule],
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
