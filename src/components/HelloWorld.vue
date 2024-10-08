<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Table from './table.vue'

defineProps<{
  msg: string
}>()

const { t, locale } = useI18n()

function changeLanguage(lang: string) {
  locale.value = lang
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>Hola mundo</h3>
    <button @click="changeLanguage('es')">Español</button>
    <button @click="changeLanguage('en')">English</button>
    <strong class="primary--text"> {{ $t('search_view.title') }} </strong>

    <Table />
  </div>
</template>
