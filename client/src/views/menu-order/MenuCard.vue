<script setup lang="ts">
interface Dish {
  type: string
  title: string
  weight: string
  price?: number
  smallPortionPrice?: number
  bigPortionPrice?: number
}

interface Props {
  dish: Dish
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'makeOrder', val: number): void
}>()

const smallPortionQty = ref(0)
const bigPortionQty = ref(0)
const qty = ref(0)

const totalPrice = computed(() => {
  return bigPortionQty.value * props.dish.bigPortionPrice + smallPortionQty.value * props.dish.smallPortionPrice
})

const numberRule = val => {
  if (val < 0) return 'Please enter a positive number'

  return true
}

const makeOrder = (dish: Dish) => {
  const price = totalPrice.value ? totalPrice.value : dish!.price * qty.value

  emits('makeOrder', price as number)
}

const show = ref(false)
</script>

<template>
  <VCard
    class="position-relative"
    link
  >
    <template #title>
      <VDialog
        v-if="dish.composition"
        width="500"
      >
        <template #activator="{ props }">
          <div v-bind="props">
            {{ dish.title }}
            <VTooltip
              activator="parent"
              location="top"
            >
              Показать состав
            </VTooltip>
          </div>
        </template>

        <template #default="{ isActive }">
          <VCard title="Состав">
            <VCardText
              v-for="item in dish.composition"
              :key="item"
            >
              {{ item }}
            </VCardText>
            <VCardText v-if="dish.notes">
              <VChip>{{ dish.notes }}</VChip>
            </VCardText>

            <VCardActions>
              <VSpacer />

              <VBtn
                text="Закрыть"
                @click="isActive.value = false"
              />
            </VCardActions>
          </VCard>
        </template>
      </VDialog>

      <div v-else>
        {{ dish.title }}
      </div>
    </template>

    <VRow class="pa-2 ma-2">
      <div>
        Вес - {{ dish.weight }}
        <VTooltip
          v-if="dish.type === 'secondDish'"
          activator="parent"
          location="bottom"
        >
          вес мал.мяса / вес бол.мяса / вес гарнира
        </VTooltip>
      </div>
    </VRow>

    <VRow
      v-if="dish.type !== 'secondDish'"
      class="pa-2 ma-2"
      justify="space-between"
      align="center"
    >
      <div class="mb-8">
        {{ `Стоимость - ${dish.price} руб.` }}
      </div>
      <VTextField
        v-model="qty"
        clearable
        class="mb-8"
        hide-details="auto"
        :rules="[numberRule]"
        label="Количество порций"
        type="number"
        min="0"
      />
    </VRow>

    <VRow
      v-if="dish.type === 'secondDish'"
      class="pa-2 ma-2"
      justify="space-between"
      align="center"
    >
      <div class="mb-3">
        {{ `Маленькая порция - ${dish.bigPortionPrice} руб.` }}
      </div>
      <VTextField
        v-model="smallPortionQty"
        clearable
        hide-details="auto"
        :rules="[numberRule]"
        label="Количество порций"
        type="number"
        min="0"
      />
    </VRow>

    <VRow
      v-if="dish.type === 'secondDish'"
      class="pa-2 ma-2"
      justify="space-between"
      align="center"
    >
      <div class="mb-3">
        {{ `Большая порция - ${dish.bigPortionPrice} руб.` }}
      </div>
      <VTextField
        v-model="bigPortionQty"
        clearable
        hide-details="auto"
        :rules="[numberRule]"
        label="Количество порций"
        type="number"
        min="0"
      />
    </VRow>

    <VRow
      justify="space-between"
      class="pa-2 ma-2 pt-0 mt-0"
    >
      <VCol cols="6 ma-0 pa-0">
        <VBtn
          block
          @click="makeOrder(dish)"
        >
          Заказать
        </VBtn>
      </VCol>

      <VCol
        cols="6  ma-0 pa-0"
        align="end"
      >
        <h5 class="text-2xl font-weight-medium text-primary">
          <span v-if="totalPrice"> {{ totalPrice }} руб. </span>
          <span v-else-if="qty"> {{ dish.price * qty }} руб. </span>
        </h5>
      </VCol>
    </VRow>
  </VCard>
</template>

<style scoped lang="scss">
:deep.v-text-field {
  max-width: 200px;
}
</style>
