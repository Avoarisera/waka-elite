<template>
  <q-page class="blog-article">
    <q-card class="blog-card" data-aos="fade-up">
      <!-- Image en couverture -->
      <q-img :src="article.image" class="blog-cover" />

      <q-card-section>
        <!-- Titre de l'article -->
        <h1 class="blog-title">{{ article.title }}</h1>

        <!-- Informations sur l'auteur et la date -->
        <div class="blog-meta">
          <q-avatar size="40px">
            <img :src="article.author.avatar" alt="Auteur" />
          </q-avatar>
          <span class="author-name">{{ article.author.name }}</span> ·
          <span class="article-date">{{ formatDate(article.date) }}</span>
        </div>

        <!-- Contenu de l'article -->
        <div class="blog-content" v-html="article.content"></div>

        <!-- Bouton retour -->
        <q-btn label="Retour aux articles" color="primary" flat @click="$emit('goBack')" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init({ duration: 1000 })
})

// Données statiques
const article = ref({
  title: 'Le Pouvoir des Mots : Comment Transformer sa Vie',
  content: `
    <p>Les mots ont une puissance incroyable. Ils peuvent inspirer, motiver et même guérir.</p>
    <p>Imaginez un monde où chaque mot que vous prononcez est une graine que vous plantez...</p>
    <blockquote>“Les mots sont les plus puissants outils que nous possédons.” – Nelson Mandela</blockquote>
    <p>Apprenez à les utiliser avec sagesse et ils vous ouvriront des portes insoupçonnées.</p>
  `,
  image: 'https://source.unsplash.com/800x400/?writing,book',
  author: { name: 'Jean Dupont', avatar: 'https://source.unsplash.com/40x40/?person' },
  date: '2024-02-10',
})

// Fonction pour formater la date
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<style scoped>
.blog-article {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.blog-card {
  background: linear-gradient(135deg, #fff8dc, #f0fff0);
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.blog-cover {
  height: 300px;
  border-radius: 12px 12px 0 0;
}

.blog-title {
  font-size: 26px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
}

.blog-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

.author-name {
  font-weight: bold;
}

.blog-content {
  font-size: 18px;
  line-height: 1.6;
  color: #444;
  text-align: justify;
  padding-bottom: 15px;
}

blockquote {
  font-size: 20px;
  font-style: italic;
  color: #00796b;
  border-left: 4px solid #00796b;
  padding-left: 10px;
  margin: 15px 0;
}
</style>
