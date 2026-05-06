<template>
  <!--  Conteneur principal pour structurer la disposition de la page  -->
  <v-container>
    <!--  Titre de la page -->
    <h1 class="text-h3 text-center my-6">
      Digidex
    </h1>
    <!--  Barre de recherche  -->
    <v-row>
      <!--   Rechercher par nom   -->
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-text-field
          v-model="searchQuery"
          label="Search a Digimon"
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details
          variant="outlined"
          density="compact"
        />
      </v-col>
      <!--   Rechercher par niveau   -->
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-select
          v-model="selectedLevel"
          :items="digimonStore.levels"
          item-title="name"
          item-value="name"
          label="Filter by level"
          prepend-inner-icon="mdi-filter"
          clearable
          hide-details
          variant="outlined"
          density="compact"
        />
      </v-col>
      <!--   Bouton de tri   -->
      <v-col
        cols="12"
        md="4"
        class="d-flex align-center"
      >
        <v-btn
          variant="outlined"
          :prepend-icon="sortOrder === 'asc'
            ? 'mdi-sort-alphabetical-ascending'
            : 'mdi-sort-alphabetical-descending'"
          @click="toggleSort"
        >
          Sorting {{ sortOrder === 'asc' ? 'A → Z' : 'Z → A' }}
        </v-btn>
      </v-col>
    </v-row>
    <!--  Message d'erreur si aucun Digimon existe  -->
    <v-alert
      v-if="filteredBySearch.length === 0"
      type="info"
      variant="tonal"
      class="mb-6"
    >
      No Digimon corresponds to your search.
    </v-alert>
    <!--  Grille des Digimons  -->
    <v-row>
      <v-col
        v-for="digimon in sortedDigimons"
        :key="digimon.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <digimon-card :digimon="digimon" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Vos scripts ou imports ici
import DigimonCard from "@/components/DigimonCard.vue";
import { useDigimonStore } from "@/stores/digimonStore";

const digimonStore = useDigimonStore()

const searchQuery = ref('')
const selectedLevel = ref(null)
const sortOrder = ref('asc')

// Filtrage par niveau
const filteredByLevel = computed(() => {
  if (!selectedLevel.value) return digimonStore.digimons
  return digimonStore.digimons.filter(digimon =>
    digimon.level === selectedLevel.value,
  )
})

// Filtrer les Digimons en fonction de la requête de recherche
const filteredBySearch = computed(() => {
  if (!searchQuery.value) return filteredByLevel.value

  const query = searchQuery.value.toLowerCase();

  return filteredByLevel.value.filter(digimon =>
    digimon.name.toLowerCase().includes(query),
  )
})

// Triage par nom en créant une copie pour ne pas modifier le tableau filtré, ainsi que la gestion des accents français
const sortedDigimons = computed(() => {
  return [...filteredBySearch.value].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name, 'fr')
    return sortOrder.value === 'asc' ? comparison : -comparison
  })
})

// Inverse l'ordre de tri entre ascendant et descendant
function toggleSort() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}
</script>
