import { Test, TestingModule } from '@nestjs/testing';
import { ClassDeviceController } from './class_device.controller';
import { ClassDeviceService } from './class_device.service';

describe('ClassDeviceController', () => {
  let controller: ClassDeviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassDeviceController],
      providers: [ClassDeviceService],
    }).compile();

    controller = module.get<ClassDeviceController>(ClassDeviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
