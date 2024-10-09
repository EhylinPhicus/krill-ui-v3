<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page="5"
    class="elevation-1"
    v-model:select="selected"
    item-value="username"
    show-select
    select-all
  >
    <template v-slot:item.krillcpename="{ item }">
      <v-btn x-small v-if="item.krillcpename">
        <v-icon small color="primary" left>mdi-eye</v-icon>
        {{ item.krillcpename }}
      </v-btn>
    </template>

    <template v-slot:item.acctstarttime="{ item }">
      <span>{{ formatDate(item.acctstarttime) }}</span>
    </template>

    <template #item.actions="{ item }">
      <v-defaults-provider
        :defaults="{
          VBtn: {
            size: 20,
            rounded: 'sm',
            variant: 'text',
            class: 'ml-1',
            color: ''
          },
          VIcon: {
            size: 20
          }
        }"
      >
        <v-tooltip location="top">
          <template #activator="{ props }">
            <v-btn
              icon="mdi-delete-outline"
              v-bind="props"
              @click.stop="deauthConfirmation(item.krillcpename)"
            />
          </template>
          <span>Delete</span>
        </v-tooltip>
      </v-defaults-provider>
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
</template>

<script setup lang="ts">
definePage({
  meta: {
    icon: 'mdi-monitor-dashboard',
    title: 'Session Tab',
    drawerIndex: 4
  }
})

import type { DataTableHeaders } from '@/plugins/vuetify'
import DialogConfirm from '@/components/DialogConfirm.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

// Definición de tipo para los ítems
interface SessionItem {
  krillcpename: string
  username: string
  callingstationid: string
  nasipaddress: string
  framedipaddress: string
  acctstarttime: string
}

// Variables reactivas
const loading = ref(false)
const error = ref(false)
const data = ref<SessionItem[]>([])
const selected = ref<SessionItem[]>([]) // Para almacenar ítems seleccionados
const { t, locale } = useI18n()

// Encabezados de la tabla
const headers: DataTableHeaders = [
  {
    title: t('oratio.radius_view.headers.sessions.krillcpename'),
    key: 'krillcpename',
    align: 'start'
  },
  {
    title: t('oratio.radius_view.headers.sessions.username'),
    key: 'username',
    align: 'end'
  },
  {
    title: t('oratio.radius_view.headers.sessions.callingstationid'),
    key: 'callingstationid',
    align: 'start'
  },
  {
    title: t('oratio.radius_view.headers.sessions.nasipaddress'),
    key: 'nasipaddress',
    align: 'start'
  },
  {
    title: t('oratio.radius_view.headers.sessions.framedipaddress'),
    key: 'framedipaddress',
    align: 'start'
  },
  { title: 'Inicio', key: 'acctstarttime', align: 'end' },
  {
    title: t('oratio.radius_view.headers.sessions.actions'),
    key: 'actions',
    sortable: false,
    align: 'end'
  }
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
    error.value = true
  } finally {
    loading.value = false
  }
}

// Función para refrescar los datos
function refresh() {
  fetchData()
}

// Función para formatear fechas
function formatDate(date: string): string {
  return new Date(date).toLocaleString()
}

// Función de desautenticación (placeholder)
//   function deauthConfirmation(item: SessionItem): void {
//     console.log('Deauth item:', item);
//   }

const dialogDelete = ref<InstanceType<typeof DialogConfirm> | null>(null)
function deauthConfirmation(name: string) {
  dialogDelete.value
    ?.open('Are you sure you want to delete this dessert?')
    .then(async (confirmed: boolean) => {
      if (confirmed) {
        try {
          Notify.success('Deleted')
        } catch (e) {
          Notify.error(e)
        }
      }
    })
}

// Cargar datos al montar el componente
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
/* Estilos personalizados, si es necesario */
</style>
