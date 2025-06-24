import { Module } from '@nestjs/common';
import { SystemDeviceService } from './system_device.service';
import { SystemDeviceController } from './system_device.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemDevice } from 'src/data/entities/system_device/system_device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemDevice])],
  controllers: [SystemDeviceController],
  providers: [SystemDeviceService],
})
export class SystemDeviceModule {}
