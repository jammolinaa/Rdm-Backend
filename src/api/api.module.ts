
import { Module } from "@nestjs/common";
import { AlertsModule } from "./alerts/alerts.module";
import { ClassDeviceModule } from "./class_device/class_device.module";
import { ConditionsModule } from "./conditions/conditions.module";
import { DevicesModule } from "./devices/devices.module";
import { SchedulesModule } from "./schedules/schedules.module";
import { SourcesModule } from "./sources/sources.module";
import { SystemModule } from "./system/system.module";
import { SystemDeviceModule } from "./system_device/system_device.module";
import { TypeModule } from "./type/type.module";

@Module({
  imports: [
    DevicesModule,
    SchedulesModule, 
    ConditionsModule,
    AlertsModule,
    TypeModule,
    SourcesModule,
    SystemModule,
    ClassDeviceModule,
    SystemDeviceModule
  ],
  controllers: [],
  providers: [],
})
export class ApiModule { }