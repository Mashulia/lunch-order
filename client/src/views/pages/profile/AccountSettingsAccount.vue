<script lang="ts" setup>
import { user, mainAvatar } from "@/commonState/store";
import { updateUser } from "@/api/users.api";
import avatar1 from "@images/avatars/avatar-1.png";
import avatar2 from "@images/avatars/vinni-pukh.png";

const isUpdateUserSuccess = ref(false);
const isUpdateUserFailed = ref(false);

const accountData = {
  avatarPhotoUrl: avatar1,
  firstName: user.value.firstName,
  lastName: user.value.lastName,
  middleName: user.value.middleName,
  email: user.value.email,
  phone: user.value.phone,
};

const refInputEl = ref<HTMLElement>();

const accountDataLocal = ref(structuredClone(accountData));

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData);
};

// changeAvatar function
const changeAvatar = (file: Event) => {
  const fileReader = new FileReader();
  const { files } = file.target as HTMLInputElement;

  if (files && files.length) {
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        const userData = {
          avatarPhotoUrl: fileReader.result,
        };
        accountDataLocal.value.avatarPhotoUrl = avatar2;
        updateUser(user.value.id, userData);
      }
    };
  }
};

// reset avatar image
const resetAvatar = () => {
  setTimeout(() => (mainAvatar.value = avatar1), 1000);
  updateUser(user.value.id, "");
  setTimeout(() => (isUpdateUserSuccess.value = true), 1000);

  setTimeout(() => (isUpdateUserSuccess.value = false), 2000);
};
const saveProfile = () => {
  setTimeout(() => (isUpdateUserSuccess.value = true), 1000);
  mainAvatar.value = avatar2;
  setTimeout(() => (isUpdateUserSuccess.value = false), 2000);
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Детали аккаунта">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded="lg"
            size="100"
            class="me-6"
            :image="accountDataLocal.avatarPhotoUrl"
          />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <VBtn color="primary" @click="refInputEl?.click()">
                <VIcon icon="mdi-cloud-upload-outline" class="d-sm-none" />
                <span class="d-none d-sm-block">Загрузить новое фото</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              />

              <VBtn
                type="reset"
                color="error"
                variant="tonal"
                @click="resetAvatar"
              >
                <span class="d-none d-sm-block">Удалить фото</span>
                <VIcon icon="mdi-refresh" class="d-sm-none" />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">
              Разрешенные форматы: JPG, GIF, PNG. Максимальный размер: 800K
            </p>
          </form>
        </VCardText>

        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉 First Name -->
              <VCol md="6" cols="12">
                <VTextField v-model="accountDataLocal.firstName" label="Имя" />
              </VCol>

              <!-- 👉 Last Name -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountDataLocal.lastName"
                  label="Фамилия"
                />
              </VCol>

              <!-- 👉 Middle Name -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountDataLocal.middleName"
                  label="Отчество"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountDataLocal.email"
                  label="E-mail"
                  type="email"
                />
              </VCol>

              <!-- 👉 Phone -->
              <VCol cols="12" md="6">
                <VTextField v-model="accountDataLocal.phone" label="Телефон" />
              </VCol>

              <!-- 👉 Form Actions -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn @click="saveProfile">Сохранить</VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
                  @click.prevent="resetForm"
                >
                  Сбросить
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
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
