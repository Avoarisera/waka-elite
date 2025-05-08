<template>
  <q-page class="locations-page">
    <!-- Artistic background with soft patterns -->
    <div class="page-background">
      <div class="pattern-overlay"></div>
      <div class="gradient-sphere sphere-1"></div>
      <div class="gradient-sphere sphere-2"></div>
    </div>

    <div class="content-container q-pa-md">
      <!-- Header with title -->
      <div class="page-header">
        <h1 class="page-title">
          <span class="title-text">Lieux</span>
          <div class="title-underline"></div>
        </h1>
        
        <q-btn
          color="accent"
          icon="add_location_alt"
          label="Nouveau Lieu"
          class="action-button"
          @click="showCreateLocationDialog = true"
        >
          <q-tooltip>Ajouter un nouveau lieu</q-tooltip>
        </q-btn>
      </div>

      <!-- Loading indicator -->
      <div v-if="loading" class="full-width flex flex-center q-pa-xl">
        <q-spinner color="primary" size="3em" />
        <div class="q-ml-md text-subtitle1">Chargement des lieux...</div>
      </div>

      <!-- Locations table -->
      <q-table
        v-else
        :rows="locations"
        :columns="columns"
        row-key="id"
        :filter="filter"
        separator="cell"
        class="locations-table"
        flat
        bordered
      >
        <template v-slot:top>
          <q-input 
            v-model="filter" 
            placeholder="Rechercher..." 
            outlined 
            dense 
            clearable 
            class="q-mb-md search-input"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body-cell-budget="props">
          <q-td :props="props">
            {{ formatCurrency(props.row.budget) }}
          </q-td>
        </template>
        
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="actions-cell">
            <q-btn
              flat
              round
              size="sm"
              color="info"
              icon="edit"
              @click="editLocation(props.row)"
            >
              <q-tooltip>Modifier</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              size="sm"
              color="negative"
              icon="delete"
              @click="confirmDelete(props.row)"
            >
              <q-tooltip>Supprimer</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- Create/Edit location dialog -->
    <q-dialog v-model="showCreateLocationDialog" persistent>
      <q-card class="create-dialog" style="min-width: 500px">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ editMode ? 'Modifier' : 'Nouveau' }} Lieu</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <p class="text-subtitle2">{{ editMode ? 'Modifiez les informations du lieu' : 'Ajoutez un nouveau lieu pour vos projets et idées' }}</p>
        </q-card-section>
        <q-card-section>
          <q-form @submit="onSubmitLocation" class="q-gutter-md">
            <q-input v-model="newLocation.name" label="Nom du lieu" :rules="[val => !!val || 'Le nom est requis']" outlined class="glass-input">
              <template v-slot:prepend><q-icon name="business" color="primary" /></template>
            </q-input>
            <q-input v-model="newLocation.address" label="Adresse" outlined class="glass-input">
              <template v-slot:prepend><q-icon name="location_on" color="primary" /></template>
            </q-input>
            <q-input v-model="newLocation.city" label="Ville" :rules="[val => !!val || 'La ville est requise']" outlined class="glass-input">
              <template v-slot:prepend><q-icon name="apartment" color="primary" /></template>
            </q-input>
            <q-input v-model="newLocation.country" label="Pays" :rules="[val => !!val || 'Le pays est requis']" outlined class="glass-input">
              <template v-slot:prepend><q-icon name="flag" color="primary" /></template>
            </q-input>
            <q-input v-model.number="newLocation.budget" label="Budget" type="number" outlined class="glass-input">
              <template v-slot:prepend><q-icon name="attach_money" color="primary" /></template>
            </q-input>
            <div class="row justify-end q-gutter-sm">
              <q-btn label="Annuler" color="grey" v-close-popup />
              <q-btn :label="editMode ? 'Mettre à jour' : 'Créer'" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Confirm delete dialog -->
    <q-dialog v-model="showDeleteDialog" persistent>
      <q-card class="create-dialog">
        <q-card-section class="row items-center">
          <div class="text-h6">Confirmer la suppression</div>
        </q-card-section>
        <q-card-section>
          <p>Êtes-vous sûr de vouloir supprimer le lieu <strong>{{ locationToDelete?.name }}</strong>?</p>
          <p class="text-caption text-negative">
            <q-icon name="warning" /> Cette action est irréversible.
          </p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup />
          <q-btn flat label="Supprimer" color="negative" @click="deleteLocation" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { locationService } from '../services/locationService'
import type { Location } from '../types/models'

const $q = useQuasar()
const loading = ref(true)
const locations = ref<Location[]>([])
const filter = ref('')
const showCreateLocationDialog = ref(false)
const showDeleteDialog = ref(false)
const editMode = ref(false)
const locationToDelete = ref<Location | null>(null)

const newLocation = ref({
  id: null as string | null,
  name: '',
  address: '',
  city: '',
  country: '',
  budget: 0
})

const columns = [
  { name: 'name', label: 'Nom', field: 'name', sortable: true, align: 'left' as const },
  { name: 'city', label: 'Ville', field: 'city', sortable: true, align: 'left' as const },
  { name: 'country', label: 'Pays', field: 'country', sortable: true, align: 'left' as const },
  { name: 'address', label: 'Adresse', field: 'address', sortable: true, align: 'left' as const },
  { name: 'budget', label: 'Budget', field: 'budget', sortable: true, align: 'right' as const },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' as const }
]

// Format currency to EUR
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value || 0)
}

