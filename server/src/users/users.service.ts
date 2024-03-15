import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { UserRole } from 'src/roles/roles.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.rolesService.getRoleByValue(UserRole.EMPLOYEE);
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUsersByEmails(emails: string[]): Promise<User[]> {
    return this.userRepository.findAll({
      where: {
        email: emails,
      },
    });
  }

  async deleteUser(userId: number) {
    const user = await this.userRepository.findByPk(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    await user.destroy();

    return this.getAllUsers();
  }

  async getUsersByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.rolesService.getRoleByValue(dto.value);
    if (user && role) {
      await user.$add('role', role.id);
      return dto;
    }

    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }

  async updateUser(id: number, updateUserDto: Partial<UpdateUserDto>) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    const directory = path.join(__dirname, '..', 'avatars');

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Проверяем, что updateUserDto содержит avatarPhotoUrl
    if (updateUserDto.avatarPhotoUrl) {
      // Преобразуем строку base64 в бинарные данные
      const base64Image = updateUserDto.avatarPhotoUrl.split(';base64,').pop();
      const imageName = `avatar_${Date.now()}.jpeg`; // Примерное имя файла
      const imagePath = path.join(__dirname, '..', 'avatars', imageName); // Путь к файлу
      // Сохраняем бинарные данные в файл
      fs.writeFileSync(imagePath, base64Image, { encoding: 'base64' });

      // Обновляем свойство avatarPhotoUrl пользователя
      user.avatarPhotoUrl = `/avatars/${imageName}`; // Предполагается, что вы храните путь к файлу

      // Удаляем свойство из updateUserDto, чтобы оно не перезаписало user.avatarPhotoUrl
      delete updateUserDto.avatarPhotoUrl;
    }

    for (const field in updateUserDto) {
      user[field] = updateUserDto[field];
    }
    await user.save();
  }
}
