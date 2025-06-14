import { Module } from '@nestjs/common';
import { ClassDeviceService } from './class_device.service';
import { ClassDeviceController } from './class_device.controller';

@Module({
  controllers: [ClassDeviceController],
  providers: [ClassDeviceService],
})
export class ClassDeviceModule {}
