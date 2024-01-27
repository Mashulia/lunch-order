import {
  Controller,
  Post,
  Delete,
  Param,
  Body,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SupplierService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-suppliers.dto';
import { Supplier } from './suppliers.model';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { UserRole } from 'src/roles/roles.enum';

@ApiTags('Поставщики')
@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @ApiOperation({ summary: 'Создание поставщика' })
  @ApiResponse({ status: 201, type: Supplier })
  @UsePipes(ValidationPipe)
  //   @Roles(UserRole.MANAGER)
  //   @UseGuards(RolesGuard)
  @Post()
  createSupplier(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.createSupplier(createSupplierDto);
  }

  @ApiOperation({ summary: 'Получить всех поставщиков' })
  @ApiResponse({ status: 200, type: [Supplier] })
  @UsePipes(ValidationPipe)
  //   @Roles(UserRole.MANAGER)
  //   @UseGuards(RolesGuard)
  @Get()
  getAllSuppliers() {
    return this.supplierService.getAllSuppliers();
  }

  @ApiOperation({ summary: 'Удалить постащика' })
  @ApiResponse({ status: 200, type: [Supplier] })
  //   @Roles(UserRole.MANAGER)
  //   @UseGuards(RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteSupplier(@Param('id') supplierId: number) {
    return this.supplierService.deleteSupplier(supplierId);
  }
}
