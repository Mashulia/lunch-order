<script setup lang="ts">
const props = defineProps<{
  activeDay: string;
}>();

const emits = defineEmits<{
  (e: "toggleDay", val: PointerEvent): void;
}>();

const activeDayCopy = ref("");
const daysWeek = ["Пн", "Вт", "Ср", "Чт", "Пт"];

onMounted(() => {
  activeDayCopy.value = props.activeDay;
});

const toggleday = (val: PointerEvent) => {
  emits("toggleDay", val);
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
