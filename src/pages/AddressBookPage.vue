<template>
    <q-page class="bg-gradient column items-center q-pa-md">
      <div class="text-h5 text-white text-center q-mb-lg">Carnet d'Adresses</div>
  
      <div class="user-grid">
        <q-card
          v-for="user in users"
          :key="user.id"
          class="user-card q-pa-md q-ma-sm cursor-pointer"
          @click="selectedUser = user"
        >
          <q-avatar size="64px" class="q-mb-sm">
            <img :src="user.avatar" alt="User Avatar" />
          </q-avatar>
  
          <div class="text-white text-weight-medium text-subtitle1">{{ user.name }}</div>
          <div class="text-grey-4 text-caption">{{ user.role }}</div>
  
          <div class="q-mt-sm row wrap justify-center">
            <q-badge
              v-for="tag in user.tags"
              :key="tag"
              color="blue-4"
              class="q-ma-xs"
              outline
            >
              {{ tag }}
            </q-badge>
          </div>
        </q-card>
      </div>
  
      <q-dialog v-model="selectedUser" persistent>
        <q-card class="popup-card">
          <q-card-section class="row items-center q-pa-sm justify-between">
            <div class="text-h6 text-primary">{{ selectedUser?.name }}</div>
            <q-btn icon="close" flat dense @click="selectedUser = null" />
          </q-card-section>
  
          <q-card-section class="q-pa-md text-center">
            <q-avatar size="80px" class="q-mb-md">
              <img :src="selectedUser?.avatar" alt="Avatar" />
            </q-avatar>
            <div class="text-weight-bold text-h6">{{ selectedUser?.role }}</div>
            <div class="text-grey-7 q-mt-sm">{{ selectedUser?.description }}</div>
            <div class="q-mt-md row wrap justify-center">
              <q-badge
                v-for="tag in selectedUser?.tags"
                :key="tag"
                color="primary"
                class="q-ma-xs"
                outline
              >
                {{ tag }}
              </q-badge>
            </div>
          </q-card-section>
  
          <q-card-actions align="center">
            <q-btn label="Contacter" color="primary" class="q-mt-sm shadow-2" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  interface User {
    id: number;
    name: string;
    avatar: string;
    role: string;
    tags: string[];
    description: string;
  }
  
  const users = ref<User[]>([
    {
      id: 1,
      name: 'Jean Dupont',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      role: 'Développeur Full Stack',
      tags: ['Intelligence Artificielle', 'Web Design'],
      description: 'Passionné par le développement web moderne et lIA.',
    },
    // ... autres utilisateurs
  ]);
  
  const selectedUser = ref<User | null>(null);
  </script>
  
  <style scoped>
  .bg-gradient {
    background: linear-gradient(to bottom right, #0f2027, #203a43, #2c5364);
    min-height: 100vh;
  }
  
  .user-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
    width: 100%;
    max-width: 1200px;
  }
  
  .user-card {
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.05);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  .user-card:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
  
  .popup-card {
    width: 90vw;
    max-width: 400px;
    border-radius: 16px;
    background: #f5f7fa;
    animation: slideIn 0.3s ease-out;
  }
  
  @keyframes slideIn {
    from {
      transform: translateY(100px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  </style>
  