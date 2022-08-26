import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomersService } from './customers.service';
import { Customer } from './entities/customer.entity';

describe('CustomersService', () => {
  let service: CustomersService;

  const mockCustomersRepository = {
    save: jest.fn().mockImplementation(customer => Promise.resolve({ id: Date.now(), ...customer })),
    create: jest.fn().mockImplementation(dto => dto)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService, {
        provide: getRepositoryToken(Customer),
        useValue: mockCustomersRepository
      }],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new customer', async () => {
    const dto = {
      first_name: 'Essien',
      last_name: 'Ekanem',
      phone_number: '808080800866'
    }
    
    const response = await service.create(dto);
    expect(response).toEqual({
      id: expect.any(Number),
      ...dto
    })
  })
});
