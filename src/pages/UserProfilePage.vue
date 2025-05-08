<template>
  <q-page class="profile-page" :class="{ 'dark-mode': true }">
    <!-- Animated Background from UsersPage -->
    <div class="animated-bg">
      <div class="gradient-sphere sphere-1"></div>
      <div class="gradient-sphere sphere-2"></div>
      <div class="gradient-sphere sphere-3"></div>
      <div class="floating-shapes">
        <svg v-for="n in 5" :key="n" class="floating-shape" :class="`shape-${n}`">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>
      <div class="particles">
        <div v-for="n in 20" :key="n" class="particle" :class="`particle-${n}`"></div>
      </div>
      <div class="fireworks">
        <div v-for="n in 5" :key="n" class="firework" :class="`firework-${n}`">
          <div v-for="i in 8" :key="i" class="firework-particle"></div>
        </div>
      </div>
    </div>

    <!-- Loading spinner -->
    <div v-if="loading" class="full-width full-height flex flex-center column loading-container">
      <q-spinner-dots color="primary" size="40px" />
      <div class="q-mt-sm text-subtitle1 text-white">Chargement du profil...</div>
    </div>

    <div v-else class="content-wrapper">
      <!-- Back to Address Book Button -->
      <div class="back-btn-container q-mb-md">
        <q-btn 
          unelevated 
          rounded 
          icon="arrow_back" 
          label="Retour au carnet d'adresses" 
          color="accent" 
          class="back-btn animated-btn"
          @click="goBackToUsers" 
        />
      </div>
      
      <!-- Profile Card -->
      <div class="profile-card-container">
        <div class="profile-card">
          <!-- User Basic Info -->
          <div class="profile-header">
            <div class="profile-image-container">
              <div class="avatar-wrapper">
                <q-avatar size="120px" class="profile-avatar floating">
                  <img :src="profilePhoto || 'https://cdn.quasar.dev/img/avatar.png'" alt="Photo de profil" />
                  <div class="avatar-glow"></div>
                </q-avatar>
                <div class="status-badge">
                  <q-icon name="check_circle" color="positive" size="24px" />
                </div>
              </div>
            </div>
            
            <div class="profile-info">
              <h1 class="user-name gradient-text">{{ fullName }}</h1>
              <p class="user-position">{{ profile.profession || 'Profession non spécifiée' }}</p>
              
              <div class="location-info">
                <q-icon name="location_on" color="accent" size="1.2rem" />
                <span>{{ profile.city || 'Ville non spécifiée' }}</span>
              </div>
              
              <div class="inspiring-quote">
                <div class="quote-line"></div>
                <p class="quote-text">
                  {{ profile.inspiringQuote || "Le design n'est pas seulement ce à quoi ça ressemble, c'est comment ça fonctionne pour les gens." }}
                </p>
              </div>
              
              <!-- Edit button only for the current user's profile -->
              <q-btn 
                v-if="isCurrentUser"
                unelevated 
                rounded 
                class="edit-profile-btn q-px-md" 
                @click="toggleEditMode"
              >
                <q-icon name="edit" size="xs" class="q-mr-xs" />
                {{ isEditing ? 'Annuler' : 'Éditer mon profil' }}
              </q-btn>
              
              <!-- Contact buttons for other users' profiles -->
              <div v-else class="contact-buttons q-mt-md">
                <q-btn 
                  unelevated 
                  rounded 
                  color="positive" 
                  icon="email" 
                  label="Contacter" 
                  class="contact-btn q-mr-md"
                />
                <!-- <q-btn 
                  outline 
                  rounded 
                  color="accent" 
                  icon="favorite_border" 
                  label="Suivre" 
                  class="follow-btn"
                /> -->
              </div>
            </div>
          </div>
          
          <!-- Form for editing mode (only for current user) -->
          <q-form v-if="isCurrentUser && isEditing" @submit="saveProfile" class="edit-form q-gutter-y-md">
            <div class="section-container">
              <h2 class="section-title">Informations personnelles</h2>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6">
                  <q-input v-model="editableProfile.firstName" label="Prénom" outlined dense required dark />
                </div>
                <div class="col-12 col-sm-6">
                  <q-input v-model="editableProfile.lastName" label="Nom" outlined dense required dark />
                </div>
              </div>
              
              <div class="row q-col-gutter-md q-mt-md">
                <div class="col-12 col-sm-6">
                  <q-input v-model="editableProfile.profession" label="Profession" outlined dense required dark />
                </div>
                <div class="col-12 col-sm-6">
                  <q-input v-model="editableProfile.city" label="Ville" outlined dense required dark />
                </div>
              </div>
              
              <q-input v-model="editableProfile.inspiringQuote" label="Citation inspirante" outlined dense class="q-mt-md" dark />
            </div>
            
            <div class="section-container">
              <h2 class="section-title">Passions</h2>
              <q-select
                v-model="editableProfile.passions"
                use-input
                use-chips
                multiple
                input-debounce="0"
                label="Ajouter vos passions"
                hint="Ajoutez vos centres d'intérêt et passions"
                new-value-mode="add-unique"
                outlined
                dense
                dark
              />
            </div>
            
            <div class="section-container">
              <h2 class="section-title">À propos de moi</h2>
              <q-input 
                v-model="editableProfile.description" 
                type="textarea" 
                label="Description personnelle" 
                hint="Partagez quelque chose à propos de vous"
                outlined 
                autogrow 
                dark
              />
            </div>
            
            <div class="section-container">
              <h2 class="section-title">
                Photos 
                <q-badge color="secondary" class="q-ml-sm">
                  {{ (editableProfile.photoUrls || []).length }}/3
                </q-badge>
              </h2>
              
              <div class="photo-gallery">
                <template v-if="editableProfile.photoUrls && editableProfile.photoUrls.length">
                  <div v-for="(photo, index) in editableProfile.photoUrls" :key="index" class="photo-container">
                    <q-img :src="photo" class="profile-gallery-img" fit="cover" />
                    <q-btn round color="negative" icon="delete" size="sm" class="delete-photo-btn" 
                           @click="removePhoto(index)" />
                  </div>
                </template>
                
                <div v-if="!editableProfile.photoUrls || editableProfile.photoUrls.length < 3" class="add-photo-container">
                  <q-file v-model="photoFile" accept=".jpg, .png, .jpeg" @update:model-value="uploadPhoto" class="hidden">
                    <template v-slot:prepend>
                      <q-icon name="add_photo_alternate" />
                    </template>
                  </q-file>
                  <q-btn round color="primary" icon="add_photo_alternate" class="add-photo-btn" />
                </div>
              </div>
              
              <div class="text-caption q-mt-sm text-grey-5">
                Ajoutez jusqu'à 3 photos symboliques pour illustrer votre personnalité
              </div>
            </div>
            
            <div class="row justify-end q-gutter-sm">
              <q-btn label="Annuler" color="grey" flat @click="cancelEditing" />
              <q-btn label="Enregistrer" type="submit" color="primary" :loading="saving" />
            </div>
          </q-form>
          
          <!-- Display mode -->
          <template v-else>
            <!-- About Section -->
            <div class="interests-container section-container">
              <h2 class="section-title">À propos</h2>
              <div class="section-card">
                <p v-if="profile.description" class="section-content">
                  {{ profile.description }}
                </p>
                <p v-else class="text-grey-5 text-center q-pa-md">
                  Aucune description spécifiée
                </p>
              </div>
            </div>
            
            <!-- Interests Section -->
            <div class="interests-container section-container">
              <h2 class="section-title">Centres d'intérêt</h2>
              <div class="section-card">
                <div v-if="profile.passions && profile.passions.length" class="interests-tags">
                  <q-chip 
                    v-for="passion in profile.passions" 
                    :key="passion"
                    outline
                    class="interest-chip"
                    color="primary"
                    text-color="white"
                  >
                    {{ passion }}
                  </q-chip>
                </div>
                <div v-else class="text-grey-5 text-center q-pa-md">
                  Aucun centre d'intérêt spécifié
                </div>
              </div>
            </div>
            
            <!-- Photos Section -->
            <div class="interests-container section-container">
              <h2 class="section-title">Photos</h2>
              <div class="section-card">
                <div v-if="profile.photoUrls && profile.photoUrls.length" class="photo-gallery">
                  <div v-for="(photo, index) in profile.photoUrls" :key="index" class="photo-container">
                    <q-img :src="photo" class="profile-gallery-img" fit="cover" />
                  </div>
                </div>
                <div v-else class="text-grey-5 text-center q-pa-md">
                  Aucune photo ajoutée
                </div>
              </div>
            </div>
            
            <!-- Contact Section (for other users only) -->
            <div v-if="!isCurrentUser" class="interests-container section-container">
              <h2 class="section-title">Contact</h2>
              <div class="section-card">
                <div class="contact-info q-mb-md">
                  <div class="contact-item" @click="copyToClipboard(profile.email)">
                    <q-icon name="email" color="primary" size="1.2rem" />
                    <q-icon name="content_copy" size="1rem" class="copy-icon" />
                    <span class="q-ml-sm">{{ profile.email || 'Email non renseigné' }}</span>
                  </div>
                </div>
                
                <div class="social-links">
                  <template v-if="storeUser && storeUser.socials && storeUser.socials.length">
                    <q-btn
                      v-for="social in storeUser.socials"
                      :key="social.name"
                      round
                      unelevated
                      :icon="social.icon"
                      :color="social.color"
                      class="social-btn"
                      @click="openLink(social.url)"
                    >
                      <q-tooltip>{{ social.name }}</q-tooltip>
                    </q-btn>
                  </template>
                  <div v-else class="text-grey-5 text-center">
                    Aucun réseau social renseigné
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuthStore } from 'stores/authStore'
import { useUserStore } from 'stores/userStore'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import type { User } from 'src/types/user'

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  profession: string;
  passions: string[];
  inspiringQuote: string;
  description: string;
  photoUrls: string[];
}

