<script setup lang="ts">
import { createSupplier, getAllSuppliers } from '@/api/supplier.api';
import { saveMenu } from './controllers';

const suppliers = ref([])
const currentSupplier = ref<string>('')
const role = 'manager'
const newSupplier = ref('')
const isError = ref(false)
const uploadedFile = ref()

const selectData = computed(() => suppliers.value.map((supplier) => {
  return supplier.name
}))

const createNewSupplier = async () => {
      try {
        const createdSupplier = await createSupplier(newSupplier.value);
        console.log('Supplier created successfully:', createdSupplier);
        suppliers.value = getAllSuppliers()
      } catch (error) {
       console.log(error)
      }
}
const getSuppliers = async () => {
  try {
    suppliers.value = await getAllSuppliers();
    currentSupplier.value = suppliers.value[0].name
      } catch (error) {
       console.log(error)
      }
}


onMounted(() => {
  getSuppliers()
})
</script>

<template>
  <VRow class="position-relative">
    <VCol cols="12">
      <VCard title="Загрузить меню">
        <VCardText class="d-flex flex-column gap-y-8 mb-2">
          <VRow class="justify-space-between ">
            <VCol md="4">
              <VSelect
                v-model="currentSupplier"
                :items="selectData"
                label="Выберите поставщика"
              />
            </VCol>
            <VCol
              v-if="role === 'manager'"
              class="d-flex align-center"
              md="4"
            >
              <VTextField
                v-model="newSupplier"
                clearable
                hide-details="auto"
                label="Введите нового поставщика"
              />
              <VBtn
                icon
                color:
                primary
                @click="createNewSupplier"
              >
                <VIcon icon="mdi-check" />
              </VBtn>
            </VCol>
          </VRow>
          <div class="mb-15">
            <template v-for="supplier in selectData" :key="supplier">
              <VRadio
                v-model="currentSupplier"
                :value="supplier"
                :label="supplier"
                readonly
              />
            </template>
          </div>

          <VRow>
            <div class="d-flex pl-3">
              Загрузить:
            </div>

            <VCol
              cols="12"
            >
              <VFileInput
              v-model="uploadedFile"
            accept="excel/xlsx"
            placeholder="Выберите или перетащите сюда файл"
            label="Меню"
          />
            </VCol>
          </VRow>
        </VCardText>
        <VCardText class="mb-2">
          <VDialog
            transition="dialog-top-transition"
            width="auto"
          >
            <template #activator="{ props }">
              <VBtn
                color="primary"
                v-bind="props"
                :disabled="!uploadedFile"
                @click="saveMenu"
              >
                Сохранить
              </VBtn>
            </template>
            <template #default="{ isActive }">
              <VCard>
                <VCardText>
                  <div
                    v-if="isError"
                    class="text-h2 pa-12 text-center"
                  >
                    <VIcon
                      class="mb-6"
                      color="success"
                      icon="mdi-check-circle-outline"
                      size="128"
                    />

                    <div class="text-h4 font-weight-bold">
                      Меню было успешно загружено
                    </div>
                  </div>
                  <div
                    v-else
                    class="text-h2 pa-12 text-center"
                  >
                    <VIcon
                      class="mb-6"
                      color="error"
                      icon="mdi-error"
                      size="128"
                    />

                    <div class="text-h4 font-weight-bold">
                      Что-то пошло не так.<br> Попробуйте еще раз
                    </div>
                  </div>
                </VCardText>
                <VCardActions class="justify-end">
                  <VBtn
                    variant="text"
                    @click="isActive.value = false"
                  >
                    Закрыть
                  </VBtn>
                </VCardActions>
              </VCard>
            </template>
          </VDialog>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped></style>
