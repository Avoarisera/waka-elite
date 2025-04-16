<template>
  <q-page class="q-pa-md">
    <div
      class="text-h4 text-bold text-center text-primary q-mb-md animate__animated animate__fadeInDown"
    >
      📝 Découvrez nos articles inspirants
    </div>

    <q-card class="q-pa-md filter-card">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <q-select
            v-model="selectedCategory"
            :options="categories"
            label="Catégorie"
            clearable
            class="col-12 col-md-4"
            outlined
          />
          <q-select
            v-model="selectedAuthor"
            :options="authors"
            label="Auteur"
            clearable
            class="col-12 col-md-4"
            outlined
          />
          <q-btn
            label="Réinitialiser"
            flat
            icon="refresh"
            @click="resetFilters"
            class="col-12 col-md-4 q-mt-md q-mt-none-md"
          />
        </div>
      </q-card-section>
    </q-card>

    <div class="q-mt-md row q-col-gutter-md">
      <div v-for="article in filteredArticles" :key="article.id" class="col-12 col-sm-6 col-md-4">
        <q-card class="article-card" v-bind:data-aos="'fade-up'">
          <q-img :src="article.image" class="article-img" />
          <q-card-section>
            <div class="text-h6 text-bold">{{ article.title }}</div>
            <div class="text-grey-7 text-caption">
              {{ article.category }} • Par {{ article.author }}
            </div>
          </q-card-section>
          <q-card-section class="flex justify-center">
            <!-- <q-btn
              color="primary"
              label="Voir Plus"
              @click="goToArticle(article.id)"
              class="glow-btn"
            /> -->
            <q-btn color="primary" label="Voir Plus" class="glow-btn" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div v-if="filteredArticles.length === 0" class="text-center q-mt-md text-grey-6">
      Aucun article trouvé.
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
import AOS from 'aos'
import 'aos/dist/aos.css'

// const router = useRouter()

onMounted(() => {
  AOS.init({ duration: 1000, easing: 'ease-out' })
})

// Liste des articles
const articles = ref([
  {
    id: 1,
    title: "Maîtriser l'Élitologie",
    category: 'Développement personnel',
    author: 'Jean Dupont',
    image: 'https://source.unsplash.com/400x300/?success',
  },
  {
    id: 2,
    title: 'Les secrets des leaders',
    category: 'Leadership',
    author: 'Marie Curie',
    image: 'https://source.unsplash.com/400x300/?leader',
  },
  {
    id: 3,
    title: 'Booster sa productivité',
    category: 'Productivité',
    author: 'Albert Einstein',
    image: 'https://source.unsplash.com/400x300/?work',
  },
  {
    id: 4,
    title: 'Méditation et succès',
    category: 'Bien-être',
    author: 'Sophie Martin',
    image: 'https://source.unsplash.com/400x300/?meditation',
  },
  {
    id: 5,
    title: "L'échec mène à la réussite",
    category: 'Motivation',
    author: 'Thomas Edison',
    image: 'https://source.unsplash.com/400x300/?failure',
  },
])

// Catégories et auteurs
const categories = ref([
  'Développement personnel',
  'Leadership',
  'Productivité',
  'Bien-être',
  'Motivation',
])
const authors = ref([
  'Jean Dupont',
  'Marie Curie',
  'Albert Einstein',
  'Sophie Martin',
  'Thomas Edison',
])

// Filtres
const selectedCategory = ref<string | null>(null)
const selectedAuthor = ref<string | null>(null)

// Articles filtrés
const filteredArticles = computed(() => {
  return articles.value.filter((article) => {
    return (
      (!selectedCategory.value || article.category === selectedCategory.value) &&
      (!selectedAuthor.value || article.author === selectedAuthor.value)
    )
  })
})

// Réinitialiser les filtres
const resetFilters = () => {
  selectedCategory.value = null
  selectedAuthor.value = null
}

// Redirection vers l'article
// const goToArticle = (id: number) => {
//   router.push(`/article/${id}`)
// }
</script>

<style scoped>
/* Style du bloc des filtres */
.filter-card {
  background: linear-gradient(135deg, #ffeb99, #d4f5d5);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* Grille responsive pour afficher plus d'articles */
.row {
  display: flex;
  flex-wrap: wrap;
}

/* Cartes des articles */
.article-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.article-card:hover {
  transform: translateY(-10px) scale(1.03);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

/* Image */
.article-img {
  height: 180px;
  object-fit: cover;
}

/* Animation sur le bouton */
.glow-btn {
  transition: 0.3s;
  background: linear-gradient(135deg, #ffcc00, #66cc66);
  color: white;
  border-radius: 50px;
  font-weight: bold;
}

.glow-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(255, 204, 0, 0.7);
}
</style>

<!-- Animation avec Animate.css & AOS -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
/>
