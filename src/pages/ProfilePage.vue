<template>
  <q-page class="profile-page" :class="{ 'dark-mode': isDarkMode }">
    <section class="hero-section q-pa-md">
      <div class="hero-content">
        <div class="profile-card" :class="{ 'mobile': $q.screen.lt.md }">
          <div class="profile-header">
            <div class="profile-image-container">
              <q-avatar size="120px" class="profile-avatar floating">
                <img :src="profile.photo" alt="Profile Image">
              </q-avatar>
            </div>
            <div class="profile-info">
              <h1 class="text-h4 text-weight-bold typing-text">
                <span class="gradient-text">{{ profile.name }}</span>
              </h1>
              <div class="profession-container">
                <p class="text-h5 text-weight-bold profession">
                  <q-icon name="work" class="q-mr-sm" />
                  {{ profile.profession }}
                </p>
                <div class="sparkles">
                  <span v-for="n in 5" :key="n" class="sparkle"></span>
                </div>
              </div>
              <p class="text-subtitle1 text-grey-7 q-mb-md slogan">{{ profile.slogan }}</p>
              <div class="interests-container q-mb-md">
                <div class="interests-title text-subtitle2 text-grey-5">Intérêts</div>
                <div class="interests-tags">
                  <q-chip
                    v-for="interest in profile.interests.split(',')"
                    :key="interest"
                    class="interest-chip"
                    color="primary"
                    text-color="white"
                    size="sm"
                  >
                    {{ interest.trim() }}
                  </q-chip>
                </div>
              </div>
              <div class="contact-info q-mb-md">
                <div class="contact-item" @click="copyToClipboard(profile.email)">
                  <q-icon name="email" color="primary" size="1.2rem" />
                  <span class="q-ml-sm">{{ profile.email }}</span>
                  <q-icon name="content_copy" size="1rem" class="copy-icon" />
                </div>
                <div class="contact-item" @click="copyToClipboard(profile.phone)">
                  <q-icon name="phone" color="secondary" size="1.2rem" />
                  <span class="q-ml-sm">{{ profile.phone }}</span>
                  <q-icon name="content_copy" size="1rem" class="copy-icon" />
                </div>
              </div>
              <div class="social-links">
                <q-btn
                  v-for="social in profile.socials"
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
      <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#2E3B55" fill-opacity="1" d="M0,256L1440,128L1440,320L0,320Z"></path>
      </svg>
    </section>
    <section class="about-section q-pa-md">
      <q-card class="about-card">
        <q-card-section>
          <h2 class="text-h5 text-weight-bold gradient-text">À propos de moi</h2>
          <p class="text-body1 text-grey-7 fade-in">{{ profile.description }}</p>
        </q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const isDarkMode = ref($q.dark.isActive);

const profile = {
  name: 'Marie Dupont',
  profession: 'Développeuse Full-Stack',
  photo: 'https://cdn.quasar.dev/img/avatar1.jpg',
  location: 'Paris, France',
  email: 'marie.dupont@example.com',
  phone: '+33 6 12 34 56 78',
  slogan: 'Innovation, Passion, Performance',
  description: "Passionnée par le développement et la création d'expériences interactives engageantes.",
  interests: "Design, IA, Blockchain, Technologies Web",
  socials: [
    { name: 'LinkedIn', icon: 'fab fa-linkedin', color: 'primary', url: '#' },
    { name: 'GitHub', icon: 'fab fa-github', color: 'dark', url: '#' },
    { name: 'Twitter', icon: 'fab fa-twitter', color: 'info', url: '#' }
  ]
};

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
</script>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e1e2f 0%, #3a3a5f 100%);
  color: white;
}

.profile-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
  transform: perspective(1000px) rotateY(10deg);
  transition: transform 0.3s ease;
}

.profile-card:hover {
  transform: perspective(1000px) rotateY(0deg) scale(1.05);
}

.floating {
  animation: floating 3s ease-in-out infinite;
}

@keyframes floating {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.profession-container {
  position: relative;
  display: inline-block;
  margin: 1rem 0;
}

.profession {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  z-index: 1;
}

.sparkles {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

.sparkle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #fff;
  border-radius: 50%;
  animation: sparkle 1.5s infinite;
}

.sparkle:nth-child(1) { top: 20%; left: 20%; animation-delay: 0s; }
.sparkle:nth-child(2) { top: 30%; right: 20%; animation-delay: 0.3s; }
.sparkle:nth-child(3) { bottom: 20%; left: 30%; animation-delay: 0.6s; }
.sparkle:nth-child(4) { bottom: 30%; right: 30%; animation-delay: 0.9s; }
.sparkle:nth-child(5) { top: 50%; left: 50%; animation-delay: 1.2s; }

@keyframes sparkle {
  0%, 100% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: scale(1) rotate(180deg);
    opacity: 1;
  }
}

.interests-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem 0;
}

.interests-title {
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
}

.interests-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.interest-chip {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  transition: transform 0.3s ease;
}

.interest-chip:hover {
  transform: translateY(-2px);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.contact-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.contact-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: 0.5s;
}

.contact-item:hover::before {
  left: 100%;
}

.copy-icon {
  margin-left: auto;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.contact-item:hover .copy-icon {
  opacity: 1;
}

.social-btn {
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
}

.social-btn:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .profile-card {
    padding: 20px;
  }

  .contact-item {
    padding: 0.5rem 0.75rem;
  }

  .interests-tags {
    gap: 0.25rem;
  }
}
</style>
