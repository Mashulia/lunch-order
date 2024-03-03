import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDto) {
    try {
      const user = await this.validateUser(userDto);
      return this.generateToken(user);
    } catch (error) {
      throw new HttpException(
        'Некорректные учетные данные',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUsersByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким  email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };
    const userResponse = {
      id: user.id,
      avatarPhotoUrl: user.avatarPhotoUrl,
      phone: user.phone,
      lastName: user.lastName,
      firstName: user.firstName,
      middleName: user.middleName,
      isShowOnlyVegetarian: user.isShowOnlyVegetarian,
      isReceiveEmails: user.isReceiveEmails,
      email: user.email,
      roles: user.roles.map((userRole) => userRole.value),
    };

    return {
      token: this.jwtService.sign(payload),
      user: userResponse,
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.usersService.getUsersByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }
}
