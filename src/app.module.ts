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
import { ClassDeviceModule } from './api/class_device/class_device.module';
import { SystemDeviceModule } from './api/system_device/system_device.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => typeOrmConfig,
      }),
      DevicesModule, SchedulesModule, ConditionsModule, 
      AlertsModule, TypeModule, SourcesModule, SystemModule,
      ClassDeviceModule, SystemDeviceModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
