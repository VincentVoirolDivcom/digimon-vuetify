<template>
  <v-container>
    <v-btn
      variant="text"
      prepend-icon="mdi-arrow-left"
      class="mb-4"
      @click="$router.back()"
    >
      Return
    </v-btn>
    <v-card>
      <v-img
        :src="image"
        :alt="digimon.name"
        height="400"
        contain
      />
      <!--   Titre du Digimon   -->
      <v-card-title class="text-h4 text-center">
        {{ digimon.name }}
      </v-card-title>
      <!--  Description du Digimon   -->
      <v-card-text class="text-justify">
        <p v-if="description">
          {{ description }}
        </p>
      </v-card-text>
      <!--   Ligne du niveau, attribut et type   -->
      <v-row justify="center">
        <v-col
          v-if="level"
          cols="2"
          class="text-center"
        >
          <h5>Level</h5>
          <p class="text-body-1 mb-4">
            {{ level }}
          </p>
        </v-col>
        <v-col
          v-if="attribute"
          cols="2"
          class="text-center"
        >
          <h5>Attribute</h5>
          <p class="text-body-1 mb-4">
            {{ attribute }}
          </p>
        </v-col>
        <v-col
          v-if="type"
          cols="2"
          class="text-center"
        >
          <h5>Type</h5>
          <p class="text-body-1 mb-4">
            {{ type }}
          </p>
        </v-col>
      </v-row>
      <h5 class="text-center">
        Fields
      </h5>
      <!--   Ligne des terrains  -->
      <v-row
        v-if="fields"
        justify="center"
      >
        <v-col
          v-for="field in fields"
          :key="field.id"
          cols="2"
          class="text-center"
        >
          <img
            :src="field.image"
            :alt="field.field"
          >
          <p>
            {{ field.field }}
          </p>
        </v-col>
      </v-row>
    </v-card>
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

</style>
