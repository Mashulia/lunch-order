<script setup lang="ts">
import { getToken } from "./commonState/controllers";

getToken();
</script>

<template>
  <VApp>
    <RouterView />
  </VApp>
</template>
