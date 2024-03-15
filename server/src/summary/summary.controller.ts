import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/roles/roles.enum';
import { SummaryService } from './summary.service';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @ApiOperation({ summary: 'Получить сводку суммы всех пользователей' })
  @Roles(UserRole.MANAGER)
  @UseGuards(RolesGuard)
  @Get()
  getOrdersSummary() {
    return this.summaryService.summarizeOrdersByUser();
  }
}
