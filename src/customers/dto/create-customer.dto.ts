import { IsNotEmpty, IsNumberString, Length } from "class-validator";

export class CreateCustomerDto {
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    @IsNumberString()
    @Length(11)
    phone_number: string;
}
