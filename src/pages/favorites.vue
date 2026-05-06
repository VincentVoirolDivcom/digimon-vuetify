<template>
  <v-container>
    <h1 class="text-h3 text-center my-6">
      Mes favoris ({{ digimonStore.totalFavorites }})
    </h1>

    <!-- Message si aucun favori -->
    <v-alert
      v-if="digimonStore.totalFavorites === 0"
      type="info"
      variant="tonal"
      class="mb-6"
    >
      You don't have any Digimon yet in your favorites.
      Clic on the heart to add one !
    </v-alert>

    <!-- Grille de cartes Pokémon favoris -->
    <v-row v-else>
      <v-col
        v-for="digimon in digimonStore.getFavorites"
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
import {useDigimonStore} from "@/stores/digimonStore";
import DigimonCard from "@/components/DigimonCard.vue";

const digimonStore = useDigimonStore()
</script>

<style scoped>

</style>
