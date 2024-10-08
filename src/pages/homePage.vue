<script setup lang="ts">
import { useI18n } from 'vue-i18n'

definePage({
  meta: {
    icon: 'mdi-home',
    title: 'Homepage',
    drawerIndex: 0
  }
})

const { t, locale } = useI18n()

function changeLanguage(lang: string) {
  locale.value = lang
}
</script>

<template>
  <div class="wrapper">
    <v-icon icon="custom:vitify" size="3.5em" color="primary" class="mb-4" />
    <p>Test Krill</p>

    <button @click="changeLanguage('es')">Español</button>
    <button @click="changeLanguage('en')">English</button>
    <strong class="primary--text"> {{ $t('search_view.title') }} </strong>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  top: calc(50vh - 330px);
  text-align: center;
}
</style>
