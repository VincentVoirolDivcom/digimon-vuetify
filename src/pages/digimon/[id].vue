<template>
  <v-container class="detail-container py-8">
    <!-- Bouton retour -->
    <v-btn
      variant="text"
      prepend-icon="mdi-arrow-left"
      class="mb-6 back-btn"
      @click="$router.back()"
    >
      Return
    </v-btn>

    <!-- Message d'erreur -->
    <v-alert
      v-if="!digimon"
      type="error"
      variant="tonal"
    >
      Digimon not found.
    </v-alert>

    <div
      v-if="digimon"
      class="detail-wrapper"
    >
      <!-- Partie gauche : image -->
      <div class="image-section">
        <div class="image-glow" />
        <v-img
          :src="image"
          :alt="digimon.name"
          class="digimon-img"
          contain
        />
      </div>

      <!-- Partie droite : infos -->
      <div class="info-section">
        <!-- Nom -->
        <h1 class="digimon-name">
          {{ digimon.name }}
        </h1>

        <!-- Chips niveau / attribut / type -->
        <div class="chips-row">
          <v-chip
            v-if="level"
            class="stat-chip"
            label
          >
            <v-icon start>
              mdi-chevron-double-up
            </v-icon>
            {{ level }}
          </v-chip>
          <v-chip
            v-if="attribute"
            class="stat-chip"
            label
          >
            <v-icon start>
              mdi-atom
            </v-icon>
            {{ attribute }}
          </v-chip>
          <v-chip
            v-if="type"
            class="stat-chip"
            label
          >
            <v-icon start>
              mdi-dna
            </v-icon>
            {{ type }}
          </v-chip>
        </div>

        <!-- Séparateur -->
        <v-divider class="my-4" />

        <!-- Description -->
        <p
          v-if="description"
          class="digimon-description"
        >
          {{ description }}
        </p>

        <!-- Séparateur -->
        <v-divider class="my-4" />

        <!-- Fields -->
        <div
          v-if="fields.length > 0"
          class="fields-section"
        >
          <h3 class="fields-title">
            Fields
          </h3>
          <div class="fields-grid">
            <div
              v-for="field in fields"
              :key="field.id"
              class="field-item"
            >
              <img
                :src="field.image"
                :alt="field.field"
                class="field-img"
              >
              <span class="field-label">{{ field.field }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import {useDigimonStore} from "@/stores/digimonStore";
import api from "@/plugins/axios";

const route = useRoute();
const digimonStore = useDigimonStore()
const { digimons } = storeToRefs(digimonStore)

const digimon = computed(() => {
  return digimons.value.find(d => d.id === Number(route.params.id))
})

const image = ref('')
const description = ref()
const level = ref('')
const attribute = ref('')
const type = ref('')
const fields = ref([])

onMounted(async () => {
  const response = await api.get(`digimon/${digimon.value.id}`)
  const digimonDatas = await response.data
  console.log(digimonDatas)
  image.value = digimonDatas.images[0].href
  // Certains Digimons n'ont aucune description, d'autres en ont plusieurs. On affiche la deuxième si elles existent, sinon on affiche rien
  description.value = digimonDatas.descriptions.length === 2 ? digimonDatas.descriptions[1].description : null
  level.value = digimonDatas.levels[0].level
  attribute.value = digimonDatas.attributes[0].attribute
  type.value = digimonDatas.types[0].type
  fields. value = digimonDatas.fields
})
</script>

<style scoped>
.detail-container {
  max-width: 1100px;
}

.back-btn {
  opacity: 0.7;
  transition: opacity 0.2s;
}
.back-btn:hover {
  opacity: 1;
}

/* Layout deux colonnes */
.detail-wrapper {
  display: flex;
  gap: 48px;
  align-items: flex-start;
}

/* Colonne image */
.image-section {
  position: relative;
  flex: 0 0 380px;
}

.image-glow {
  position: absolute;
  inset: 10%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(var(--v-theme-primary), 0.25) 0%, transparent 70%);
  filter: blur(40px);
  z-index: 0;
}

.digimon-img {
  position: relative;
  z-index: 1;
  height: 380px;
  filter: drop-shadow(0 8px 32px rgba(0,0,0,0.25));
  transition: transform 0.4s ease;
}
.digimon-img:hover {
  transform: translateY(-6px) scale(1.02);
}

/* Colonne infos */
.info-section {
  flex: 1;
  padding-top: 16px;
}

.digimon-name {
  font-size: 2.8rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  line-height: 1.1;
  margin-bottom: 20px;
}

/* Chips */
.chips-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.stat-chip {
  font-weight: 600;
  font-size: 0.85rem;
  opacity: 0.9;
}

/* Description */
.digimon-description {
  font-size: 0.97rem;
  line-height: 1.75;
  opacity: 0.85;
  text-align: justify;
}

/* Fields */
.fields-title {
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  opacity: 0.6;
  margin-bottom: 16px;
}

.fields-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.field-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.field-img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.2));
  transition: transform 0.2s;
}
.field-img:hover {
  transform: scale(1.15);
}

.field-label {
  font-size: 0.75rem;
  font-weight: 600;
  opacity: 0.7;
  text-align: center;
}

/* Responsive : une colonne sur mobile */
@media (max-width: 768px) {
  .detail-wrapper {
    flex-direction: column;
  }
  .image-section {
    flex: none;
    width: 100%;
  }
  .digimon-img {
    height: 280px;
  }
  .digimon-name {
    font-size: 2rem;
  }
}
</style>
