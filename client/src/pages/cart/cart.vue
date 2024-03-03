<script setup lang="ts">
import MenuBtnGroup from "@/views/menu-order/MenuBtnGroup.vue";
import { getAllUserOrders } from "@/api/order.api";
import { menuOrder, user } from "@/commonState/store";
import {
  transformOrderData,
  deleteDish,
  redirectToMenuOrder,
} from "./controllers";

const activeDay = ref("Пн");

const activeDayMenu = computed(() => menuOrder.value[activeDay.value]);

const toggleDay = (val: string) => {
  activeDay.value = val;
};

onMounted(() => {
  getAllUserOrders(user.value.id).then((orderData) =>
    transformOrderData(orderData)
  );
});

const totalActiveDaySum = computed(() =>
  menuOrder.value[activeDay.value].reduce(
    (accumulator: number, currentValue) => {
      const priceSmall = currentValue.priceSmallPortion
        ? currentValue.priceSmallPortion * currentValue.qtySmall
        : 0;
      const priceBig = currentValue.priceBigPortion
        ? currentValue.priceBigPortion * currentValue.qtyBig
        : 0;
      return accumulator + priceSmall + priceBig;
    },
    0
  )
);

const linkToReviewPage =
  "https://docs.google.com/forms/d/1Uj2cMh6q3dBMh8kA5G_kFYs0BbfwyjPapZCKu4nhmZU/viewform?edit_requested=true";
</script>

<template>
  <div>
    <MenuBtnGroup
      :active-day="activeDay"
      class="mb-10"
      @toggleDay="toggleDay"
    />

    <VList v-if="activeDayMenu?.length" class="mb-5">
      <VListItem v-for="(menu, i) in activeDayMenu" :key="i">
        <div
          v-if="menu.qtyBig"
          class="d-flex align-items-center border-bottom justify-space-between"
        >
          <div style="width: 90%">
            <div class="text-h6 mb-2">
              {{ menu.qtyBig }} X {{ menu.title }} (Б)
            </div>
            <div class="text-h6">
              Цена:
              {{ menu.priceBigPortion * menu.qtyBig }} руб.
            </div>
          </div>
          <VBtn
            style="width: 5%"
            color="grey-lighten-1"
            icon="mdi-close"
            variant="text"
            @click="deleteDish(activeDay, menu.dishId, menu.orderdate, false)"
          />
        </div>
        <div
          v-if="menu.qtySmall"
          class="d-flex align-items-center border-bottom justify-space-between"
        >
          <div style="width: 90%">
            <div class="text-h6 mb-2">
              {{ menu.qtySmall }} X {{ menu.title }} (M)
            </div>
            <div class="text-h6">
              Цена:
              {{ menu.priceSmallPortion * menu.qtySmall }} руб.
            </div>
          </div>
          <VBtn
            style="width: 5%"
            color="grey-lighten-1"
            icon="mdi-close"
            variant="text"
            @click="deleteDish(activeDay, menu.dishId, menu.orderDate)"
          />
        </div>
      </VListItem>

      <VRow justify="end" class="mt-15">
        <VCol cols="6" align="right">
          <v-chip class="mr-10"
            >Общая сумма:
            {{ totalActiveDaySum ? totalActiveDaySum : 0 }} руб.</v-chip
          >
        </VCol>
      </VRow>
    </VList>
    <VRow v-else class="mb-15">
      <VCol cols="12" lg="4" md="6">
        <VCard title="Пусто">
          <VCardText> Меню на этот день не заполнено </VCardText>
          <VCardActions>
            <VBtn @click="redirectToMenuOrder"> Заполнить меню </VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>

    <VBtn class="mt-50" :href="linkToReviewPage" target="_blank">
      Оставить отзыв
    </VBtn>
  </div>
</template>

<style scoped></style>
