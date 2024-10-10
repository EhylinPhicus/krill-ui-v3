<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { mergeProps } from 'vue'

const { store } = useColorMode()

const menuShow = ref(false)
</script>

<template>
  <v-menu v-model="menuShow" :close-on-content-click="false" location="top right" offset="15">
    <template #activator="{ props: menu }">
      <v-tooltip location="top">
        <template #activator="{ props: tooltip }">
          <v-btn icon="mdi-palette-outline" v-bind="mergeProps(menu, tooltip)" :rounded="0" />
        </template>
        <span>Theme Palette</span>
      </v-tooltip>
    </template>
    <v-card width="320">
      <v-card-text class="text-center">
        <v-label class="mb-3">Theme Palette</v-label>
        <v-color-picker
          show-swatches
          elevation="0"
          width="288"
          mode="rgb"
          :modes="['rgb', 'hex', 'hsl']"
        />
        <v-btn-toggle v-model="store" mandatory class="mt-2" rounded="lg">
          <v-btn prepend-icon="mdi-white-balance-sunny" value="light">Light</v-btn>
          <v-btn prepend-icon="mdi-weather-night" value="dark">Dark</v-btn>
          <v-btn prepend-icon="mdi-laptop" value="auto">System</v-btn>
        </v-btn-toggle>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
