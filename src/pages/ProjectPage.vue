<template>
  <q-page class="project-page">
    <!-- Animation de bienvenue plus légère -->
    <div class="geometric-animation">
      <div class="geometric-shape circle"></div>
      <div class="geometric-shape square"></div>
      <div class="geometric-shape triangle"></div>
      <div class="geometric-shape hexagon"></div>
    </div>

    <div class="content-wrapper">
      <div class="page-header">
        <h1 class="page-title">
          <span class="title-text">Projets & Idées</span>
          <div class="title-underline"></div>
        </h1>
        
        <div class="view-selector">
          <q-select
            v-model="selectedView"
            :options="viewOptions"
            outlined
            class="view-select"
            emit-value
            map-options
            color="accent"
            text-color="white"
            label-color="white"
            popup-content-class="view-select-popup"
          >
            <template v-slot:prepend>
              <q-icon name="visibility" color="accent" />
            </template>
          </q-select>
        </div>

        <q-btn
          v-if="selectedView === 'projects'"
          color="accent"
          icon="add"
          label="Nouveau Projet"
          class="action-button"
          @click="showCreateProjectDialog = true"
        >
          <q-tooltip>Créer un nouveau projet</q-tooltip>
        </q-btn>
        <q-btn
          v-else
          color="accent"
          icon="add"
          label="Nouvelle Idée"
          class="action-button"
          @click="showCreateIdeaDialog = true"
        >
          <q-tooltip>Proposer une nouvelle idée</q-tooltip>
        </q-btn>
      </div>

      <div v-if="selectedView === 'projects'" class="cards-grid">
        <div v-for="project in projectStore.projects" :key="project.id" class="modern-card">
          <div class="card-header">
            <q-avatar size="40px" class="card-avatar" color="primary">
              <q-icon name="work" />
            </q-avatar>
            <div class="card-title-group">
              <div class="card-title">{{ project.title }}</div>
              <div class="card-subtitle">{{ getLocationName(project.location_id) }}</div>
            </div>
            <q-badge color="accent" class="card-badge">Projet</q-badge>
          </div>
          <div class="card-content">{{ project.description }}</div>
          <div class="card-footer">
            <q-icon name="attach_money" size="sm" class="q-mr-xs" />
            <span>{{ project.budget }} €</span>
          </div>
        </div>
      </div>
      <div v-else class="cards-grid">
        <div v-for="idea in ideaStore.ideas" :key="idea.id" class="modern-card">
          <div class="card-header">
            <q-avatar size="40px" class="card-avatar" color="secondary">
              <q-icon name="lightbulb" />
            </q-avatar>
            <div class="card-title-group">
              <div class="card-title">{{ idea.title }}</div>
              <div class="card-subtitle">{{ idea.category }} · {{ getLocationName(idea.location_id) }}</div>
            </div>
            <q-badge color="secondary" class="card-badge">Idée</q-badge>
          </div>
          <div class="card-content">{{ idea.description }}</div>
          <div class="card-footer">
            <q-icon name="thumb_up" size="sm" class="q-mr-xs" />
            <span>{{ idea.votes }} votes</span>
            <q-chip size="sm" color="secondary" text-color="white" class="q-ml-sm">
              {{ idea.status }}
            </q-chip>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer waves avec animation plus subtile -->
    <div class="animated-footer">
      <svg class="footer-wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path class="wave wave-1" d="M0,160L80,170.7C160,181,320,203,480,197.3C640,192,800,160,960,154.7C1120,149,1280,171,1360,181.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        <path class="wave wave-2" d="M0,256L60,229.3C120,203,240,149,360,154.7C480,160,600,224,720,229.3C840,235,960,181,1080,176C1200,171,1320,213,1380,234.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </svg>
    </div>

    <!-- Dialog de création de projet -->
    <q-dialog v-model="showCreateProjectDialog" persistent>
      <q-card class="create-dialog">
        <q-card-section class="row items-center">
          <div class="text-h6">Nouveau Projet</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <p class="text-subtitle2">Partagez votre projet avec la communauté</p>
        </q-card-section>
        <q-card-section>
          <q-form @submit="onSubmitProject" class="q-gutter-md">
            <q-input v-model="newProject.title" label="Titre" :rules="[val => !!val || 'Le titre est requis']" outlined class="glass-input">
              <template v-slot:prepend><q-icon name="title" color="primary" /></template>
            </q-input>
            <q-input v-model="newProject.description" type="textarea" label="Description" :rules="[val => !!val || 'La description est requise']" outlined class="glass-input">
              <template v-slot:prepend><q-icon name="description" color="primary" /></template>
            </q-input>
            <q-input v-model.number="newProject.budget" label="Budget" type="number" :rules="[val => val !== null || 'Le budget est requis']" outlined class="glass-input">
              <template v-slot:prepend><q-icon name="attach_money" color="primary" /></template>
            </q-input>
            <q-select 
              v-model="newProject.location_id" 
              :options="locationOptions" 
              option-value="id"
              option-label="name"
              label="Lieu" 
              outlined 
              class="glass-input"
            >
              <template v-slot:prepend><q-icon name="place" color="primary" /></template>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Aucun lieu trouvé
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:after>
                <q-icon name="add_circle" class="cursor-pointer q-ml-sm" color="primary" @click="openCreateLocationDialog('project')">
                  <q-tooltip>Créer un nouveau lieu</q-tooltip>
                </q-icon>
              </template>
            </q-select>
            <div class="row justify-end q-gutter-sm">
              <q-btn label="Annuler" color="grey" v-close-popup />
              <q-btn label="Créer" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialog de création d'idée -->
    <q-dialog v-model="showCreateIdeaDialog" persistent>
      <q-card class="create-dialog">
        <q-card-section class="row items-center">
          <div class="text-h6">Nouvelle Idée</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <p class="text-subtitle2">Partagez votre idée avec la communauté</p>
        </q-card-section>
        <q-card-section>
          <q-form @submit="onSubmitIdea" class="q-gutter-md">
            <q-input v-model="newIdea.title" label="Titre" :rules="[val => !!val || 'Le titre est requis']" outlined class="glass-input">
              <template v-slot:prepend><q-icon name="title" color="secondary" /></template>
            </q-input>
            <q-input v-model="newIdea.description" type="textarea" label="Description" :rules="[val => !!val || 'La description est requise']" outlined class="glass-input">
              <template v-slot:prepend><q-icon name="description" color="secondary" /></template>
            </q-input>
            <q-select v-model="newIdea.category" :options="categoryOptions" label="Catégorie" :rules="[val => !!val || 'La catégorie est requise']" outlined class="glass-input">
              <template v-slot:prepend><q-icon name="category" color="secondary" /></template>
            </q-select>
            <q-select 
              v-model="newIdea.location_id" 
              :options="locationOptions" 
              option-value="id"
              option-label="name"
              label="Lieu" 
              outlined 
              class="glass-input"
            >
              <template v-slot:prepend><q-icon name="place" color="secondary" /></template>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Aucun lieu trouvé
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:after>
                <q-icon name="add_circle" class="cursor-pointer q-ml-sm" color="secondary" @click="openCreateLocationDialog('idea')">
                  <q-tooltip>Créer un nouveau lieu</q-tooltip>
                </q-icon>
              </template>
            </q-select>
            <div class="row justify-end q-gutter-sm">
              <q-btn label="Annuler" color="grey" v-close-popup />
              <q-btn label="Créer" type="submit" color="secondary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Add this dialog for creating a new location -->
    <q-dialog v-model="showCreateLocationDialog" persistent>
      <q-card class="create-dialog" style="min-width: 500px">
        <q-card-section class="row items-center">
          <div class="text-h6">Nouveau Lieu</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <p class="text-subtitle2">Ajoutez un nouveau lieu pour vos projets et idées</p>
        </q-card-section>
        <q-card-section>
          <q-form @submit="onSubmitLocation" class="q-gutter-md">
            <q-input v-model="newLocation.name" label="Nom du lieu" :rules="[val => !!val || 'Le nom est requis']" outlined class="glass-input">
              <template v-slot:prepend><q-icon name="business" color="primary" /></template>
            </q-input>
            <q-input v-model="newLocation.address" label="Adresse" outlined class="glass-input">
              <template v-slot:prepend><q-icon name="location_on" color="primary" /></template>
            </q-input>
            <q-input v-model="newLocation.city" label="Ville" :rules="[val => !!val || 'La ville est requise']" outlined class="glass-input">
              <template v-slot:prepend><q-icon name="apartment" color="primary" /></template>
            </q-input>
            <q-input v-model="newLocation.country" label="Pays" :rules="[val => !!val || 'Le pays est requis']" outlined class="glass-input">
              <template v-slot:prepend><q-icon name="flag" color="primary" /></template>
            </q-input>
            <q-input v-model.number="newLocation.budget" label="Budget" type="number" outlined class="glass-input">
              <template v-slot:prepend><q-icon name="attach_money" color="primary" /></template>
            </q-input>
            <div class="row justify-end q-gutter-sm">
              <q-btn label="Annuler" color="grey" v-close-popup />
              <q-btn label="Créer" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useProjectStore } from '../stores/projectStore'
