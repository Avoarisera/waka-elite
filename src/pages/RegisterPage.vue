<template>
  <q-page class="flex flex-center register-page">
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

    <!-- Animated geometric shapes -->
    <div class="geometric-shapes">
      <div class="shape circle"></div>
      <div class="shape square"></div>
      <div class="shape triangle"></div>
      <div class="shape rectangle"></div>
      <div class="shape pentagon"></div>
    </div>

    <!-- Carte d'inscription avec animation -->
    <q-card class="register-card q-pa-md" :class="{ 'card-visible': showCard }">
      <q-card-section>
        <div class="text-h4 text-center q-mb-md register-title">
          <span class="title-word animate__animated animate__fadeInDown">Rejoignez Waka Waka</span>
        </div>
      </q-card-section>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-input
                v-model="firstName"
                label="Prénom"
                required
                outlined
                class="input-field animate__animated animate__fadeInLeft"
                :rules="[(val) => !!val || 'Ce champ est requis']"
              >
                <template v-slot:prepend>
                  <q-icon name="person" color="primary" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                v-model="lastName"
                label="Nom"
                required
                outlined
                class="input-field animate__animated animate__fadeInRight"
                :rules="[(val) => !!val || 'Ce champ est requis']"
              >
                <template v-slot:prepend>
                  <q-icon name="badge" color="primary" />
                </template>
              </q-input>
            </div>
          </div>

          <q-input
            v-model="email"
            label="Email"
            type="email"
            required
            outlined
            class="q-mb-md input-field animate__animated animate__fadeInLeft"
            :rules="[
              (val) => !!val || 'Ce champ est requis',
              (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Email invalide'
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="email" color="primary" />
            </template>
          </q-input>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-input
                v-model="position"
                label="Profession"
                required
                outlined
                class="input-field animate__animated animate__fadeInLeft"
                :rules="[(val) => !!val || 'Ce champ est requis']"
              >
                <template v-slot:prepend>
                  <q-icon name="work" color="primary" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-sm-6">
              <q-select
                v-model="passion"
                :options="passionOptions"
                label="Passion principale"
                required
                outlined
                class="input-field animate__animated animate__fadeInRight"
                :rules="[(val) => !!val || 'Ce champ est requis']"
              >
                <template v-slot:prepend>
                  <q-icon name="favorite" color="primary" />
                </template>
              </q-select>
            </div>
          </div>

          <q-select
            v-model="interest"
            :options="interestOptions"
            label="Centre d'intérêt principal"
            required
            outlined
            class="q-mb-md input-field animate__animated animate__fadeInLeft"
            :rules="[(val) => !!val || 'Ce champ est requis']"
          >
            <template v-slot:prepend>
              <q-icon name="interests" color="primary" />
            </template>
          </q-select>

          <q-input
            v-model="password"
            label="Mot de passe"
            :type="isPwdVisible ? 'text' : 'password'"
            required
            outlined
            class="q-mb-md input-field animate__animated animate__fadeInRight"
            :rules="[
              (val) => !!val || 'Ce champ est requis',
              (val) => val.length >= 8 || 'Le mot de passe doit contenir au moins 8 caractères'
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="lock" color="primary" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwdVisible ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwdVisible = !isPwdVisible"
              />
            </template>
          </q-input>

          <q-input
            v-model="confirmPassword"
            label="Confirmer le mot de passe"
            :type="isConfirmPwdVisible ? 'text' : 'password'"
            required
            outlined
            class="q-mb-md input-field animate__animated animate__fadeInLeft"
            :rules="[
              (val) => !!val || 'Ce champ est requis',
              (val) => val === password || 'Les mots de passe ne correspondent pas'
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="lock" color="primary" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isConfirmPwdVisible ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isConfirmPwdVisible = !isConfirmPwdVisible"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions class="q-px-md">
          <q-btn
            type="submit"
            label="S'inscrire"
            color="primary"
            class="full-width register-btn animate__animated animate__fadeInUp"
            size="lg"
            :loading="loading"
          />
        </q-card-actions>
      </q-form>

      <q-card-section class="text-center q-mt-sm">
        <q-btn
          flat
          color="primary"
          label="Déjà inscrit ? Se connecter"
          class="animate__animated animate__fadeIn"
          @click="goToLogin"
        />
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
import { ref, onMounted } from 'vue'
import { useAuthStore } from 'stores/authStore'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useUserStore } from 'stores/userStore'

