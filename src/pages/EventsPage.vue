<template>
  <q-page class="events-page">
    <div class="page-header">
      <div class="container">
        <div class="row items-center q-mb-md">
          <div class="col">
            <h1 class="text-h4 text-weight-bold q-my-md">Événements</h1>
            <p class="text-subtitle1 q-mb-lg">Découvrez et participez aux événements organisés par la communauté</p>
          </div>
          <div class="col-auto">
            <q-btn color="accent" icon="add" label="Créer un événement" @click="showCreateDialog = true" />
          </div>
        </div>
        <!-- Category Filter -->
        <div class="category-filter q-mb-md">
          <q-chip 
            clickable
            :selected="selectedCategory === null"
            @click="filterByCategory(null)"
            color="primary"
            text-color="white"
          >
            Tous
          </q-chip>
          <q-chip 
            v-for="category in eventCategories" 
            :key="category"
            clickable
            :selected="selectedCategory === category"
            @click="filterByCategory(category)"
            color="primary"
            text-color="white"
          >
            {{ category }}
          </q-chip>
        </div>
      </div>
    </div>
    
    <!-- Create Event Dialog -->
    <q-dialog v-model="showCreateDialog">
      <q-card style="min-width:350px;max-width:90vw;">
        <q-card-section>
          <div class="text-h6">Créer un événement</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="submitCreateEvent">
            <q-input v-model="newEvent.title" label="Titre" required class="q-mb-sm" />
            <q-input v-model="newEvent.date" label="Date" type="date" required class="q-mb-sm" />
            <q-input v-model="newEvent.time" label="Heure" type="time" required class="q-mb-sm" />
            <q-input v-model="newEvent.location" label="Lieu" required class="q-mb-sm" />
            <q-select v-model="newEvent.category" :options="eventCategories" label="Catégorie" required class="q-mb-sm" />
            <q-input v-model="newEvent.description" label="Description" type="textarea" class="q-mb-sm" />
            <div class="row justify-end q-gutter-sm">
              <q-btn flat label="Annuler" color="primary" v-close-popup @click="resetCreateDialog" />
              <q-btn type="submit" label="Créer" color="accent" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    
    <div class="container q-pa-md">
      <div class="row q-col-gutter-md">
        <!-- Event Cards -->
        <div v-for="event in displayedEvents" :key="event.id" class="col-12 col-md-6 col-lg-4">
          <q-card class="event-card" @click="viewEventDetails(event)">
            <q-img 
              :src="event.photo_urls[0]" 
              basic
              height="180px"
            >
              <div class="absolute-top-right q-pa-sm">
                <q-chip 
                  color="primary" 
                  text-color="white" 
                  size="sm"
                >
                  {{ event.category }}
                </q-chip>
              </div>
              <div class="absolute-bottom text-subtitle2 flex items 
               bg-dark text-white q-pa-xs">
                <q-icon name="event" />
                <span class="q-ml-xs">{{ formatDate(event.date) }} à {{ event.time }}</span>
              </div>
            </q-img>
            
            <q-card-section>
              <div class="text-h6">{{ event.title }}</div>
              <div class="text-subtitle2 q-mt-sm">
                <q-icon name="place" size="xs" />
                <span class="q-ml-xs">{{ event.location }}</span>
              </div>
            </q-card-section>
            
            <q-card-section class="q-pt-none">
              <p class="event-description">{{ event.description }}</p>
            </q-card-section>
            
            <q-card-section class="q-pt-none">
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <q-avatar size="24px">
                    <img :src="event.organizer_avatar">
                  </q-avatar>
                  <span class="q-ml-sm text-caption">{{ event.organizer_name }}</span>
                </div>
                <div class="participants">
                  <q-chip size="sm">
                    <q-avatar icon="people" color="primary" text-color="white" />
                    {{ event.participants.length }} / {{ event.max_participants || '∞' }}
                  </q-chip>
                </div>
              </div>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn flat color="primary" label="Voir les détails" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useEventStore } from 'src/stores/eventStore'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import type { Event as EventType } from 'src/types/event'

const router = useRouter()
const eventStore = useEventStore()

const selectedCategory = ref<string | null>(null)
const showCreateDialog = ref(false)

const newEvent = ref({
  title: '',
  date: '',
  time: '',
  location: '',
  category: '',
  description: ''
})

// Get events based on filter
const displayedEvents = computed(() => {
  if (selectedCategory.value === null) {
    return eventStore.upcomingEvents
  } else {
    return eventStore.events.filter(event => 
      event.category === selectedCategory.value && 
      event.date >= (new Date().toISOString().split('T')[0] || '')
    ).sort((a, b) => a.date.localeCompare(b.date))
  }
})

// Get all unique categories
const eventCategories = computed(() => {
  return eventStore.eventCategories
})

function filterByCategory(category: string | null) {
  selectedCategory.value = category
}

function viewEventDetails(event: EventType) {
  eventStore.setSelectedEvent(event)
  void router.push(`/event/${event.id}`)
}

function formatDate(dateStr: string) {
  try {
    return format(parseISO(dateStr), 'dd MMM yyyy', { locale: fr })
  } catch (e) {
    console.log(e)
    return dateStr
  }
}

function submitCreateEvent() {
  // Generate a new event object
  const id = Math.max(0, ...eventStore.events.map(e => e.id)) + 1
  const event: EventType = {
    id,
    title: newEvent.value.title,
    description: newEvent.value.description,
    date: newEvent.value.date,
    time: newEvent.value.time,
    location: newEvent.value.location,
    organizer_id: 1, // For demo, use 1
    organizer_name: 'Jean Dupont', // For demo, use static
    organizer_avatar: 'https://cdn.quasar.dev/img/avatar.png',
    participants: [],
    max_participants: 30,
    photo_urls: ['https://cdn.quasar.dev/img/parallax1.jpg'],
    category: newEvent.value.category,
    comments: []
  }
  eventStore.events.push(event)
  showCreateDialog.value = false
  resetCreateDialog()
}

function resetCreateDialog() {
  newEvent.value = {
    title: '',
    date: '',
    time: '',
    location: '',
    category: '',
    description: ''
  }
}
</script>

<style scoped>
.events-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  background: linear-gradient(135deg, #673AB7 0%, #9C27B0 100%);
  color: white;
  padding: 2rem 1rem;
  margin-bottom: 1rem;
}

.event-card {
  height: 100%;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.event-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 4.5em;
}

.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style> 