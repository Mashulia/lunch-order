import { updateUserOrder, deleteUserOrder } from "@/api/order.api";
import { menuOrder, user } from "@/commonState/store";
import router from "@/router";

const categories = [
  "Первые блюда",
  "Вторые блюда (гарниры)",
  "Салаты",
  "Выпечка",
];

function getDayOfWeek(dateStr: string) {
  // Предполагается, что dateStr в формате "MM/DD/YY"
  const [month, day, year] = dateStr.split("/");
  const date = new Date(+`20${year}`, month - 1, day);
  const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  return days[date.getDay()];
}

export const transformOrderData = (orderData) => {
  menuOrder.value = {
    Пн: [],
    Вт: [],
    Ср: [],
    Чт: [],
    Пт: [],
  };
  orderData.forEach((order) => {
    const dayOfWeek = getDayOfWeek(order.orderDate);
    if (!menuOrder.value[dayOfWeek]) {
      menuOrder.value[dayOfWeek] = {};
    }
    const dishId = order.dishId;
    const orderDate = order.orderDate;
    const category = order.dish.category;
    const title = order.dish.name;
    const priceSmallPortion = order.dish.priceSmallPortion;
    const priceBigPortion = order.dish.priceBigPortion;
    const qtyBig = order.bigPortionQty;
    const qtySmall = order.smallPortionQty;

    let dayArray = menuOrder.value[dayOfWeek] || [];
    let existingItemIndex = dayArray.findIndex(
      (existingItem) => existingItem.title === title
    );
    if (existingItemIndex === -1) {
      // Если элемент не найден, добавляем новый
      dayArray.push({
        dishId,
        orderDate,
        category,
        title,
        priceSmallPortion,
        priceBigPortion,
        qtyBig,
        qtySmall,
      });
    } else {
      if (existingItemIndex.qtyBig) {
        dayArray[existingItemIndex].qtyBig += qtyBig;
      } else {
        dayArray[existingItemIndex].qtySmall += qtySmall;
      }
    }
    menuOrder.value[dayOfWeek].sort((a, b) => {
      return categories.indexOf(a.category) - categories.indexOf(b.category);
    });
  });
};

export const deleteDish = (
  activeDay: string,
  dishId: number,
  orderDate: string,
  isSmall = true
) => {
  const currentOrder = menuOrder.value[activeDay].find(
    (order) => order.dishId === dishId
  );

  if (isSmall) {
    currentOrder.qtySmall--;
  } else {
    currentOrder.qtyBig--;
  }

  if (!currentOrder.qtySmall && !currentOrder.qtyBig) {
    deleteUserOrder(user.value.id, dishId);
    return;
  }
  const qty = isSmall ? currentOrder.qtySmall : currentOrder.qtyBig;
  updateUserOrder(user.value.id, orderDate, dishId, qty, isSmall);
};

export const redirectToMenuOrder = () => {
  router.push("/");
};
