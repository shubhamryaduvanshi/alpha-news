import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { UpdatePasswordDto, UserLoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from './auth.constant';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    create(@Body() loginDto: UserLoginDto) {
        return this.authService.login(loginDto.email, loginDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Get('verify-token')
    verifyToken( @Req() req: Request) {
        const token = req.headers['authorization']?.split(' ')[1];
        console.log({token});
        
        return this.authService.verifyToken(token);
    }


    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('change-password')
    updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
        return this.authService.updatePassword(updatePasswordDto);
    }

}
