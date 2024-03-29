import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  ValidationPipe,
  UsePipes,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MenuService } from './menu.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { Menu } from './models/menu.model';
import { FileUploadDto } from './dto/file-upload.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { UserRole } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Меню')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({ summary: 'Загрузка меню' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Файл',
    type: FileUploadDto,
  })
  @ApiResponse({ status: 201, description: 'Success' })
  @Roles(UserRole.MANAGER)
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post('upload-excel')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(
    @UploadedFile() file,
    @Query('supplierId') supplierId: number,
  ) {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.menuService.readMenuFromExcel(file.buffer, supplierId);
    } catch (error) {
      throw new HttpException(
        'Error processing Excel file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Получение меню' })
  @ApiResponse({ status: 200, type: [Menu] })
  async getMenuForOrder(@Query('userId') userId: number): Promise<any> {
    try {
      const menu =
        await this.menuService.getCurrentMenuWithIngredientsAndOrderedPortions(
          userId,
        );
      return { success: true, menu };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
