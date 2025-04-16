import { boot } from 'quasar/wrappers'
import type { AxiosInstance } from 'axios'
import axios from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

const api = axios.create({ baseURL: 'https://your-api-url.com' })

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