// Fetch locations
const fetchLocations = async () => {
  try {
    loading.value = true
    locations.value = await locationService.getAllLocations()
  } catch (err) {
    console.error('Erreur lors du chargement des lieux:', err)
    $q.notify({ 
      color: 'negative', 
      message: 'Erreur lors de la récupération des lieux',
      icon: 'error'
    })
  } finally {
    loading.value = false
  }
}

// Edit location
const editLocation = (location: Location) => {
  editMode.value = true
  newLocation.value = {
    id: location.id,
    name: location.name,
    address: location.address || '',
    city: location.city,
    country: location.country,
    budget: location.budget
  }
  showCreateLocationDialog.value = true
}

// Confirm delete dialog
const confirmDelete = (location: Location) => {
  locationToDelete.value = location
  showDeleteDialog.value = true
}

// Delete location
const deleteLocation = async () => {
  if (!locationToDelete.value) return
  
  try {
    await locationService.deleteLocation(locationToDelete.value.id)
    
    // Remove from locations array
    const index = locations.value.findIndex(loc => loc.id === locationToDelete.value?.id)
    if (index !== -1) {
      locations.value.splice(index, 1)
    }
    
    $q.notify({ 
      color: 'positive', 
      message: `Lieu "${locationToDelete.value.name}" supprimé avec succès !`,
      icon: 'delete'
    })
    
    showDeleteDialog.value = false
    locationToDelete.value = null
  } catch (err) {
    console.error('Suppression du lieu échouée:', err)
    $q.notify({ 
      color: 'negative', 
      message: 'Erreur lors de la suppression du lieu',
      icon: 'error'
    })
  }
}

// Create or update location
const onSubmitLocation = async () => {
  try {
    let location: Location
    
    if (editMode.value && newLocation.value.id) {
      // Update existing location
      location = await locationService.updateLocation(newLocation.value.id, {
        name: newLocation.value.name,
        address: newLocation.value.address,
        city: newLocation.value.city,
        country: newLocation.value.country,
        budget: newLocation.value.budget
      })
      
      // Update in locations array
      const index = locations.value.findIndex(loc => loc.id === location.id)
      if (index !== -1) {
        locations.value[index] = location
      }
      
      $q.notify({ 
        color: 'positive', 
        message: 'Lieu mis à jour avec succès !',
        icon: 'edit_location'
      })
    } else {
      // Create new location
      location = await locationService.createLocation({
        name: newLocation.value.name,
        address: newLocation.value.address,
        city: newLocation.value.city,
        country: newLocation.value.country,
        budget: newLocation.value.budget
      })
      
      // Add to locations array
      locations.value.push(location)
      
      $q.notify({ 
        color: 'positive', 
        message: 'Lieu créé avec succès !',
        icon: 'add_location'
      })
    }
    
    // Reset and close dialog
    showCreateLocationDialog.value = false
    resetLocationForm()
  } catch (err) {
    console.error('Opération sur lieu échouée:', err)
    $q.notify({ 
      color: 'negative', 
      message: `Erreur lors de l'${editMode.value ? 'mise à jour' : 'ajout'} du lieu`,
      icon: 'error'
    })
  }
}

// Reset location form
const resetLocationForm = () => {
  editMode.value = false
  newLocation.value = {
    id: null,
    name: '',
    address: '',
    city: '',
    country: '',
    budget: 0
  }
}

onMounted(async () => {
  await fetchLocations()
})
</script>

<style lang="scss" scoped>
// Variables
$water-green: #4caf50;
$soft-blue: #64b5f6;
$accent-color: #ffd54f;

.locations-page {
  min-height: 100vh;
  background: #0E0E10;
  position: relative;
  overflow: hidden;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
}

.page-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.pattern-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0);
  background-size: 20px 20px;
}

.gradient-sphere {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.2;
}

.sphere-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(45deg, rgba($water-green, 0.3), rgba($soft-blue, 0.3));
  top: -100px;
  left: -100px;
  animation: float 20s infinite ease-in-out;
}

.sphere-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, rgba($accent-color, 0.3), rgba($water-green, 0.3));
  bottom: -50px;
  right: -50px;
  animation: float 20s infinite ease-in-out reverse;
}

.content-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.page-title {
  position: relative;
  margin: 0;
}

.title-text {
  font-family: 'Sora', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #7C3AED, #06B6D4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;
}

.title-underline {
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #7C3AED, #06B6D4);
  transform-origin: left;
  animation: expandWidth 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.action-button {
  background: #7C3AED !important;
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4);
  background: #6D28D9 !important;
}

.locations-table {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  overflow: hidden;
  
  .q-table__card {
    background: transparent;
    color: white;
  }
  
  .q-table__top {
    padding: 16px;
  }
  
  thead tr th {
    background: rgba(124, 58, 237, 0.1);
    color: white;
    font-weight: 600;
  }
  
  tbody tr {
    background: rgba(255, 255, 255, 0.02);
    
    &:hover {
      background: rgba(124, 58, 237, 0.08);
    }
    
    td {
      color: rgba(255, 255, 255, 0.8);
    }
  }
}

.search-input {
  max-width: 300px;
  
  :deep(.q-field__control) {
    background: rgba(255, 255, 255, 0.05);
  }
  
  :deep(.q-field__native) {
    color: white;
  }
}

.create-dialog {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
}

.glass-input {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  :deep(.q-field__native), :deep(.q-field__prefix), :deep(.q-field__suffix) {
    color: white;
  }
  
  &:focus-within {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(79, 172, 254, 0.5);
  }
}

.actions-cell {
  width: 100px;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, 20px); }
}

@keyframes expandWidth {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

@media (max-width: 600px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .title-text {
    font-size: 2rem;
  }
  
  .locations-page {
    padding: 1rem;
  }
}
</style> 