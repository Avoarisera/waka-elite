<template>
  <q-page class="flex flex-center login-page">
    <div class="inspiring-text">
      <span class="text-part">Innovez</span>
      <span class="text-part">Créez</span>
      <span class="text-part">Inspirez</span>
      <span class="text-part">Ensemble ✨</span>
    </div>
    <!-- Animated Welcome Text -->
    <div class="welcome-text-container">
      <transition name="fade" mode="out-in">
        <div 
          v-if="showWelcomeText" 
          class="typing-text" 
          :key="currentMessageIndex"
        >
          {{ currentWelcomeMessage }}
        </div>
      </transition>
    </div>

    <!-- Modern geometric animations -->
    <div class="geometric-pattern">
      <div class="circle-pulse"></div>
      <div class="dancing-circles">
        <div class="dance-circle"></div>
        <div class="dance-circle"></div>
        <div class="dance-circle"></div>
      </div>
      <div class="rhythm-lines">
        <div class="rhythm-line"></div>
        <div class="rhythm-line"></div>
        <div class="rhythm-line"></div>
      </div>
    </div>

    <!-- Feux d'artifice -->
    <div v-if="showFireworks" class="fireworks-container">
      <div v-for="n in 5" :key="n" class="firework" :style="{ left: `${n * 20}%` }">
        <div class="explosion"></div>
        <div class="explosion"></div>
        <div class="explosion"></div>
      </div>
    </div>

    <!-- Motivational quote with updated style -->
    <div v-if="showMotivationalQuote" class="motivational-quote animate__animated animate__fadeIn">
      <div class="quote-content">
        <q-icon name="auto_awesome" size="2rem" color="yellow-6" class="quote-icon" />
        <div class="quote-text">{{ currentQuote }}</div>
      </div>
    </div>

    <!-- SVG Background avec animation -->
    <div class="svg-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="wave wave-top">
        <path
          fill="#00cba9"
          fill-opacity="0.8"
          d="M0,256L6.2,224C12.3,192,25,128,37,96C49.2,64,62,64,74,58.7C86.2,53,98,43,111,42.7C123.1,43,135,53,148,101.3C160,149,172,235,185,229.3C196.9,224,209,128,222,117.3C233.8,107,246,181,258,197.3C270.8,213,283,171,295,154.7C307.7,139,320,149,332,170.7C344.6,192,357,224,369,202.7C381.5,181,394,107,406,96C418.5,85,431,139,443,154.7C455.4,171,468,149,480,138.7C492.3,128,505,128,517,149.3C529.2,171,542,213,554,218.7C566.2,224,578,192,591,186.7C603.1,181,615,203,628,181.3C640,160,652,96,665,69.3C676.9,43,689,53,702,101.3C713.8,149,726,235,738,266.7C750.8,299,763,277,775,250.7C787.7,224,800,192,812,197.3C824.6,203,837,245,849,224C861.5,203,874,117,886,80C898.5,43,911,53,923,74.7C935.4,96,948,128,960,133.3C972.3,139,985,117,997,117.3C1009.2,117,1022,139,1034,154.7C1046.2,171,1058,181,1071,165.3C1083.1,149,1095,107,1108,106.7C1120,107,1132,149,1145,160C1156.9,171,1169,149,1182,160C1193.8,171,1206,213,1218,229.3C1230.8,245,1243,235,1255,240C1267.7,245,1280,267,1292,256C1304.6,245,1317,203,1329,197.3C1341.5,192,1354,224,1366,234.7C1378.5,245,1391,235,1403,229.3C1415.4,224,1428,224,1434,224L1440,224L1440,0L1433.8,0C1427.7,0,1415,0,1403,0C1390.8,0,1378,0,1366,0C1353.8,0,1342,0,1329,0C1316.9,0,1305,0,1292,0C1280,0,1268,0,1255,0C1243.1,0,1231,0,1218,0C1206.2,0,1194,0,1182,0C1169.2,0,1157,0,1145,0C1132.3,0,1120,0,1108,0C1095.4,0,1083,0,1071,0C1058.5,0,1046,0,1034,0C1021.5,0,1009,0,997,0C984.6,0,972,0,960,0C947.7,0,935,0,923,0C910.8,0,898,0,886,0C873.8,0,862,0,849,0C836.9,0,825,0,812,0C800,0,788,0,775,0C763.1,0,751,0,738,0C726.2,0,714,0,702,0C689.2,0,677,0,665,0C652.3,0,640,0,628,0C615.4,0,603,0,591,0C578.5,0,566,0,554,0C541.5,0,529,0,517,0C504.6,0,492,0,480,0C467.7,0,455,0,443,0C430.8,0,418,0,406,0C393.8,0,382,0,369,0C356.9,0,345,0,332,0C320,0,308,0,295,0C283.1,0,271,0,258,0C246.2,0,234,0,222,0C209.2,0,197,0,185,0C172.3,0,160,0,148,0C135.4,0,123,0,111,0C98.5,0,86,0,74,0C61.5,0,49,0,37,0C24.6,0,12,0,6,0L0,0Z"
        ></path>
      </svg>
    </div>

    <!-- Login card with updated style -->
    <q-card class="login-card q-pa-md" :class="{ 'card-visible': showCard }">
      <q-card-section>
        <div class="text-h4 text-center q-mb-md login-title">
          <span class="title-word animate__animated animate__fadeInDown">Bienvenue à Waka Waka</span>
          <!-- <span class="subtitle animate__animated animate__fadeInUp">Votre espace d'innovation</span> -->
        </div>
      </q-card-section>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <q-input
            v-model="email"
            label="Email"
            type="email"
            required
            outlined
            class="q-mb-md input-field animate__animated animate__fadeInLeft"
            :rules="[(val) => !!val || 'Ce champ est requis']"
          >
            <template v-slot:prepend>
              <q-icon name="email" color="primary" />
            </template>
          </q-input>

          <q-input
            v-model="password"
            label="Mot de passe"
            type="password"
            required
            outlined
            class="q-mb-md input-field animate__animated animate__fadeInRight"
            :rules="[(val) => !!val || 'Ce champ est requis']"
          >
            <template v-slot:prepend>
              <q-icon name="lock" color="primary" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions class="q-px-md">
          <q-btn
            type="submit"
            label="Se connecter"
            color="primary"
            class="full-width login-btn animate__animated animate__fadeInUp"
            size="lg"
            :loading="loading"
          />
        </q-card-actions>
      </q-form>

      <q-card-section class="text-center q-mt-sm">
        <div class="row justify-center q-gutter-md">
          <q-btn
            flat
            color="primary"
            label="Mot de passe oublié ?"
            class="animate__animated animate__fadeIn"
            @click="goToResetPassword"
          />
          <q-btn
            flat
            color="primary"
            label="Créer un compte"
            class="animate__animated animate__fadeIn"
            @click="goToRegister"
          />
        </div>
      </q-card-section>
    </q-card>

    <!-- SVG Bottom avec animation -->
    <div class="svg-container bottom">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="wave wave-bottom">
        <path
          fill="#00cba9"
          fill-opacity="0.8"
          d="M0,192L120,208C240,224,480,256,720,234.7C960,213,1200,139,1320,101.3L1440,64L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
        ></path>
      </svg>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from 'stores/authStore'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()