const $q = useQuasar()
const authStore = useAuthStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const loading = ref(true)
const saving = ref(false)
const isEditing = ref(false)
const photoFile = ref<File | null>(null)
const isCurrentUser = ref(true)

// Get user ID from route if available
const userId = computed(() => {
  const id = route.params.id
  return id ? parseInt(id as string) : null
})

// Profile data
const profile = reactive<ProfileData>({
  firstName: '',
  lastName: '',
  email: '',
  city: '',
  profession: '',
  passions: [],
  inspiringQuote: '',
  description: '',
  photoUrls: []
})

// User from store (if viewing someone else's profile)
const storeUser = computed<User | null>(() => {
  if (userId.value) {
    // First check if it's in the selectedUser
    if (userStore.selectedUser && userStore.selectedUser.id === userId.value) {
      return userStore.selectedUser
    }
    // Otherwise look up by ID
    return userStore.getUserById(userId.value)
  }
  return null
})

// Editable copy
const editableProfile = reactive<ProfileData>({...profile})

// Computed properties
const fullName = computed(() => {
  if (profile.firstName && profile.lastName) {
    return `${profile.firstName} ${profile.lastName}`
  }
  return profile.firstName || profile.lastName || 'Anonymous'
})

const profilePhoto = computed(() => {
  return profile.photoUrls && profile.photoUrls.length > 0 
    ? profile.photoUrls[0] 
    : null
})

