import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import * as moment from 'moment';

describe('ReservationsController', () => {
  let controller: ReservationsController;

  const mockReservationsService = {
    checkin: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto
      }
    }),
    checkout: jest.fn().mockImplementation((reservation_id) => ({
      reservation_id
    }))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
      providers: [ReservationsService],
    }).overrideProvider(ReservationsService).useValue(mockReservationsService).compile();

    controller = module.get<ReservationsController>(ReservationsController);
  });

  it('should create a reservation', async () => {
    const data = {
      room_type: 'deluxe',
      amount_paid: 40000,
      checking_time: moment().toLocaleString(),
      checkout_time: moment().add().hours(3).toLocaleString(),
      customer_id: 1
    }
    const response = await controller.create(data);
    expect(response.status).toBe(true);
    expect(response.message).toBe('Reservation created successfully');
  });

  it('should checkout a reservation', async () => {
    const dto = {
      reservation_id: 1
    }
    const response = await controller.update(dto);
    expect(response.status).toBe(true);
    expect(response.message).toBe('Checkout successful')
  });
});
