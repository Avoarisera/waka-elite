<template>
  <div>
    <UserProfileDisplay v-if="userProfileStore" />
    <div v-else class="text-center q-pa-md">
      <q-spinner color="primary" size="3em" />
      <div class="q-mt-sm">Chargement du profil...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserProfileStore } from 'src/stores/user-profile'
import UserProfileDisplay from 'src/components/UserProfileDisplay.vue'

const userProfileStore = useUserProfileStore()
const isLoading = ref(false)

const loadUserProfile = async () => {
  console.log('mandalone: loading user profile')
  isLoading.value = true
  try {
    // Simulation d'appel API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const profileData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      address: '123 Main St',
      position: 'Software Engineer',
      passion: 'Coding',
      interest: 'Hiking',
    }
    userProfileStore.setUserProfile(profileData)
    console.log(
      'userProfileStore.setUserProfile(profileData)',
      userProfileStore.setUserProfile(profileData),
    )
  } catch (error) {
    console.error('Erreur de chargement:', error)
  } finally {
    isLoading.value = false
  }
}
console.log(loadUserProfile())
// onMounted(async () => {
//   await loadUserProfile()
// })
onMounted(() => {
  userProfileStore.setUserProfile({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    address: '123 Main St',
    position: 'Software Engineer',
    passion: 'Coding',
    interest: 'Hiking',
  })
})
</script>