// Functions
function toggleEditMode() {
  if (isEditing.value) {
    cancelEditing()
  } else {
    startEditing()
  }
}

function startEditing() {
  Object.assign(editableProfile, profile)
  isEditing.value = true
}

function cancelEditing() {
  isEditing.value = false
}

function goBackToUsers() {
  void router.push('/users').catch(error => {
    console.error('Navigation error:', error);
    $q.notify({
      color: 'negative',
      message: 'Erreur lors de la navigation',
      position: 'top'
    });
  });
}

// Open external link
function openLink(url: string) {
  window.open(url, '_blank');
}

// Copy to clipboard function
async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    $q.notify({
      color: 'positive',
      message: 'Copié dans le presse-papiers !',
      position: 'top'
    });
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: 'Erreur lors de la copie',
      position: 'top'
    });
    console.error('Erreur de copie:', error);
  }
}

async function saveProfile() {
  saving.value = true
  
  try {
    // In a real app, this would call an API to update the profile in Supabase
    await new Promise(resolve => setTimeout(resolve, 800)) // Simulate API call
    
    // Update the profile with the edited data
    Object.assign(profile, editableProfile)
    
    $q.notify({
      color: 'positive',
      message: 'Profil mis à jour avec succès',
      icon: 'check_circle'
    })
    
    isEditing.value = false
  } catch (error) {
    console.log(error)
    $q.notify({
      color: 'negative',
      message: 'Erreur lors de la mise à jour du profil',
      icon: 'error'
    })
  } finally {
    saving.value = false
  }
}

async function uploadPhoto(files: File | null) {
  if (!files) return
  
  try {
    if (!editableProfile.photoUrls) {
      editableProfile.photoUrls = [] as string[]
    }
    
    if (editableProfile.photoUrls.length >= 3) {
      $q.notify({
        color: 'warning',
        message: 'Vous ne pouvez ajouter que 3 photos maximum',
        icon: 'warning'
      })
      return
    }
    
    $q.loading.show({
      message: 'Upload de la photo...'
    })
    
    // Simulate upload to storage
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Add the photo URL to the array
    editableProfile.photoUrls.push(URL.createObjectURL(files))
    
    $q.notify({
      color: 'positive',
      message: 'Photo ajoutée avec succès',
      icon: 'check_circle'
    })
  } catch (error) {
    console.log(error)
    $q.notify({
      color: 'negative',
      message: 'Erreur lors du téléchargement de la photo',
      icon: 'error'
    })
  } finally {
    $q.loading.hide()
    photoFile.value = null
  }
}

