<script setup lang="ts">
import MenuCard from '@/views/menu-order/MenuCard.vue'
import MenuBtnGroup from '@/views/menu-order/MenuBtnGroup.vue'
import MenuRemainder from '@/views/menu-order/MenuRemainder.vue'

const tabs = ref(null)

const firstDishes = [
  {
    type: 'firstDish',
    title: 'Щи из св.капусты',
    weight: '250 мл.',
    price: 80,
    composition: [
      'Капуста, Картофель, Морковь, Лук репчатый, Помидоры, Масло растительное, Вода, Кубик куриный, Сметана, Петрушка, Окорочка, Перец болгарский',
    ],
  },
  {
    type: 'firstDish',
    title: 'Похлебка по- суворовски',
    weight: '250 мл.',
    price: 80,
    composition: [
      'Горбуша с/м, Картофель, Лук репчатый, Морковь, Масло растительное, Томат паста, Чеснок, Шампиньоны свежие, Соль пищевая, Перец душистый горошек, Лавровый лист, Приправа для рыбы',
    ],
  },
  {
    type: 'firstDish',
    title: 'Суп из макаронных изделий',
    weight: '250 мл.',
    price: 80,
    composition: [
      'Макароны, Морковь, Лук репчатый, Масло растительное, Вода, Петрушка, Окорочка, Картофель, Кубики кур/гриб',
    ],
  },
]

const seconDishes = [
  {
    type: 'secondDish',
    title: 'Котлета натур. из индейки ( Картофельное пюре  )',
    weight: '75/75/150 гр.',
    smallPortionPrice: 121,
    bigPortionPrice: 121,
    composition: [
      'Филе индейки, Хлеб высший сорт, Соль пищевая, Перец черный молотый, Яйцо, Молоко 3,2%, Смесь панировочная, Лук репчатый',
      'Масло крестьянское, Соль пищевая Илецкая, Молоко, Картофель',
    ],
  },
  {
    type: 'secondDish',
    title: 'Котлета натур. из индейки ( Гречка рассыпчатая с грибами  )',
    weight: '75/75/150 гр.',
    smallPortionPrice: 121,
    bigPortionPrice: 121,
    composition: [
      'Филе индейки, Хлеб высший сорт, Соль пищевая, Перец черный молотый, Яйцо, Молоко 3,2%, Смесь панировочная, Лук репчатый',
      'Гречневая крупа, Лук репчатый, Соль пищевая, Шампиньоны свежие, Масло растительное, Бульон грибной, Вода',
    ],
  },
  {
    type: 'secondDish',
    title: 'Котлета натур. из индейки ( Овощи тушеные  )',
    weight: '75/75/150 гр.',
    smallPortionPrice: 121,
    bigPortionPrice: 121,
    composition: [
      'Филе индейки, Хлеб высший сорт, Соль пищевая, Перец черный молотый, Яйцо, Молоко 3,2%, Смесь панировочная, Лук репчатый',
      'Картофель, Капуста, Лук репчатый, Морковь, Кабачок, Перец болгарский, Зелень, Чеснок, Зеленый горошек зам., Соль пищевая, Масло растительное',
    ],
  },
]

const salads = [
  {
    type: 'salad',
    title: 'Салат из свеклы по-корейски',
    weight: '100 гр.',
    price: 80,
    composition: [
      'Свекла, Лук репчатый, Масло подсолнечное рафинированное, Соевый соус, Чеснок, Перец черный молотый, Перец красный молотый, Уксус столовый 3%, Сахар, Соль пряная',
    ],
  },
  {
    type: 'salad',
    title: 'Салат Столичный',
    weight: '100 гр.',
    price: 80,
    composition: ['Филе грудки курин., Картофель, Яйцо, Морковь, Огурцы марин., Укроп, Майонез'],
  },
  {
    type: 'salad',
    title: 'Салат Нежность',
    weight: '100 гр.',
    price: 80,
    composition: [
      'Майонез, Петрушка, Ветчина Венская, Морковь, Картофель, П.Ф. Шампиньоны жареные, Кукуруза консервир.',
    ],
    notes: 'слоеный',
  },
]

