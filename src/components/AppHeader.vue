<template>
  <!--
  Barre d'application plate
    * flat supprime l'ombre sous la barre
  -->
  <v-app-bar flat>
    <!--
    Conteneur de la barre d'application
      * class="d-flex align-center" aligne les éléments verticalement au centre
    -->
    <v-container class="d-flex align-center">
      <!--
      Logo de l'application cliquable
        * class="mr-4 pa-0 cursor-pointer" ajoute une marge à droite, retire le padding, et change le curseur pour indiquer la cliquabilité
        * image définit le chemin vers le logo (Pokeball) de l'application
        * size="64" définit la taille de l'avatar
        * @click redirige vers la page d'accueil
      -->
      <div class="d-flex align-center w-25">
        <v-img
          class="cursor-pointer mr-2"
          src="@/assets/Digimon_Logo(1).svg"
          @click="$router.push('/')"
        />

        <!-- Titre de l'application affiché dans la barre -->
        <v-toolbar-title>Digidex</v-toolbar-title>
      </div>

      <!--
      Liens de navigation générés dynamiquement
        * v-for parcourt chaque élément dans menuItems pour créer un lien de navigation
        * :key utilise link.title pour définir une clé unique par lien
        * :icon affiche l'icône spécifiée pour chaque lien
        * :to utilise le chemin vers la route spécifiée pour chaque lien
      -->
      <v-btn
        v-for="link in menuItems"
        :key="link.title"
        :icon="link.icon"
        :to="link.path"
      />
    </v-container>
  </v-app-bar>
</template>

<script setup>
/*
Définition des éléments de menu pour la navigation
  - Chaque élément contient :
    * title : le titre du lien
    * path : le chemin de la route
    * icon : l'icône du lien
*/
const menuItems = [
  // { title: 'Accueil', path: '/', icon: 'mdi-digimon_logo' },
  // Ajouter ici les autres liens du menu.
  // Vous trouverez des icônes sur https://pictogrammers.com/library/mdi/
  // N'oubliez pas d'ajouter le préfixe 'mdi-' devant le nom de l'icône.
]
</script>
