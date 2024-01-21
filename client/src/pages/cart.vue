<script setup lang="ts">
import router from '@/router'
import MenuBtnGroup from '@/views/menu-order/MenuBtnGroup.vue'

let menuOrder = {
  Пн: [
    {
      type: 'secondDish',
      title: 'Котлета натур. из индейки ( Картофельное пюре  )',
      weight: '75/75/150 гр.',
      portion: 'big',
      price: 121,
      qty: 2,
    },
    {
      type: 'firstDish',
      title: 'Суп из макаронных изделий',
      weight: '250 мл.',
      price: 80,
      qty: 1,
    },
    {
      type: 'salad',
      title: 'Салат из свеклы по-корейски',
      weight: '100 гр.',
      price: 80,
      qty: 1,
    },
  ],
  Вт: [
    {
      type: 'firstDish',
      title: 'Щи из св.капусты',
      weight: '250 мл.',
      price: 80,
      qty: 1,
    },
    {
      type: 'secondDish',
      title: 'Котлета натур. из индейки ( Гречка рассыпчатая с грибами  )',
      weight: '75/75/150 гр.',
      portion: 'small',
      price: 121,
      qty: 1,
    },
    {
      type: 'bakery',
      title: 'Слойка с ветчиной-сыром',
      weight: '110 гр.',
      price: 80,
      qty: 1,
    },
  ],
  Ср: [
    {
      type: 'salad',
      title: 'Салат Нежность',
      weight: '100 гр.',
      price: 80,
      qty: 2,
    },
    {
      type: 'bakery',
      title: 'Пирожок жареный с картошкой',
      weight: '90 гр.',
      price: 80,
      qty: 2,
    },
  ],
  Чт: [
    {
      type: 'firstDish',
      title: 'Щи из св.капусты',
      weight: '250 мл.',
      price: 80,
      qty: 1,
    },
    {
      type: 'secondDish',
      title: 'Котлета натур. из индейки ( Овощи тушеные  )',
      weight: '75/75/150 гр.',
      portion: 'big',
      qty: 1,
    },
  ],
  Пт: [
    {
      type: 'salad',
      title: 'Салат Нежность',
      weight: '100 гр.',
      price: 80,
      qty: 2,
    },
    {
      type: 'salad',
      title: 'Салат из свеклы по-корейски',
      weight: '100 гр.',
      price: 80,
      qty: 2,
    },
  ],
}
const activeDay = ref('Пн')

const activeDayMenu = ref(menuOrder['Пн'])

const toggleDay = (val: PointerEvent) => {
  const targetValue = val.target.value

  activeDayMenu.value = menuOrder[targetValue]
}

const deleteDish = (i: number) => {
  const currentMenu = menuOrder[activeDay.value][i]
  const isDishQtyMoreThanOne = currentMenu.qty > 1

  if (isDishQtyMoreThanOne) {
    currentMenu.qty--
  } else menuOrder = menuOrder[activeDay.value].filter(elem => elem.title !== currentMenu.title)
}

const totalActiveDaySum = computed(() =>
  menuOrder[activeDay.value].reduce((accumulator: number, currentValue) => {
    return accumulator + currentValue.price * currentValue.qty
  }, 0),
)

const redirectToMenuOrder = () => {
  router.push('/')
}

const linkToReviewPage =
  'https://docs.google.com/forms/d/1Uj2cMh6q3dBMh8kA5G_kFYs0BbfwyjPapZCKu4nhmZU/viewform?edit_requested=true'
</script>

<template>
  <div>
    <MenuBtnGroup
      :active-day="activeDay"
      class="mb-10"
      @toggle-day="toggleDay"
    />

    <template v-if="menuOrder">
      <VList class="mb-5">
        <VListItem
          v-for="(menu, i) in activeDayMenu"
          :key="menu.title"
        >
          <div class="text-h6 mb-2">
            {{ menu.title }}
          </div>
          <div>Вес: {{ menu.weight }} ({{ menu.portion === 'big' ? 'Б' : 'М' }})</div>
          <div>
            Цена: {{ menu.price }} руб.
            <span v-if="menu.qty > 1">X {{ menu.qty }} шт.</span>
          </div>
          <template #append>
            <VBtn
              color="grey-lighten-1"
              icon="mdi-close"
              variant="text"
              @click="deleteDish(i)"
            />
          </template>
        </VListItem>
      </VList>
      <VRow
        justify="end"
        class="mb-15"
      >
        <VCol
          cols="6"
          align="right"
        >
          Общая сумма: {{ totalActiveDaySum }} руб.
        </VCol>
      </VRow>
    </template>

    <template v-else>
      <VRow class="mb-15">
        <VCol
          cols="12"
          lg="4"
          md="6"
        >
          <VCard title="Пусто">
            <VCardText> Меню на этот день не заполнено </VCardText>
            <VCardActions>
              <VBtn @click="redirectToMenuOrder"> Заполнить меню </VBtn>
            </VCardActions>
          </VCard>
        </VCol>
      </VRow>
    </template>

    <VBtn
      class="mt-50"
      :href="linkToReviewPage"
      target="_blank"
    >
      Оставить отзыв
    </VBtn>
  </div>
</template>

<style scoped></style>
