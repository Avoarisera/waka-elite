<template>
  <q-page class="splash-screen">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="gradient-sphere sphere-1"></div>
      <div class="gradient-sphere sphere-2"></div>
      <div class="gradient-sphere sphere-3"></div>
      <div class="floating-shapes">
        <svg v-for="n in 3" :key="n" class="floating-shape" :class="`shape-${n}`">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>
    </div>

    <!-- Wave SVG -->
    <svg class="wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#34a853"
        fill-opacity="0.1"
        d="M0,128L24,154.7C48,181,96,235,144,261.3C192,288,240,288,288,282.7C336,277,384,267,432,240C480,213,528,171,576,160C624,149,672,171,720,160C768,149,816,107,864,74.7C912,43,960,21,1008,37.3C1056,53,1104,107,1152,106.7C1200,107,1248,53,1296,32C1344,11,1392,21,1416,26.7L1440,32L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"
      ></path>
    </svg>

    <div class="container">
      <transition name="fade" mode="out-in">
        <div v-if="currentStep === 1 || currentStep === 2 || currentStep === 3" :key="currentStep">
          <div v-if="currentStep === 1" class="step">
            <div class="illustration-wrapper">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2972/2972513.png"
                alt="Step 1"
                class="illustration"
              />
              <div class="illustration-glow"></div>
            </div>
            <div class="text-content">
              <h2 class="animated-title">Un annuaire vivant</h2>
              <p class="subtitle animated-subtitle">"You're on the front line, everyone's watching"</p>
              <p class="description animated-description">
                Tu veux qu'on te remarque ? Tu veux que tout le monde sache ce que tu fais ? Dans
                cette communauté, tu n'es pas juste un visage parmi tant d'autres. 🌍 🗣️
              </p>
            </div>
          </div>

          <div v-if="currentStep === 2" class="step">
            <div class="illustration-wrapper">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2018/2018639.png"
                alt="Step 2"
                class="illustration"
              />
              <div class="illustration-glow"></div>
            </div>
            <div class="text-content">
              <h2 class="animated-title">Créer des événements</h2>
              <p class="subtitle animated-subtitle">"Pick yourself up and dust yourself off"</p>
              <p class="description animated-description">
                Tu veux organiser un événement, une conférence, une soirée mémorable ? Vas-y,
                lance-toi ! 👉
              </p>
            </div>
          </div>

          <div v-if="currentStep === 3" class="step">
            <div class="illustration-wrapper">
              <img
                src="https://cdn-icons-png.flaticon.com/512/609/609803.png"
                alt="Step 3"
                class="illustration"
              />
              <div class="illustration-glow"></div>
            </div>
            <div class="text-content">
              <h2 class="animated-title">La communauté des champions</h2>
              <p class="subtitle animated-subtitle">"Listen to your God, this is our motto"</p>
              <p class="description animated-description">
                Ici, pas de place pour le doute. On fonce, on ose, on réalise. 🔥 C'EST TON MOMENT. Ne
                perds pas une seconde de plus.
              </p>
            </div>
          </div>
        </div>
      </transition>

      <q-btn
        round
        v-if="currentStep <= 3"
        icon="arrow-right"
        color="positive"
        @click="nextStep"
        class="next-button"
      >
        <q-tooltip>Suivant</q-tooltip>
      </q-btn>
    </div>

    <!-- Indicateurs de progression -->
    <div class="progress-indicators">
      <span
        v-for="step in steps"
        :key="'indicator-' + step"
        :class="{ active: currentStep === step }"
        class="indicator"
      ></span>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SplashScreen',
  setup() {
    const currentStep = ref(1)
    const steps = [1, 2, 3]

    const nextStep = () => {
      if (currentStep.value < steps.length) {
        currentStep.value += 1
      } else {
        window.location.href = '/login'
      }
    }

    return { currentStep, steps, nextStep }
  },
})
</script>

<style lang="scss" scoped>
.splash-screen {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
  overflow: hidden;
  position: relative;
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
  background: linear-gradient(45deg, #34a853, #4caf50);
  top: -100px;
  left: -100px;
}

.sphere-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, #fbbc05, #ffa000);
  bottom: -50px;
  right: -50px;
  animation-delay: -5s;
}

.sphere-3 {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #4285f4, #2196f3);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -10s;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-shape {
  position: absolute;
  width: 100px;
  height: 100px;
  color: rgba(52, 168, 83, 0.1);
  animation: rotate 20s linear infinite;
}

.shape-1 { top: 20%; left: 20%; animation-delay: 0s; }
.shape-2 { top: 40%; right: 20%; animation-delay: -5s; }
.shape-3 { bottom: 30%; left: 30%; animation-delay: -10s; }

.wave-svg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 1;
  animation: wave 10s infinite ease-in-out;
}

.container {
  text-align: center;
  max-width: 800px;
  padding: 2rem;
  z-index: 2;
  position: relative;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.illustration-wrapper {
  position: relative;
  width: 150px;
  height: 150px;
  margin-bottom: 1rem;
}

.illustration {
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: float 3s infinite ease-in-out;
}

.illustration-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(52, 168, 83, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.text-content {
  max-width: 600px;
  margin: 0 auto;
}

.animated-title {
  color: #34a853;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards;
}

.animated-subtitle {
  font-weight: 600;
  color: #fbbc05;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards 0.2s;
}

.animated-description {
  color: #5f6368;
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards 0.4s;
}

.next-button {
  margin-top: 2rem;
  background: #34a853;
  color: white;
  width: 56px;
  height: 56px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(52, 168, 83, 0.3);

  &:hover {
    transform: scale(1.1) translateY(-2px);
    box-shadow: 0 6px 16px rgba(52, 168, 83, 0.4);
  }

  :deep(.q-icon) {
    font-size: 24px;
  }
}

.progress-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  z-index: 2;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(52, 168, 83, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;

  &.active {
    background: #34a853;
    transform: scale(1.2);
    box-shadow: 0 0 12px rgba(52, 168, 83, 0.4);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.2; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes wave {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
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

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 600px) {
  .container {
    padding: 1rem;
  }

  .animated-title {
    font-size: 2rem;
  }

  .animated-subtitle {
    font-size: 1rem;
  }

  .animated-description {
    font-size: 1rem;
  }

  .illustration-wrapper {
    width: 120px;
    height: 120px;
  }
}
</style>
