import { defineStore } from 'pinia'
import type { User } from '../types/user'

interface UserState {
  users: User[]
  searchQuery: string
}

// Données statiques pour le développement
const staticUsers: User[] = [
  {
    id: 1,
    firstName: 'Jean',
    lastName: 'Dupont',
    position: 'Développeur Full Stack',
    passion: 'Intelligence Artificielle',
    interest: 'Web Design',
    avatar: 'https://cdn.quasar.dev/img/avatar.png'
  },
  {
    id: 2,
    firstName: 'Marie',
    lastName: 'Martin',
    position: 'UX Designer',
    passion: 'Design UI/UX',
    interest: 'Accessibilité',
    avatar: 'https://cdn.quasar.dev/img/avatar1.jpg'
  },
  {
    id: 3,
    firstName: 'Pierre',
    lastName: 'Durand',
    position: 'DevOps Engineer',
    passion: 'Cloud Computing',
    interest: 'Automatisation',
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
  },
  {
    id: 4,
    firstName: 'Sophie',
    lastName: 'Petit',
    position: 'Product Manager',
    passion: 'Innovation',
    interest: 'Agile',
    avatar: 'https://cdn.quasar.dev/img/avatar4.jpg'
  },
  {
    id: 5,
    firstName: 'Lucas',
    lastName: 'Moreau',
    position: 'Data Scientist',
    passion: 'Machine Learning',
    interest: 'Big Data',
    avatar: 'https://cdn.quasar.dev/img/avatar5.jpg'
  }
]

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: staticUsers,
    searchQuery: ''
  }),

  actions: {
    setSearchQuery(query: string) {
      this.searchQuery = query
    }
  },

  getters: {
    filteredUsers: (state) => {
      if (!state.searchQuery) return state.users
      
      const query = state.searchQuery.toLowerCase()
      return state.users.filter(user => 
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.position.toLowerCase().includes(query) ||
        user.passion.toLowerCase().includes(query) ||
        user.interest.toLowerCase().includes(query)
      )
    }
  }
}) 