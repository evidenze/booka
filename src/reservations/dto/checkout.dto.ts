import { IsNotEmpty, IsNumberString } from "class-validator";

export class CheckoutDto {
    @IsNotEmpty()
    @IsNumberString()
    reservation_id: number
}
