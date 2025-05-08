<template>
  <q-page class="ideas-page">
    <div class="page-header">
      <div class="container">
        <div class="row items-center q-mb-md">
          <div class="col">
            <h1 class="text-h4 text-weight-bold q-my-md">Idées & Projets</h1>
            <p class="text-subtitle1 q-mb-lg">Découvrez, proposez et votez pour des idées innovantes</p>
          </div>
          <div class="col-auto">
            <q-btn color="accent" icon="add" label="Proposer une idée" @click="showCreateDialog = true" />
          </div>
        </div>
      </div>
    </div>

    <!-- Create Idea Dialog -->
    <q-dialog v-model="showCreateDialog">
      <q-card style="min-width:350px;max-width:90vw;">
        <q-card-section>
          <div class="text-h6">Proposer une idée</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="submitCreateIdea">
            <q-input v-model="newIdea.title" label="Titre" required class="q-mb-sm" />
            <q-input v-model="newIdea.description" label="Description" type="textarea" required class="q-mb-sm" />
            <q-input v-model.number="newIdea.budget" label="Budget (€)" type="number" min="0" class="q-mb-sm" />
            <div class="row justify-end q-gutter-sm">
              <q-btn flat label="Annuler" color="primary" v-close-popup @click="resetCreateDialog" />
              <q-btn type="submit" label="Proposer" color="accent" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="container q-pa-md">
      <div class="row q-col-gutter-md">
        <div v-for="idea in ideas" :key="idea.id" class="col-12 col-md-6 col-lg-4">
          <q-card class="idea-card">
            <q-card-section>
              <div class="text-h6">{{ idea.title }}</div>
              <div class="text-subtitle2 q-mt-sm">Budget : {{ idea.budget }} €</div>
              <p class="idea-description">{{ idea.description }}</p>
            </q-card-section>
            <q-card-actions align="between">
              <q-btn flat color="primary" icon="thumb_up" :label="`Votes: ${idea.votes_count}`" @click="voteIdea(idea.id)" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useIdeaStore } from 'src/stores/ideaStore'

const ideaStore = useIdeaStore()
const showCreateDialog = ref(false)

const newIdea = ref({
  title: '',
  description: '',
  budget: 0
})

const ideas = computed(() => ideaStore.ideas)

onMounted(() => {
  void ideaStore.fetchIdeas()
})

function submitCreateIdea() {
  void ideaStore.addIdea(newIdea.value.title, newIdea.value.description, newIdea.value.budget)
  showCreateDialog.value = false
  resetCreateDialog()
}

function resetCreateDialog() {
  newIdea.value = {
    title: '',
    description: '',
    budget: 0
  }
}

function voteIdea(ideaId: string) {
  void ideaStore.voteIdea(ideaId)
}
</script>

<style scoped>
.ideas-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  background: linear-gradient(135deg, #009688 0%, #4CAF50 100%);
  color: white;
  padding: 2rem 1rem;
  margin-bottom: 1rem;
}

.idea-card {
  height: 100%;
  transition: transform 0.3s, box-shadow 0.3s;
}

.idea-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.idea-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 4.5em;
}
</style> 