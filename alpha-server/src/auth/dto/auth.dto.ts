import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserLoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;
}

export class UpdatePasswordDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    oldPassword: string

    @IsNotEmpty()
    @MinLength(8)
    newPassword: string;
}