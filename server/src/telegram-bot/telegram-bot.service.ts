import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Dish } from 'src/menu/models/dish.model';
import { Order } from 'src/order/order.model';
import { User } from 'src/users/users.model';
import { Telegraf } from 'telegraf';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bot = require('node-telegram-bot-api');

@Injectable()
export class TelegramBotService {
  private readonly bot;
  private total;
  private dishes;
  private isGreetingSent = false;

  constructor(
    @InjectModel(Order)
    private readonly orderRepository: typeof Order,
    @InjectModel(User)
    private readonly userRepository: typeof User,
  ) {
    this.bot = new Telegraf(`6856561267:AAGam_CLUqPybmZAlx4b25tJ5IRLwuekUIs`);

    this.bot.start((ctx) => {
      if (!this.isGreetingSent) {
        ctx.reply(
          'Привет! Бот запущен. Пожалуйста, введите свои имя и фамилию.',
        );
        this.isGreetingSent = true;
      }
    });

    this.bot.on('text', async (ctx) => {
      console.log(ctx);
      if (ctx.message && ctx.message.text) {
        const messageText = await ctx.message.text;

        if (!messageText) {
          return ctx.reply('Пожалуйста, введите свои имя и фамилию.');
        }

        const [firstName, lastName] = messageText.split(' ');
        const orders = await this.getUserOrdersForCurrentDateByName(
          firstName,
          lastName,
          '2023-12-25',
        );
        // this.formatDishes(orders);
        const formattedOrders = orders.map((order) => {
          return {
            orderDate: this.formatOrderDate(order.orderDate),
            orderTitle: `🍽️  Меню для ${firstName} ${lastName}`,
            dishes: this.dishes,
          };
        });

        ctx.reply(formattedOrders);
      }
    });
  }

  formatOrderDate = (orderDate) => {
    const dateObject = new Date(orderDate);

    // Получение дня недели
    const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const dayOfWeek = daysOfWeek[dateObject.getDay()];

    // Форматирование даты
    const formattedDate = dateObject.toLocaleDateString('ru-RU', {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
    });

    return `📅 ${formattedDate}, ${dayOfWeek}`;
  };

  formatDishes = (orders) => {
    console.log(orders);
    orders?.forEach((order, index) => {
      const dish = order.dish;
      const portionQty = order.bigPortionQty || order.smallPortionQty;
      const price = parseFloat(
        order.dish.priceLargePortion || order.dish.priceSmallPortion,
      );
      const totalPrice = price * portionQty;

      const porionRange = order.dish.priceLargePortion ? 'Б' : 'M';
      this.dishes.push(
        `№${index + 1} ${portionQty} x ${
          dish.name
        } (${porionRange}) (${totalPrice} руб.)`,
      );
    });
    this.total = orders.reduce((acc, order) => {
      const portionQty = order.bigPortionQty || order.smallPortionQty;
      const price = parseFloat(
        order.dish.priceLargePortion || order.dish.priceSmallPortion,
      );
      return acc + price * portionQty;
    }, 0);
  };
  startBot() {
    this.isGreetingSent = false;
    this.bot.launch();
    return { status: 'Bot started' };
  }

  async getUserOrdersForCurrentDateByName(
    firstName: string,
    lastName: string,
    currentDate: string,
  ) {
    console.log('here');
    const user = await this.userRepository.findOne({
      where: {
        firstName,
        lastName,
      },
    });

    if (!user) {
      return [];
    }
    const orders = await this.orderRepository.findAll({
      where: {
        userId: user.id,
        orderDate: currentDate,
      },
      include: [
        {
          model: Dish,
          attributes: {
            exclude: ['menuItemId'],
          },
        },
      ],
      attributes: {
        exclude: ['userId'],
      },
    });
    const formattedOrders = await Promise.all(
      orders.map(async (order) => {
        const orderWithDish = {
          id: order.id,
          orderDate: order.orderDate,
          smallPortionQty: order.smallPortionQty,
          bigPortionQty: order.bigPortionQty,
          dish: order.dish,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        };
        return orderWithDish;
      }),
    );

    return formattedOrders;
  }
}