const email = ref('')
const password = ref('')
const loading = ref(false)
const showCard = ref(false)
const showMotivationalQuote = ref(true)
const showFireworks = ref(false)
const authStore = useAuthStore()

// Welcome message system
const welcomeMessages: string[] = [
  "Bienvenue dans votre espace créatif",
  "Ensemble, créons l'avenir",
  "L'innovation commence ici"
]

const currentMessageIndex = ref(0)
const currentWelcomeMessage = computed(() => welcomeMessages[currentMessageIndex.value])
const showWelcomeText = ref(true)

const rotateWelcomeMessage = () => {
  showWelcomeText.value = false
  setTimeout(() => {
    currentMessageIndex.value = (currentMessageIndex.value + 1) % welcomeMessages.length
    showWelcomeText.value = true
  }, 500)
}

// Existing motivational quotes
const motivationalQuotes = [
  "L'innovation est la clé du succès ! 💡",
  "Chaque idée peut changer le monde 🌍",
  "Créons ensemble un avenir meilleur ✨",
  "Votre créativité est votre super-pouvoir 🚀",
  "Inspirons-nous les uns des autres 🤝"
]

const currentQuote = ref(motivationalQuotes[0])

onMounted(() => {
  void setTimeout(() => {
    showCard.value = true
  }, 500)

  // Welcome message rotation
  const welcomeInterval = setInterval(rotateWelcomeMessage, 6000)

  // Existing quote rotation
  let quoteIndex = 0
  const rotateQuotes = () => {
    if (showMotivationalQuote.value) {
      quoteIndex = (quoteIndex + 1) % motivationalQuotes.length
      currentQuote.value = motivationalQuotes[quoteIndex]
    }
  }

  const quoteInterval = setInterval(rotateQuotes, 5000)

  void setTimeout(() => {
    showMotivationalQuote.value = false
    clearInterval(quoteInterval)
  }, 15000)

  return () => {
    clearInterval(quoteInterval)
    clearInterval(welcomeInterval)
  }
})

