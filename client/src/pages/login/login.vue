<script setup lang="ts">
import { useTheme } from "vuetify";

import authV1MaskDark from "@images/pages/auth-v1-mask-dark.png";
import authV1MaskLight from "@images/pages/auth-v1-mask-light.png";
import authV1Tree2 from "@images/pages/auth-v1-tree-2.png";
import authV1Tree from "@images/pages/auth-v1-tree.png";
import { loginState, form } from "./model";
import { login } from "./controllers";

const vuetifyTheme = useTheme();

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === "light"
    ? authV1MaskLight
    : authV1MaskDark;
});
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          Айди ланч
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <p class="mb-0">Пожалуйста, войдите в личный аккаунт</p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="() => {}">
          <VRow>
            <VCol cols="12">
              <!-- email -->
              <VTextField v-model="form.email" label="Email" type="email" />
            </VCol>
            <!-- password -->
            <VCol cols="12">
              <VTextField v-model="form.password" label="Пароль" type="text" />
            </VCol>

            <VCol cols="12">
              <!-- remember me checkbox -->
              <div
                class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
              >
                <VCheckbox v-model="form.remember" label="Запомнить меня" />

                <a class="ms-2 mb-1" href="javascript:void(0)">
                  Забыли пароль?
                </a>
              </div>
            </VCol>

            <VCol cols="12">
              <!-- login button -->
              <VBtn block type="submit" @click="login"> Вход </VBtn>
            </VCol>

            <!-- create account -->
            <VCol cols="12" class="text-center text-base">
              <span>Еще нет аккаунта?</span>
              <RouterLink class="text-primary ms-2" to="/register">
                Создать аккаунт
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
      v-if="loginState.isLoginSuccess"
      color="success"
      icon="$success"
      closable
      text="Вход успешен"
    ></v-alert>
    <v-alert
      class="p-absolute"
      v-if="loginState.isLoginFailed"
      color="error"
      icon="$error"
      closable
      text="Ошибка входа"
    ></v-alert>
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>