const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()
const userStore = useUserStore()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const position = ref('')
const passion = ref('')
const interest = ref('')
const loading = ref(false)
const showCard = ref(false)
const isPwdVisible = ref(false)
const isConfirmPwdVisible = ref(false)

// Options pour les passions
const passionOptions = [
  'Art et Créativité',
  'Technologie',
  'Sport',
  'Musique',
  'Voyage',
  'Cuisine',
  'Environnement',
  'Littérature',
  'Photographie',
  'Entrepreneuriat'
]

// Options pour les centres d'intérêt
const interestOptions = [
  'Innovation',
  'Développement personnel',
  'Culture',
  'Science',
  'Education',
  'Bien-être',
  'Mode',
  'Gaming',
  'Finance',
  'Social'
]

onMounted(() => {
  void setTimeout(() => {
    showCard.value = true
  }, 500)
})

const onSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    $q.notify({
      color: 'negative',
      message: 'Les mots de passe ne correspondent pas',
      position: 'top',
      timeout: 2000
    })
    return
  }

  loading.value = true
  try {
    // Inscription de base avec auth
    const authResult = await authStore.register(
      email.value,
      password.value,
      firstName.value,
      lastName.value
    )

    if (authResult?.user?.id) {
      // Mise à jour du profil avec les informations supplémentaires
      try {
        await userStore.updateUserProfile({
          id: parseInt(authResult.user.id),
          position: position.value,
          passion: passion.value,
          interest: interest.value,
          // Ajout des champs requis par l'interface User
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          phone: '', // À ajouter au formulaire si nécessaire
          location: '', // À ajouter au formulaire si nécessaire
          avatar: '', // À définir une valeur par défaut
          skills: [],
          interests: []
        })
      } catch (profileError) {
        console.error('Error updating profile:', profileError)
        // On continue car l'inscription de base a réussi
      }
    }

    $q.notify({
      color: 'positive',
      message: 'Inscription réussie ! Vous pouvez maintenant vous connecter.',
      position: 'top',
      timeout: 2000
    })
    setTimeout(() => {
      void router.push('/login')
    }, 2000)
  } catch (error) {
    console.error('Registration failed:', error)
    $q.notify({
      color: 'negative',
      message: 'Erreur lors de l\'inscription',
      position: 'top',
      timeout: 2000
    })
  } finally {
    loading.value = false
  }
}

const goToLogin = () => {
  void router.push('/login')
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  position: relative;
  overflow: hidden;
}

.svg-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.wave {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  animation: wave 15s ease-in-out infinite;
}

.wave-top {
  top: 0;
  transform: translateY(-50%);
  animation-delay: -2s;
}

.wave-bottom {
  bottom: 0;
  transform: translateY(50%);
  animation-delay: -5s;
}

.register-card {
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.5s ease;
  z-index: 2;
}

.card-visible {
  transform: translateY(0);
  opacity: 1;
}

.register-title {
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 2rem;
}

.title-word {
  display: block;
  background: linear-gradient(45deg, #00cba9, #4facfe);
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
}

.input-field:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.register-btn {
  background: linear-gradient(45deg, #00cba9, #4facfe);
  border: none;
  border-radius: 12px;
  padding: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 203, 169, 0.3);
}

/* Geometric Shapes Animation */
.geometric-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.4;
  pointer-events: none;
}

.shape {
  position: absolute;
  animation: float 10s ease-in-out infinite, rotate 20s linear infinite;
}

.circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(45deg, #00cba9, #4facfe);
  top: 15%;
  left: 10%;
}

.square {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #ff6b6b, #ff8e53);
  bottom: 20%;
  right: 15%;
  animation-delay: -2s;
}

.triangle {
  width: 0;
  height: 0;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-bottom: 70px solid rgba(155, 89, 182, 0.7);
  top: 70%;
  left: 20%;
  animation-delay: -4s;
}

.rectangle {
  width: 100px;
  height: 50px;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  top: 30%;
  right: 10%;
  animation-delay: -6s;
}

.pentagon {
  width: 70px;
  height: 70px;
  background: linear-gradient(45deg, #f1c40f, #e67e22);
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
  bottom: 40%;
  left: 15%;
  animation-delay: -8s;
}

@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(180deg); }
  100% { transform: translateY(0) rotate(360deg); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes wave {
  0% { transform: translateX(0) translateY(-50%); }
  50% { transform: translateX(-25%) translateY(-45%); }
  100% { transform: translateX(0) translateY(-50%); }
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

@media (max-width: 600px) {
  .register-card {
    margin: 1rem;
    max-width: calc(100% - 2rem);
  }
}
</style> 