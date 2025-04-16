import { defineStore } from 'pinia'

interface UserProfileState {
  lastName: string | null
  email: string | null
  firstName: string | null
  address: string | null
  position: string | null
  passion: string | null
  interest: string | null
}

export const useUserProfileStore = defineStore('userProfile', {
  state: (): UserProfileState => ({
    lastName: null,
    email: null,
    firstName: null,
    address: null,
    position: null,
    passion: null,
    interest: null,
  }),
  getters: {
    fullName: (state) => {
      if (state.firstName && state.lastName) {
        return `${state.firstName} ${state.lastName}`
      }
      return state.firstName || state.lastName || 'Unknown User'
    },
  },
  actions: {
    setUserProfile(profile: UserProfileState) {
      this.$patch(profile) // ✅ Utiliser $patch pour modifier le state
    },
    clearUserProfile() {
      this.$patch({
        lastName: null,
        email: null,
        firstName: null,
        address: null,
        position: null,
        passion: null,
        interest: null,
      })
    },
  },
})
