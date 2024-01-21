<script lang="ts" setup>
import { useTheme } from 'vuetify'

import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

const vuetifyTheme = useTheme()
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="mdi-menu" />
        </IconBtn>

        <VSpacer />

        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavSectionTitle
        :item="{
          heading: 'Заказ',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Заполнить меню',
          icon: 'mdi-food',
          to: '/menu-order',
        }"
      />
      <VerticalNavLink
        class="dark"
        :item="{
          title: 'Просмотр заказа',
          icon: 'mdi-basket',
          to: '/cart',
        }"
      />
      <VerticalNavLink
        class="dark"
        :item="{
          title: 'Сводка суммы',
          icon: 'mdi-account-cash',
          to: '/summary',
        }"
      />

      <!-- 👉 Для менеджера -->
      <VerticalNavSectionTitle
        :item="{
          heading: 'Настройки',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Загрузить меню',
          icon: 'mdi-table',
          to: '/load-menu',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Отправить меню',
          icon: 'mdi-file-send',
          to: '/send-menu',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Создать рассылку',
          icon: 'mdi-email',
          to: '/create-newsletter',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Сотрудники',
          icon: 'mdi-account-group',
          to: '/employees',
        }"
      />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
