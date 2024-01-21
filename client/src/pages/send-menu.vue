<script setup lang="ts">
import ProviderMenuTable from '@/views/pages/send-menu/ProviderMenuTable.vue'

const route = useRoute()

const activeTab = ref(route.params.tab)

const tabs = [
  { title: 'Бизнес-ланч', icon: 'mdi-menu', tab: 'provider1' },
  { title: 'Еще один поставщик', icon: 'mdi-menu', tab: 'provider2' },
]
</script>

<template>
  <VTabs
    v-model="activeTab"
    show-arrows
  >
    <VTab
      v-for="item in tabs"
      :key="item.icon"
      :value="item.tab"
    >
      <VIcon
        size="20"
        start
        :icon="item.icon"
      />
      {{ item.title }}
    </VTab>
  </VTabs>
  <VDivider />

  <VWindow
    v-model="activeTab"
    class="mt-5 disable-tab-transition"
  >
    <!-- Providers -->
    <VWindowItem value="provider1">
      <ProviderMenuTable />
    </VWindowItem>

    <!-- Security -->
    <VWindowItem value="provider2">
      <ProviderMenuTable />
    </VWindowItem>
  </VWindow>
</template>
