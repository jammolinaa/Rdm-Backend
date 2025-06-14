import { Test, TestingModule } from '@nestjs/testing';
import { ClassDeviceService } from './class_device.service';

describe('ClassDeviceService', () => {
  let service: ClassDeviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassDeviceService],
    }).compile();

    service = module.get<ClassDeviceService>(ClassDeviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
