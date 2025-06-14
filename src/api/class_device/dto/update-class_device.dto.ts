import { PartialType } from '@nestjs/mapped-types';
import { CreateClassDeviceDto } from './create-class_device.dto';

export class UpdateClassDeviceDto extends PartialType(CreateClassDeviceDto) {}
