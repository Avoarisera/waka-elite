interface Social {
  name: string
  icon: string
  color: string
  url: string
}

export interface User {
  // Informations de base
  id: number
  firstName: string
  lastName: string
  email: string
  password?: string // Optionnel car ne devrait pas être stocké/retourné dans tous les contextes
  
  // Informations professionnelles
  position: string // Poste actuel
  company?: string // Entreprise actuelle
  experience?: number // Années d'expérience
  skills?: string[] // Compétences professionnelles
  
  // Centres d'intérêt et passions
  passion: string // Passion principale
  interests?: string[] // Liste des centres d'intérêt
  interest: string // Centre d'intérêt principal (pour la compatibilité existante)
  hobbies?: string[] // Loisirs
  
  // Informations de contact
  phone: string
  location: string
  address?: string
  city?: string
  country?: string
  
  // Profil social
  avatar: string
  bio?: string
  socials?: Social[]
  socialLinks?: {
    linkedin?: string
    twitter?: string
    instagram?: string
    facebook?: string
    website?: string
  }
  
  // Préférences de matching
  matchingPreferences?: {
    locationRange?: number // Rayon de recherche en km
    minAge?: number
    maxAge?: number
    interests?: string[]
    professionalOnly?: boolean
  }
  
  // Informations système
  createdAt?: string
  updatedAt?: string
  lastLogin?: string
  isActive?: boolean
  role?: 'user' | 'admin' | 'moderator'
  
  // Statistiques
  // connectionCount?: number
  // eventParticipations?: number
  // challengeParticipations?: number
  // reputation?: number
  
  // Paramètres de notification
  // notificationSettings?: {
  //   email: boolean
  //   push: boolean
  //   sms: boolean
  //   newMatches: boolean
  //   newMessages: boolean
  //   eventReminders: boolean
  //   challengeUpdates: boolean
  // }
} 