import { useIdeaStore } from '../stores/ideaStore'
import { useQuasar } from 'quasar'
import { locationService } from '../services/locationService'
import type { Location } from '../types/models'

const $q = useQuasar()
const projectStore = useProjectStore()
const ideaStore = useIdeaStore()
const selectedView = ref('projects')
const viewOptions = [
  { label: 'Projets', value: 'projects' },
  { label: 'Idées', value: 'ideas' }
]

const showCreateProjectDialog = ref(false)
const showCreateIdeaDialog = ref(false)
const showCreateLocationDialog = ref(false)
const locations = ref<Location[]>([])

const categoryOptions = [
  'Innovation',
  'Technologie',
  'Environnement',
  'Social',
  'Culture',
  'Éducation',
  'Santé',
  'Autre'
]

const newProject = ref({
  user_id: 'USER_UUID',
  title: '',
  description: '',
  budget: null as number | null,
  location_id: null as string | null
})

const newIdea = ref({
  title: '',
  description: '',
  category: '',
  status: 'Proposée',
  votes: 0,
  location_id: null as string | null
})

const newLocation = ref({
  name: '',
  address: '',
  city: '',
  country: '',
  budget: 0
})

const targetFormAfterLocationCreate = ref<'project' | 'idea' | null>(null)

const locationOptions = computed(() => {
  return [
    { id: null, name: 'Aucun lieu' },
    ...locations.value.map(loc => ({
      id: loc.id,
      name: `${loc.name}, ${loc.city}, ${loc.country}`
    }))
  ]
})

