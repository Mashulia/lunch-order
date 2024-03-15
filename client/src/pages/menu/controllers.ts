import { getMenu, uploadMenu } from "@/api/menu.api";
import { createOrder } from "@/api/order.api";
import { updateUser } from "@/api/users.api";
import {
  WeekDay,
  currentMenu,
  isLoadPageMenuOrder,
  menuByDays,
  menuByDaysVegeterian,
  user,
  vegetarianKeywords,
} from "@/commonState/store";

export const isOrderCreateSuccessfully = ref(false);
export const isOrderCreateFailed = ref(false);
export const uploadedFile = ref();
export const currentSupplier = ref();
export const suppliers = ref([]);
export const role = "manager";
export const newSupplier = ref("");
export const isError = ref(false);

export const saveMenu = async () => {
  const formData = new FormData();
  uploadedFile.value.forEach((file) => {
    formData.append("file", file);
  });

  uploadMenu(formData, suppliers.value[0].id).catch((error) => {
    console.error("Error saving menu:", error);
    isError.value = true;
  });
};

const fillMenu = (dayOfWeek, dish) => {
  let isVegeterianDish = false;
  const transformedDish = {
    id: dish.id,
    type: dish.category,
    title: dish.name,
    priceLargePortion: dish.priceLargePortion,
    smallPortionQty: dish.smallPortionQty,
    bigPortionQty: dish.bigPortionQty,
    priceSmallPortion: dish.priceSmallPortion,
    ingredient: dish.ingredient.map((item) => {
      if (user.value.isShowOnlyVegetarian) {
        for (const word of vegetarianKeywords) {
          if (item.composition.toLowerCase().includes(word)) {
            isVegeterianDish = true;
            break;
          }
        }
      }
      return {
        composition: item.composition,
        comments: item.comments,
      };
    }),
  };
  if (!(isVegeterianDish && user.value.isShowOnlyVegetarian)) {
    menuByDays.value[WeekDay[dayOfWeek]][transformedDish.type].push(
      transformedDish
    );
  }
};

export const transformMenu = (menu) => {
  let isVegetarianDish = true;
  menu[0].menuItems.forEach((menuItem) => {
    const dayOfWeek = menuItem.dayOfWeek;
    menuItem.dishes.forEach((dish) => {
      fillMenu(dayOfWeek, dish);
    });
  });
};

export const fetchCommonMenu = async () => {
  try {
    const menu = await getMenu();
    currentMenu.value = menu;
    return menu;
  } catch (error) {
    throw new Error("Error fetching menu:");
  }
};

export const setVegeterian = () => {
  menuByDays.value = JSON.parse(JSON.stringify(menuByDaysVegeterian));
  isLoadPageMenuOrder.value = true;
  updateUser(user.value.id, user.value.isShowOnlyVegetarian);
  fetchCommonMenu()
    .then((menuItems) => transformMenu(menuItems.menu))
    .finally(() => (isLoadPageMenuOrder.value = false));
};

export const createUserOrder = (
  orderDate: string,
  bigPortionQty: number,
  smallPortionQty: number,
  dishId: number
) => {
  const orderData = {
    orderDate,
    bigPortionQty,
    smallPortionQty,
    dishId,
    userId: user.value.id,
  };
  createOrder(orderData)
    .then(() => {
      isOrderCreateSuccessfully.value = true;
      setTimeout(() => {
        isOrderCreateSuccessfully.value = false;
      }, 1000);
    })
    .catch((err) => {
      isOrderCreateFailed.value = true;
      setTimeout(() => {
        isOrderCreateFailed.value = false;
      }, 1000);
    });
};
