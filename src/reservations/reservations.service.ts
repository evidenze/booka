import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import * as moment from 'moment-timezone';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation) private reservationsRepository: Repository<Reservation>,
  ) { }

  /*
  Create new reservation (Check in)
  */
  async checkin(createReservationDto: CreateReservationDto): Promise<Reservation> {
    
    createReservationDto['status'] = 'paid';
    createReservationDto['checking_time'] = moment.tz(createReservationDto.checking_time, 'Africa/Lagos').format();
    createReservationDto['checkout_time'] = moment.tz(createReservationDto.checkout_time, 'Africa/Lagos').format();

    const newReservation = this.reservationsRepository.create(createReservationDto);
    return await this.reservationsRepository.save(newReservation)
  }


  /*
  Checkout reservation, calculate and return overdue amount
  */
  async checkout(reservation_id: number): Promise<any> {

    //Overdue rates
    const regular_weekday_overdue_rate: number = 7/100; //7%
    const regular_weekend_overdue_rate: number = 10/100; //10%

    const deluxe_weekday_overdue_rate: number = 8.5/100; //8.5%
    const deluxe_weekend_overdue_rate: number = 12/100; //12%

    const palatial_weekday_overdue_rate: number = 11/100; // 11%
    const palatial_weekend_overdue_rate: number = 16/100; // 16%

    // Check if the current day is weekend or weekday
    if (moment.tz('Africa/Lagos').day() == 0 || moment.tz('Africa/Lagos').day() == 6) {
      var current_day: string = 'weekend';
    } else {
      var current_day: string = 'weekday';
    }


    // Check if reservation exist
    const reservation = await this.reservationsRepository.findOneBy({ reservation_id });

    if (reservation) {
      const room_type     = reservation.room_type;
      const amount_paid   = reservation.amount_paid;
      const checkout_time = reservation.checkout_time;
      const current_time = moment.tz('Africa/Lagos');

      // Check if reservation is overdue
      if (current_time.diff(checkout_time) > 0) {

        // Get overdue hours
        const overdue_hours = moment.duration(current_time.diff(checkout_time)).asHours();

        // Round additional minutes to 1 hour
        const rounded_overdue_hours = Math.ceil(overdue_hours);

        //Calculate hourly overdues
        if (room_type == 'deluxe' && current_day == 'weekday') {
          var overdue = deluxe_weekday_overdue_rate * amount_paid;
        } else if (room_type == 'deluxe' && current_day == 'weekend') {
          var overdue = deluxe_weekend_overdue_rate * amount_paid;
        } else if (room_type == 'regular' && current_day == 'weekday') {
          var overdue = regular_weekday_overdue_rate * amount_paid;
        } else if (room_type == 'regular' && current_day == 'weekend') {
          var overdue = regular_weekend_overdue_rate * amount_paid;
        } else if (room_type == 'palatial' && current_day == 'weekday') {
          var overdue = palatial_weekday_overdue_rate * amount_paid;
        } else if (room_type == 'palatial' && current_day == 'weekend') {
          var overdue = palatial_weekend_overdue_rate * amount_paid;
        }

        //Calculate total overdues
        const total_overdue = overdue * rounded_overdue_hours;

        // Return overdue results
        return {
          overdue_hours: rounded_overdue_hours,
          overdue: total_overdue,
          is_overdue: true,
          is_checked_out: true,
        }

      }

      // Return non-overdue results
      return {
        overdue_hours: 0,
        overdue: 0,
        is_overdue: false,
        is_checked_out: true
      }
    }

    throw new HttpException({
      status: false,
      message: 'Reservation not found'
    }, HttpStatus.BAD_REQUEST)
  }
}