const handleLogin = async (email: string, password: string) => {
  loading.value = true
  try {
    await authStore.login(email, password)
    showFireworks.value = true
    $q.notify({
      color: 'positive',
      message: 'Connexion réussie !',
      position: 'top',
      timeout: 2000
    })
    setTimeout(() => {
      void router.push('/')
    }, 2000)
  } catch (error) {
    console.error('Login failed:', error)
    $q.notify({
      color: 'negative',
      message: 'Erreur de connexion',
      position: 'top',
      timeout: 2000
    })
  } finally {
    loading.value = false
  }
}

const onSubmit = () => {
  void handleLogin(email.value, password.value)
}

const goToResetPassword = () => {
  void router.push('/reset-password')
}

const goToRegister = () => {
  void router.push('/register')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #111111 0%, #1a1a1a 100%);
  position: relative;
  overflow: hidden;
}

/* Modern geometric animations */
.geometric-pattern {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.circle-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, 
    rgba(0, 203, 169, 0.1) 0%,
    rgba(255, 215, 0, 0.05) 50%,
    transparent 70%
  );
  animation: pulsate 4s ease-in-out infinite;
}

.dancing-circles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.dance-circle {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(0, 203, 169, 0.2);
  animation: danceMove 12s infinite ease-in-out;
}

.dance-circle:nth-child(1) {
  width: 100px;
  height: 100px;
  top: 20%;
  left: 15%;
  border-color: rgba(0, 203, 169, 0.2);
  animation-delay: 0s;
}

.dance-circle:nth-child(2) {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 20%;
  border-color: rgba(255, 215, 0, 0.2);
  animation-delay: -4s;
}

.dance-circle:nth-child(3) {
  width: 80px;
  height: 80px;
  bottom: 15%;
  left: 30%;
  border-color: rgba(0, 203, 169, 0.2);
  animation-delay: -8s;
}

.rhythm-lines {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  gap: 20px;
  opacity: 0.3;
}

.rhythm-line {
  width: 3px;
  height: 50px;
  background: #00cba9;
  animation: rhythmPulse 1.5s infinite ease-in-out;
}

.rhythm-line:nth-child(2) {
  animation-delay: 0.5s;
  background: #ffd700;
}

.rhythm-line:nth-child(3) {
  animation-delay: 1s;
  background: #00cba9;
}

/* Updated login card style */
.login-card {
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(0, 203, 169, 0.2);
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.5s ease;
  z-index: 2;
}

.card-visible {
  transform: translateY(0);
  opacity: 1;
}

.login-title {
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 2rem;
}

.title-word {
  display: block;
  background: linear-gradient(45deg, #00cba9, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards;
}

.input-field {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 203, 169, 0.2);
}

.input-field:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
  border-color: rgba(0, 203, 169, 0.4);
}

.login-btn {
  background: linear-gradient(45deg, #00cba9, #009881) !important;
  border: none;
  border-radius: 12px;
  padding: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.login-btn::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 215, 0, 0.2),
    transparent
  );
  transform: rotate(45deg);
  animation: shimmer 3s infinite linear;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 203, 169, 0.2);
}

/* Updated animations */
@keyframes pulsate {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.8;
  }
}

@keyframes danceMove {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(20px, -20px) rotate(90deg);
  }
  50% {
    transform: translate(0, -40px) rotate(180deg);
  }
  75% {
    transform: translate(-20px, -20px) rotate(270deg);
  }
}

