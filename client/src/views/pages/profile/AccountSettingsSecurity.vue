<script lang="ts" setup>
const isCurrentPasswordVisible = ref(false);
const isNewPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);
const currentPassword = ref("12345678");
const newPassword = ref("87654321");
const confirmPassword = ref("87654321");

const passwordRequirements = [
  "Минимум 8 знаков - чем больше, тем лучше",
  "Хотя бы один символ в нижнем регистре",
  "Хотя бы одно число, символ, или пробел",
];

const isUpdateUserSuccess = ref(false);
const isUpdateUserFailed = ref(false);

const saveProfile = () => {
  setTimeout(() => (isUpdateUserSuccess.value = true), 1000);

  setTimeout(() => (isUpdateUserSuccess.value = false), 2000);
};
</script>

<template>
  <VRow>
    <!-- SECTION: Change Password -->
    <VCol cols="12">
      <VCard title="Сменить пароль">
        <VForm>
          <VCardText>
            <!-- 👉 Current Password -->
            <VRow class="mb-3">
              <VCol cols="12" md="6">
                <!-- 👉 current password -->
                <VTextField
                  v-model="currentPassword"
                  :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isCurrentPasswordVisible
                      ? 'mdi-eye-off-outline'
                      : 'mdi-eye-outline'
                  "
                  label="Текущий пароль"
                  @click:append-inner="
                    isCurrentPasswordVisible = !isCurrentPasswordVisible
                  "
                />
              </VCol>
            </VRow>

            <!-- 👉 New Password -->
            <VRow>
              <VCol cols="12" md="6">
                <!-- 👉 new password -->
                <VTextField
                  v-model="newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isNewPasswordVisible
                      ? 'mdi-eye-off-outline'
                      : 'mdi-eye-outline'
                  "
                  label="Новый пароль"
                  @click:append-inner="
                    isNewPasswordVisible = !isNewPasswordVisible
                  "
                />
              </VCol>

              <VCol cols="12" md="6">
                <!-- 👉 confirm password -->
                <VTextField
                  v-model="confirmPassword"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isConfirmPasswordVisible
                      ? 'mdi-eye-off-outline'
                      : 'mdi-eye-outline'
                  "
                  label="Повторить пароль"
                  @click:append-inner="
                    isConfirmPasswordVisible = !isConfirmPasswordVisible
                  "
                />
              </VCol>
            </VRow>
          </VCardText>

          <!-- 👉 Password Requirements -->
          <VCardText>
            <p class="text-base font-weight-medium mt-2">Требования:</p>

            <ul class="d-flex flex-column gap-y-3">
              <li
                v-for="item in passwordRequirements"
                :key="item"
                class="d-flex"
              >
                <div>
                  <VIcon size="7" icon="mdi-circle" class="me-3" />
                </div>
                <span class="font-weight-medium">{{ item }}</span>
              </li>
            </ul>
          </VCardText>

          <!-- 👉 Action Buttons -->
          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn @click="saveProfile">Сохранить</VBtn>

            <VBtn type="reset" color="secondary" variant="tonal">
              Сбросить
            </VBtn>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
    <!-- !SECTION -->
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