const onSubmitProject = async () => {
  try {
    await projectStore.addProject({
      user_id: newProject.value.user_id,
      title: newProject.value.title,
      description: newProject.value.description,
      budget: newProject.value.budget || 0,
      location_id: newProject.value.location_id,
      idea_id: null
    })
    showCreateProjectDialog.value = false
    newProject.value = {
      user_id: 'USER_UUID',
      title: '',
      description: '',
      budget: null,
      location_id: null
    }
    $q.notify({ color: 'positive', message: 'Projet créé avec succès !' })
  } catch (err) {
    console.error('Création du projet échouée:', err)
    $q.notify({ color: 'negative', message: 'Erreur lors de la création du projet' })
  }
}

const onSubmitIdea = async () => {
  try {
    await ideaStore.addIdea({
      title: newIdea.value.title,
      description: newIdea.value.description,
      category: newIdea.value.category,
      location_id: newIdea.value.location_id,
      status: 'Proposée',
      votes: 0
    })
    showCreateIdeaDialog.value = false
    newIdea.value = {
      title: '',
      description: '',
      category: '',
      status: 'Proposée',
      votes: 0,
      location_id: null
    }
    $q.notify({ color: 'positive', message: 'Idée créée avec succès !' })
  } catch (err) {
    console.error('Création de l\'idée échouée:', err)
    $q.notify({ color: 'negative', message: 'Erreur lors de la création de l\'idée' })
  }
}

// Get location name by ID
const getLocationName = (locationId: string | null) => {
  if (!locationId) return 'Aucun lieu'
  const location = locations.value.find(loc => loc.id === locationId)
  return location ? location.name : 'Lieu inconnu'
}

// Add location creation function
const openCreateLocationDialog = (target: 'project' | 'idea') => {
  targetFormAfterLocationCreate.value = target
  showCreateLocationDialog.value = true
}

const onSubmitLocation = async () => {
  try {
    // Create location
    const location = await locationService.createLocation({
      name: newLocation.value.name,
      address: newLocation.value.address,
      city: newLocation.value.city,
      country: newLocation.value.country,
      budget: newLocation.value.budget
    })
    
    // Add to locations array
    locations.value.push(location)
    
    // Set as selected value in the appropriate form
    if (targetFormAfterLocationCreate.value === 'project') {
      newProject.value.location_id = location.id
    } else if (targetFormAfterLocationCreate.value === 'idea') {
      newIdea.value.location_id = location.id
    }
    
    // Reset and close dialog
    showCreateLocationDialog.value = false
    newLocation.value = {
      name: '',
      address: '',
      city: '',
      country: '',
      budget: 0
    }
    targetFormAfterLocationCreate.value = null
    
    $q.notify({ 
      color: 'positive', 
      message: 'Lieu créé avec succès !',
      icon: 'add_location'
    })
  } catch (err) {
    console.error('Création du lieu échouée:', err)
    $q.notify({ 
      color: 'negative', 
      message: 'Erreur lors de la création du lieu',
      icon: 'error'
    })
  }
}

onMounted(async () => {
  try {
    await Promise.all([
      projectStore.fetchProjects(),
      ideaStore.fetchIdeas(),
      fetchLocations()
    ])
  } catch (err) {
    console.error('Erreur lors du chargement des données:', err)
    $q.notify({ color: 'negative', message: 'Erreur lors de la récupération des données' })
  }
})

