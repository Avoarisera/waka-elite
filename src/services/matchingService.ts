import type { User } from '../types/user'

export interface MatchingPoint {
  type: 'location' | 'profession' | 'passion' | 'interest'
  label: string
}

export interface SuggestedActivity {
  id: string
  title: string
  icon: string
  color: string
}

export interface UserMatch {
  user: User
  matchingPoints: MatchingPoint[]
  suggestedActivities: SuggestedActivity[]
  score: number
}

export class MatchingService {
  static calculateUserMatches(currentUser: User | null, otherUsers: User[]): UserMatch[] {
    if (!currentUser) return []

    const matches: UserMatch[] = otherUsers
      .filter(user => user.id !== currentUser.id)
      .map(user => this.calculateSingleMatch(currentUser, user))
      .filter(match => match.matchingPoints.length > 0)
      .sort((a, b) => b.score - a.score)

    return matches
  }

  private static calculateSingleMatch(currentUser: User, otherUser: User): UserMatch {
    const matchingPoints: MatchingPoint[] = []
    let score = 0

    // Check location match
    if (otherUser.location === currentUser.location) {
      matchingPoints.push({
        type: 'location',
        label: `Même ville: ${otherUser.location}`
      })
      score += 2
    }

    // Check profession match
    if (otherUser.position === currentUser.position) {
      matchingPoints.push({
        type: 'profession',
        label: `Même profession: ${otherUser.position}`
      })
      score += 2
    }

    // Check passion match
    if (otherUser.passion === currentUser.passion) {
      matchingPoints.push({
        type: 'passion',
        label: `Passion commune: ${otherUser.passion}`
      })
      score += 3
    }

    // Check interest match
    if (otherUser.interest === currentUser.interest) {
      matchingPoints.push({
        type: 'interest',
        label: `Centre d'intérêt: ${otherUser.interest}`
      })
      score += 2
    }

    return {
      user: otherUser,
      matchingPoints,
      suggestedActivities: this.generateSuggestedActivities(otherUser, matchingPoints),
      score
    }
  }

  private static generateSuggestedActivities(user: User, matchingPoints: MatchingPoint[]): SuggestedActivity[] {
    const activities: SuggestedActivity[] = []

    matchingPoints.forEach(point => {
      switch (point.type) {
        case 'profession':
          activities.push({
            id: 'networking',
            title: 'Organiser une rencontre professionnelle',
            icon: 'business_center',
            color: 'blue'
          })
          break
        case 'passion':
          activities.push({
            id: 'workshop',
            title: `Atelier ${user.passion}`,
            icon: 'emoji_objects',
            color: 'deep-orange'
          })
          break
        case 'interest':
          activities.push({
            id: 'discussion',
            title: `Discussion autour de ${user.interest}`,
            icon: 'forum',
            color: 'green'
          })
          break
        case 'location':
          activities.push({
            id: 'meetup',
            title: 'Organiser une rencontre locale',
            icon: 'groups',
            color: 'purple'
          })
          break
      }
    })

    return activities
  }

  static getMatchColor(type: string): string {
    switch (type) {
      case 'location':
        return 'deep-purple'
      case 'profession':
        return 'indigo'
      case 'passion':
        return 'pink'
      case 'interest':
        return 'teal'
      default:
        return 'grey'
    }
  }
} 