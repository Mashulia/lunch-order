import avatar1 from "@images/avatars/avatar-1.png";
import avatar2 from "@images/avatars/vinni-pukh.png";
interface User {
  id: number;
  avatarPhotoUrl: null | string;
  phone: string | null;
  lastName: string;
  firstName: string;
  middleName: string;
  isShowOnlyVegetarian: boolean;
  isReceiveEmails: boolean;
  email: string;
  roles: string[];
}

export const user = ref<User>({
  id: 2,
  avatarPhotoUrl: "",
  phone: "",
  lastName: "",
  firstName: "",
  middleName: "",
  isShowOnlyVegetarian: false,
  isReceiveEmails: true,
  email: "",
  roles: [],
});

export const isManager = computed<boolean>(() => {
  return !!(
    user.value.roles.length &&
    user.value.roles.find((userRole: string) => userRole === "manager")
  );
});

export const token = ref<string | null>(null);

export const MenuCategory = {
  FIRST_DISHES: "Первые блюда",
  SECOND_DISHES: "Вторые блюда (гарниры)",
  SALADS: "Салаты",
  BAKERIES: "Выпечка",
};

export const WeekDay = {
  Понедельник: "Пн",
  Вторник: "Вт",
  Среда: "Ср",
  Четверг: "Чт",
  Пятница: "Пт",
};

export const menuByDays = ref({
  Пн: {
    [MenuCategory.FIRST_DISHES]: [],
    [MenuCategory.SECOND_DISHES]: [],
    [MenuCategory.SALADS]: [],
    [MenuCategory.BAKERIES]: [],
  },
  Вт: {
    [MenuCategory.FIRST_DISHES]: [],
    [MenuCategory.SECOND_DISHES]: [],
    [MenuCategory.SALADS]: [],
    [MenuCategory.BAKERIES]: [],
  },
  Ср: {
    [MenuCategory.FIRST_DISHES]: [],
    [MenuCategory.SECOND_DISHES]: [],
    [MenuCategory.SALADS]: [],
    [MenuCategory.BAKERIES]: [],
  },
  Чт: {
    [MenuCategory.FIRST_DISHES]: [],
    [MenuCategory.SECOND_DISHES]: [],
    [MenuCategory.SALADS]: [],
    [MenuCategory.BAKERIES]: [],
  },
  Пт: {
    [MenuCategory.FIRST_DISHES]: [],
    [MenuCategory.SECOND_DISHES]: [],
    [MenuCategory.SALADS]: [],
    [MenuCategory.BAKERIES]: [],
  },
});

export const menuByDaysVegeterian = reactive({
  Пн: {
    [MenuCategory.FIRST_DISHES]: [],
    [MenuCategory.SECOND_DISHES]: [],
    [MenuCategory.SALADS]: [],
    [MenuCategory.BAKERIES]: [],
  },
  Вт: {
    [MenuCategory.FIRST_DISHES]: [],
    [MenuCategory.SECOND_DISHES]: [],
    [MenuCategory.SALADS]: [],
    [MenuCategory.BAKERIES]: [],
  },
  Ср: {
    [MenuCategory.FIRST_DISHES]: [],
    [MenuCategory.SECOND_DISHES]: [],
    [MenuCategory.SALADS]: [],
    [MenuCategory.BAKERIES]: [],
  },
  Чт: {
    [MenuCategory.FIRST_DISHES]: [],
    [MenuCategory.SECOND_DISHES]: [],
    [MenuCategory.SALADS]: [],
    [MenuCategory.BAKERIES]: [],
  },
  Пт: {
    [MenuCategory.FIRST_DISHES]: [],
    [MenuCategory.SECOND_DISHES]: [],
    [MenuCategory.SALADS]: [],
    [MenuCategory.BAKERIES]: [],
  },
});

export const menuOrder = ref({
  Пн: [],
  Вт: [],
  Ср: [],
  Чт: [],
  Пт: [],
});

export const isLoadPageMenuOrder = ref(false);

export const vegetarianKeywords = [
  "курица",
  "кур",
  "курицей",
  "куриное",
  "куриная",
  "окорочек",
  "окорочка",
  "горбуша",
  "мясо",
  "грудки",
  "грудка",
  "мяса",
  "рыба",
  "пикша",
  "индейка",
  "индейки",
  "филе",
  "печень",
  "ветчина",
  "колбаса",
  "фарш",
  "говядина",
  "говядины",
  "голень",
  "свинина",
  "кальмары",
  "свиная",
  "карбонад",
  "корейка",
  "сосиска",
  "навага",
  "сайра",
  "бедро",
];

export const currentMenu = ref({});

export const mainAvatar = ref(avatar1);
