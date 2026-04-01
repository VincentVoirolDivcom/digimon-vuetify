import { defineStore } from 'pinia'

const BASE_URL = 'https://digi-api.com/api/v1'
const PAGE_SIZE = 20

export const useDigimonStore = defineStore('digimon', {
  state: () => ({
    digimons: [],
    levels: [],
    currentPage: 0,
    totalPages: 1,
    isLoading: false,
    error: null,
  }),
  getters: {},
  actions: {
    /**
     * Charge les Digimons par batch de 20 pour la pagination
     * @returns {Promise<void>}
     */
    async fetchDigimons() {
      this.isLoading = true
      try {
        const apiPage = this.currentPage
        const response = await fetch(`${BASE_URL}/digimon?page=${apiPage}&pageSize=${PAGE_SIZE}`)

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`)
        }

        const datas = await response.json()

        this.digimons = datas
        this.totalPages = datas.pageable.totalPages
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
        const response = await fetch(`${BASE_URL}/level`)

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`)
        }

        const datas = await response.json()
        const totalElements = datas.pageable.totalElements
        const elementsOnCurrentPage = datas.pageable.elementsOnPage
        // Calculer le nombre d'itérations pour avoir la totalité des données des niveaux des Digimons
        const nbPages = Math.ceil(totalElements / elementsOnCurrentPage)

        let allLevels = datas.content.fields

        for (let page = 1; page < nbPages; page++) {
          const nextRes  = await fetch(`${BASE_URL}/level?page=${page}`)
          const nextData = await nextRes.json()
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
