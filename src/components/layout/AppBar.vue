<script setup lang="ts">
const { drawer } = storeToRefs(useAppStore())
const route = useRoute()

const breadcrumbs = computed(() => {
  return route!.matched
    .slice(1)
    .filter((item) => item.meta && item.meta.title && !(item.meta?.breadcrumb === 'hidden'))
    .map((r) => ({
      title: r.meta.title!,
      disabled: r.meta?.breadcrumb === 'disabled' || r.path === route.path || false,
      to: r.path
    }))
})
</script>

<template>
  <v-app-bar class="dark" flat>
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <v-breadcrumbs :items="breadcrumbs" />
    <v-spacer />
    <div id="app-bar" />
    <v-spacer />
    <hr />
  </v-app-bar>
</template>

<style scoped>
:deep(.v-breadcrumbs-divider) {
  opacity: 0.5;
}
:deep(.v-switch__thumb .v-icon) {
  --v-icon-size-multiplier: 1.2 !important;
}
.dark {
  border-bottom: solid grey 1px;
}
</style>
