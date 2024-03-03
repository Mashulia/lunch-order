<script setup lang="ts">
import {
  fetchCommonMenu,
  transformMenu,
  setVegeterian,
  isOrderCreateFailed,
  isOrderCreateSuccessfully,
} from "./controllers";
import MenuCard from "@/views/menu-order/MenuCard.vue";
import MenuBtnGroup from "@/views/menu-order/MenuBtnGroup.vue";
import MenuRemainder from "@/views/menu-order/MenuRemainder.vue";
import {
  MenuCategory,
  menuByDays,
  isLoadPageMenuOrder,
  user,
  currentMenu,
  WeekDay,
} from "@/commonState/store";
import { createOrder } from "@/api/order.api";

const tabs = ref(null);

const activeDay = ref("Пн");

const activeDayMenu = computed(() => menuByDays.value[activeDay.value]);

const handleDay = (val: string) => {
  activeDay.value = val;
};

const choosedSum = ref(0);

const dotation = computed(() => {
  const settledDotation = 240;

  return settledDotation - choosedSum.value;
});

const makeOrder = (
  val: number,
  dishId: number,
  smallPortionQty?: number,
  bigPortionQty?: number
) => {
  choosedSum.value = val;
  const currentOrderDate = currentMenu.value.menu[0].menuItems.find(
    (menuItem) => WeekDay[menuItem.dayOfWeek] === activeDay.value
  ).date;
  const orderData = {
    orderDate: currentOrderDate,
    bigPortionQty: bigPortionQty ? Number(bigPortionQty) : 0,
    smallPortionQty: smallPortionQty ? Number(smallPortionQty) : 0,
    dishId,
    userId: user.value.id,
  };
  createOrder(orderData)
    .then(() => {
      isOrderCreateSuccessfully.value = true;
      setTimeout(() => {
        isOrderCreateSuccessfully.value = false;
      }, 5000);
    })
    .catch((err) => {
      isOrderCreateFailed.value = true;
      setTimeout(() => {
        isOrderCreateFailed.value = false;
      }, 5000);
    });
};

onMounted(() => {
  isLoadPageMenuOrder.value = true;
  fetchCommonMenu()
    .then((menuItems) => transformMenu(menuItems.menu))
    .finally(() => (isLoadPageMenuOrder.value = false));
});
</script>

<template>
  <VRow class="ma-2" justify="space-between">
    <VCol cols="12" md="6">
      <MenuBtnGroup :active-day="activeDay" @toggleDay="handleDay" />
    </VCol>
    <VCol cols="12" md="6" justify="center">
      <MenuRemainder :dotation="dotation" />
    </VCol>
  </VRow>
  <VCheckbox
    v-model="user.isShowOnlyVegetarian"
    class="ma-3 pa-2 mt-0 pt-0"
    @change="setVegeterian"
    label="Выбрать только вегетерианские блюда"
  />
  <VTabs v-model="tabs" show-arrows align-tabs="center">
    <VTab value="firstDishes"> Супы </VTab>
    <VTab value="seconDishes"> Вторые блюда (+ гарниры) </VTab>
    <VTab value="salads"> Салаты </VTab>
    <VTab value="bakeries"> Выпечка, хлеб </VTab>
  </VTabs>
  <VWindow v-model="tabs" :loading="isLoadPageMenuOrder">
    <VWindowItem value="firstDishes">
      <VContainer fluid v-if="activeDayMenu[MenuCategory?.FIRST_DISHES].length">
        <VRow>
          <VCol
            v-for="(firstDish, i) in activeDayMenu[MenuCategory?.FIRST_DISHES]"
            :key="i"
            cols="12"
            md="4"
          >
            <MenuCard :dish="firstDish" @makeOrder="makeOrder" />
          </VCol>
        </VRow>
      </VContainer>
      <h3 v-else class="mt-15 d-flex justify-center">No Dishes</h3>
    </VWindowItem>
    <VWindowItem value="seconDishes">
      <VContainer
        fluid
        v-if="activeDayMenu[MenuCategory?.SECOND_DISHES].length"
      >
        <VRow>
          <VCol
            v-for="(secondDish, i) in activeDayMenu[
              MenuCategory?.SECOND_DISHES
            ]"
            :key="i"
            cols="12"
            md="4"
          >
            <MenuCard
              v-if="secondDish"
              :dish="secondDish"
              @make-order="makeOrder"
            />
          </VCol>
        </VRow>
      </VContainer>
      <h3 v-else class="mt-15 mt-15 d-flex justify-center">No Dishes</h3>
    </VWindowItem>
    <VWindowItem value="salads">
      <VContainer fluid v-if="activeDayMenu[MenuCategory?.SALADS].length">
        <VRow>
          <VCol
            v-for="(salad, i) in activeDayMenu[MenuCategory?.SALADS]"
            :key="i"
            cols="12"
            md="4"
          >
            <MenuCard v-if="salad" :dish="salad" @make-order="makeOrder" />
          </VCol>
        </VRow>
      </VContainer>
      <h3 v-else class="mt-15 mt-15 d-flex justify-center">No Dishes</h3>
    </VWindowItem>
    <VWindowItem value="bakeries">
      <VContainer fluid v-if="activeDayMenu[MenuCategory.BAKERIES].length">
        <VRow>
          <VCol
            v-for="(bakery, i) in activeDayMenu[MenuCategory.BAKERIES]"
            :key="i"
            cols="12"
            md="4"
          >
            <MenuCard v-if="bakery" :dish="bakery" @make-order="makeOrder" />
          </VCol>
        </VRow>
      </VContainer>
      <h3 v-else class="mt-15 mt-15 d-flex justify-center">No Dishes</h3>
    </VWindowItem>
    <v-alert
      class="p-absolute"
      v-if="isOrderCreateSuccessfully"
      color="success"
      icon="$success"
      closable
      text="Заказ был успешно создан"
    ></v-alert>
    <v-alert
      class="p-absolute"
      v-if="isOrderCreateFailed"
      color="error"
      icon="$error"
      closable
      text="Ошибка создания заказа"
    ></v-alert>
  </VWindow>
</template>
