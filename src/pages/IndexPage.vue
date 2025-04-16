<template>
  <q-page class="index-page">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="gradient-sphere sphere-1"></div>
      <div class="gradient-sphere sphere-2"></div>
      <div class="gradient-sphere sphere-3"></div>
      <div class="firework" v-for="n in 5" :key="n"></div>
      <div class="floating-shapes">
        <svg v-for="n in 3" :key="n" class="floating-shape" :class="`shape-${n}`">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>
    </div>

    <div class="content-wrapper">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-content">
          <svg class="hero-svg" viewBox="0 0 400 150">
            <text x="50%" y="40%" text-anchor="middle" class="hero-title">
              Bienvenue sur
            </text>
            <text x="50%" y="60%" text-anchor="middle" class="hero-subtitle">
              Elitologie
            </text>
            <path class="hero-path" d="M50,120 Q200,140 350,120" />
          </svg>
          <p class="hero-description">
            Découvrez une plateforme innovante pour partager et collaborer
          </p>
        </div>
      </div>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Tasks Section -->
        <div class="section-card tasks-section">
          <div class="section-header">
            <div class="icon-wrapper">
              <q-icon name="check_circle" class="section-icon" />
              <div class="icon-glow"></div>
            </div>
            <h2 class="section-title">Tâches</h2>
          </div>
          <ul class="animated-list">
            <li v-for="todo in todos" 
                :key="todo.id" 
                class="list-item"
                @click="increment">
              <div class="item-content">
                <svg class="item-svg" viewBox="0 0 24 24">
                  <circle class="item-circle" cx="12" cy="12" r="10" />
                  <path class="item-check" d="M8,12 L11,15 L16,10" />
                </svg>
                <span class="item-text">{{ todo.content }}</span>
              </div>
              <div class="item-count">{{ todo.id }}</div>
            </li>
          </ul>
        </div>

        <!-- Stats Section -->
        <div class="stats-grid">
          <div class="stat-card" v-for="(stat, index) in stats" :key="index">
            <div class="stat-icon">
              <q-icon :name="stat.icon" />
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
            <div class="stat-decoration">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="2" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Interactive Elements -->
        <div class="interactive-section">
          <div class="interactive-card">
            <div class="card-content">
              <q-icon name="rocket_launch" class="card-icon" />
              <h3>Commencer</h3>
              <p>Explorez les fonctionnalités</p>
            </div>
            <div class="card-decoration"></div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Todo {
  id: number;
  content: string;
}

const todos = ref<Todo[]>([
  { id: 1, content: 'Première tâche' },
  { id: 2, content: 'Deuxième tâche' },
  { id: 3, content: 'Troisième tâche' },
  { id: 4, content: 'Quatrième tâche' },
  { id: 5, content: 'Cinquième tâche' }
]);

const clickCount = ref(0);
const totalCount = ref(1200);

const stats = computed(() => [
  {
    icon: 'counter',
    value: todos.value.length,
    label: 'Tâches'
  },
  {
    icon: 'trending_up',
    value: totalCount.value,
    label: 'Total'
  },
  {
    icon: 'touch_app',
    value: clickCount.value,
    label: 'Clics'
  }
]);

function increment() {
  clickCount.value += 1;
}
</script>

<style scoped>
.index-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  position: relative;
  overflow: hidden;
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
  color: rgba(255, 255, 255, 0.1);
  animation: rotate 20s linear infinite;
}

.shape-1 { top: 20%; left: 20%; animation-delay: 0s; }
.shape-2 { top: 40%; right: 20%; animation-delay: -5s; }
.shape-3 { bottom: 30%; left: 30%; animation-delay: -10s; }

.content-wrapper {
  position: relative;
  z-index: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero-svg {
  width: 100%;
  height: 200px;
  margin-bottom: 2rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  fill: none;
  stroke: #ffffff;
  stroke-width: 2;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawText 2s ease forwards;
}

.hero-subtitle {
  font-size: 4rem;
  font-weight: 900;
  fill: none;
  stroke: #4facfe;
  stroke-width: 2;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawText 2s ease forwards 0.5s;
}

.hero-path {
  fill: none;
  stroke: #4facfe;
  stroke-width: 2;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawPath 2s ease forwards 1s;
}

.hero-description {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 2rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards 1.5s;
}

.section-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.section-card:hover {
  transform: translateY(-5px);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.icon-wrapper {
  position: relative;
}

.section-icon {
  font-size: 2rem;
  color: #4facfe;
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: radial-gradient(circle, rgba(79, 172, 254, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.animated-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.list-item:hover {
  transform: translateX(10px);
  background: rgba(255, 255, 255, 0.1);
}

.item-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.item-svg {
  width: 24px;
  height: 24px;
}

.item-circle {
  fill: none;
  stroke: #4facfe;
  stroke-width: 2;
}

.item-check {
  fill: none;
  stroke: #4facfe;
  stroke-width: 2;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: drawCheck 0.5s ease forwards;
}

.item-text {
  color: #ffffff;
  font-size: 1.1rem;
}

.item-count {
  background: #4facfe;
  color: #ffffff;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: rgba(79, 172, 254, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon :deep(i) {
  font-size: 24px;
  color: #4facfe;
}

.stat-content {
  display: flex;
  flex-direction: column;
  z-index: 1;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.stat-decoration {
  position: absolute;
  right: -20px;
  bottom: -20px;
  width: 100px;
  height: 100px;
  color: rgba(255, 255, 255, 0.05);
  animation: rotate 20s linear infinite;
}

.interactive-section {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

.interactive-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.interactive-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.card-content {
  position: relative;
  z-index: 1;
}

.card-icon {
  font-size: 3rem;
  color: #4facfe;
  margin-bottom: 1rem;
}

.card-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(79, 172, 254, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.interactive-card:hover .card-decoration {
  opacity: 1;
}

.firework {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  animation: firework 2s ease-out infinite;
}

.firework:nth-child(1) { background: #ff6b6b; top: 20%; left: 20%; animation-delay: 0s; }
.firework:nth-child(2) { background: #4facfe; top: 40%; right: 20%; animation-delay: 0.5s; }
.firework:nth-child(3) { background: #43e97b; bottom: 30%; left: 30%; animation-delay: 1s; }
.firework:nth-child(4) { background: #ffd700; top: 30%; right: 30%; animation-delay: 1.5s; }
.firework:nth-child(5) { background: #ff8e8e; bottom: 20%; right: 40%; animation-delay: 2s; }

@keyframes drawText {
  to { stroke-dashoffset: 0; }
}

@keyframes drawPath {
  to { stroke-dashoffset: 0; }
}

@keyframes drawCheck {
  to { stroke-dashoffset: 0; }
}

@keyframes firework {
  0% { transform: translate(0, 0); opacity: 1; }
  50% { transform: translate(var(--x, 100px), var(--y, -100px)); opacity: 0.5; }
  100% { transform: translate(var(--x, 200px), var(--y, -200px)); opacity: 0; }
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(50px, 50px); }
  50% { transform: translate(0, 100px); }
  75% { transform: translate(-50px, 50px); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.2; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .content-wrapper {
    padding: 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.2rem;
  }

  .section-card {
    padding: 1rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
