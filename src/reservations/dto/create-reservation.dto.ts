import { IsDateString, IsNotEmpty, IsNumberString } from "class-validator";

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
    customer_id: number;
}