@keyframes rhythmPulse {
  0%, 100% {
    height: 50px;
  }
  50% {
    height: 100px;
  }
}

@keyframes shimmer {
  0% {
    transform: rotate(45deg) translateX(-100%);
  }
  100% {
    transform: rotate(45deg) translateX(100%);
  }
}

/* Updated motivational quote style */
.motivational-quote {
  background: rgba(0, 203, 169, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 203, 169, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.quote-text {
  color: #ffffff;
  font-weight: 600;
  font-size: 1.1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .circle-pulse {
    width: 200px;
    height: 200px;
  }

  .dance-circle {
    transform: scale(0.7);
  }

  .rhythm-lines {
    height: 150px;
  }
}

/* Styles pour les feux d'artifice */
.fireworks-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 4;
}

.firework {
  position: absolute;
  bottom: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  animation: firework 2s ease-out infinite;
}

.explosion {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  animation: explosion 2s ease-out infinite;
}

.explosion:nth-child(1) {
  background: #ff0;
  animation-delay: 0s;
}

.explosion:nth-child(2) {
  background: #f0f;
  animation-delay: 0.2s;
}

.explosion:nth-child(3) {
  background: #0ff;
  animation-delay: 0.4s;
}

@keyframes firework {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(-50vh);
    opacity: 0.5;
  }
  100% {
    transform: translateY(-100vh);
    opacity: 0;
  }
}

@keyframes explosion {
  0% {
    transform: translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx), var(--ty));
    opacity: 0;
  }
}

/* Ajout des variations pour chaque explosion */
.firework:nth-child(1) .explosion:nth-child(1) { --tx: 50px; --ty: -50px; }
.firework:nth-child(1) .explosion:nth-child(2) { --tx: -50px; --ty: -50px; }
.firework:nth-child(1) .explosion:nth-child(3) { --tx: 0; --ty: -100px; }

.firework:nth-child(2) .explosion:nth-child(1) { --tx: 30px; --ty: -70px; }
.firework:nth-child(2) .explosion:nth-child(2) { --tx: -30px; --ty: -70px; }
.firework:nth-child(2) .explosion:nth-child(3) { --tx: 0; --ty: -120px; }

.firework:nth-child(3) .explosion:nth-child(1) { --tx: 70px; --ty: -30px; }
.firework:nth-child(3) .explosion:nth-child(2) { --tx: -70px; --ty: -30px; }
.firework:nth-child(3) .explosion:nth-child(3) { --tx: 0; --ty: -80px; }

.firework:nth-child(4) .explosion:nth-child(1) { --tx: 40px; --ty: -90px; }
.firework:nth-child(4) .explosion:nth-child(2) { --tx: -40px; --ty: -90px; }
.firework:nth-child(4) .explosion:nth-child(3) { --tx: 0; --ty: -150px; }

.firework:nth-child(5) .explosion:nth-child(1) { --tx: 60px; --ty: -60px; }
.firework:nth-child(5) .explosion:nth-child(2) { --tx: -60px; --ty: -60px; }
.firework:nth-child(5) .explosion:nth-child(3) { --tx: 0; --ty: -110px; }

/* Add before existing styles */
.welcome-text-container {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 3;
}

.inspiring-text {
  display: flex;
  gap: 1rem;
  justify-content: center;
  font-size: 1.5rem;
  color: #ffd700;
}

.text-part {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards;
}

.text-part:nth-child(1) { animation-delay: 3.5s; }
.text-part:nth-child(2) { animation-delay: 3.8s; }
.text-part:nth-child(3) { animation-delay: 4.1s; }
.text-part:nth-child(4) { animation-delay: 4.4s; }

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #00cba9 }
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

/* Update responsive styles */
@media (max-width: 600px) {
  .welcome-text-container {
    width: 90%;
  }

  .typing-text {
    font-size: 1.5rem;
  }

  .inspiring-text {
    font-size: 1.2rem;
    flex-wrap: wrap;
  }
}

/* Add to existing styles */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.typing-text {
  color: #00cba9;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-shadow: 0 2px 10px rgba(0, 203, 169, 0.3);
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

