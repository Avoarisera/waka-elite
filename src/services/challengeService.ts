export interface ChallengeResponse {
  id: number
  userId: number
  challengeId: number
  responseText: string
  mediaUrls: string[]
  createdAt: string
}

export interface Challenge {
  id: number
  title: string
  description: string
  startDate: string
  endDate: string
  responses: ChallengeResponse[]
  icon: string
}

export class ChallengeService {
  // Mock data for current week's challenge
  static getCurrentChallenge(): Challenge {
    return {
      id: 1,
      title: "Partagez votre meilleure astuce de productivité !",
      description: "Cette semaine, partagez avec la communauté votre astuce la plus efficace pour rester productif et organisé. Que ce soit un outil, une méthode ou une habitude, votre expérience pourrait aider d'autres membres !",
      startDate: "2024-03-18",
      endDate: "2024-03-24",
      icon: "lightbulb",
      responses: [
        {
          id: 1,
          userId: 1,
          challengeId: 1,
          responseText: "J'utilise la technique Pomodoro avec des sessions de 25 minutes. Cela m'aide à maintenir ma concentration et à prendre des pauses régulières.",
          mediaUrls: ["https://images.unsplash.com/photo-1434030216411-0b793f4b4173"],
          createdAt: "2024-03-19T10:30:00Z"
        },
        {
          id: 2,
          userId: 2,
          challengeId: 1,
          responseText: "Ma méthode : je planifie ma journée la veille au soir. Je liste mes 3 tâches prioritaires et je commence par la plus importante dès le matin.",
          mediaUrls: ["https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b"],
          createdAt: "2024-03-20T09:15:00Z"
        }
      ]
    }
  }

  static formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }
} 