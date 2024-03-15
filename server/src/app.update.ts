import {
  Action,
  Command,
  Ctx,
  Hears,
  InjectBot,
  Message,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { UsersService } from './users/users.service';
import { OrderService } from './order/order.service';
import { actionButtons } from 'app.buttons';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly userService: UsersService,
    private readonly orderService: OrderService,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Привет!');
    await ctx.reply('Нажми кнопку для просмотра меню', actionButtons());
  }

  @Command('food')
  async foodCommand(ctx: Context) {
    console.log(ctx);
    await ctx.reply('Введите вашу фамилию:');
  }

  @Hears('Еда')
  async getFood(ctx: Context) {
    await ctx.reply('Введите фамилию');
  }

  @On('text')
  async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    const users = await this.userService.getAllUsers();
    console.log(users);
    let userId = null;
    let isUserFound = false;

    users.forEach((user) => {
      if (user.lastName.toLowerCase() === message.toLowerCase()) {
        isUserFound = true;
        userId = user.id;
      }
    });

    if (!isUserFound) {
      ctx.reply(`Сотрудник не найден.\n
Пожалуйста, введите фамилию еще раз.`);
    } else {
      const order = await this.orderService.getCurrentDayOrderByUserId(userId);
      if (order.length) {
        const reply = await this.orderService.formatOrderForTelegram(order);
        ctx.reply(reply as any);
      } else {
        ctx.reply(`Меню пользователя на текущий день не найдено`);
      }
    }
  }
}
