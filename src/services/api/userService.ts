import type { User } from '@/types/user'

const API_URL = 'https://api.example.com' // Remplacez par votre URL d'API

export const userService = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${API_URL}/users`)
      if (!response.ok) throw new Error('Erreur réseau')
      return await response.json()
    } catch (error) {
      console.error('Error in userService.getUsers:', error)
      throw error
    }
  }
} 