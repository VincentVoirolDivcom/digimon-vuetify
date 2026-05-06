import { defineStore } from 'pinia'
import api from "@/plugins/axios";

const PAGE_SIZE = 20

export const useDigimonStore = defineStore('digimon', {
  state: () => ({
    digimons: [],
    levels: [],
    totalPages: 1,
    isLoading: false,
    error: null,
  }),
  getters: {
    totalDigimons: (state) => state.digimons.length,
    getDigimonById: (state) => {
      return (digimonId) => {
        return state.digimons.find(d => d.id === digimonId)
      }
    },
  },
  actions: {
    /**
     * Charge les 20 premiers Digimons
     * @returns {Promise<void>}
     */
    async fetchDigimons() {
      this.isLoading = true

      try {
        const response = await api.get(`/digimon?pageSize=${PAGE_SIZE}`)
        const datas = await response.data

        // Assignation du niveau pour chaque digimon présent dans la liste
        for (const digimon of datas.content) {
          const digimonLevel = await this.fetchDigimonById(digimon.id)
          digimon.level = digimonLevel
        }

        this.digimons = datas.content
      } catch (error) {
        console.error('Erreur lors du chargement des Digimons :', error)
        this.error = 'Impossible de charger les Digimons'
        this.digimons = []
      } finally {
        this.isLoading = false
      }
    },
    /**
     * Charge tous les niveaux en prenant en compte la pagination de l'API.
     * @returns {Promise<void>}
     */
    async fetchLevels() {
      this.isLoading = true
      try {
        const response = await api.get(`/level`)
        const datas = await response.data

        // Reprendre les données de pagination pour calculer le nombre total de pages à parcourir
        const totalElements = datas.pageable.totalElements
        const elementsOnCurrentPage = datas.pageable.elementsOnPage

        // Calculer le nombre d'itérations pour avoir la totalité des données des niveaux des Digimons
        const nbPages = Math.ceil(totalElements / elementsOnCurrentPage)

        let allLevels = datas.content.fields

        // Itérer sur toutes les pages des niveaux pour avoir toutes les données
        for (let page = 1; page < nbPages; page++) {
          const nextRes  = await api.get(`/level?page=${page}`)
          const nextData = await nextRes.data
          allLevels = allLevels.concat(nextData.content.fields)
        }

        this.levels = allLevels
      } catch (error) {
        console.error('Erreur lors du chargement des niveaux :', error)
        this.levels = []
      } finally {
        this.isLoading = false
      }
    },
    /**
     * @param levelId
     * @returns {Promise<void>}
     */
    async fetchDigimonById(digimonId) {
      this.isLoading = true
      try {
        const response = await api.get(`/digimon/${digimonId}`)
        const levels = response.data.levels
        const data = levels[0] ? levels[0].level : 'Unknown'

        return data
      } catch (error) {
        console.error('Erreur lors du chargement du Digimon :', error)
        this.error = 'Impossible de charger le Digimon'
      } finally {
        this.isLoading = false
      }
    },
    /**
     *
     * @returns {Promise<void>}
     */
    async init() {
      console.log('Initialisation du store Digimon...')

      this.isLoading = true
      this.error = null

      try {
        // Promise.all exécute les deux requêtes en parallèle
        // Plus rapide que de les faire l'une après l'autre
        await Promise.all([
          this.fetchDigimons(),
          this.fetchLevels(),
        ])

        // console.log('Store Digimon initialisé')
      } catch (error) {
        this.error = 'Erreur lors du chargement des données'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
