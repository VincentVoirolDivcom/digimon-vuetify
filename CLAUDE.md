# Pokédex Vuetify — Exercice fil rouge C141

Exercice progressif pour le cours **C141** (ESIG) : les élèves construisent un Pokédex avec Vue.js 3 + Vuetify 3 + Pinia + Axios.

## Dépôts liés

| Dépôt | Rôle | URL |
|-------|------|-----|
| **Ce dépôt** | Exercice Pokédex (squelette + solution) | https://github.com/fallinov/esig-141-pokedex-vuetify |
| **API Pokédex** | Serveur Express local (CRUD + auth) | https://github.com/fallinov/2025-sfa-pokedex-api |
| **devjs.ch** | Documentation + étapes du Pokédex | https://github.com/fallinov/2025-sfa-devjs |
| **Spéc projet** | Consignes projet individuel | https://fallinov.github.io/esig-sfa-141-projet/ |
| **Ancien Pokédex** | Version précédente (stores pré-construits) | `~/WebstormProjects/2024-SFA-TTI-JS-Vue-Vuetify-Pokedex` |

## Branches

- `main` = **squelette de départ** (ce que l'élève reçoit)
- `solution` = **version finale complète** (référence prof + correction)

## Stack technique

| Technologie | Version | Rôle |
|-------------|---------|------|
| Vue.js 3 | ^3.4.31 | Framework (Composition API, `<script setup>`) |
| Vuetify 3 | ^3.6.11 | UI Material Design |
| Pinia | ^2.1.7 | State management (Options API) |
| Vue Router 4 | ^4.4.0 | Routing (file-based via unplugin-vue-router) |
| Axios | ^1.8.2 | Client HTTP |
| @mdi/font | 7.4.47 | Icônes Material Design |
| @fontsource/roboto | ^5.2.10 | Police self-hosted (pas de CDN) |

## Plugins Vite

- `unplugin-vue-router` — file-based routing depuis `src/pages/`
- `unplugin-vue-components` — auto-import des composants
- `unplugin-auto-import` — auto-import de `ref`, `computed`, `onMounted`, etc.
- `unplugin-fonts` — polices via @fontsource (self-hosted)
- `vite-plugin-vuetify` — auto-import composants Vuetify + SASS

## API Pokédex

- **URL** : `http://localhost:3535`
- **Démarrer** : `cd ~/WebstormProjects/2025-sfa-pokedex-api && npm run dev`
- **Endpoints** : GET/POST/PUT/DELETE `/pokemons`, GET `/types`, POST `/login`
- **Auth** : JWT (sacha@pokemon.com / pika)
- **Données** : 12 Pokémon, 14 types, stockés en JSON

### Modèle de données

```json
// Pokemon
{
  "id": "uuid",
  "name": "Pikachu",
  "types": [1],
  "level": 35,
  "img": "pikachu.png",
  "description": "...",
  "stats": { "hp": 35, "attack": 55, "defense": 40, "speed": 90 }
}

// Type
{ "id": 1, "name": "Électrique", "color": "#FFD700" }
```

## Commandes

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement (port 3000) |
| `npm run build` | Build de production |
| `npm run preview` | Prévisualiser le build |
| `npm run lint` | Linter ESLint |

## Plan de construction (séquences)

La version finale est construite feature par feature, dans l'ordre des séquences du plan de cours :

| Séquence | Thème | Fichiers principaux |
|----------|-------|---------------------|
| 1 | Setup + Composants + Routes | PokemonCard, AppHeader, AppFooter, pages |
| 2 | Navigation + Routes dynamiques | v-navigation-drawer, pokemon/[id] |
| 3 | Pinia | pokemonStore.js (from scratch) |
| 4 | Axios + .env + mock | plugins/axios.js, .env, mock.json |
| 5 | Recherche, filtre, tri | computed chaînés dans index.vue |
| 6 | Favoris + persistance | toggleFavorite, localStorage, page favoris |
| 7 | Formulaires + POST | ajouter.vue, v-form, rules |
| 8 | Auth + guards + delete | authStore.js, login.vue, beforeEach |
| 9 | UX, responsive, polish | thème, skeleton loader, snackbar |

## Plan détaillé

Voir `~/.claude/plans/hashed-twirling-stallman.md` pour le plan d'implémentation complet.

## Todo global

Voir `~/WebstormProjects/devjs/tasks/todo.md` pour la liste complète des tâches (Pokédex + documentation + plan de cours).

## Conventions

- **Code en anglais** (variables, fonctions, composants)
- **Commits en français**
- **Pas de CDN externe** — tout self-hosted (@fontsource, @mdi/font)
- **Composition API** avec `<script setup>` dans les composants
- **Options API** pour les stores Pinia (cohérent avec la doc devjs.ch)
- **File-based routing** : créer un fichier dans `src/pages/` = créer une route
- Auto-import activé : pas besoin d'importer `ref`, `computed`, `onMounted`, etc.

## Squelette (branche main)

Le squelette contient uniquement l'infrastructure :
- Configuration Vite + plugins
- Vuetify configuré (thème basique)
- Pinia initialisé (instance vide, pas de store)
- File-based routing configuré
- AppHeader basique (titre + 1 lien)
- Page index vide + page 404
- Images Pokémon dans public/images/
- ESLint configuré

**L'élève construit tout le reste** : stores, composants, pages, Axios, .env, etc.
