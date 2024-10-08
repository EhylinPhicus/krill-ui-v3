import 'vuetify/styles'
import { createVuetify, type IconSet, type IconProps } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { md3 } from 'vuetify/blueprints'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from '../config/colors'

import type { VDataTable } from 'vuetify/lib/components/index.mjs'
export type DataTableHeaders = InstanceType<typeof VDataTable>['$props']['headers']

function filename(path: string) {
  return path
    .split(/(\\|\/)/g)
    .pop()!
    .replace(/\.[^/.]+$/, '')
}

const svgIcons = Object.fromEntries(
  Object.entries(
    import.meta.glob('@/assets/icons/*.svg', {
      eager: true,
      query: '?raw',
      import: 'default'
    })
  ).map(([k, v]) => [filename(k), v])
)

const custom: IconSet = {
  component: (props: IconProps) => h(props.tag, { innerHTML: svgIcons[props.icon as string] })
}

export default createVuetify({
  blueprint: md3,
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi, custom }
  },
  defaults: {
    VSwitch: {
      color: 'primary'
    },
    VDataTable: {
      fixedHeader: true,
      hover: true
    },
    VCard: {
      flat: true,
      border: true
    },
    VBtn: { color: undefined },
    VNavigationDrawer: {
      VList: {
        nav: true,
        VListItem: {
          rounded: 'xl'
        }
      }
    },
    VChip: { rounded: 'lg' }
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: colors.phicus,
          secondary: colors.secondary,
          accent: colors.accent,
          error: colors.error,
          info: colors.info,
          success: colors.success,
          warning: colors.warning
        }
      },
      dark: {
        colors: {
          primary: colors.phicus,
          secondary: colors.secondary,
          accent: colors.accent,
          error: colors.error,
          info: colors.info,
          success: colors.success,
          warning: colors.warning
        }
      }
    }
  }
})
