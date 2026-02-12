import { USER_ROLE } from "../enums/user.enums";

export class CreateUserDto {
    name: string;
    email: string;
    mobileNumber?: string;
    profilePictureUrl?: string;
    address?: string;
    role?: USER_ROLE
}
