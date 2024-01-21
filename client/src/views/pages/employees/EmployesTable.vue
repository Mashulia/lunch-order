<script setup lang="ts">
const props = defineProps<{
  currentEmployee: string
  employees: string[]
}>()

const emits = defineEmits<{
  (e: 'selectCurrentRow', row: MouseEvent): void
}>()
</script>

<template>
  <VTable height="500">
    <tbody>
      <tr
        v-for="(employe, i) in employees"
        :key="i"
      >
        <td
          class="c-pointer"
          @click="emits('selectCurrentRow', $event)"
        >
          {{ employe }}
        </td>
      </tr>
    </tbody>
  </VTable>
</template>

<style scoped></style>
