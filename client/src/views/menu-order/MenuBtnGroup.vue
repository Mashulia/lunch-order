<script setup lang="ts">
const props = defineProps<{
  activeDay: string;
}>();

const emits = defineEmits<{
  (e: "toggleDay", val: string): void;
}>();

const activeDayCopy = ref("");
const daysWeek = { Пн: "Пн", Вт: "Вт", Ср: "Ср", Чт: "Чт", Пт: "Пт" };

onMounted(() => {
  activeDayCopy.value = props.activeDay;
});

const toggleday = () => {
  emits("toggleDay", activeDayCopy.value);
};
</script>

<template>
  <VBtnToggle v-model="activeDayCopy" tile color="deep-purple accent-3" group>
    <VBtn
      v-for="(dayWeek, i) in daysWeek"
      :key="i"
      :value="i"
      @click="toggleday"
    >
      {{ dayWeek }}
    </VBtn>
  </VBtnToggle>
</template>

<style scoped></style>
