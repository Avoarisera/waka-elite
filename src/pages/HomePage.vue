<template>
  <q-page class="home-page">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="gradient-sphere sphere-1"></div>
      <div class="gradient-sphere sphere-2"></div>
      <div class="gradient-sphere sphere-3"></div>
      <div class="firework" v-for="n in 5" :key="n"></div>
    </div>

    <!-- Hero Section -->
    <!-- <div class="hero-section">
      <div class="hero-content">
        <h1 class="animated-title">
          <span class="text-gradient">Bienvenue</span>
          <span class="text-gradient">sur</span>
          <span class="text-gradient">Waka Waka</span>
        </h1>
        <q-btn
          class="cta-button"
          color="primary"
          size="lg"
          @click="scrollToContent"
        >
          Explorer
          <q-icon name="arrow_downward" class="q-ml-sm" />
        </q-btn>
      </div>
    </div> -->

    <div class="content-wrapper q-pa-md">
      <div class="row q-col-gutter-md">
        <!-- Section des idées -->
        <div class="col-12 col-md-6">
          <div class="section-card ideas-section">
            <div class="section-header">
              <div class="icon-wrapper">
                <q-icon name="lightbulb" class="section-icon" />
                <div class="icon-glow"></div>
              </div>
              <h2 class="section-title">💡 Idées</h2>
            </div>
            <div class="ideas-list">
              <div v-for="idea in ideas" :key="idea.id" class="idea-card">
                <div class="idea-content">
                  <h3 class="idea-title">{{ idea.title }}</h3>
                  <p class="idea-description">{{ idea.description }}</p>
                  <div class="idea-footer">
                    <div class="vote-container">
                      <q-btn
                        flat
                        round
                        class="vote-btn"
                        :class="{ 'voted': idea.voted }"
                        @click="voteIdea(idea)"
                      >
                        <q-icon name="thumb_up" />
                      </q-btn>
                      <span class="vote-count">{{ idea.vote }}</span>
                    </div>
                    <q-btn flat round color="primary" icon="share" />
                  </div>
                </div>
                <div class="idea-decoration"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section des projets -->
        <div class="col-12 col-md-6">
          <div class="section-card projects-section">
            <div class="section-header">
              <div class="icon-wrapper">
                <q-icon name="rocket_launch" class="section-icon" />
                <div class="icon-glow"></div>
              </div>
              <h2 class="section-title">🚀 Projets</h2>
            </div>
            <div class="projects-grid">
              <div v-for="project in projects" :key="project.id" class="project-card">
                <div class="project-image">
                  <q-img
                    :src="project.image || 'https://cdn.quasar.dev/img/parallax2.jpg'"
                    :ratio="16/9"
                  >
                    <div class="absolute-bottom bg-gradient">
                      <div class="text-h6 text-white">{{ project.name }}</div>
                      <div class="text-subtitle2 text-white">{{ project.category }}</div>
                    </div>
                  </q-img>
                  <div class="project-progress">
                    <div class="progress-bar">
                      <div class="progress-fill" :style="{ width: `${project.progress}%` }"></div>
                    </div>
                    <span class="progress-text">{{ project.progress }}%</span>
                  </div>
                </div>
                <div class="project-content">
                  <p class="project-description">{{ project.description }}</p>
                  <div class="project-stats">
                    <div class="stat-item">
                      <q-icon name="group" size="sm" />
                      <span>{{ project.members }} membres</span>
                    </div>
                    <q-btn flat round color="primary" icon="visibility" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Définir les types pour les idées et les projets
interface Idea {
  id: number
  title: string
  description: string
  vote: number
  voted: boolean
}

interface Project {
  id: number
  name: string
  description: string
  category: string
  image?: string
  members: number
  progress: number
}

// Données réactives pour stocker les idées et les projets
const ideas = ref<Idea[]>([
  { id: 1, title: 'Application de Gestion de Projets', description: "Une plateforme collaborative pour gérer efficacement les projets d'équipe", vote: 15, voted: false },
  { id: 2, title: 'Système de Réalité Augmentée', description: "Intégration de la RA dans les processus de formation", vote: 8, voted: false },
  { id: 3, title: 'Plateforme d\'Apprentissage IA', description: "Système d'apprentissage personnalisé basé sur l'IA", vote: 12, voted: false },
])

