<script lang="ts" setup>
const isMailing = ref(true)
const isVegeterian = ref(false)

const selectedNotification = ref("Only when I'm online")
</script>

<template>
  <VCard>
    <VTable class="text-no-wrap">
      <tbody>
        <tr>
          <td>Получать рассылку на почту</td>
          <td>
            <VCheckbox v-model="isMailing" />
          </td>
        </tr>
        <tr>
          <td>Показывать вегетерианские блюда</td>
          <td>
            <VCheckbox v-model="isVegeterian" />
          </td>
        </tr>
      </tbody>
    </VTable>
    <VDivider />

    <VCardText>
      <VForm @submit.prevent="() => {}">
        <div class="d-flex flex-wrap gap-4 mt-4">
          <VBtn type="submit"> Сохранить </VBtn>
          <VBtn
            color="secondary"
            variant="tonal"
            type="reset"
          >
           Сбросить
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>
