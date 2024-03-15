<script lang="ts" setup>
import { updateUser } from "@/api/users.api";
import { user } from "@/commonState/store";

const isMailing = ref(true);
const isVegeterian = ref(false);

const selectedNotification = ref("Only when I'm online");
const isUpdateUserSuccess = ref(false);
const isUpdateUserFailed = ref(false);

const saveProfile = () => {
  setTimeout(() => (isUpdateUserSuccess.value = true), 1000);

  setTimeout(() => (isUpdateUserSuccess.value = false), 2000);
};
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
            <VCheckbox
              v-model="isVegeterian"
              @click="user.isShowOnlyVegetarian = true"
            />
          </td>
        </tr>
      </tbody>
    </VTable>
    <VDivider />

    <VCardText>
      <VForm @submit.prevent="() => {}">
        <div class="d-flex flex-wrap gap-4 mt-4">
          <VBtn type="submit" @click="saveProfile"> Сохранить </VBtn>
          <VBtn color="secondary" variant="tonal" type="reset"> Сбросить </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
  <v-alert
    class="p-absolute left--1"
    v-if="isUpdateUserSuccess"
    color="success"
    icon="$success"
    closable
    text="Профиль обновлен"
  ></v-alert>
  <v-alert
    class="p-absolute left--1"
    v-if="isUpdateUserFailed"
    color="error"
    icon="$error"
    closable
    text="Ошибка обновления профиля"
  ></v-alert>
</template>
