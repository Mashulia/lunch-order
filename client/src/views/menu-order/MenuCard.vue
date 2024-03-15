<script setup lang="ts">
interface Ingredient {
  composition: string;
  comments: string;
}

interface Dish {
  id: number;
  type: string;
  title: string;
  priceLargePortion: number | null;
  priceSmallPortion: number | null;
  ingredient: Ingredient[];
  smallPortionQty: number | null;
  bigPortionQty: number | null;
}

interface Props {
  dish: Dish;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (
    e: "makeOrder",
    val: number,
    id: number,
    smallPortionQty: number,
    bigPortionQty: number
  ): void;
}>();

const smallPortionQty = ref();
const bigPortionQty = ref();

const totalPrice = computed<number>(() => {
  const totalPriceBigPortion = props.dish.priceLargePortion
    ? bigPortionQty.value * props.dish.priceLargePortion
    : 0;

  const totalPriceSmallPortion = props.dish.priceSmallPortion
    ? smallPortionQty.value * props.dish.priceSmallPortion
    : 0;
  return totalPriceBigPortion + totalPriceSmallPortion;
});

const numberRule = (val) => {
  if (val < 0) return "Please enter a positive number";

  return true;
};

const makeOrder = (dish: Dish) => {
  if (totalPrice.value) {
    emits(
      "makeOrder",
      totalPrice.value as number,
      props.dish.id,
      smallPortionQty.value,
      bigPortionQty.value
    );
  }
};

const show = ref(false);

onMounted(() => {
  smallPortionQty.value = props.dish.smallPortionQty
    ? props.dish.smallPortionQty
    : 0;

  bigPortionQty.value = props.dish.priceSmallPortion
    ? smallPortionQty.value * props.dish.priceSmallPortion
    : 0;
});
</script>

<template>
  <VCard class="position-relative" link>
    <template #title>
      <VDialog v-if="dish.ingredient.length" width="500">
        <template #activator="{ props }">
          <div v-bind="props">
            {{ dish.title }}
            <VTooltip activator="parent" location="top">
              {{ dish.title }}
            </VTooltip>
          </div>
        </template>

        <template #default="{ isActive }">
          <VCard title="Состав">
            <VCardText v-for="(ingredient, i) in dish.ingredient" :key="i">
              <div>
                {{ ingredient.composition }}
              </div>

              <VChip
                v-if="ingredient.comments"
                :style="'word-break: break-word, white-space: wrap'"
                >{{ ingredient.comments }}</VChip
              >
            </VCardText>
            <VCardActions>
              <VSpacer />

              <VBtn text="Закрыть" @click="isActive.value = false" />
            </VCardActions>
          </VCard>
        </template>
      </VDialog>

      <div v-else>
        {{ dish.title }}
      </div>
    </template>

    <VRow
      v-if="dish.priceSmallPortion"
      class="pa-2 ma-2"
      justify="space-between"
      align="center"
    >
      <div class="mb-8">
        {{ `Стоимость(M) - ${dish.priceSmallPortion} руб.` }}
      </div>
      <VTextField
        v-model="smallPortionQty"
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
      v-if="dish.priceLargePortion"
      class="pa-2 ma-2"
      justify="space-between"
      align="center"
    >
      <div class="mb-8">
        {{ `Стоимость(Б) - ${dish.priceLargePortion} руб.` }}
      </div>
      <VTextField
        v-model="bigPortionQty"
        clearable
        class="mb-8"
        hide-details="auto"
        :rules="[numberRule]"
        label="Количество порций"
        type="number"
        min="0"
      />
    </VRow>
    <VRow justify="space-between" class="pa-2 ma-2 pt-0 mt-0">
      <VCol cols="6 ma-0 pa-0">
        <VBtn block @click="makeOrder(dish)"> Заказать </VBtn>
      </VCol>

      <VCol cols="6  ma-0 pa-0" align="end">
        <h5 class="text-2xl font-weight-medium text-primary">
          <span> {{ totalPrice }} руб. </span>
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
