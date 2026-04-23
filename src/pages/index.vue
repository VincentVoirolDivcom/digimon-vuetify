<template>
  <!-- Conteneur principal pour structurer la disposition de la page -->
  <v-container>
    <!--
    Titre de la page
      * text-h3 applique le style titre de niveau 3
      * text-center permet de centrer le texte
      * my-6 ajoute une marge verticale de 6 unités
    -->
    <h1 class="text-h3 text-center my-6">
      Digidex
    </h1>
    <!-- Grille des Digimons -->
    <v-row>
      <v-col
        v-for="digimon in digimons"
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
import { storeToRefs } from 'pinia';
import { useDigimonStore } from "@/stores/digimonStore";

const digimonStore = useDigimonStore()

const { digimons } = storeToRefs(digimonStore)
</script>
