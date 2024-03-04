<script setup lang="ts">
import MenuBtnGroup from "@/views/menu-order/MenuBtnGroup.vue";
import {
  loadingTable,
  menuByDays,
  headers,
} from "@/pages/send-menu/controllers";

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
</script>

<template>
  <div>
    <MenuBtnGroup :activeDay="activeDay" class="mb-10" @toggleDay="handleDay" />
    <!-- <div> -->
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
  <VRow display-flex justify-space-between>
    <VCol md4 />
    <VCol md4 text-end>
      <VBtn> Отправить поставщику </VBtn>
    </VCol>
  </VRow>
  <!-- </div> -->
</template>
