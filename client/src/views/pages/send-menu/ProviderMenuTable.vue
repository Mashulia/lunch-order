<script setup lang="ts">
import MenuBtnGroup from '@/views/menu-order/MenuBtnGroup.vue'

const groupBy = [
  {
    key: 'type',
  },
]

const headers = [
  {
    title: 'Наименование',
    align: 'start',
    sortable: false,
    key: 'title',
  },
  { title: 'Кол. М', key: 'qtySmall', sortable: false },
  { title: 'Кол. Б', key: 'qtyBig', sortable: false },
  { title: 'Кол.', key: 'qty', sortable: false },
  { title: 'Цена М', key: 'priceSmall', sortable: false },
  { title: 'Цена Б', key: 'priceBig', sortable: false },
  { title: 'Цена', key: 'price', sortable: false },
  { title: 'Ахмедьянов А.А.', key: 'name1', sortable: false },
  { title: 'Валуев ДВ', key: 'name2', sortable: false },
  { title: 'Гидзюк НА', key: 'name3', sortable: false },
  { title: 'Инзерова ВВ', key: 'name4', sortable: false },
  { title: 'Зверев АА', key: 'name5', sortable: false },
  { title: 'Коротков АВ', key: 'name6', sortable: false },
  { title: 'Меренков ГА', key: 'name7', sortable: false },
  { title: 'Пиджаков МС', key: 'name8', sortable: false },
  { title: 'Пронин АЮ', key: 'name9', sortable: false },
  { title: 'Пабст АА', key: 'name10', sortable: false },
  { title: 'Руднева МС', key: 'name11', sortable: false },
  { title: 'Сидорчук АЮ', key: 'name12', sortable: false },
  { title: 'Соловьев НВ', key: 'name13', sortable: false },
]

const Monday = [
  {
    title: 'Щи по-уральски 250 мл.',
    qty: 5,
    price: '80 руб',
    type: 'firstDish',
    name1: 1,
    name2: 1,
    name6: 1,
    name8: 1,
    name11: 1,
  },
  {
    title: 'Суп Сырный 250 мл.',
    qty: 2,
    price: '90 руб',
    type: 'firstDish',
    name7: 1,
    name8: 1,
    name10: 1,
  },
  {
    title: 'Суп- лапша домашняя 250 мл.',
    qty: 10,
    price: '72 руб',
    type: 'firstDish',
    name3: 2,
    name6: 1,
    name7: 1,
    name13: 2,
  },
  {
    title: 'Тефтели из индейки ( Картофельное пюре  ) 50/100/150 гр.',
    qtySmall: 2,
    priceSmall: '93 руб',
    priceBig: '123 руб',
    type: 'secondDish',
    name4: 1,
    name12: 1,
  },
  {
    title: 'Лемонема жареная ( Спагетти  ) 50/100/150 гр.',
    priceSmall: '81 руб',
    priceBig: '113 руб',
    type: 'secondDish',
  },
  {
    title: 'Окорочок тушеный с овощами ( Картофельное пюре  ) 85/15 гр/85/15 гр/150 гр.',
    qtySmall: 1,
    qtyBig: 3,
    priceSmall: '138 руб',
    priceBig: '138 руб',
    type: 'secondDish',
    name1: 1,
    name3: 1,
    name5: 1,
    name8: 1,
  },
  {
    title: 'Маринад из моркови 100 гр.',
    qty: 6,
    price: '50 руб',
    type: 'salad',
    name9: 2,
    name13: 2,
    name7: 1,
    name11: 1,
  },
  {
    title: 'Салат Мозайка 100 гр.',
    qty: 6,
    price: '54 руб',
    type: 'salad',
    name2: 2,
    name5: 4,
  },
  {
    title: 'Пицца с колбасой и сыром 100 гр.',
    qty: 3,
    price: '63 руб',
    type: 'bakery',
    name10: 1,
    name8: 1,
    name4: 1,
  },
  {
    title: 'Корж глазированный 90 гр.',
    qty: 1,
    price: '37 руб',
    type: 'bakery',
    name9: 1,
  },
]

