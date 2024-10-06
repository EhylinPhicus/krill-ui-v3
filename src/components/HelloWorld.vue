<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>Hola mundo</h3>
    <v-container>
      <v-btn color="primary">Click Me</v-btn>
    </v-container>
  </div>
</template>

<style scoped></style>
