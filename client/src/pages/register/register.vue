<script setup lang="ts">
import { useTheme } from "vuetify";

import authV1MaskDark from "@images/pages/auth-v1-mask-dark.png";
import authV1MaskLight from "@images/pages/auth-v1-mask-light.png";
import authV1Tree2 from "@images/pages/auth-v1-tree-2.png";
import authV1Tree from "@images/pages/auth-v1-tree.png";
import { submitForm } from "./controllers";
import { registerState, form } from "./model";
import { isFormEmailValid } from "../login/model";

const vuetifyTheme = useTheme();

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === "light"
    ? authV1MaskLight
    : authV1MaskDark;
});

const isPasswordVisible = ref(false);

const isRegisterEnabled = computed(
  () =>
    form.value.firstName &&
    form.value.lastName &&
    form.value.middleName &&
    form.value.password &&
    !isFormEmailValid.value
);

onBeforeUnmount(() => {
  registerState.isRegisterSuccess = false;
  registerState.isRegisterFailed = false;
})
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          Айди ланч
        </VCardTitle>
      </VCardItem>

      <VCardText>
        <VForm @submit.prevent="submitForm">
          <VRow>
            <!-- Имя -->
            <VCol cols="12">
              <VTextField v-model="form.firstName" label="Имя" required />
            </VCol>

            <!-- Фамилия -->
            <VCol cols="12">
              <VTextField v-model="form.lastName" label="Фамилия" required />
            </VCol>

            <!-- Отчество -->
            <VCol cols="12">
              <VTextField v-model="form.middleName" label="Отчество" required />
            </VCol>

            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                :rules="emailRules"
                label="Email"
                type="email"
                required
              />
            </VCol>

            <!-- phone -->
            <VCol cols="12">
              <VTextField v-model="form.phone" label="Телефон" type="phone" />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Пароль"
                :type="isPasswordVisible ? 'text' : 'password'"
                required
                :append-inner-icon="
                  isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
                "
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
            </VCol>

            <VCol>
              <VBtn block type="submit" :disabled="!isRegisterEnabled">
                Создать аккаунт
              </VBtn>
            </VCol>

            <!-- login instead -->
            <VCol cols="12" class="text-center text-base">
              <span>Уже есть аккаунт?</span>
              <RouterLink class="text-primary ms-2" to="login">
                Войти
              </RouterLink>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg class="auth-footer-mask d-none d-md-block" :src="authThemeMask" />

    <v-alert
      class="p-absolute"
      v-if="registerState.isRegisterSuccess"
      color="success"
      icon="$success"
      closable
      text="Пользователь был успешно зарегестрирован"
    ></v-alert>
    <v-alert
      class="p-absolute"
      v-if="registerState.isRegisterFailed"
      color="error"
      icon="$error"
      closable
      text="Ошибка создания пользователя"
    ></v-alert>
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>
