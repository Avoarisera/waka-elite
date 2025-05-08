<template>
  <q-page class="cross-suggestions-page">
    <!-- Background with soft patterns -->
    <div class="page-background">
      <div class="pattern-overlay"></div>
      <div class="gradient-sphere sphere-1"></div>
      <div class="gradient-sphere sphere-2"></div>
    </div>

    <div class="content-container q-pa-md">
      <!-- Header with fade-in animation -->
      <div class="text-center q-mb-lg animate-fade-in">
        <h1 class="text-h4 q-mb-sm text-weight-light">Accueil</h1>
        <p class="text-subtitle1 text-grey-5">
          Découvrez des personnes partageant vos centres d'intérêt et les événements à venir
        </p>
      </div>

      <!-- Wall of Inspiring Stories Section -->
      <div class="section-container q-mb-xl animate-slide-up">
        <div class="section-header q-mb-md">
          <div class="row items-center justify-between">
            <h2 class="text-h5 q-my-none text-weight-regular">Wall of Inspiring Stories</h2>
            <q-btn
              color="accent"
              icon="add"
              label="Partager une histoire"
              @click="shareStory"
              class="btn-hover-effect"
            />
          </div>
        </div>

        <div class="row q-col-gutter-md">
          <div v-for="story in inspiringStories" :key="story.id" class="col-12 col-md-4">
            <q-card class="story-card animate-on-hover">
              <q-img
                :src="story.image"
                basic
                height="200px"
              >
                <div class="absolute-bottom text-subtitle2 text-center glass-effect">
                  {{ story.author }}
                </div>
              </q-img>

              <q-card-section>
                <div class="text-h6 ellipsis">{{ story.title }}</div>
                <div class="text-subtitle2 text-water-green">{{ story.category }}</div>
                <p class="text-body2 q-mt-sm three-lines">{{ story.excerpt }}</p>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat color="primary" label="Lire plus" class="btn-hover-effect" @click="readStory(story)" />
                <q-btn flat color="accent" icon="favorite" :label="story.likes" class="btn-hover-effect" @click="likeStory(story)" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Events Section -->
      <div class="section-container q-mb-xl animate-slide-up">
        <div class="section-header q-mb-md">
          <div class="row items-center justify-between">
            <h2 class="text-h5 q-my-none text-weight-regular">Événements à venir</h2>
            <q-btn
              color="accent"
              icon="add"
              label="Créer un événement"
              @click="createEvent"
              class="btn-hover-effect"
            />
          </div>
        </div>

        <div class="row q-col-gutter-md">
          <div v-for="event in events" :key="event.id" class="col-12 col-md-4">
            <q-card class="event-card animate-on-hover">
              <q-img
                :src="event.image"
                basic
                height="200px"
              >
                <div class="absolute-bottom text-subtitle2 text-center glass-effect">
                  {{ event.date }}
                </div>
              </q-img>

              <q-card-section>
                <div class="text-h6 ellipsis">{{ event.title }}</div>
                <div class="text-subtitle2 text-water-green">{{ event.location }}</div>
                <p class="text-body2 q-mt-sm two-lines">{{ event.description }}</p>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat color="primary" label="Plus d'infos" class="btn-hover-effect" @click="showEventDetails(event)" />
                <q-btn flat color="accent" label="Participer" class="btn-hover-effect" @click="joinEvent(event)" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Suggestions Section -->
      <div class="section-container animate-slide-up">
        <h2 class="text-h5 q-mb-lg text-weight-regular">Suggestions de connexions</h2>
        <div class="row q-col-gutter-lg">
          <template v-for="match in matchedUsers" :key="match.user.id">
            <div class="col-12 col-md-6">
              <q-card class="suggestion-card animate-on-hover">
                <q-card-section class="user-section">
                  <div class="row items-center no-wrap">
                    <q-avatar size="80px">
                      <img :src="match.user.avatar">
                    </q-avatar>
                    <div class="user-info q-ml-md">
                      <div class="text-h6 text-weight-medium">{{ match.user.firstName }} {{ match.user.lastName }}</div>
                      <div class="text-subtitle2 text-water-green">{{ match.user.position }}</div>
                      <div class="text-caption text-grey-7">
                        <q-icon name="location_on" size="xs" />
                        {{ match.user.location }}
                      </div>
                    </div>
                  </div>
                </q-card-section>

                <q-card-section>
                  <div class="text-subtitle2 q-mb-sm">Points communs :</div>
                  <div class="matching-points">
                    <q-chip
                      v-for="point in match.matchingPoints"
                      :key="point.type"
                      :color="MatchingService.getMatchColor(point.type)"
                      text-color="white"
                      size="sm"
                      class="chip-hover-effect"
                    >
                      {{ point.label }}
                    </q-chip>
                  </div>
                </q-card-section>

                <q-card-section>
                  <div class="text-subtitle2 q-mb-sm">Activités suggérées :</div>
                  <div class="activities-list">
                    <div v-for="activity in match.suggestedActivities" :key="activity.id" 
                         class="activity-item q-mb-sm animate-on-hover">
                      <q-icon :name="activity.icon" size="sm" class="q-mr-sm" :color="activity.color" />
                      {{ activity.title }}
                    </div>
                  </div>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    flat
                    color="primary"
                    label="Voir le profil"
                    class="btn-hover-effect"
                    @click="navigateToProfile(match.user.id)"
                  />
                  <q-btn
                    flat
                    color="accent"
                    label="Contacter"
                    class="btn-hover-effect"
                    @click="contactUser(match.user)"
                  />
                </q-card-actions>
              </q-card>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Floating Challenge Button with animation -->
    <q-page-sticky position="bottom-right" :offset="[20, 20]">
      <q-btn
        fab
        color="accent"
        icon="emoji_events"
        class="pulse-animation"
        @click="openChallengeDialog"
      >
        <q-tooltip>Défi de la semaine</q-tooltip>
      </q-btn>
    </q-page-sticky>

    <!-- Challenge Dialog -->
    <q-dialog v-model="showChallengeDialog" maximized persistent transition-show="fade" transition-hide="fade">
      <q-card class="challenge-dialog">
        <q-card-section class="row items-center q-pb-none glass-header">
          <div class="text-h6">
            <q-icon :name="currentChallenge.icon" class="q-mr-sm text-accent" />
            {{ currentChallenge.title }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup class="btn-hover-effect" />
        </q-card-section>

        <q-card-section class="challenge-info">
          <div class="text-subtitle2 q-mb-sm text-water-green">
            Du {{ ChallengeService.formatDate(currentChallenge.startDate) }} au {{ ChallengeService.formatDate(currentChallenge.endDate) }}
          </div>
          <p class="text-body1">{{ currentChallenge.description }}</p>
        </q-card-section>

        <q-separator />

        <q-card-section class="challenge-form">
          <div class="text-h6 q-mb-md text-weight-regular">Participez au défi</div>
          <q-input
            v-model="newResponse.text"
            label="Votre réponse"
            filled
            type="textarea"
            rows="3"
            class="q-mb-md rounded-borders"
            bg-color="grey-1"
          />
          <q-input
            v-model="newResponse.mediaUrl"
            label="URL de l'image (optionnel)"
            filled
            class="q-mb-md rounded-borders"
            bg-color="grey-1"
          >
            <template v-slot:append>
              <q-icon name="help">
                <q-tooltip>Ajoutez une image pour illustrer votre réponse</q-tooltip>
              </q-icon>
            </template>
          </q-input>
          <div class="row justify-end">
            <q-btn
              color="accent"
              label="Soumettre ma réponse"
              class="btn-hover-effect"
              @click="submitChallengeResponse"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="responses-section">
          <div class="text-h6 q-mb-md text-weight-regular">Réponses de la communauté</div>
          <div class="responses-container">
            <q-list separator>
              <q-item v-for="response in currentChallenge.responses" :key="response.id" 
                     class="q-py-md response-item animate-on-hover">
                <q-item-section>
                  <q-item-label class="text-body1">{{ response.responseText }}</q-item-label>
                  <q-item-label caption class="text-water-green">
                    {{ new Date(response.createdAt).toLocaleDateString('fr-FR', { 
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) }}
                  </q-item-label>
                  <div v-if="response.mediaUrls?.length" class="q-mt-sm">
                    <q-img
                      :src="response.mediaUrls[0]"
                      style="max-width: 300px; border-radius: 12px;"
                      class="cursor-pointer shadow-2 animate-on-hover"
                      @click="openImage(response.mediaUrls[0])"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Image Preview Dialog -->
    <q-dialog v-model="showImagePreview" transition-show="fade" transition-hide="fade">
      <q-card class="image-preview-card">
        <q-card-section class="row items-center q-pb-none">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup class="btn-hover-effect" />
        </q-card-section>
        <q-card-section class="q-pa-none">
          <q-img :src="previewImage" class="rounded-borders" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import { useAuthStore } from '../stores/authStore'
import { useQuasar } from 'quasar'
import { MatchingService } from '../services/matchingService'
import type { UserMatch } from '../services/matchingService'
import type { User } from '../types/user'
import { ChallengeService } from '../services/challengeService'
import type { Challenge, ChallengeResponse } from '../services/challengeService'

interface Event {
  id: number
  title: string
  description: string
  date: string
  location: string
  image: string
}

interface Story {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  date: string
  image: string
  likes: number
}

const $q = useQuasar()
const router = useRouter()
const userStore = useUserStore()
const authStore = useAuthStore()
const loading = ref(true)

// Mock events data
const events = ref<Event[]>([
  {
    id: 1,
    title: "Workshop Design Thinking",
    description: "Apprenez les bases du Design Thinking lors de cet atelier pratique",
    date: "28 Mai 2024",
    location: "Paris",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b"
  },
  {
    id: 2,
    title: "Meetup Tech Innovation",
    description: "Rencontrez d'autres passionnés de technologie et d'innovation",
    date: "15 Juin 2024",
    location: "Lyon",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
  },
  {
    id: 3,
    title: "Conférence IA & Futur",
    description: "Découvrez les dernières avancées en Intelligence Artificielle",
    date: "30 Juin 2024",
    location: "Bordeaux",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
  }
])

// Mock inspiring stories data
const inspiringStories = ref<Story[]>([
  {
    id: 1,
    title: "Mon parcours entrepreneurial en Afrique",
    excerpt: "Comment j'ai surmonté les obstacles pour lancer mon entreprise à Dakar",
    content: "Contenu complet de l'histoire...",
    category: "Entrepreneuriat",
    author: "Fatou Diop",
    date: "12 Mai 2024",
    image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24",
    likes: 24
  },
  {
    id: 2,
    title: "Révolution numérique au Kenya",
    excerpt: "L'impact de la technologie sur l'éducation dans les zones rurales",
    content: "Contenu complet de l'histoire...",
    category: "Technologie",
    author: "James Mwangi",
    date: "3 Juin 2024",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    likes: 18
  },
  {
    id: 3,
    title: "Art traditionnel et modernité",
    excerpt: "Comment j'ai mélangé techniques ancestrales et design contemporain",
    content: "Contenu complet de l'histoire...",
    category: "Art & Culture",
    author: "Amina Kourouma",
    date: "22 Mai 2024",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",
    likes: 31
  }
])

// Get current user from store
const currentUser = computed(() => {
  const user = userStore.users.find(u => u.id === parseInt(authStore.user?.id || '0'))
  return user || null
})

// Calculate matches using the MatchingService
const matchedUsers = computed<UserMatch[]>(() => {
  return MatchingService.calculateUserMatches(currentUser.value, userStore.users)
})

const showChallengeDialog = ref(false)
const currentChallenge = ref<Challenge>(ChallengeService.getCurrentChallenge())
const newResponse = ref({
  text: '',
  mediaUrl: ''
})

const showImagePreview = ref(false)
const previewImage = ref('')

function navigateToProfile(userId: number) {
  void router.push(`/user/${userId}`)
}

function contactUser(user: User) {
  $q.notify({
    message: `Contact initié avec ${user.firstName} ${user.lastName}`,
    color: 'positive',
    icon: 'mail'
  })
}

function createEvent() {
  $q.notify({
    message: 'Création d\'événement - Fonctionnalité à venir',
    color: 'info'
  })
}

function showEventDetails(event: Event) {
  console.log(event)
  $q.notify({
    message: 'Détails de l\'événement - Fonctionnalité à venir',
    color: 'info'
  })
}

function joinEvent(event: Event) {
  $q.notify({
    message: `Vous participez maintenant à "${event.title}"`,
    color: 'positive',
    icon: 'check_circle'
  })
}

function openChallengeDialog() {
  showChallengeDialog.value = true
}

function submitChallengeResponse() {
  if (!newResponse.value.text.trim()) {
    $q.notify({
      message: 'Veuillez entrer une réponse',
      color: 'warning'
    })
    return
  }

  // Simulate adding a response
  const response: ChallengeResponse = {
    id: currentChallenge.value.responses.length + 1,
    userId: parseInt(authStore.user?.id || '0'),
    challengeId: currentChallenge.value.id,
    responseText: newResponse.value.text,
    mediaUrls: newResponse.value.mediaUrl ? [newResponse.value.mediaUrl] : [],
    createdAt: new Date().toISOString()
  }

  currentChallenge.value.responses.unshift(response)
  newResponse.value = { text: '', mediaUrl: '' }

  $q.notify({
    message: 'Votre réponse a été ajoutée avec succès !',
    color: 'positive',
    icon: 'check_circle'
  })
}

function openImage(url: string | undefined) {
  if (!url) return
  previewImage.value = url
  showImagePreview.value = true
}

// Story functions
function shareStory() {
  $q.notify({
    message: 'Partage d\'histoire - Fonctionnalité à venir',
    color: 'info'
  })
}

function readStory(story: Story) {
  $q.notify({
    message: `Lecture de "${story.title}" - Fonctionnalité à venir`,
    color: 'info'
  })
}

function likeStory(story: Story) {
  story.likes++
  $q.notify({
    message: `Vous avez aimé l'histoire de ${story.author}`,
    color: 'positive',
    icon: 'favorite'
  })
}

onMounted(async () => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    loading.value = false
  } catch (error) {
    console.error('Error loading matches:', error)
    $q.notify({
      color: 'negative',
      message: 'Erreur lors du chargement des suggestions',
      icon: 'error'
    })
    loading.value = false
  }
})
</script>