const projects = ref<Project[]>([
  {
    id: 1,
    name: 'Projet Alpha',
    description: 'Application web moderne pour la gestion des tâches',
    category: 'Web App',
    members: 5,
    progress: 75
  },
  {
    id: 2,
    name: 'Projet Beta',
    description: 'Application mobile de suivi de fitness',
    category: 'Mobile',
    members: 3,
    progress: 45
  },
  {
    id: 3,
    name: 'Projet Gamma',
    description: 'Interface utilisateur pour système de gestion',
    category: 'Design',
    members: 4,
    progress: 90
  },
])

// Fonction pour voter pour une idée
const voteIdea = (idea: Idea) => {
  idea.voted = !idea.voted
  idea.vote += idea.voted ? 1 : -1
}

// const scrollToContent = () => {
//   const content = document.querySelector('.content-wrapper')
//   content?.scrollIntoView({ behavior: 'smooth' })
// }
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  position: relative;
  overflow: hidden;
}

.hero-section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
}

.hero-content {
  max-width: 800px;
}

.animated-title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.animated-title span {
  display: block;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards;
}

.animated-title span:nth-child(1) { animation-delay: 0.2s; }
.animated-title span:nth-child(2) { animation-delay: 0.4s; }
.animated-title span:nth-child(3) { animation-delay: 0.6s; }

.animated-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards 0.8s;
}

.text-gradient {
  background: linear-gradient(45deg, #ff6b6b, #4facfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cta-button {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards 1s;
  background: linear-gradient(45deg, #ff6b6b, #4facfe);
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(79, 172, 254, 0.3);
}

.firework {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  animation: firework 2s ease-out infinite;
}

.firework:nth-child(1) {
  background: #ff6b6b;
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.firework:nth-child(2) {
  background: #4facfe;
  top: 40%;
  right: 20%;
  animation-delay: 0.5s;
}

.firework:nth-child(3) {
  background: #43e97b;
  bottom: 30%;
  left: 30%;
  animation-delay: 1s;
}

.firework:nth-child(4) {
  background: #ffd700;
  top: 30%;
  right: 30%;
  animation-delay: 1.5s;
}

.firework:nth-child(5) {
  background: #ff8e8e;
  bottom: 20%;
  right: 40%;
  animation-delay: 2s;
}

.icon-wrapper {
  position: relative;
  display: inline-block;
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: radial-gradient(circle, rgba(79, 172, 254, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes firework {
  0% {
    transform: translate(0, 0);
    opacity: 1;
  }
  50% {
    transform: translate(var(--x, 100px), var(--y, -100px));
    opacity: 0.5;
  }
  100% {
    transform: translate(var(--x, 200px), var(--y, -200px));
    opacity: 0;
  }
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

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0.2;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
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
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  top: -100px;
  left: -100px;
}

.sphere-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, #4facfe, #00f2fe);
  bottom: -50px;
  right: -50px;
  animation-delay: -5s;
}

.sphere-3 {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #43e97b, #38f9d7);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -10s;
}

.content-wrapper {
  position: relative;
  z-index: 1;
}

.section-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.section-card:hover {
  transform: translateY(-5px);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.section-icon {
  font-size: 2rem;
  color: #4facfe;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.ideas-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.idea-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.25rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.idea-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.1);
}

.idea-content {
  position: relative;
  z-index: 1;
}

.idea-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.idea-description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
}

.idea-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vote-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.vote-btn {
  transition: all 0.3s ease;
}

.vote-btn.voted {
  color: #4facfe;
  transform: scale(1.1);
}

.vote-count {
  font-weight: 600;
  color: #ffffff;
}

.project-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.project-image {
  position: relative;
  height: 200px;
}

.project-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.progress-bar {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #4facfe;
  transition: width 0.3s ease;
}

.progress-text {
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 500;
}

.project-content {
  padding: 1.25rem;
}

.project-description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
}

.project-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  font-size: 0.9rem;
}

.bg-gradient {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 1rem;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(50px, 50px); }
  50% { transform: translate(0, 100px); }
  75% { transform: translate(-50px, 50px); }
}

@media (max-width: 600px) {
  .section-card {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .project-card {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .project-image {
    height: 150px;
  }
}
</style>
