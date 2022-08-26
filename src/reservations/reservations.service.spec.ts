import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { ReservationsService } from './reservations.service';
import * as moment from 'moment';

describe('ReservationsService', () => {
  let service: ReservationsService;

  const mockReservationsRepository = {
    save: jest.fn().mockImplementation(reservation => Promise.resolve({ id: Date.now(), ...reservation })),
    create: jest.fn().mockImplementation(dto => dto),
    findOneBy: jest.fn().mockImplementation((reservation_id) => ({
      reservation_id
    }))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationsService, {
        provide: getRepositoryToken(Reservation),
        useValue: mockReservationsRepository
      }],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new reservation (Check in)', async () => {
    const dto = {
      room_type: 'deluxe',
      amount_paid: 40000,
      checking_time: moment().toLocaleString(),
      checkout_time: moment().add(10, 'hours').toLocaleString(),
      customer_id: 1
    }

    const response = await service.checkin(dto);
    expect(response).toEqual({
      id: expect.any(Number),
      ...dto
    });
  })

  it('should check out a reservation (Check out)', async () => {
    const response = await service.checkout(1);
    expect(response.is_checked_out).toBe(true);
  })
});
