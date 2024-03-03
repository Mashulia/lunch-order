import { Ctx, InjectBot, Message, On, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { UsersService } from './users/users.service';
import { OrderService } from './order/order.service';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly userService: UsersService,
    private readonly orderService: OrderService,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Привет! Введи имя и фамилию для получения заказа.');
  }

  @On('text')
  async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    const lastName = message.split(' ')[1];
    const users = await this.userService.getAllUsers();
    let userId = null;
    let isUserFound = false;

    if (message.split(' ')[0].toLowerCase() === 'еда') {
      return;
    }

    users.forEach((user) => {
      if (user.lastName.toLowerCase() === lastName.toLowerCase()) {
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