function removePhoto(index: number) {
  if (editableProfile.photoUrls && editableProfile.photoUrls.length > index) {
    editableProfile.photoUrls.splice(index, 1)
    
    $q.notify({
      color: 'positive',
      message: 'Photo supprimée',
      icon: 'check_circle'
    })
  }
}

// Map user data from User type to ProfileData
function mapUserToProfile(user: User) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email || '',
    city: user.location || '',
    profession: user.position,
    passions: [user.passion, user.interest].filter(Boolean),
    inspiringQuote: "Le design n'est pas seulement ce à quoi ça ressemble, c'est comment ça fonctionne pour les gens.",
    description: `Passionné de ${user.passion} et intéressé par ${user.interest}.`,
    photoUrls: [user.avatar]
  }
}

// Load user profile
onMounted(async () => {
  try {
    if (storeUser.value) {
      // We're viewing someone else's profile
      isCurrentUser.value = false
      Object.assign(profile, mapUserToProfile(storeUser.value))
    } else {
      // We're viewing the current user's profile
      isCurrentUser.value = true
      
      // If auth store has user data, use it for basic info
      if (authStore.user) {
        profile.firstName = authStore.user.first_name
        profile.lastName = authStore.user.last_name
        profile.email = authStore.user.email
      }
      
      // Demo data for presentation (current user)
      Object.assign(profile, {
        firstName: 'Sophie',
        lastName: 'Martin',
        email: 'sophie.martin@example.com',
        city: 'Lyon',
        profession: 'Architecte d\'intérieur',
        passions: ['Design', 'Art', 'Voyages', 'Écologie'],
        inspiringQuote: 'La simplicité est la sophistication suprême.',
        description: 'Passionnée d\'architecture et de design durable, je crée des espaces qui allient fonctionnalité et esthétique tout en respectant l\'environnement. J\'aime voyager pour découvrir de nouvelles inspirations et intégrer des influences diverses dans mes créations. Ma philosophie : concevoir des espaces qui racontent une histoire et génèrent des émotions positives.',
        photoUrls: [
          'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91',
          'https://images.unsplash.com/photo-1516912481808-3406841bd33c',
          'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf'
        ]
      })
    }
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    console.error('Error loading profile:', error)
    $q.notify({
      color: 'negative',
      message: 'Erreur lors du chargement du profil',
      icon: 'error'
    })
  } finally {
    loading.value = false
  }
})
</script>

<style lang="scss" scoped>
.profile-page {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #0f2027, #203a43, #2c5364);
  position: relative;
  overflow: hidden;
  padding: 2rem;
  color: #E1D4BD;
}

.animated-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.gradient-sphere {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: float 20s infinite ease-in-out;
}

.sphere-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(45deg, #4285f4, #2196f3);
  top: -100px;
  left: -100px;
}

.sphere-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, #34a853, #4caf50);
  bottom: -50px;
  right: -50px;
  animation-delay: -5s;
}

.sphere-3 {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #fbbc05, #ffa000);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -10s;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-shape {
  position: absolute;
  width: 100px;
  height: 100px;
  color: rgba(66, 133, 244, 0.1);
  animation: rotate 20s linear infinite;
}

.shape-1 { top: 20%; left: 20%; animation-delay: 0s; }
.shape-2 { top: 40%; right: 20%; animation-delay: -5s; }
.shape-3 { bottom: 30%; left: 30%; animation-delay: -10s; }
.shape-4 { bottom: 20%; right: 30%; animation-delay: -15s; }
.shape-5 { top: 50%; left: 50%; animation-delay: -20s; }

.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(66, 133, 244, 0.2);
  border-radius: 50%;
  animation: float-particle 15s infinite linear;
}

@for $i from 1 through 20 {
  .particle-#{$i} {
    left: random(100) * 1%;
    top: random(100) * 1%;
    animation-delay: -#{random(15)}s;
  }
}

.fireworks {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.firework {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  animation: firework 2s ease-out infinite;
}

@for $i from 1 through 5 {
  .firework-#{$i} {
    left: random(100) * 1%;
    top: random(100) * 1%;
    animation-delay: -#{random(2)}s;
  }
}

.firework-particle {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at center, #fff 0%, transparent 70%);
  animation: explode 2s ease-out infinite;
}

