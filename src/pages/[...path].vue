<template>
  <!--
  Conteneur principal de la page 404
    * Utilisation de classes pour centrer le contenu et le styliser
  -->
  <v-container class="text-center py-10">
    <!--
    Titre de la page 404
      * class="mb-4" ajoute une marge en bas pour espacer le titre
      * text-h1 applique le style d’un titre principal pour une apparence distincte
    -->
    <h1 class="text-h1 mb-4">Oups! Page non trouvée (404)</h1>

    <!--
    Message d’erreur pour expliquer que la page n'existe pas
      * class="mb-6" ajoute une marge en bas pour espacer le message
      * text-subtitle-1 applique le style d’un sous-titre pour une meilleure hiérarchie visuelle
    -->
    <p class="text-subtitle-1 mb-6">
      La page que vous cherchez n'existe pas ou a été déplacée.
    </p>

    <!--
    Bouton pour retourner à la page d'accueil
      * color="primary" applique la couleur principale pour le bouton
      * large rend le bouton plus visible et centré
      * @click="$router.push('/')" redirige vers la page d'accueil
    -->
    <v-btn color="primary" large to="/">
      Retour à l'accueil
    </v-btn>
  </v-container>
</template>

<script setup>
// Aucune logique JavaScript additionnelle nécessaire ici
</script>
