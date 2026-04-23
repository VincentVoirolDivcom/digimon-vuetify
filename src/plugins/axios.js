// src/plugins/axios.js
import axios from 'axios'

// import.meta.env.VITE_API_URL → lit la variable VITE_API_URL depuis le fichier .env
// || 'http://localhost:3535' → valeur par défaut si la variable n'existe pas
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3535'

// axios.create() crée une instance Axios avec une configuration réutilisable
// baseURL → toutes les requêtes partiront de cette URL (ex : api.get('/pokemons')
//           enverra une requête à http://localhost:3535/pokemons)
// headers → en-têtes HTTP envoyés automatiquement avec chaque requête
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',  // On envoie du JSON
    'Accept-Language': 'fr',             // On demande les réponses en français
  },
})

// On exporte l'instance pour l'utiliser partout : import api from '@/plugins/axios'
export default api
