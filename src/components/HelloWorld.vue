<script setup lang="ts">
import { useI18n } from 'vue-i18n'
defineProps<{
  msg: string
}>()

const { t, locale } = useI18n()

function changeLanguage(lang) {
  locale.value = lang
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>Hola mundo</h3>
    <strong class="primary--text"> {{ $t('search_view.title') }} </strong>
    <v-container>
      <v-row>
        <v-col>
          <v-btn color="primary">Test Button</v-btn>
        </v-col>
        <v-col>
          <v-alert type="info">This is an info alert!</v-alert>
        </v-col>
      </v-row>
      <button @click="changeLanguage('es')">Español</button>
      <button @click="changeLanguage('en')">English</button>
    </v-container>
  </div>
</template>

<style scoped></style>