const bakeries = [
  {
    type: 'bakery',
    title: 'Слойка с ветчиной-сыром',
    weight: '110 гр.',
    price: 80,
  },
  {
    type: 'bakery',
    title: 'Пирожок жареный с картошкой',
    weight: '90 гр.',
    price: 80,
  },
  {
    type: 'bakery',
    title: 'Булочка «Домашняя»',
    weight: '80 гр.',
    price: 80,
    composition: ['Мука пшеничная высшего сорта, Сахар, Маргарин, Меланж, Соль, Дрожжи (прессованные)'],
  },
]

const menuByDays = {
  Пн: {
    firstDishes,
    seconDishes,
    salads,
    bakeries,
  },
  Вт: {
    firstDishes,
    seconDishes,
    salads,
    bakeries,
  },
  Ср: {
    firstDishes,
    seconDishes,
    salads,
    bakeries,
  },
  Чт: {
    firstDishes,
    seconDishes,
    salads,
    bakeries,
  },
  Пт: {
    firstDishes,
    seconDishes,
    salads,
    bakeries,
  },
}

const activeDay = ref('Пн')

const activeDayMenu = ref(menuByDays['Пн'])

const handleDay = (val: PointerEvent) => {
  const targetValue = val.target.value

  activeDayMenu.value = menuByDays[targetValue]
}

const choosedSum = ref(0)

const dotation = computed(() => {
  const settledDotation = 240

  return settledDotation - choosedSum.value
})

const makeOrder = (val: number) => {
  choosedSum.value = val
}
</script>

<template>
  <VRow
    class="ma-2"
    justify="space-between"
  >
    <VCol
      cols="12"
      md="6"
    >
      <MenuBtnGroup
        :active-day="activeDay"
        @toggle-day="handleDay($event)"
      />
    </VCol>
    <VCol
      cols="12"
      md="6"
      justify="center"
    >
      <MenuRemainder :dotation="dotation" />
    </VCol>
  </VRow>
  <VCheckbox
    class="ma-3 pa-2 mt-0 pt-0"
    label="Выбрать только вегетерианские блюда"
  />
  <VTabs
    v-model="tabs"
    show-arrows
    align-tabs="center"
  >
    <VTab value="firstDishes"> Супы </VTab>
    <VTab value="seconDishes"> Вторые блюда (+ гарниры) </VTab>
    <VTab value="salads"> Салаты </VTab>
    <VTab value="bakeries"> Выпечка, хлеб </VTab>
  </VTabs>
  <VWindow v-model="tabs">
    <VWindowItem value="firstDishes">
      <VContainer fluid>
        <VRow>
          <VCol
            v-for="(firstDish, i) in activeDayMenu.firstDishes"
            :key="i"
            cols="12"
            md="4"
          >
            <MenuCard
              :dish="firstDish"
              @make-order="makeOrder"
            />
          </VCol>
        </VRow>
      </VContainer>
    </VWindowItem>
    <VWindowItem value="seconDishes">
      <VContainer fluid>
        <VRow>
          <VCol
            v-for="(secondDish, i) in activeDayMenu.seconDishes"
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
    </VWindowItem>
    <VWindowItem value="salads">
      <VContainer fluid>
        <VRow>
          <VCol
            v-for="(salad, i) in activeDayMenu.salads"
            :key="i"
            cols="12"
            md="4"
          >
            <MenuCard
              v-if="salad"
              :dish="salad"
              @make-order="makeOrder"
            />
          </VCol>
        </VRow>
      </VContainer>
    </VWindowItem>
    <VWindowItem value="bakeries">
      <VContainer fluid>
        <VRow>
          <VCol
            v-for="(bakery, i) in activeDayMenu.bakeries"
            :key="i"
            cols="12"
            md="4"
          >
            <MenuCard
              v-if="bakery"
              :dish="bakery"
              @make-order="makeOrder"
            />
          </VCol>
        </VRow>
      </VContainer>
    </VWindowItem>
  </VWindow>
</template>
