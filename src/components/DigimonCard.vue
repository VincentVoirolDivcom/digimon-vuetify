<template>
  <v-card
    :to="`/digimon/${props.digimon.id}`"
    class="digimon-card"
    flat
  >
    <!-- Image -->
    <div class="image-wrapper">
      <v-img
        :src="props.digimon.image"
        :alt="props.digimon.name"
        height="180"
        contain
        class="digimon-img"
      >
        <template #placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              indeterminate
              color="grey-lighten-4"
            />
          </div>
        </template>
      </v-img>

      <!-- Bouton favori superposé sur l'image -->
      <v-btn
        :icon="digimonStore.isFavorite(props.digimon) ? 'mdi-heart' : 'mdi-heart-outline'"
        :color="digimonStore.isFavorite(props.digimon) ? 'red' : 'white'"
        variant="text"
        class="favorite-btn"
        @click.stop.prevent="handleToggleFavorite()"
      />
    </div>

    <!-- Infos -->
    <div class="card-info">
      <span class="digimon-name">{{ props.digimon.name }}</span>
      <v-chip
        size="x-small"
        label
        class="level-chip"
      >
        {{ props.digimon.level }}
      </v-chip>
    </div>

    <!-- Snackbar -->
    <v-snackbar
      v-model="showSnackbar"
      :timeout="2000"
      color="primary"
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </v-card>
</template>

<script setup>
import {useDigimonStore} from "@/stores/digimonStore";

const props = defineProps({
  digimon: {
    type: Object,
    required: true,
  },
})

const digimonStore = useDigimonStore()

// Snackbar de confirmation
const showSnackbar = ref(false)
const snackbarMessage = ref('')

// Toggle du favoris et affichage de la snackbar de confirmation
function handleToggleFavorite() {
  const wasFavorite = digimonStore.isFavorite(props.digimon)
  digimonStore.toggleFavorite(props.digimon)
  snackbarMessage.value = wasFavorite ? 'Removed from favorites' : 'Added to favorites'
  showSnackbar.value = true
}
</script>

<style scoped>
.digimon-card {
  border-radius: 16px !important;
  overflow: hidden;
  border: 1px solid rgba(128, 128, 128, 0.15);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
}

.digimon-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15) !important;
}

/* Image */
.image-wrapper {
  position: relative;
  background: radial-gradient(circle at 50% 60%, rgba(128,128,128,0.08) 0%, transparent 70%);
}

.digimon-img {
  transition: transform 0.35s ease;
}

.digimon-card:hover .digimon-img {
  transform: scale(1.05);
}

/* Bouton favori positionné en haut à droite de l'image */
.favorite-btn {
  position: absolute;
  top: 6px;
  right: 6px;
}

/* Infos en bas de la carte */
.card-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px 12px;
  gap: 8px;
}

.digimon-name {
  font-weight: 700;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.level-chip {
  font-size: 0.7rem;
  font-weight: 600;
  opacity: 0.75;
  flex-shrink: 0;
}
</style>
