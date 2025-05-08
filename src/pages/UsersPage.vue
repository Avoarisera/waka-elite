<template>
  <q-page class="users-page" :class="{ 'dark-mode': isDarkMode }">
    <!-- Animated Background -->
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

    <div class="content-wrapper">
      <!-- Header Section -->
      <div class="header-section">
        <div class="header-content">
          <h1 class="page-title">
            <span class="title-word">Carnet</span>
            <span class="title-word">d'Adresses</span>
          </h1>
          <p class="page-subtitle">Découvrez notre communauté d'Elites</p>
        </div>
        <div class="stats-banner">
          <div class="stat-item">
            <q-icon name="people" size="24px" color="blue-grey-1" />
            <span>{{ filteredUsers.length }} utilisateurs</span>
          </div>
          <div class="stat-item">
            <q-icon name="search" size="24px" color="blue-grey-1" />
            <span>{{ searchQuery ? 'Résultats filtrés' : 'Tous les profils' }}</span>
          </div>
        </div>
      </div>

      <!-- Search Section -->
      <div class="search-section">
        <q-input
          v-model="searchQuery"
          filled
          dense
          class="search-input"
          placeholder="Rechercher un utilisateur..."
          @update:model-value="handleSearch"
        >
          <template v-slot:prepend>
            <q-icon name="search" class="search-icon" />
          </template>
          <template v-slot:append>
            <q-icon
              v-if="searchQuery"
              name="close"
              class="cursor-pointer clear-icon"
              @click="clearSearch"
            />
          </template>
        </q-input>
      </div>

      <!-- Users Grid -->
      <div class="users-grid">
        <div class="cards-container">
          <div
            v-for="user in filteredUsers"
            :key="user.id"
            class="user-card"
          >
            <div class="card-content">
              <div class="card-header">
                <q-avatar size="60px" class="user-avatar">
                  <img :src="user.avatar" :alt="user.firstName">
                  <div class="avatar-glow"></div>
                  <div class="status-indicator"></div>
                </q-avatar>
                <div class="user-info">
                  <h3 class="user-name">{{ user.firstName }} {{ user.lastName }}</h3>
                  <p class="user-position">{{ user.position }}</p>
                </div>
              </div>
              <div class="card-body">
                <div class="tags-container">
                  <q-chip
                    outline
                    v-for="(tag, index) in [user.passion, user.interest]"
                    :key="index"
                    class="tag"
                    color="grey-1"
                    text-color="black"
                    size="sm"
                  >
                    {{ tag }}
                  </q-chip>
                </div>
              </div>
              <div class="card-footer">
                <q-btn
                  flat
                  round
                  color="blue-grey-1"
                  icon="visibility"
                  class="view-more-btn"
                  @click.stop="showUserDetails(user)"
                >
                  <q-tooltip>Voir plus</q-tooltip>
                </q-btn>
              </div>
            </div>
            <div class="card-decoration"></div>
            <div class="card-hover-effect"></div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredUsers.length === 0" class="empty-state">
        <div class="empty-content">
          <q-icon name="people" size="48px" color="grey-6" />
          <p>Aucun utilisateur trouvé</p>
        </div>
      </div>
    </div>

    <!-- User Details Dialog -->
    <q-dialog v-model="showDetails" class="user-details-dialog" maximized transition-show="slide-up" transition-hide="slide-down">
      <q-card class="details-card">
        <!-- Close Button -->
        <q-btn 
          flat 
          round 
          icon="close" 
          color="red" 
          v-close-popup 
          class="close-btn animated-btn"
          style="background-color: rgba(255, 59, 48, 0.2); position: absolute; top: 1rem; right: 1rem; z-index: 2;"
        >
          <q-tooltip>Fermer</q-tooltip>
        </q-btn>

        <!-- User Content -->
        <section class="hero-section q-pa-md">
          <div class="hero-content">
            <div class="profile-card" :class="{ 'mobile': $q.screen.lt.md }">
              <div class="profile-header">
                <div class="profile-image-container">
                  <div class="avatar-wrapper">
                    <q-avatar size="150px" class="profile-avatar floating">
                      <img :src="selectedUser?.avatar || 'https://cdn.quasar.dev/img/avatar.png'" :alt="selectedUser?.firstName || 'Avatar'">
                      <div class="avatar-glow"></div>
                    </q-avatar>
                    <div class="status-badge">
                      <q-icon name="check_circle" color="positive" size="24px" />
                    </div>
                  </div>
                </div>
                <div class="profile-info">
                  <div class="name-container">
                    <h1 class="text-h3 text-weight-bold typing-text">
                      <span class="gradient-text">{{ selectedUser?.firstName }} {{ selectedUser?.lastName }}</span>
                    </h1>
                    <div class="location-info">
                      <q-icon name="location_on" color="black" size="1.2rem" />
                      <span class="q-ml-sm">{{ selectedUser?.location || 'Paris, France' }}</span>
                    </div>
                  </div>
                  <div class="profession-container">
                    <p class="text-h5 text-weight-bold profession">
                      <q-icon name="work" class="q-mr-sm" />
                      {{ selectedUser?.position }}
                    </p>
                    <div class="sparkles">
                      <span v-for="n in 5" :key="n" class="sparkle"></span>
                    </div>
                  </div>
                  <div class="interests-container q-mb-md">
                    <div class="interests-title text-subtitle2 text-grey-5">Intérêts</div>
                    <div class="interests-tags">
                      <q-chip
                        outline
                        v-for="(tag, index) in [selectedUser?.passion, selectedUser?.interest]"
                        :key="index"
                        class="interest-chip"
                        color="primary"
                        text-color="black"
                        size="sm"
                      >
                        {{ tag }}
                      </q-chip>
                    </div>
                  </div>
                  <div class="contact-info q-mb-md">
                    <div class="contact-item" @click="copyToClipboard(selectedUser?.email || '')">
                      <q-icon name="email" color="primary" size="1.2rem" />
                      <q-icon name="content_copy" size="1rem" class="copy-icon" />
                      <span class="q-ml-sm">{{ selectedUser?.email || 'Email non renseigné' }}</span>
                    </div>
                    <div class="contact-item" @click="copyToClipboard(selectedUser?.phone || '')">
                      <q-icon name="phone" color="secondary" size="1.2rem" />
                      <q-icon name="content_copy" size="1rem" class="copy-icon" />
                      <span class="q-ml-sm">{{ selectedUser?.phone || 'Téléphone non renseigné' }}</span>
                    </div>
                  </div>
                  <div class="social-links">
                    <q-btn
                      v-for="social in selectedUser?.socials"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="wave-container">
            <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#2E3B55" fill-opacity="1" d="M0,256L1440,128L1440,320L0,320Z"></path>
            </svg>
          </div>
        </section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import type { User } from '../types/user'

