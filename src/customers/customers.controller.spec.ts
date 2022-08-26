import { Test, TestingModule } from '@nestjs/testing';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Customer } from './entities/customer.entity';

describe('CustomersController', () => {
  let customersController: CustomersController;
  let customersService: CustomersService;
  let customersRepository: Repository<Customer>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService,],
    }).compile();

    customersController = module.get<CustomersController>(CustomersController);
    customersService = module.get<CustomersService>(CustomersService)
  });

  describe('create', () => {
    it('should return an array of cats', async () => {
      const result = {
        first_name: 'Essien',
        last_name: 'Ekanem',
        phone_number: '08989899',
        id: 1
      };

      jest.spyOn(customersService, 'create').mockResolvedValue(result)

      expect(await customersController.create(result)).resolves.toEqual(result)
    });
  });
});
