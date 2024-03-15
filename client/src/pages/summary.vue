<script lang="ts" setup>
import { getSummary } from '@/api/summary.api';
import { isManager } from '@/commonState/store';
const staff = ref(null)

const subsidySize = ref(240)

const numberRule = val => {
  if (val < 0)
    return 'Please enter a positive number'

  return true
}

const calcRemainSubsidy = (sum: number) => {
  return subsidySize.value * 5 - sum
}
onMounted(() => {
  getSummary().then((data) => {
    if (data) {
      data.forEach((user) => {
        user.menuOrder.shift()
      })
    staff.value = data
    }
  })
})

</script>

<template>
  <div class="d-flex flex-column justify-space-between">
    <VTable
      density="compact"
      max-height="500"
      class="mb-10"
    >
      <thead>
        <tr>
          <th class="text-uppercase">
            Сотрудники
          </th>
          <th class="text-uppercase text-center">
            Пн
          </th>
          <th class="text-uppercase text-center">
            Вт
          </th>
          <th class="text-uppercase text-center">
            Ср
          </th>
          <th class="text-uppercase text-center">
            Чт
          </th>
          <th class="text-uppercase text-center">
            Пт
          </th>
          <th class="text-uppercase text-center">
            Итого за неделю
          </th>
          <th class="text-uppercase text-center">
            Размер дотации
          </th>
          <th class="text-uppercase text-center">
            Остаток дотации
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item in staff"
          :key="item"
        >
          <td>
            {{ item.user }}
          </td>
          <td
            v-for="(sum, i) in item.menuOrder"
            :key="i"
            class="text-center"
          >
            {{ sum }}
          </td>
          <td class="text-center">
            {{ item.total ?? 0 }}
          </td>
          <td class="text-center">
            {{ subsidySize }}
          </td>
          <td
            class="text-center"
            :class="calcRemainSubsidy(item.total) >= 0 ? 'bg-primary' : 'bg-error'"
          >
            {{ calcRemainSubsidy(item.total) }}
          </td>
        </tr>
      </tbody>
    </VTable>
    <div
      v-if="isManager === 'manager'"
      class="d-flex mt-auto align-center ml-auto"
    >
      <VTextField
        v-model="subsidySize"
        clearable
        hide-details="auto"
        :rules="[numberRule]"
        label="Введите дотацию"
        type="number"
        min="0"
      />
      <VBtn
        icon
        color:
        primary
      >
        <VIcon icon="mdi-check" />
      </VBtn>
    </div>
  </div>
</template>

<style scoped>
:deep.v-text-field {
  max-width: 200px;
}
</style>