@for $i from 1 through 8 {
  .firework-particle:nth-child(#{$i}) {
    transform: rotate($i * 45deg) translateY(20px);
  }
}

.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 1000px;
  margin: 0 auto;
}

.loading-container {
  z-index: 2;
  position: relative;
}

.back-btn-container {
  padding: 0.5rem 0 1rem;
}

.back-btn {
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    transform: translateX(-5px);
    background: rgba(255, 255, 255, 0.2);
  }
}

.animated-btn {
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.profile-card-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
}

.profile-card {
  background: rgba(20, 30, 48, 0.7);
  backdrop-filter: blur(20px);
  padding: 2rem;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  transform: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: cardAppear 0.8s ease forwards;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  text-align: center;
}

.profile-image-container {
  flex-shrink: 0;
  position: relative;
  margin-bottom: 1.5rem;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
  padding: 4px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    z-index: -1;
  }
}

.profile-avatar {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  
  &.floating {
    animation: float 6s ease-in-out infinite;
  }
}

.avatar-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  filter: blur(10px);
  background: radial-gradient(circle at center, rgba(99, 102, 241, 0.5) 0%, transparent 70%);
  opacity: 0.5;
  pointer-events: none;
}

.status-badge {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: white;
  border-radius: 50%;
  padding: 2px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.profile-info {
  flex-grow: 1;
  text-align: center;
  width: 100%;
}

.user-name {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-family: 'Poppins', sans-serif;
  letter-spacing: -0.5px;
}

.gradient-text {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #E1D4BD 0%, #E1D4BD 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  animation: fadeInUp 0.5s ease forwards;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-family: 'Poppins', sans-serif;
  letter-spacing: -0.5px;
}

.user-position {
  font-size: 1.25rem;
  color: #dcde86;
  margin-bottom: 0.5rem;
}

.location-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  font-weight: 500;
}

.inspiring-quote {
  position: relative;
  padding-left: 1rem;
  max-width: 700px;
  margin: 0 auto 2rem;
}

.quote-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #6366f1, #a855f7);
  border-radius: 2px;
}

.quote-text {
  font-style: italic;
  color: #a1a1a1;
  line-height: 1.6;
  text-align: left;
}

.edit-profile-btn {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
  }
}

.section-container {
  margin-bottom: 2.5rem;
}

.section-title {
  margin-bottom: 1rem;
  color: #E1D4BD;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.section-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.section-content {
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
}

.interests-container {
  background: transparent;
  animation: fadeInUp 0.5s ease forwards 0.4s;
  opacity: 1;
}

.interests-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.interest-chip {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2);
  font-size: 0.9rem;
  padding: 0.5rem 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
    border-color: rgba(99, 102, 241, 0.5);
  }
}

.photo-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}

.photo-container {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
}

.profile-gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.delete-photo-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.6);
}

.add-photo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  aspect-ratio: 1;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
}

.add-photo-btn {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
}

.hidden {
  display: none;
}

.edit-form {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cardAppear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float-particle {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(50px);
    opacity: 0;
  }
}

@keyframes firework {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

@keyframes explode {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: scale(1) rotate(180deg);
    opacity: 1;
  }
  100% {
    transform: scale(0) rotate(360deg);
    opacity: 0;
  }
}

/* Responsive styles */
@media (min-width: 768px) {
  .profile-header {
    flex-direction: row;
    text-align: left;
    gap: 4rem;
  }
  
  .profile-image-container {
    margin-bottom: 0;
  }
  
  .profile-info {
    text-align: left;
  }
  
  .location-info {
    justify-content: flex-start;
  }
  
  .inspiring-quote {
    justify-content: flex-start;
  }
  
  .interests-tags {
    justify-content: flex-start;
  }
}

@media (max-width: 767px) {
  .profile-card {
    padding: 1.5rem;
  }
  
  .gradient-text {
    font-size: 1.75rem;
  }
  
  .user-position {
    font-size: 1.1rem;
  }
  
  .photo-gallery {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}

.contact-buttons {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

.contact-btn, .follow-btn {
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 1.5rem 0;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-size: 0.95rem;
  font-weight: 500;
  color: #E1D4BD;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    
    .copy-icon {
      opacity: 1;
      transform: translateX(0);
    }
  }
}

.copy-icon {
  margin-left: 0.5rem;
  opacity: 0.5;
  transform: translateX(-5px);
  transition: all 0.3s ease;
}

.social-links {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  justify-content: center;
}

.social-btn {
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 40px;
  height: 40px;

  &:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(99, 102, 241, 0.5);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.2);
  }
}
</style>
