import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { USER_ROLE } from 'src/users/enums/user.enums';
import { UsersService } from 'src/users/users.service';
import { UpdatePasswordDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async login(email: string, password: string): Promise<{ message: string, user: { _id: string, name: string, email: string, role: USER_ROLE }, accessToken: string }> {
        if (!email || !password) {
            throw new UnauthorizedException("Email and password are required");
        }
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new UnauthorizedException("Invalid email or password");
        }

        return {
            message: "Login successful!!",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role as USER_ROLE,
            },
            accessToken: await this.jwtService.sign({ email: user.email, sub: user._id, role: user.role },
                {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '2hr',
                }
            ),

        }
    }

    async verifyToken(token: string): Promise<{ valid: boolean, userId?: string, role?: string }> {
        try {
            const user = await this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            return { valid: true, userId: user.sub, role: user.role };
        } catch (error) {
            throw new UnauthorizedException("Invalid token");
        }
    }


    async updatePassword(updatePasswordDto: UpdatePasswordDto) {
        const { email, newPassword, oldPassword } = updatePasswordDto;
        if (!email || !newPassword || !oldPassword) {
            throw new UnauthorizedException("Email, old password and new password are required");
        }
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            throw new UnauthorizedException("Invalid email or password");
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await this.userService.updatePassword(user._id, hashedNewPassword);
        return { message: "Password updated successfully" };
    }

}
