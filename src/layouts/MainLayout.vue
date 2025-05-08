<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header avec Menu -->
    <q-header elevated class="header" v-if="isAuthenticated">
      <q-tabs align="center" class="menu-tabs">
        <q-tab v-for="item in menuItems" :key="item.label" @click="navigateTo(item.route)">
          <q-icon :name="item.icon" size="24px" class="menu-icon" />
          <div class="menu-label text-bold">{{ item.label }}</div>
        </q-tab>
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
      <div class="quote-section" v-if="isAuthenticated">
        <q-card class="q-pa-md quote-card animate__animated animate__fadeInUp">
          <q-card-section>
            <div class="text-h6 text-bold text-center">"{{ randomQuote }}"</div>
            <div class="text-center text-subtitle2">✨ Inspire-toi ! ✨</div>
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)

const menuItems = [
  { label: 'Accueil', icon: 'home', route: '/' },
  { label: 'Projets', icon: 'work', route: '/project' },
  { label: 'Lieux', icon: 'place', route: '/locations' },
  { label: 'Elites', icon: 'people', route: '/users' },
  { label: 'Moi', icon: 'face', route: '/me' },
]

const navigateTo = async (route: string) => {
  await router.push(route)
}

const quotes = [
  "Le succès, c'est d'aller d'échec en échec sans perdre son enthousiasme. - Winston Churchill",
  "Fais de ta vie un rêve, et d'un rêve, une réalité. - Antoine de Saint-Exupéry",
  "N'abandonne jamais. Parfois, la dernière clé du trousseau est celle qui ouvre la porte. - Paulo Coelho",
  "Le seul moyen de faire du bon travail est d'aimer ce que vous faites. - Steve Jobs",
  "La meilleure façon de prédire l'avenir, c'est de le créer. - Peter Drucker",
  "La vie est un rêve, mais le rêve est une vie. - Gérard de Nerval",
  "Ils ne savaient pas que c'était impossible, alors ils l'ont fait. – Mark Twain",
  "La vie, c'est comme une bicyclette, il faut avancer pour ne pas perdre l'équilibre. – Albert Einstein",
  "Croyez en vos rêves et ils se réaliseront peut-être. Croyez en vous et ils se réaliseront sûrement. – Martin Luther King Jr.",
  "Ne juge pas chaque jour à la récolte que tu fais mais aux graines que tu sèmes. – Robert Louis Stevenson",
  "Le plus grand risque est de ne prendre aucun risque. – Mark Zuckerberg",
  "Le bonheur n'est pas quelque chose de prêt à l'emploi. Il vient de vos propres actions. – Dalaï Lama",
  "Ce n'est pas la montagne que nous conquérons, mais nous-mêmes. – Edmund Hillary",
  "Commencez par faire le nécessaire, puis faites ce qui est possible, et soudain vous ferez l'impossible. – François d'Assise",
  "Tout ce que l'esprit de l'homme peut concevoir et croire, il peut l'accomplir. – Napoleon Hill",
  "Ne rêve pas ta vie, vis tes rêves. – Inconnu",
  "Le courage n'est pas l'absence de peur, mais la capacité de la vaincre. – Nelson Mandela",
  "La persévérance est la clé de toutes les réussites. – Victor Hugo",
  "Tomber sept fois, se relever huit. – Proverbe japonais",
  "Il n'y a qu'une façon d'échouer, c'est d'abandonner avant d'avoir réussi. – Georges Clémenceau",
  "Faites que le rêve dévore votre vie afin que la vie ne dévore pas votre rêve. – Antoine de Saint-Exupéry",
  "Ce que tu fais aujourd'hui peut améliorer tous tes lendemains. – Ralph Marston",
  "N'attendez pas. Le moment ne sera jamais juste. – Napoleon Hill",
  "L'échec est simplement l'opportunité de recommencer, cette fois de façon plus intelligente. – Henry Ford",
  "L'avenir appartient à ceux qui croient à la beauté de leurs rêves. – Eleanor Roosevelt",
  "Le seul endroit où le succès vient avant le travail, c'est dans le dictionnaire. – Vidal Sassoon"
]

const randomQuote = ref(quotes[0])
const loadRandomQuote = () => {
  const index = Math.floor(Math.random() * quotes.length)
  randomQuote.value = quotes[index] || quotes[0]
}

onMounted(() => {
  loadRandomQuote()
})
</script>

<style scoped>
.header {
  background: #4caf50;
  color: white;
}
.menu-tabs {
  display: flex;
  justify-content: space-around;
  background: transparent;
}
.menu-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;
  font-size: 12px;
}
.menu-icon {
  color: white;
  margin-bottom: 4px;
}
.menu-label {
  font-size: 12px;
  color: white;
}
.q-layout {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.5)), url('src/assets/bg-.jpg');
  background-size: cover;
  height: 100vh;
  color: black;
  position: relative;
}
.q-layout::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 10%, transparent 90%);
  z-index: 0;
  pointer-events: none;
}
.quote-section {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.quote-card {
  max-width: 500px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
}
</style>