const Tuesday = [
  {
    title: 'Щи по-уральски 250 мл.',
    qty: 5,
    price: '80 руб',
    type: 'firstDish',
    name1: 1,
    name2: 1,
    name6: 1,
    name8: 1,
    name11: 1,
  },
  {
    title: 'Суп Сырный 250 мл.',
    qty: 2,
    price: '90 руб',
    type: 'firstDish',
    name7: 1,
    name8: 1,
    name10: 1,
  },
  {
    title: 'Суп- лапша домашняя 250 мл.',
    qty: 10,
    price: '72 руб',
    type: 'firstDish',
    name3: 2,
    name6: 1,
    name7: 1,
    name13: 2,
  },
  {
    title: 'Тефтели из индейки ( Картофельное пюре  ) 50/100/150 гр.',
    qtySmall: 2,
    priceSmall: '93 руб',
    priceBig: '123 руб',
    type: 'secondDish',
    name4: 1,
    name12: 1,
  },
  {
    title: 'Лемонема жареная ( Спагетти  ) 50/100/150 гр.',
    priceSmall: '81 руб',
    priceBig: '113 руб',
    type: 'secondDish',
  },
  {
    title: 'Окорочок тушеный с овощами ( Картофельное пюре  ) 85/15 гр/85/15 гр/150 гр.',
    qtySmall: 1,
    qtyBig: 3,
    priceSmall: '138 руб',
    priceBig: '138 руб',
    type: 'secondDish',
    name1: 1,
    name3: 1,
    name5: 1,
    name8: 1,
  },
  {
    title: 'Маринад из моркови 100 гр.',
    qty: 6,
    price: '50 руб',
    type: 'salad',
    name9: 2,
    name13: 2,
    name7: 1,
    name11: 1,
  },
  {
    title: 'Салат Мозайка 100 гр.',
    qty: 6,
    price: '54 руб',
    type: 'salad',
    name2: 2,
    name5: 4,
  },
  {
    title: 'Пицца с колбасой и сыром 100 гр.',
    qty: 3,
    price: '63 руб',
    type: 'bakery',
    name10: 1,
    name8: 1,
    name4: 1,
  },
  {
    title: 'Корж глазированный 90 гр.',
    qty: 1,
    price: '37 руб',
    type: 'bakery',
    name9: 1,
  },
]

const Wednesdey = [
  {
    title: 'Щи по-уральски 250 мл.',
    qty: 5,
    price: '80 руб',
    type: 'firstDish',
    name1: 1,
    name2: 1,
    name6: 1,
    name8: 1,
    name11: 1,
  },
  {
    title: 'Суп Сырный 250 мл.',
    qty: 2,
    price: '90 руб',
    type: 'firstDish',
    name7: 1,
    name8: 1,
    name10: 1,
  },
  {
    title: 'Суп- лапша домашняя 250 мл.',
    qty: 10,
    price: '72 руб',
    type: 'firstDish',
    name3: 2,
    name6: 1,
    name7: 1,
    name13: 2,
  },
  {
    title: 'Тефтели из индейки ( Картофельное пюре  ) 50/100/150 гр.',
    qtySmall: 2,
    priceSmall: '93 руб',
    priceBig: '123 руб',
    type: 'secondDish',
    name4: 1,
    name12: 1,
  },
  {
    title: 'Лемонема жареная ( Спагетти  ) 50/100/150 гр.',
    priceSmall: '81 руб',
    priceBig: '113 руб',
    type: 'secondDish',
  },
  {
    title: 'Окорочок тушеный с овощами ( Картофельное пюре  ) 85/15 гр/85/15 гр/150 гр.',
    qtySmall: 1,
    qtyBig: 3,
    priceSmall: '138 руб',
    priceBig: '138 руб',
    type: 'secondDish',
    name1: 1,
    name3: 1,
    name5: 1,
    name8: 1,
  },
  {
    title: 'Маринад из моркови 100 гр.',
    qty: 6,
    price: '50 руб',
    type: 'salad',
    name9: 2,
    name13: 2,
    name7: 1,
    name11: 1,
  },
  {
    title: 'Салат Мозайка 100 гр.',
    qty: 6,
    price: '54 руб',
    type: 'salad',
    name2: 2,
    name5: 4,
  },
  {
    title: 'Пицца с колбасой и сыром 100 гр.',
    qty: 3,
    price: '63 руб',
    type: 'bakery',
    name10: 1,
    name8: 1,
    name4: 1,
  },
  {
    title: 'Корж глазированный 90 гр.',
    qty: 1,
    price: '37 руб',
    type: 'bakery',
    name9: 1,
  },
]

