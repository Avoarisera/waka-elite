<template>
  <q-page class="q-pa-md animate__animated animate__fadeIn">
    <div class="row q-col-gutter-md">
      <!-- Colonne gauche : Profil -->
      <div class="col-12 col-md-6">
        <q-card class="profile-card animate__animated animate__zoomIn">
          <q-avatar size="120px" class="q-mb-md">
            <img src="https://cdn.quasar.dev/img/avatar.png" alt="Profile Picture" />
          </q-avatar>

          <div class="text-h5">{{ fullName }}</div>

          <q-separator class="q-mt-sm q-mb-sm" />

          <div v-if="email" class="info-item">
            <q-icon name="email" class="q-mr-sm text-primary" />
            <span>{{ email }}</span>
          </div>

          <div v-if="address" class="info-item">
            <q-icon name="location_on" class="q-mr-sm text-red" />
            <span>{{ address }}</span>
          </div>

          <div v-if="position" class="info-item">
            <q-icon name="work" class="q-mr-sm text-green" />
            <span>{{ position }}</span>
          </div>
        </q-card>
      </div>

      <!-- Colonne droite : Passions et intérêts -->
      <div class="col-12 col-md-6">
        <q-card class="passion-card animate__animated animate__slideInUp">
          <q-card-section>
            <q-icon name="favorite" class="q-mr-sm text-pink" size="lg" />
            <span class="text-h6">Passions</span>
            <p class="text-body1 q-mt-sm">{{ passion }}</p>
          </q-card-section>

          <q-card-section>
            <q-icon name="lightbulb" class="q-mr-sm text-amber" size="lg" />
            <span class="text-h6">Centres d'intérêt</span>
            <p class="text-body1 q-mt-sm">{{ interest }}</p>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Section des Projets, Idées et Articles -->
    <div class="row q-col-gutter-md q-mt-lg">
      <div class="col-12 col-md-4">
        <q-card class="info-card animate__animated animate__slideInLeft">
          <q-card-section>
            <q-icon name="code" color="primary" size="xl" />
            <div class="text-h6">Projets</div>
            <ul>
              <li>🚀 Application de gestion RH</li>
              <li>🌍 Plateforme e-learning</li>
              <li>🛠 API GraphQL avancée</li>
            </ul>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="info-card animate__animated animate__slideInUp">
          <q-card-section>
            <q-icon name="emoji_objects" color="amber" size="xl" />
            <div class="text-h6">Idées</div>
            <ul>
              <li>💡 Un chatbot intelligent</li>
              <li>📊 Une app de suivi financier</li>
              <li>👥 Un réseau social pour freelances</li>
            </ul>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="info-card animate__animated animate__slideInRight">
          <q-card-section>
            <q-icon name="article" color="blue" size="xl" />
            <div class="text-h6">Articles</div>
            <ul>
              <li>📜 "Pourquoi GraphQL change le game?"</li>
              <li>📌 "Les meilleures pratiques en Rails"</li>
              <li>🛡 "L’importance des tests en DevOps"</li>
            </ul>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useUserProfileStore } from 'src/stores/user-profile'
import { storeToRefs } from 'pinia'

const userProfileStore = useUserProfileStore()

const { fullName, email, address, position, passion, interest } = storeToRefs(userProfileStore)
</script>

<style scoped>
/* Général */
.q-card {
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

/* Profil */
.profile-card {
  text-align: center;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
}

.profile-card:hover {
  transform: scale(1.05);
}

/* Informations */
.info-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  margin: 8px 0;
}

/* Cartes d'intérêt et passions */
.passion-card {
  background: #fff7e6;
  transition: transform 0.3s ease-in-out;
}

.passion-card:hover {
  transform: translateY(-5px);
}

/* Section statique : Projets, Idées, Articles */
.info-card {
  text-align: center;
  padding: 15px;
  transition: transform 0.3s ease-in-out;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
}

/* Liste */
ul {
  list-style: none;
  padding: 0;
}

li {
  font-size: 14px;
  margin-top: 5px;
  font-weight: bold;
}

/* Responsive */
@media (max-width: 768px) {
  .info-item {
    justify-content: start;
  }
}
</style>

<!-- Ajout d'animations -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
/>
