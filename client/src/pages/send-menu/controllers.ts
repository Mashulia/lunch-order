import { getMenu } from "@/api/menu.api";
import { getAllOrders } from "@/api/order.api";
import { getAllUsers } from "@/api/users.api";
import { WeekDay } from "@/commonState/store";
const orders = ref([]);
export const loadingTable = ref(false);
export const headers = ref([]) as any;
export const menuByDays = ref({});

async function transformOrdersToMenuByDays() {
  // Получаем меню
  const menu = await getMenu();

  // Обрабатываем каждый элемент меню
  menu.menu[0].menuItems.forEach((menuItem) => {
    const dayOfWeek = WeekDay[menuItem.dayOfWeek];
    // Проверяем, существует ли уже массив заказов для текущего дня недели, если нет - создаем
    if (!menuByDays.value[dayOfWeek]) {
      menuByDays.value[dayOfWeek] = [];
    }

    // Добавляем все блюда из меню для текущего дня недели в объект menuByDays
    menuItem.dishes.forEach((dish) => {
      // Создаем объект блюда для текущего элемента меню
      const dishObj = {
        title: dish.name,
        smallPortionQty: 0,
        bigPortionQty: 0,
        priceSmallPortion: dish.priceSmallPortion,
        priceLargePortion: dish.priceLargePortion,
        type: dish.category,
      };

      // Добавляем блюдо в массив для текущего дня недели
      menuByDays.value[dayOfWeek].push(dishObj);
    });
  });

  // Теперь обрабатываем заказы и добавляем информацию о количестве порций к соответствующим блюдам
  orders.value.forEach((order) => {
    const orderDate = new Date(order.orderDate);
    const dayOfWeek = orderDate.toLocaleDateString("ru-Ru", {
      weekday: "short",
    });
    // Ищем блюдо в меню для текущего заказа
    const dayMenu =
      menuByDays.value[`${dayOfWeek[0].toUpperCase()}${dayOfWeek.slice(1)}`];
    if (dayMenu) {
      const dish = dayMenu.find((dish) => dish.title === order.dish.name);
      if (dish) {
        // Обновляем количество порций в блюде
        dish.smallPortionQty += order.smallPortionQty;
        dish.bigPortionQty += order.bigPortionQty;
        dish.key = `name${order.user.id}`;
      }
    }
  });
}

export const correctTableTitles = async () => {
  const headers = [
    {
      title: "Наименование",
      align: "start",
      sortable: false,
      key: "title",
    },
    { title: "Кол. М", key: "smallPortionQty", sortable: false },
    { title: "Кол. Б", key: "largePortionQty", sortable: false },
    { title: "Цена М", key: "priceSmallPortion", sortable: false },
    { title: "Цена Б", key: "priceLargePortion", sortable: false },
  ];
  const users = await getAllUsers();
  const userKeys = {};
  users.forEach((user) => {
    const userKey = `name${user.id}`;
    if (!userKeys[userKey]) {
      const userName = `${user.lastName} ${user.firstName[0]}.${user.middleName[0]}.`;
      headers.push({
        title: userName,
        key: userName,
        sortable: false,
        children: [
          { title: "Кол. М", value: "smallPortionQty" },
          { title: "Кол. Б", value: "bigPortionQty" },
        ],
      });
      userKeys[userKey] = true;
    }
  });
  return headers;
};

export const getCommonMenu = async () => {
  loadingTable.value = true;
  orders.value = await getAllOrders();
  transformOrdersToMenuByDays();
  headers.value = await correctTableTitles();
  loadingTable.value = false;
  console.log(headers.value);
};
