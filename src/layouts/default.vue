<template>
  <AppDrawer />
  <AppBar />
  <v-main :class="{ 'full-width': isDrawerClosed }">
    <router-view />
  </v-main>
  <AppFooter />
</template>

<script setup lang="ts">
import { useTitle } from '@vueuse/core'
const { drawer } = storeToRefs(useAppStore())
const route = useRoute()
const title = computed(() => {
  const title = route.meta?.title || route.matched[0].meta?.title || ''
  return title ? `${title} | Krill` : 'Krill Admin'
})
useTitle(title)
// Computed para determinar si el drawer está cerrado
const isDrawerClosed = computed(() => !drawer.value)
</script>

<style scoped>
.v-main {
  padding-top: 0;
  margin-top: var(--v-layout-top);
  padding-bottom: 0;
  margin-bottom: var(--v-layout-bottom);
  height: calc(100vh - var(--v-layout-top) - var(--v-layout-bottom));
  overflow-y: auto;
  transition-property: padding;
}
.full-width {
  width: 100% !important; /* Asegúrate de que tome todo el ancho */
  left: 0 !important;
  --v-layout-left: 0 !important;
}
</style>
