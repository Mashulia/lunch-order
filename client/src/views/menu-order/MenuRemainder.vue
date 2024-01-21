<script setup lang="ts">
const props = defineProps<{
  dotation: number
}>()

const computedColor = computed(() => {
  return props.dotation >= 0 ? 'primary' : 'error'
})
</script>

<template>
  <div class="d-flex align-center">
    <div class="ma-2">Остаток:</div>
    <VChip
      :color="computedColor"
      class="ma-2"
    >
      {{ dotation }} / 240
    </VChip>
  </div>
</template>

<style scoped></style>
