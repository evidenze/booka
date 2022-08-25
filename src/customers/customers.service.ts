import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customersRepository: Repository<Customer>
  ) { }
  
  // Create and return a new customer
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customersRepository.save(createCustomerDto);
  }
}
