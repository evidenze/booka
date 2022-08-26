import { IsDateString, IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class CreateReservationDto {
    @IsNotEmpty()
    room_type: string;

    @IsNotEmpty()
    @IsNumberString()
    amount_paid: number;

    @IsNotEmpty()
    @IsDateString()
    checking_time: string;

    @IsNotEmpty()
    @IsDateString()
    checkout_time: string;

    @IsNotEmpty()
    @IsNumberString()
    customer_id: number;
}
