import { IsNotEmpty, IsNumberString } from "class-validator";

export class CreateReservationDto {
    @IsNotEmpty()
    room_type: string;

    @IsNotEmpty()
    @IsNumberString()
    amount_paid: number;

    @IsNotEmpty()
    checking_time: Date;

    @IsNotEmpty()
    checkout_time: Date;

    @IsNotEmpty()
    customer_id: number;
}
