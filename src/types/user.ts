export interface User {
  id: number
  firstName: string
  lastName: string
  position: string
  passion: string
  interest: string
  avatar: string
  email: string
  phone: string
  location: string
  socials: {
    name: string
    icon: string
    color: string
    url: string
  }[]
} 