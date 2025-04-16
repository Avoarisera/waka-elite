import { defineStore } from 'pinia'
import { api } from '../boot/axios'

interface AuthState {
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
  }),
  actions: {
    async login(email: string, password: string) {
      console.log(email, password)
      try {
        const response = await api.post('http://127.0.0.1:3000/login', {
          data: {
            type: 'authentication',
            attributes: {
              email,
              password,
            },
          },
        })
        console.log(response.data)
        this.token = response.data.token // Assurez-vous que la réponse contient bien un token
        // Vous pouvez également stocker le token dans le localStorage ou un cookie si nécessaire
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    logout() {
      this.token = null
      // Vous pouvez également supprimer le token du localStorage ou des cookies ici
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
})