const $q = useQuasar()
const router = useRouter()
const userStore = useUserStore()
const searchQuery = ref('')
const showDetails = ref(false)
const selectedUser = ref<User | null>(null)
const isDarkMode = ref(true)

// Open external link
const openLink = (url: string) => {
  window.open(url, '_blank');
};

// Copy to clipboard function
const copyToClipboard = async (text: string) => {
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
};

const handleSearch = (value: string | number | null) => {
  userStore.setSearchQuery(value?.toString() || '')
}

const clearSearch = () => {
  searchQuery.value = ''
  userStore.setSearchQuery('')
}

const showUserDetails = (user: User) => {
  // Option 1: Use dialog (current implementation)
  selectedUser.value = user
  showDetails.value = true
  
  // Store the selected user in the store for access on the profile page
  userStore.setSelectedUser(user);
  
  // Navigate to user profile page with only the ID
  // Fix TypeScript linting error by properly handling the Promise
  void router.push(`/user/${user.id}`).catch(error => {
    console.error('Navigation error:', error);
    $q.notify({
      color: 'negative',
      message: 'Erreur de navigation',
      position: 'top'
    });
  });
}

const filteredUsers = computed(() => {
  console.log('Filtered users:', userStore.filteredUsers)
  return userStore.filteredUsers
})

// Ajout de l'effet de hover avec le gradient
const handleCardMouseMove = (event: MouseEvent, card: HTMLElement) => {
  const rect = card.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100
  card.style.setProperty('--mouse-x', `${x}%`)
  card.style.setProperty('--mouse-y', `${y}%`)
}

onMounted(() => {
  console.log('Component mounted')
  console.log('Initial users:', userStore.users)
  console.log('Filtered users:', userStore.filteredUsers)
  
  document.querySelectorAll('.user-card').forEach(card => {
    card.addEventListener('mousemove', ((e: Event) => handleCardMouseMove(e as MouseEvent, card as HTMLElement)) as EventListener)
  })
})
</script>

<style lang="scss" scoped>
.users-page {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #0f2027, #203a43, #2c5364);
  position: relative;
  overflow: hidden;
  padding: 2rem;
  color: black;

  &.dark-mode {
    .user-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .search-input {
      background: #E0D3BF;
      color: white;
    }

    .stat-item {
      background: rgba(224, 211, 191, 0.6);
      color: black;
    }
  }
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

.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  background: transparent;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 1rem;
  background: transparent;
}

