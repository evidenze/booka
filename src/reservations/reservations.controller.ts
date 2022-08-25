import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CheckoutDto } from './dto/checkout.dto';

@Controller()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  // Create new reservation (Check in)
  @Post('/check-in')
  async create(@Body() createReservationDto: CreateReservationDto) {
    const reservation = await this.reservationsService.checkin(createReservationDto);

    return {
      status: true,
      message: 'Reservation created successfully',
      data: reservation
    }
  }

  // Check out reservation and return overdue amount
  @Put('/check-out')
  async update(@Body() checkoutDto: CheckoutDto) {
    const checkout = await this.reservationsService.checkout(checkoutDto.reservation_id);

    return {
      status: true,
      message: 'Checkout successful',
      data: checkout
    } 
  }
}
