<template>
  <q-page class="project-page">
    <!-- Fond animé identique -->
    <div class="animated-bg">
      <div class="gradient-sphere sphere-1"></div>
      <div class="gradient-sphere sphere-2"></div>
      <div class="gradient-sphere sphere-3"></div>
    </div>

    <div class="content-wrapper">
      <div class="page-header">
        <h1 class="animated-title">Projets</h1>
        <q-btn
          color="primary"
          icon="add"
          label="Nouveau Projet"
          @click="showCreateDialog = true"
        >
          <q-tooltip>Créer un nouveau projet</q-tooltip>
        </q-btn>
      </div>

      <!-- Liste des projets -->
      <div class="projects-grid">
        <div
          v-for="project in projectStore.projects"
          :key="project.id"
          class="project-card"
        >
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-meta">
              <div v-if="project.location" class="location">
                <q-icon name="place" size="sm" />
                <span>{{ project.location }}</span>
              </div>
              <div v-if="project.budget" class="budget">
                <q-icon name="attach_money" size="sm" />
                <span>{{ project.budget }} €</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dialog de création de projet -->
    <q-dialog v-model="showCreateDialog" persistent>
      <q-card class="create-project-dialog">
        <q-card-section class="row items-center">
          <div class="text-h6">Nouveau Projet</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p class="text-subtitle2">
            Partagez votre projet avec la communauté
          </p>
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              v-model="newProject.title"
              label="Titre"
              :rules="[val => !!val || 'Le titre est requis']"
              outlined
              class="glass-input"
            >
              <template v-slot:prepend>
                <q-icon name="title" color="primary" />
              </template>
            </q-input>

            <q-input
              v-model="newProject.description"
              type="textarea"
              label="Description"
              :rules="[val => !!val || 'La description est requise']"
              outlined
              class="glass-input"
            >
              <template v-slot:prepend>
                <q-icon name="description" color="primary" />
              </template>
            </q-input>

            <q-input
              v-model.number="newProject.budget"
              label="Budget"
              type="number"
              :rules="[val => val !== null || 'Le budget est requis']"
              outlined
              class="glass-input"
            >
              <template v-slot:prepend>
                <q-icon name="attach_money" color="primary" />
              </template>
            </q-input>

            <q-input
              v-model="newProject.location"
              label="Lieu"
              :rules="[val => !!val || 'Le lieu est requis']"
              outlined
              class="glass-input"
            >
              <template v-slot:prepend>
                <q-icon name="place" color="primary" />
              </template>
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
import { ref, onMounted } from 'vue'
import { useProjectStore } from '../stores/projectStore'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const projectStore = useProjectStore()
const showCreateDialog = ref(false)

const newProject = ref({
  // Remplacer user_id par l'ID de l'utilisateur connecté si nécessaire
  // idea_id peut rester null si le projet n'est pas dérivé d'une idée
  user_id: 'USER_UUID',
  title: '',
  description: '',
  budget: null as number | null,
  location: ''  // On considère ici que le champ "location" est une chaîne
})

const onSubmit = async () => {
  try {
    await projectStore.addProject({
      user_id: newProject.value.user_id,
      title: newProject.value.title,
      description: newProject.value.description,
      budget: newProject.value.budget || 0,
      location: newProject.value.location,
      idea_id: null // ou définir selon le contexte
    })
    showCreateDialog.value = false
    newProject.value = {
      user_id: 'USER_UUID',
      title: '',
      description: '',
      budget: null,
      location: ''
    }
    $q.notify({
      color: 'positive',
      message: 'Projet créé avec succès !'
    })
  } catch (err) {
    console.error("Erreur lors de la création du projet:", err)
    $q.notify({
      color: 'negative',
      message: 'Erreur lors de la création du projet'
    })
  }
}

onMounted(async () => {
  try {
    await projectStore.fetchProjects()
  } catch (err) {
    console.error("Erreur lors du chargement des projets:", err)
    $q.notify({
      color: 'negative',
      message: 'Erreur lors du chargement des projets'
    })
  }
})
</script>

<style scoped>
.project-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  position: relative;
  overflow: hidden;
  padding: 2rem;
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
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.animated-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  background: linear-gradient(45deg, #ff6b6b, #4facfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.1);
}

.project-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.75rem;
}

.project-description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.project-meta {
  display: flex;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.project-meta > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.create-project-dialog {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-input {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(50px, 50px); }
  50% { transform: translate(0, 100px); }
  75% { transform: translate(-50px, 50px); }
}

@media (max-width: 600px) {
  .project-page {
    padding: 1rem;
  }

  .animated-title {
    font-size: 2rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