.header-content {
  flex: 1;
  text-align: left;
  background: transparent;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #c5c8cc;
  margin-bottom: 0.5rem;
  line-height: 1.2;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.title-word {
  display: block;
  opacity: 1;
  transform: none;
  animation: none;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #dcde86;
  margin-bottom: 0;
}

.stats-banner {
  display: flex;
  gap: 1rem;
  margin-top: 0;
  background: transparent;
}

.search-section {
  margin-bottom: 2rem;
  padding: 0 1rem;
  background: transparent;
}

.search-input {
  max-width: 100%;
  background: rgba(245, 231, 149, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.users-grid {
  margin-top: 2rem;
  background: transparent;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  padding: 0 1rem;
  background: transparent;
}

.user-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  aspect-ratio: 16/9;
  opacity: 1;
  transform: none;
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.25rem;
  position: relative;
  z-index: 1;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.user-info {
  flex: 1;
  text-align: left;
}

.user-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #FAFAFA;
  margin-bottom: 0.25rem;
  line-height: 1.2;
}

.user-position {
  font-size: 0.9rem;
  color: #ced1d5;
  margin: 0;
}

.card-body {
  flex: 1;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.view-more-btn {
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 3rem;
  color: #5f6368;
}

.user-details-dialog {
  :deep(.q-card) {
    background: #1B383A;
    color: #E1D4BD;
    border-radius: 0;
    position: relative;
    overflow: hidden;
    font-family: 'Poppins', sans-serif;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%);
      pointer-events: none;
    }
  }
}

.profile-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  padding: 2rem;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  text-align: center;
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
  gap: 2rem;
}

.profile-image-container {
  flex-shrink: 0;
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

.profile-info {
  flex-grow: 1;
  text-align: center;
  width: 100%;
}

.name-container {
  margin-bottom: 1rem;
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

.location-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  font-weight: 500;
}

.profession-container {
  position: relative;
  display: inline-block;
  margin: 1rem 0;
  animation: fadeInUp 0.5s ease forwards 0.2s;
  opacity: 0;
}

.profession {
  font-size: 1.25rem;
  font-weight: 600;
  background: linear-gradient(135deg, #E1D4BD 0%, #E1D4BD 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);
  font-family: 'Poppins', sans-serif;
}

.interests-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  animation: fadeInUp 0.5s ease forwards 0.4s;
  opacity: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.interests-title {
  margin-bottom: 1rem;
  color: #E1D4BD;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
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

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 1.5rem 0;
  animation: fadeInUp 0.5s ease forwards 0.6s;
  opacity: 0;
}

.contact-item {
  display: flex;
  align-items: center;
  justify-content: center;
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
}

.social-links {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  animation: fadeInUp 0.5s ease forwards 0.8s;
  opacity: 0;
  justify-content: center;
}

.social-btn {
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 40px;
  height: 40px;
  color: #E1D4BD;

  &:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(99, 102, 241, 0.5);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.2);
  }
}

.wave-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  overflow: hidden;
  opacity: 0.5;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: wave 10s linear infinite;
  fill: #6366f1;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

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

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  span {
    color: #5f6368;
    font-weight: 500;
  }
}

.search-icon {
  animation: pulse 2s infinite;
}

.clear-icon {
  transition: transform 0.3s ease;
  
  &:hover {
    transform: rotate(90deg);
  }
}

.user-card {
  animation: none;
  opacity: 1;
  transform: none;
}

.card-hover-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
    rgba(66, 133, 244, 0.1) 0%,
    transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.user-card:hover .card-hover-effect {
  opacity: 1;
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background: #4caf50;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.loading-content,
.empty-content {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  animation: fadeInUp 0.5s ease forwards;
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

// Media queries améliorées
@media (max-width: 1200px) {
  .cards-container {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .header-content {
    text-align: left;
  }

  .stats-banner {
    width: 100%;
    justify-content: space-between;
  }

  .cards-container {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }

  .profile-info {
    text-align: center;
  }

  .interests-tags {
    justify-content: center;
  }

  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2rem;
  }

  .cards-container {
    grid-template-columns: 1fr;
  }

  .user-card {
    margin: 0;
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

// Media queries pour tablette et desktop
@media (min-width: 768px) {
  .hero-section {
    padding: 4rem 2rem;
  }

  .profile-card {
    padding: 3rem;
    background: #3E3E55;
  }

  .profile-header {
    flex-direction: row;
    text-align: left;
    gap: 4rem;
  }

  .profile-info {
    text-align: left;
  }

  .interests-tags {
    justify-content: flex-start;
  }

  .contact-item {
    justify-content: flex-start;
    padding: 1.25rem 2rem;
  }

  .social-links {
    justify-content: flex-start;
  }

  .gradient-text {
    font-size: 2.5rem;
  }

  .profession {
    font-size: 1.5rem;
  }
}

.animated-btn {
  transition: all 0.3s ease;
  transform-origin: center;
  
  &:hover {
    transform: rotate(90deg) scale(1.1);
    background: rgba(255, 59, 48, 0.3);
    box-shadow: 0 0 15px rgba(255, 59, 48, 0.3);
  }
  
  &:active {
    transform: rotate(90deg) scale(0.9);
  }
}
</style> 