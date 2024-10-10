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
      <v-btn class="btn-cpe" x-small v-if="item.krillcpename">
        <v-icon small color="primary" left>mdi-eye</v-icon>
        {{ item.krillcpename }}
      </v-btn>
    </template>

    <template v-slot:item.callingstationid="{ item }">
      <span class="bg"> {{ item.callingstationid }}</span>
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
              small
              class="button"
              v-bind="props"
              @click.stop="deauthConfirmation(item.krillcpename)"
            >
              <v-icon class="size" small left>mdi-exit-to-app</v-icon>
              <span class="titleButton">{{ $t('oratio.radius_view.button_deauth') }}...</span>
            </v-btn>
          </template>
          <span> {{ $t('oratio.radius_view.button_deauth') }}...</span>
        </v-tooltip>
      </v-defaults-provider>
    </template>
  </v-data-table>
  <DialogConfirm ref="dialogDeauthConfirmation" />
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

const dialogDeauthConfirmation = ref<InstanceType<typeof DialogConfirm> | null>(null)
function deauthConfirmation(name: string) {
  console.log('entro', dialogDeauthConfirmation)
  dialogDeauthConfirmation.value
    ?.open('Are you sure you want to delete this dessert?')
    .then(async (confirmed: boolean) => {
      if (confirmed) {
        try {
          Notify.success('NOTI')
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
.button {
  width: auto !important;
  height: 26px;
  padding: 0 9px;
  font-size: 0.625rem;
  background-color: #ff5252;
  border-radius: 3px !important;
  color: white;
}
.titleButton {
  font-size: 12px;
  text-transform: capitalize;
}
.bg {
  background-color: #f5f5f5;
  padding: 0.2em 0.4em;
}
.btn-cpe {
  background-color: #f5f5f5;
  border-radius: 5px !important;
  font-size: 0.625rem;
  text-transform: lowercase;
  font-weight: 700;
}
.v-table--density-default {
  --v-table-header-height: 0px;
  --v-table-row-height: 0px;
}
.v-btn.v-btn--density-default {
  height: 25px !important;
}
.v-btn--size-default {
  padding: 0 8px;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 0.75rem;
}
.v-data-table-footer {
  font-size: 0.75rem !important;
}
.size {
  font-size: 16px !important;
}
</style>
