<script setup lang="ts">
const props = defineProps<{
  dialog: boolean
}>()

const emits = defineEmits<{
  (e: 'deleteEmployee', val: boolean): void
}>()

const dialogCopy = ref(props.dialog)

const deleteEmployee = () => {
  dialogCopy.value = false
  emits('deleteEmployee', dialogCopy.value)
}
</script>

<template>
  <VDialog
    v-model="dialogCopy"
    activator="parent"
    width="300"
  >
    <VCard>
      <VCardText class="text-center">
        Вы уверены, что хотите удалить сотрудника?<br />
        Отменить это действие будет невозможно!
      </VCardText>
      <VCardActions>
        <VBtn
          type="reset"
          color="error"
          variant="tonal"
          block
          @click="deleteEmployee"
        >
          Удалить сотрудника
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped></style>
