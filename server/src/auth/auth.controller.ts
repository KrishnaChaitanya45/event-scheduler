import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, loginUserDTO } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/common/guards';
import { GetCurrentUser } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(201)
  async create(
    @Body() createUserDto: CreateAuthDto,
    @Res({ passthrough: true }) res: any,
  ) {
    return this.authService.create(createUserDto, res);
  }

  @Post('/login')
  @HttpCode(201)
  login(
    @Body() createUserDto: loginUserDTO,
    @Res({ passthrough: true }) res: any,
  ) {
    return this.authService.login(createUserDto, res);
  }

  @Get('/logout')
  @HttpCode(200)
  @UseGuards(AccessTokenGuard)
  logout(@GetCurrentUser('sub') userId: string, @Res() res: any) {
    return this.authService.logout(userId, res);
  }

  @Get('/refresh-token')
  @HttpCode(200)
  @UseGuards(RefreshTokenGuard)
  refreshToken(@GetCurrentUser() user: number, @Res() res: any) {
    return this.authService.refreshToken(
      user['userId'],
      user['refreshToken'],
      res,
    );
  }
}
