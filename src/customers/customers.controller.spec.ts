import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import * as moment from 'moment';

describe('CustomersController', () => {
  let controller: CustomersController;

  const mockUsersService = {
    create: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService],
    }).overrideProvider(CustomersService).useValue(mockUsersService).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a customer', async () => {
    const dto = {
      first_name: 'Essien',
      last_name: 'Ekanem',
      phone_number: '12345678987'
    }

    const response = await controller.create(dto);
    expect(response.status).toBe(true);
  })
});
