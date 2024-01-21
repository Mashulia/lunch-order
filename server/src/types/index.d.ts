interface Dish {
  dishName: string;
  pricePerSmallPortion: string;
  pricePerBigPortion: string;
}

interface Group {
  group: DishGroup;
  dishes: Dish[];
}

interface Day {
  dayOfWeek: DayOfWeek;
  date: string;
  groups: Group[];
}