const Thursday = [
  {
    title: 'Щи по-уральски 250 мл.',
    qty: 5,
    price: '80 руб',
    type: 'firstDish',
    name1: 1,
    name2: 1,
    name6: 1,
    name8: 1,
    name11: 1,
  },
  {
    title: 'Суп Сырный 250 мл.',
    qty: 2,
    price: '90 руб',
    type: 'firstDish',
    name7: 1,
    name8: 1,
    name10: 1,
  },
  {
    title: 'Суп- лапша домашняя 250 мл.',
    qty: 10,
    price: '72 руб',
    type: 'firstDish',
    name3: 2,
    name6: 1,
    name7: 1,
    name13: 2,
  },
  {
    title: 'Тефтели из индейки ( Картофельное пюре  ) 50/100/150 гр.',
    qtySmall: 2,
    priceSmall: '93 руб',
    priceBig: '123 руб',
    type: 'secondDish',
    name4: 1,
    name12: 1,
  },
  {
    title: 'Лемонема жареная ( Спагетти  ) 50/100/150 гр.',
    priceSmall: '81 руб',
    priceBig: '113 руб',
    type: 'secondDish',
  },
  {
    title: 'Окорочок тушеный с овощами ( Картофельное пюре  ) 85/15 гр/85/15 гр/150 гр.',
    qtySmall: 1,
    qtyBig: 3,
    priceSmall: '138 руб',
    priceBig: '138 руб',
    type: 'secondDish',
    name1: 1,
    name3: 1,
    name5: 1,
    name8: 1,
  },
  {
    title: 'Маринад из моркови 100 гр.',
    qty: 6,
    price: '50 руб',
    type: 'salad',
    name9: 2,
    name13: 2,
    name7: 1,
    name11: 1,
  },
  {
    title: 'Салат Мозайка 100 гр.',
    qty: 6,
    price: '54 руб',
    type: 'salad',
    name2: 2,
    name5: 4,
  },
  {
    title: 'Пицца с колбасой и сыром 100 гр.',
    qty: 3,
    price: '63 руб',
    type: 'bakery',
    name10: 1,
    name8: 1,
    name4: 1,
  },
  {
    title: 'Корж глазированный 90 гр.',
    qty: 1,
    price: '37 руб',
    type: 'bakery',
    name9: 1,
  },
]

const Friday = [
  {
    title: 'Щи по-уральски 250 мл.',
    qty: 5,
    price: '80 руб',
    type: 'firstDish',
    name1: 1,
    name2: 1,
    name6: 1,
    name8: 1,
    name11: 1,
  },
  {
    title: 'Суп Сырный 250 мл.',
    qty: 2,
    price: '90 руб',
    type: 'firstDish',
    name7: 1,
    name8: 1,
    name10: 1,
  },
  {
    title: 'Суп- лапша домашняя 250 мл.',
    qty: 10,
    price: '72 руб',
    type: 'firstDish',
    name3: 2,
    name6: 1,
    name7: 1,
    name13: 2,
  },
  {
    title: 'Тефтели из индейки ( Картофельное пюре  ) 50/100/150 гр.',
    qtySmall: 2,
    priceSmall: '93 руб',
    priceBig: '123 руб',
    type: 'secondDish',
    name4: 1,
    name12: 1,
  },
  {
    title: 'Лемонема жареная ( Спагетти  ) 50/100/150 гр.',
    priceSmall: '81 руб',
    priceBig: '113 руб',
    type: 'secondDish',
  },
  {
    title: 'Окорочок тушеный с овощами ( Картофельное пюре  ) 85/15 гр/85/15 гр/150 гр.',
    qtySmall: 1,
    qtyBig: 3,
    priceSmall: '138 руб',
    priceBig: '138 руб',
    type: 'secondDish',
    name1: 1,
    name3: 1,
    name5: 1,
    name8: 1,
  },
  {
    title: 'Маринад из моркови 100 гр.',
    qty: 6,
    price: '50 руб',
    type: 'salad',
    name9: 2,
    name13: 2,
    name7: 1,
    name11: 1,
  },
  {
    title: 'Салат Мозайка 100 гр.',
    qty: 6,
    price: '54 руб',
    type: 'salad',
    name2: 2,
    name5: 4,
  },
  {
    title: 'Пицца с колбасой и сыром 100 гр.',
    qty: 3,
    price: '63 руб',
    type: 'bakery',
    name10: 1,
    name8: 1,
    name4: 1,
  },
  {
    title: 'Корж глазированный 90 гр.',
    qty: 1,
    price: '37 руб',
    type: 'bakery',
    name9: 1,
  },
]

const menuByDays = [{ Пн: Monday }, { Вт: Tuesday }, { Ср: Wednesdey }, { Чт: Thursday }, { Пт: Friday }]

const activeDayMenu = ref(menuByDays[0])

const handleDay = (val: PointerEvent) => {
  const targetValue = val.target.value

  activeDayMenu.value = menuByDays[targetValue]
}

const getGroupName = val => {
  switch (val) {
    case 'firstDish':
      return 'Супы'
    case 'secondDish':
      return 'Вторые блюда +(гарниры)   вес мал.мяса / вес бол.мяса / вес гарнира'
    case 'salad':
      return 'Салаты'
    case 'bakery':
      return 'Выпечка, хлеб'
    default:
      break
  }
}
</script>

<template>
  <div>
    <MenuBtnGroup
      :active-day="activeDay"
      class="mb-10"
      @toggle-day="handleDay($event)"
    />

    <VDataTable
      :headers="headers"
      :items="Monday"
      :group-by="groupBy"
      item-value="name"
      class="mb-10"
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
            {{ getGroupName(item.value) }}
          </td>
        </tr>
      </template>
    </VDataTable>
    <VRow
      display-flex
      justify-space-between
    >
      <VCol md4 />
      <VCol
        md4
        text-end
      >
        <VBtn> Отправить поставщику </VBtn>
      </VCol>
    </VRow>
  </div>
</template>
