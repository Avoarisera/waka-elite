<template>
  <q-page class="idea-page">
    <!-- Animation d'ouverture -->
    <div class="opening-animation">
      <svg class="animated-svg" viewBox="0 0 100 100">
        <path class="path" d="M10,50 Q25,25 40,50 T70,50 T100,50" />
        <circle class="circle" cx="10" cy="50" r="2" />
      </svg>
    </div>

    <div class="animated-bg">
      <div class="gradient-sphere sphere-1"></div>
      <div class="gradient-sphere sphere-2"></div>
      <div class="gradient-sphere sphere-3"></div>
      <!-- Particules flottantes -->
      <div class="floating-particles">
        <div v-for="n in 20" :key="n" class="particle" :class="`particle-${n}`"></div>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="page-header">
        <h1 class="animated-title">Idées</h1>
        <q-btn
          color="primary"
          icon="add"
          label="Nouvelle Idée"
          @click="showCreateDialog = true"
        >
          <q-tooltip>Créer une nouvelle idée</q-tooltip>
        </q-btn>
      </div>

      <!-- Liste des idées -->
      <div class="ideas-grid">
        <div v-for="idea in ideaStore.ideas" :key="idea.id" class="idea-card">
          <div class="idea-content">
            <h3 class="idea-title">{{ idea.title }}</h3>
            <p class="idea-description">{{ idea.description }}</p>
            <div class="idea-footer">
              <div class="idea-meta">
                <div v-if="idea.budget" class="budget">
                  <q-icon name="attach_money" size="sm" />
                  <span>{{ idea.budget }} €</span>
                </div>
                <div class="votes">
                  <q-icon name="thumb_up" size="sm" />
                  <span>{{ idea.votes_count }}</span>
                </div>
              </div>
              <div class="idea-actions">
                <q-btn
                  flat
                  round
                  color="primary"
                  icon="thumb_up"
                  @click="voteIdea(idea.id)"
                >
                  <q-tooltip>Voter pour cette idée</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  color="primary"
                  icon="share"
                >
                  <q-tooltip>Partager</q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dialog de création d'idée amélioré -->
    <q-dialog v-model="showCreateDialog" persistent>
      <q-card class="create-idea-dialog">
        <div class="dialog-header">
          <div class="dialog-title">
            <h2>Nouvelle Idée</h2>
            <p class="subtitle">Partagez votre inspiration avec la communauté</p>
          </div>
          <q-btn flat round icon="close" v-close-popup class="close-btn" />
        </div>

        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <div class="form-group">
              <q-input
                v-model="newIdea.title"
                label="Titre"
                :rules="[val => !!val || 'Le titre est requis']"
                outlined
                class="glass-input"
              >
                <template v-slot:prepend>
                  <q-icon name="title" color="primary" />
                </template>
              </q-input>
            </div>

            <div class="form-group">
              <q-input
                v-model="newIdea.description"
                type="textarea"
                label="Description"
                :rules="[val => !!val || 'La description est requise']"
                outlined
                class="glass-input"
                autogrow
              >
                <template v-slot:prepend>
                  <q-icon name="description" color="primary" />
                </template>
              </q-input>
            </div>

            <div class="form-group">
              <q-input
                v-model.number="newIdea.budget"
                label="Budget (optionnel)"
                type="number"
                outlined
                class="glass-input"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_money" color="primary" />
                </template>
              </q-input>
            </div>

            <div class="dialog-footer">
              <q-btn label="Annuler" color="grey" v-close-popup flat />
              <q-btn label="Créer" type="submit" color="primary" class="create-btn" />
            </div>
          </q-form>
        </q-card-section>

        <!-- Animation de succès -->
        <div v-if="showSuccessAnimation" class="success-animation">
          <svg class="checkmark" viewBox="0 0 52 52">
            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIdeaStore } from '../stores/ideaStore'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const ideaStore = useIdeaStore()
const showCreateDialog = ref(false)
const showSuccessAnimation = ref(false)

const newIdea = ref({
  title: '',
  description: '',
  budget: null as number | null
})

const onSubmit = async () => {
  try {
    await ideaStore.addIdea(
      newIdea.value.title,
      newIdea.value.description,
      newIdea.value.budget || 0
    )
    
    // Afficher l'animation de succès
    showSuccessAnimation.value = true
    setTimeout(() => {
      showSuccessAnimation.value = false
      showCreateDialog.value = false
    }, 2000)
    
    newIdea.value = { title: '', description: '', budget: null }
    $q.notify({
      color: 'positive',
      message: 'Idée créée avec succès !'
    })
  } catch (err) {
    console.error('Erreur lors de la création de l\'idée:', err)
    $q.notify({
      color: 'negative',
      message: 'Erreur lors de la création de l\'idée'
    })
  }
}

const voteIdea = async (ideaId: string) => {
  try {
    await ideaStore.voteIdea(ideaId)
    $q.notify({
      color: 'positive',
      message: 'Vote enregistré !'
    })
  } catch (err) {
    console.error('Erreur lors du vote:', err)
    $q.notify({
      color: 'negative',
      message: 'Erreur lors du vote'
    })
  }
}

onMounted(async () => {
  try {
    await ideaStore.fetchIdeas()
  } catch (err) {
    console.error('Erreur lors du chargement des idées:', err)
    $q.notify({
      color: 'negative',
      message: 'Erreur lors du chargement des idées'
    })
  }
})
</script>

<style scoped>
.idea-page {
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

.ideas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.idea-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.idea-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.1);
}

.idea-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.75rem;
}

.idea-description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.idea-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.idea-meta {
  display: flex;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.idea-meta > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.idea-actions {
  display: flex;
  gap: 0.5rem;
}

.opening-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: none;
}

.animated-svg {
  width: 200px;
  height: 200px;
}

.path {
  fill: none;
  stroke: #4facfe;
  stroke-width: 2;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw 2s ease forwards;
}

.circle {
  fill: #4facfe;
  transform-origin: center;
  animation: pulse 2s ease infinite;
}

.floating-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  animation: float-particle 15s infinite linear;
}



.create-idea-dialog {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 600px;
  width: 90%;
  position: relative;
  overflow: hidden;
}

.dialog-header {
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-title {
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin: 0;
    background: linear-gradient(45deg, #4facfe, #00f2fe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    color: rgba(255, 255, 255, 0.7);
    margin: 0.5rem 0 0;
    font-size: 0.9rem;
  }
}

.close-btn {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
}

.form-group {
  margin-bottom: 1.5rem;
}

.glass-input {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:focus-within {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(79, 172, 254, 0.5);
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 2rem;
}

.create-btn {
  background: linear-gradient(45deg, #4facfe, #00f2fe);
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
  }
}

.success-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(26, 26, 46, 0.9);
  z-index: 1;
}

.checkmark {
  width: 100px;
  height: 100px;
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #4facfe;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  stroke: #4facfe;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-miterlimit: 10;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
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

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@media (max-width: 600px) {
  .idea-page {
    padding: 1rem;
  }

  .animated-title {
    font-size: 2rem;
  }

  .ideas-grid {
    grid-template-columns: 1fr;
  }
}
</style>