const fetchLocations = async () => {
  try {
    locations.value = await locationService.getAllLocations()
  } catch (err) {
    console.error('Erreur lors du chargement des lieux:', err)
    $q.notify({ color: 'negative', message: 'Erreur lors de la récupération des lieux' })
  }
}
</script>

<style scoped>
.project-page {
  min-height: 100vh;
  background: #0E0E10;
  position: relative;
  overflow: hidden;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
}

/* Artistic background animations */
.geometric-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.05;
}

.geometric-shape {
  position: absolute;
  filter: blur(1px);
}

.circle {
  width: 150px;
  height: 150px;
  background: linear-gradient(45deg, #7C3AED, #3B82F6);
  border-radius: 50%;
  top: 10%;
  left: 5%;
  animation: pulseAndFloat 8s infinite ease-in-out;
}

.square {
  width: 120px;
  height: 120px;
  background: linear-gradient(45deg, #06B6D4, #3B82F6);
  transform: rotate(45deg);
  top: 70%;
  right: 10%;
  animation: rotateAndFloat 12s infinite ease-in-out;
}

.triangle {
  width: 0;
  height: 0;
  border-left: 70px solid transparent;
  border-right: 70px solid transparent;
  border-bottom: 120px solid rgba(124, 58, 237, 0.5);
  top: 40%;
  right: 20%;
  animation: spinAndFloat 15s infinite linear;
}

.hexagon {
  width: 100px;
  height: 60px;
  background: linear-gradient(45deg, #06B6D4, #7C3AED);
  position: absolute;
  top: 80%;
  left: 15%;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  animation: pulseAndSpin 10s infinite ease-in-out;
}

/* Enhanced title styling */
.page-title {
  position: relative;
  margin: 0 0 2rem 0;
}

.title-text {
  font-family: 'Sora', sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #7C3AED, #06B6D4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;
}

.title-underline {
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #7C3AED, #06B6D4);
  transform-origin: left;
  animation: expandWidth 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Modern glassmorphism cards */
.modern-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 250px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modern-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(124, 58, 237, 0.2);
  box-shadow: 0 20px 40px rgba(124, 58, 237, 0.15);
}

/* Action button styling */
.action-button {
  background: #7C3AED !important;
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4);
  background: #6D28D9 !important;
}

/* View selector styling */
.view-selector {
  min-width: 220px;
}

.view-select {
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(124, 58, 237, 0.2) !important;
  border-radius: 12px;
  backdrop-filter: blur(20px);
}

.view-select:hover {
  border-color: rgba(124, 58, 237, 0.4) !important;
  background: rgba(255, 255, 255, 0.05) !important;
}

/* Card content styling */
.card-title {
  font-family: 'Sora', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
}

.card-subtitle {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
}

.card-content {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 1.5rem 0;
}

.card-badge {
  background: linear-gradient(135deg, #7C3AED, #06B6D4) !important;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 500;
}

/* Animations */
@keyframes pulseAndFloat {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
  50% { transform: translate(20px, -20px) scale(1.1); opacity: 0.8; }
}

@keyframes rotateAndFloat {
  0%, 100% { transform: rotate(45deg) translate(0, 0); }
  50% { transform: rotate(225deg) translate(-20px, 20px); }
}

@keyframes spinAndFloat {
  0% { transform: rotate(0) translate(0, 0); }
  50% { transform: rotate(180deg) translate(-20px, -20px); }
  100% { transform: rotate(360deg) translate(0, 0); }
}

@keyframes pulseAndSpin {
  0%, 100% { transform: rotate(0) scale(1); opacity: 0.5; }
  50% { transform: rotate(180deg) scale(1.1); opacity: 0.8; }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .title-text {
    font-size: 2.5rem;
  }

  .view-selector {
    width: 100%;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }
}

/* Layout improvements */
.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
  gap: 2rem;
}

/* Footer waves */
.animated-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  pointer-events: none;
  z-index: 1;
  opacity: 0.5;
}

.wave {
  animation: waveAnimation 10s ease-in-out infinite;
  transform-origin: bottom;
}

.wave-1 {
  fill: #FFD700;
  fill-opacity: 0.15;
}

.wave-2 {
  fill: #FFA500;
  fill-opacity: 0.1;
  animation-delay: -5s;
}

@keyframes waveAnimation {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-2%);
  }
}

.create-dialog {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 600px;
  width: 90%;
  position: relative;
  overflow: hidden;
}
.glass-input {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}
.glass-input:focus-within {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(79, 172, 254, 0.5);
}

/* Add specific styles for idea cards */
.modern-card .q-avatar.color-secondary {
  background: linear-gradient(135deg, #06B6D4, #0EA5E9);
}

.modern-card .q-badge.bg-secondary {
  background: linear-gradient(135deg, #06B6D4, #0EA5E9) !important;
}
</style>

