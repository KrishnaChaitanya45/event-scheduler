import { Injectable, Res } from '@nestjs/common';
import {
  CreateAuthDto,
  CreatedUserDto,
  loginUserDTO,
} from './dto/create-auth.dto';
import * as argon from 'argon2';

import * as trpc from '@trpc/server';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: 60 * 60 * 24 * 1,
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: 60 * 60 * 24 * 30,
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshTokenHash(userId: string, refreshToken: string) {
    const hash = await argon.hash(refreshToken);
    await this.prisma.user.update({
      where: { id: userId },
      data: { token: hash },
    });
  }
  async create(
    createUserDto: CreateAuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{
    user: CreatedUserDto;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  }> {
    const hashedPassword = await this.hashData(createUserDto.password);
    const findUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (findUser) {
      throw new ForbiddenException('USER ALREADY EXISTS');
    }
    const newUser = await this.prisma.user.create({
      //@ts-ignore
      data: { ...createUserDto, password: hashedPassword },
    });
    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshTokenHash(newUser.id, tokens.refreshToken);
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 24 * 7,
      secure: true,
    });
    console.log('REACHED HERE', {
      user: newUser,
      tokens,
    });
    return {
      user: newUser,
      tokens,
    };
  }

  async login(createUserDto: loginUserDTO, res: Response) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: createUserDto.email,
        },
      });
      console.log('USER', user);
      if (!user) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'USER NOT FOUND',
        });
      }
      const isPasswordValid = await bcrypt.compare(
        createUserDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new trpc.TRPCError({
          code: 'UNAUTHORIZED',
          message: 'INVALID PASSWORD',
        });
      }
      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 60 * 60 * 24 * 7,
        secure: true,
      });
      return res.json({
        message: 'Success',
        user,
        tokens,
      });
    } catch (error) {
      return new trpc.TRPCError({
        code: error.code,
        message: error.message,
      });
    }
  }

  findAll() {
    // return `This action returns all users`;
    return this.prisma.user.findMany();
  }
  async logout(userId: string, @Res() res: Response) {
    try {
      const user = await this.prisma.user.updateMany({
        where: {
          id: userId,
          token: {
            not: null,
          },
        },
        data: {
          token: null,
        },
      });

      if (user) {
        res.clearCookie('refreshToken');
        return res.json({
          message: 'Logged Out Successfully',
        });
      } else {
        return new UnauthorizedException('Already Logged Out');
      }
    } catch (error) {
      return error;
    }
  }

  findOne(id: string) {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  update(id: string, updateUserDto: any) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
  async refreshToken(
    userId: string,
    refreshToken: string,
    @Res() res: Response,
  ) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) throw new ForbiddenException('Access Denied');

      const tokens = await this.getTokens(userId, user.email);
      await this.updateRefreshTokenHash(userId, tokens.refreshToken);
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 60 * 60 * 24 * 30,
        secure: true,
      });
      return res.json({
        message: 'Success',
        tokens,
      });
    } catch (error) {
      console.log(error, 'ERROR FOUND');
      return error;
    }
  }
  async decodeJWTAndReturnUserId(refreshToken: string) {
    try {
      const user = await this.jwtService.decode(refreshToken);
      return {
        id: user.sub,
        email: user.email,
      };
    } catch (error) {
      return new Error('DECODING FAILED');
    }

    // return
  }
  async findUserByRefreshToken(
    refreshToken: string,
    email: string,
    userId: string,
  ) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          AND: {
            email: email,
            id: userId,
          },
        },
      });
      if (!user) {
        return new Error('INVALID REFRESH TOKEN');
      }
      const tokenVerified = await argon.verify(user.token, refreshToken);
      if (tokenVerified) {
        return user;
      } else {
        return new Error('INVALID TOKEN PROVIDED');
      }

      return user;
    } catch (error) {
      return error;
    }
  }
  async decodeBearerToken(req: Request) {
    const token = req.headers['authorization'];
    if (!token) {
      console.log('TOKEN NOT PROVIDED');
      return new Error('Token not provider');
    }
    const extractedToken = token.split(' ')[1];
    const extractedData = await this.jwtService.decode(extractedToken);
    const user = await this.prisma.user.findFirst({
      where: {
        AND: {
          email: extractedData.email,
          id: extractedData.sub,
        },
      },
    });
    if (!user) {
      return new Error('User Not Found');
    }
    return user;
  }
  async updateUserDetails(
    req: any,
    res: Response,
    input: {
      name?: string;
      bio?: string;
      profession?: {
        emoji?: string;
        name?: string;
      };
      socials?: {
        github?: string;
        linkedIn?: string;
        twitter?: string;
        instagram?: string;
        youtube?: string;
      };
    },
  ) {
    const userOrError = await this.decodeBearerToken(req);
    if (userOrError instanceof Error) {
      return new Error(userOrError.message);
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        email: userOrError.email,
      },
      data: input,
    });
    return updatedUser;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
