import { Module } from '@nestjs/common';
import { ClassDeviceService } from './class_device.service';
import { ClassDeviceController } from './class_device.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassDevice } from 'src/data/entities/class_device/class_device.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ClassDevice])],
  controllers: [ClassDeviceController],
  providers: [ClassDeviceService],
})
export class ClassDeviceModule {}
