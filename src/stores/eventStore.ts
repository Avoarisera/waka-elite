import { defineStore } from 'pinia'
import type { Event, EventComment } from '../types/event'

interface EventState {
  events: Event[]
  selectedEvent: Event | null
  filteredCategory: string | null
}

// Sample static data for development
const staticEvents: Event[] = [
  {
    id: 1,
    title: 'Workshop: Introduction to AI',
    description: 'Join us for an exciting introduction to artificial intelligence and its applications in everyday life.',
    date: '2023-12-15',
    time: '14:00',
    location: 'Paris Tech Hub, 5 Rue de l\'Innovation',
    organizer_id: 1,
    organizer_name: 'Jean Dupont',
    organizer_avatar: 'https://cdn.quasar.dev/img/avatar.png',
    participants: [2, 3, 5],
    max_participants: 30,
    photo_urls: ['https://cdn.quasar.dev/img/parallax1.jpg'],
    category: 'Technology',
    comments: [
      {
        id: 1,
        event_id: 1,
        user_id: 3,
        user_name: 'Pierre Durand',
        user_avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
        content: 'Looking forward to this! Will there be hands-on exercises?',
        created_at: '2023-11-20T10:30:00Z'
      }
    ]
  },
  {
    id: 2,
    title: 'Networking: Creative Industries Meetup',
    description: 'Connect with professionals from creative industries. Share ideas and discover potential collaborations.',
    date: '2023-12-18',
    time: '18:30',
    location: 'Le Café des Arts, 12 Avenue Montaigne',
    organizer_id: 2,
    organizer_name: 'Marie Martin',
    organizer_avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
    participants: [1, 4],
    max_participants: 50,
    photo_urls: ['https://cdn.quasar.dev/img/parallax2.jpg'],
    category: 'Networking',
    comments: []
  },
  {
    id: 3,
    title: 'Hackathon: Sustainable Solutions',
    description: 'A 48-hour coding challenge to develop innovative solutions for environmental sustainability.',
    date: '2024-01-10',
    time: '09:00',
    location: 'Green Innovation Center, Toulouse',
    organizer_id: 5,
    organizer_name: 'Lucas Moreau',
    organizer_avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
    participants: [1, 3],
    max_participants: 40,
    photo_urls: ['https://cdn.quasar.dev/img/mountains.jpg'],
    category: 'Technology',
    comments: []
  }
]

export const useEventStore = defineStore('event', {
  state: (): EventState => ({
    events: staticEvents,
    selectedEvent: null,
    filteredCategory: null
  }),

  actions: {
    setSelectedEvent(event: Event) {
      this.selectedEvent = event
    },
    
    getEventById(id: number) {
      return this.events.find(event => event.id === id) || null
    },
    
    addParticipant(eventId: number, userId: number) {
      const event = this.getEventById(eventId)
      if (event && !event.participants.includes(userId)) {
        event.participants.push(userId)
        // Here we would typically also update the backend
        return true
      }
      return false
    },
    
    removeParticipant(eventId: number, userId: number) {
      const event = this.getEventById(eventId)
      if (event) {
        const index = event.participants.indexOf(userId)
        if (index !== -1) {
          event.participants.splice(index, 1)
          // Here we would typically also update the backend
          return true
        }
      }
      return false
    },
    
    addComment(eventId: number, userId: number, userName: string, userAvatar: string, content: string) {
      const event = this.getEventById(eventId)
      if (event) {
        const newComment: EventComment = {
          id: Math.max(0, ...event.comments.map(c => c.id)) + 1,
          event_id: eventId,
          user_id: userId,
          user_name: userName,
          user_avatar: userAvatar,
          content,
          created_at: new Date().toISOString()
        }
        event.comments.push(newComment)
        // Here we would typically also update the backend
        return newComment
      }
      return null
    },
    
    setFilterCategory(category: string | null) {
      this.filteredCategory = category
    }
  },

  getters: {
    upcomingEvents: (state) => {
      const today = new Date().toISOString().split('T')[0] || ''
      return state.events
        .filter(event => event.date >= today)
        .sort((a, b) => a.date.localeCompare(b.date))
    },
    
    filteredEvents: (state) => {
      if (!state.filteredCategory) return state.events
      
      return state.events.filter(event => 
        event.category === state.filteredCategory
      )
    },
    
    eventCategories: (state) => {
      const categories = new Set(state.events.map(event => event.category))
      return Array.from(categories)
    },
    
    isUserParticipating: (state) => (eventId: number, userId: number) => {
      const event = state.events.find(e => e.id === eventId)
      return event ? event.participants.includes(userId) : false
    }
  }
}) 