<template>
  <v-card
    :to="`/digimon/${digimon.id}`"
    hover
  >
    <v-img
      :src="digimon.image"
      :alt="digimon.name"
      height="200"
      cover
    />
    <v-card-title>
      {{ digimon.name }}
    </v-card-title>
    <v-card-subtitle>
      Level : {{ digimon.level }}
    </v-card-subtitle>
  </v-card>
</template>

<script setup>

defineProps({
  digimon: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>

</style>
