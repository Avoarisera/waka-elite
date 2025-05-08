import { defineStore } from 'pinia'
import type { User } from '../types/user'

interface UserState {
  users: User[]
  searchQuery: string
  selectedUser: User | null
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
    avatar: 'https://cdn.quasar.dev/img/avatar.png',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    location: 'Paris, France',
    socials: [
      {
        name: 'Github',
        icon: 'fab fa-github',
        color: 'grey-9',
        url: 'https://github.com'
      },
      {
        name: 'LinkedIn',
        icon: 'fab fa-linkedin',
        color: 'blue',
        url: 'https://linkedin.com'
      }
    ]
  },
  {
    id: 2,
    firstName: 'Marie',
    lastName: 'Martin',
    position: 'UX Designer',
    passion: 'Design UI/UX',
    interest: 'Accessibilité',
    avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
    email: 'marie.martin@example.com',
    phone: '+33 6 23 45 67 89',
    location: 'Lyon, France',
    socials: [
      {
        name: 'Dribbble',
        icon: 'fab fa-dribbble',
        color: 'pink',
        url: 'https://dribbble.com'
      },
      {
        name: 'Behance',
        icon: 'fab fa-behance',
        color: 'blue',
        url: 'https://behance.net'
      }
    ]
  },
  {
    id: 3,
    firstName: 'Pierre',
    lastName: 'Durand',
    position: 'DevOps Engineer',
    passion: 'Cloud Computing',
    interest: 'Automatisation',
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    email: 'pierre.durand@example.com',
    phone: '+33 6 34 56 78 90',
    location: 'Marseille, France',
    socials: [
      {
        name: 'Github',
        icon: 'fab fa-github',
        color: 'grey-9',
        url: 'https://github.com'
      },
      {
        name: 'Twitter',
        icon: 'fab fa-twitter',
        color: 'blue',
        url: 'https://twitter.com'
      }
    ]
  },
  {
    id: 4,
    firstName: 'Sophie',
    lastName: 'Petit',
    position: 'Product Manager',
    passion: 'Innovation',
    interest: 'Agile',
    avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
    email: 'sophie.petit@example.com',
    phone: '+33 6 45 67 89 01',
    location: 'Bordeaux, France',
    socials: [
      {
        name: 'LinkedIn',
        icon: 'fab fa-linkedin',
        color: 'blue',
        url: 'https://linkedin.com'
      },
      {
        name: 'Twitter',
        icon: 'fab fa-twitter',
        color: 'blue',
        url: 'https://twitter.com'
      }
    ]
  },
  {
    id: 5,
    firstName: 'Lucas',
    lastName: 'Moreau',
    position: 'Data Scientist',
    passion: 'Machine Learning',
    interest: 'Big Data',
    avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
    email: 'lucas.moreau@example.com',
    phone: '+33 6 56 78 90 12',
    location: 'Toulouse, France',
    socials: [
      {
        name: 'Github',
        icon: 'fab fa-github',
        color: 'grey-9',
        url: 'https://github.com'
      },
      {
        name: 'Kaggle',
        icon: 'fab fa-kaggle',
        color: 'blue-grey',
        url: 'https://kaggle.com'
      }
    ]
  }
]

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: staticUsers,
    searchQuery: '',
    selectedUser: null
  }),

  actions: {
    setSearchQuery(query: string) {
      this.searchQuery = query
    },
    
    setSelectedUser(user: User) {
      this.selectedUser = user
    },
    
    getUserById(id: number) {
      return this.users.find(user => user.id === id) || null
    },

    async updateUserProfile(profileData: Partial<User>) {
      try {
        // Ici, vous devriez normalement faire un appel API pour mettre à jour le profil
        // Pour l'instant, on simule un délai d'appel API
        await new Promise(resolve => setTimeout(resolve, 100))

        const userId = typeof profileData.id === 'string' ? parseInt(profileData.id) : profileData.id
        if (!userId) {
          throw new Error('User ID is required')
        }

        const userIndex = this.users.findIndex(user => user.id === userId)
        if (userIndex === -1) {
          return false
        }

        const currentUser = this.users[userIndex]
        if (!currentUser) {
          return false
        }

        // On s'assure que les champs requis sont préservés
        const updatedUser: User = {
          ...currentUser,
          ...profileData,
          // On force les champs requis à garder leurs valeurs originales s'ils ne sont pas fournis
          id: currentUser.id,
          firstName: profileData.firstName || currentUser.firstName,
          lastName: profileData.lastName || currentUser.lastName,
          email: profileData.email || currentUser.email,
          position: profileData.position || currentUser.position,
          passion: profileData.passion || currentUser.passion,
          interest: profileData.interest || currentUser.interest,
          phone: profileData.phone || currentUser.phone,
          location: profileData.location || currentUser.location,
          avatar: profileData.avatar || currentUser.avatar
        }

        this.users[userIndex] = updatedUser
        return true
      } catch (error) {
        console.error('Error updating user profile:', error)
        throw error
      }
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