<style lang="scss" scoped>
// Variables
$water-green: #4caf50;
$soft-blue: #64b5f6;
$light-beige: #fff8e1;
$accent-color: #ffd54f;

.cross-suggestions-page {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.page-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  z-index: 0;
}

.pattern-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0);
  background-size: 20px 20px;
}

.gradient-sphere {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
}

.sphere-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(45deg, rgba($water-green, 0.3), rgba($soft-blue, 0.3));
  top: -100px;
  left: -100px;
  animation: float 20s infinite ease-in-out;
}

.sphere-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, rgba($accent-color, 0.3), rgba($light-beige, 0.3));
  bottom: -50px;
  right: -50px;
  animation: float 20s infinite ease-in-out reverse;
}

.content-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.section-container {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
}

.event-card, .suggestion-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba($water-green, 0.1);

  &:hover {
  transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
}

.glass-effect {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.glass-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.text-water-green {
  color: $water-green !important;
}

.btn-hover-effect {
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
}

.chip-hover-effect {
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

.animate-on-hover {
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.95);
  }
}

.pulse-animation {
  animation: pulse 2s infinite;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out;
}

// Animations
@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, 20px); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

// Text utilities
.two-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

// Challenge dialog specific styles
.challenge-dialog {
  background: rgba(255, 255, 255, 0.95);
  max-width: 800px;
  margin: 24px auto;
  border-radius: 16px;
  height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;

  .responses-container {
    max-height: 400px;
    overflow-y: auto;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.5);
  }

  .response-item {
    transition: background-color 0.2s ease;
    border-radius: 8px;
    margin: 4px 0;

    &:hover {
      background: rgba($water-green, 0.05);
    }
  }
}

.image-preview-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  max-width: 90vw;
  max-height: 90vh;
}

// Responsive adjustments
@media (max-width: 600px) {
  .content-container {
    padding: 12px;
  }

  .section-container {
    padding: 16px;
  }

  .challenge-dialog {
    margin: 0;
    height: 100vh;
    border-radius: 0;
  }
}

.story-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba($water-green, 0.1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
}

.three-lines {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 