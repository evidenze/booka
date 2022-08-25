import { IsNotEmpty, IsNumberString } from "class-validator";

export class CheckoutDto {
    @IsNotEmpty()
    reservation_id: number
}
