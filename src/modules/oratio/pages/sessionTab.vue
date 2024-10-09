<template>
  <v-container>
    <v-card>
      <v-data-table :headers="headers" :items="data" :items-per-page="5" class="elevation-1">
        <template v-slot:item.acctstarttime="{ item }">
          <span>{{ formatDate(item.acctstarttime) }}</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn color="error" @click="deauthConfirmation(item)"> Deauth </v-btn>
        </template>
      </v-data-table>

      <v-progress-linear
        v-if="loading"
        :active="loading"
        :indeterminate="loading"
        color="primary"
      ></v-progress-linear>

      <v-card v-if="error" class="mt-5">
        <v-card-title>Error loading data</v-card-title>
        <v-card-actions>
          <v-btn color="error" @click="refresh">Retry</v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
definePage({
  meta: {
    icon: 'mdi-monitor-dashboard',
    title: 'Session Tab',
    drawerIndex: 4
  }
})

import { ref, onMounted } from 'vue'
import axios from 'axios'

const loading = ref(false)
const error = ref(false)
const data = ref([])

// Encabezados de la tabla
const headers = [
  { text: 'Username', value: 'username' },
  { text: 'Calling Station ID', value: 'callingstationid' },
  { text: 'Acct Start Time', value: 'acctstarttime' },
  { text: 'Actions', value: 'actions' }
]

const apiUrl =
  'https://krill2.phicus.es/api/v2/oratio/accounting?online=true&offset=0&limit=20&sort=username'

// Función para obtener datos de la API
async function fetchData() {
  loading.value = true
  error.value = false
  try {
    const response = await axios.get(apiUrl)
    data.value = response.data.results || []
  } catch (err) {
    console.error(err)
    error.value = true // Cambia el estado de error a verdadero
  } finally {
    loading.value = false // Siempre se ejecuta al final
  }
}

// Función para refrescar los datos
function refresh() {
  fetchData() // Llama a la función para obtener datos
}

// Función para formatear fechas
function formatDate(date) {
  return new Date(date).toLocaleString() // Formatear según sea necesario
}

// Función de desautenticación (placeholder)
function deauthConfirmation(item) {
  console.log('Deauth item:', item) // Implementar la lógica de desautenticación
  // Aquí podrías hacer una solicitud para desautenticar al usuario
}

// Cargar datos al montar el componente
onMounted(() => {
  fetchData() // Llama a la función para obtener datos al montar el componente
})
</script>

<style scoped>
/* Estilos personalizados, si es necesario */
</style>
