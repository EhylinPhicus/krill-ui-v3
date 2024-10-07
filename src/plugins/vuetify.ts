import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import colors from '../config/colors'

export default createVuetify({
  icons: {
    defaultSet: 'mdi'
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
