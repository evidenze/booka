import { IsNotEmpty, IsNumberString } from "class-validator";

export class CreateCustomerDto {
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    @IsNumberString()
    phone_number: string;
}
