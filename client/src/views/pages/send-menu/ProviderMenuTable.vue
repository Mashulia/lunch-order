<script setup lang="ts">
import MenuBtnGroup from "@/views/menu-order/MenuBtnGroup.vue";
import { loadingTable, menuByDays } from "@/pages/send-menu/controllers";

const headers = [
  {
    title: "Наименование",
    align: "start",
    sortable: false,
    key: "title",
  },
  {
    title: "Кол. М",
    key: "smallPortionQty",
    align: "start",
    sortable: false,
  },
  {
    title: "Кол. Б",
    key: "largePortionQty",
    align: "start",
    sortable: false,
  },
  {
    title: "Цена М",
    key: "priceSmallPortion",
    align: "start",
    sortable: false,
  },
  {
    title: "Цена Б",
    key: "priceLargePortion",
    align: "start",
    sortable: false,
  },
];
const isSuccess = ref(false);
const groupBy = [
  {
    key: "type",
  },
];

const activeDay = ref("Пн");

const activeDayMenu = computed(() => menuByDays.value[activeDay.value]);

const handleDay = (val: string) => {
  activeDay.value = val;
};
const sendMenu = () => {
  isSuccess.value = true;
};
</script>

<template>
  <div>
    <MenuBtnGroup :activeDay="activeDay" class="mb-10" @toggleDay="handleDay" />
    <VDataTable
      :height="400"
      :headers="headers"
      :items="activeDayMenu"
      :group-by="groupBy"
      item-value="name"
      loading-text="Loading... Please wait"
      :loading="loadingTable"
      class="mb-10 h-100"
    >
      <template #group-header="{ item, columns, toggleGroup, isGroupOpen }">
        <tr>
          <td :colspan="columns.length">
            <VBtn
              size="small"
              variant="text"
              :icon="isGroupOpen(item) ? '$expand' : '$next'"
              @click="toggleGroup(item)"
            />
            {{ item.value }}
          </td>
        </tr>
      </template>
    </VDataTable>
  </div>
  <VCardText class="mb-2">
    <VDialog transition="dialog-top-transition" width="auto">
      <template #activator="{ props }">
        <VBtn color="primary" v-bind="props" @click="sendMenu">
          Отправить поставщику
        </VBtn>
      </template>
      <template #default="{ isActive }">
        <VCard>
          <VCardText>
            <div v-if="isSuccess" class="text-h2 pa-12 text-center">
              <VIcon
                class="mb-6"
                color="success"
                icon="mdi-check-circle-outline"
                size="128"
              />

              <div class="text-h4 font-weight-bold">
                Меню было успешно отправлено
              </div>
            </div>
          </VCardText>
          <VCardActions class="justify-end">
            <VBtn variant="text" @click="isActive.value = false">
              Закрыть
            </VBtn>
          </VCardActions>
        </VCard>
      </template>
    </VDialog>
  </VCardText>
  <!-- <VRow display-flex justify-space-between>
    <VCol md4 />
    <VCol md4 text-end>
      <VBtn> Отправить поставщику </VBtn>
    </VCol>
  </VRow> -->
</template>
