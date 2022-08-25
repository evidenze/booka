import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

describe('CustomersController', () => {
  let customersController: CustomersController;
  let customersService: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService],
    }).compile();

    customersController = module.get<CustomersController>(CustomersController);
    customersService = module.get<CustomersService>(CustomersService)
  });

  describe('create', () => {
    it('should create a new customer', async () => {
      const result = {
        status: true,
        message: 'Customer created successfully',
        data: {
          first_name: 'Essien',
          last_name: 'Ekanem',
          phone_number: '08989898760',
          id: 1
        }
      };

      const data = {
        first_name: 'Essien',
        last_name: 'Ekanem',
        phone_number: '08989898760'
      }

      // jest.spyOn(customersService, 'create').mockImplementation(() => result);

      expect(await customersController.create(data)).toBe({});
    });
  });
});
