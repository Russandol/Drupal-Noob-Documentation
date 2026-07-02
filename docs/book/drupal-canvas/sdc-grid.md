# Étape 3.4 — Créer un composant Grille (Grid)

## Objectif

Créer un composant **Grid** (grille) qui sert de **conteneur** pour accueillir d'autres composants organisés en colonnes. Ce composant est essentiel pour construire des sections structurées comme "nos services en 3 colonnes" ou "notre équipe en 4 colonnes".

```
mon_theme/components/grid/
├── grid.component.yml
├── grid.twig
└── grid.css
```

## Le concept de composant conteneur

Contrairement à la Card ou au Hero, le Grid est un composant **structurel** : il ne contient pas de contenu lui-même, mais **organise d'autres composants** dans une mise en page en colonnes.

Dans Canvas, un composant Grid expose des **slots** : des zones dans lesquelles l'éditeur peut glisser d'autres composants (Cards, textes, images, etc.).

## Étape 1 — `grid.component.yml`

```yaml
name: Grid
description: "Conteneur en grille pour organiser des composants en colonnes."
status: experimental

props:
  type: object
  properties:
    columns:
      type: integer
      title: Nombre de colonnes
      description: "Nombre de colonnes sur desktop (1 à 6)"
      default: 3
      enum: [1, 2, 3, 4, 6]
    gap:
      type: string
      title: Espacement entre les colonnes
      default: 'medium'
      enum: ['small', 'medium', 'large']
    section_title:
      type: string
      title: Titre de la section (optionnel)
    section_subtitle:
      type: string
      title: Sous-titre de la section (optionnel)
    centered:
      type: boolean
      title: Centrer le contenu
      default: false

slots:
  items:
    title: Éléments de la grille
    description: "Glissez vos composants ici"
```

## Étape 2 — `grid.twig`

```twig
{% set columns_class = 'grid--cols-' ~ (columns | default(3)) %}
{% set gap_class = 'grid--gap-' ~ (gap | default('medium')) %}

<div {{ attributes.addClass('grid-section') }}>

  {% if section_title %}
    <div class="grid-section__header {{ centered ? 'grid-section__header--centered' : '' }}">
      <h2 class="grid-section__title">{{ section_title }}</h2>
      {% if section_subtitle %}
        <p class="grid-section__subtitle">{{ section_subtitle }}</p>
      {% endif %}
    </div>
  {% endif %}

  <div class="grid {{ columns_class }} {{ gap_class }}">
    {{ slots.items }}
  </div>

</div>
```

## Étape 3 — `grid.css`

```css
/* Conteneur de section */
.grid-section {
  padding: 4rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* En-tête optionnel de section */
.grid-section__header {
  margin-bottom: 3rem;
}

.grid-section__header--centered {
  text-align: center;
}

.grid-section__title {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 800;
  color: #1a1a2e;
  margin: 0 0 0.75rem;
}

.grid-section__subtitle {
  font-size: 1.1rem;
  color: #555;
  margin: 0;
  max-width: 600px;
}

.grid-section__header--centered .grid-section__subtitle {
  margin: 0 auto;
}

/* Grille */
.grid {
  display: grid;
  width: 100%;
}

/* Colonnes */
.grid--cols-1 { grid-template-columns: 1fr; }
.grid--cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid--cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid--cols-4 { grid-template-columns: repeat(4, 1fr); }
.grid--cols-6 { grid-template-columns: repeat(6, 1fr); }

/* Espacements */
.grid--gap-small  { gap: 1rem; }
.grid--gap-medium { gap: 1.5rem; }
.grid--gap-large  { gap: 2.5rem; }

/* Responsive : 2 colonnes sur tablette */
@media (max-width: 1024px) {
  .grid--cols-3,
  .grid--cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid--cols-6 {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Responsive : 1 colonne sur mobile */
@media (max-width: 640px) {
  .grid--cols-2,
  .grid--cols-3,
  .grid--cols-4,
  .grid--cols-6 {
    grid-template-columns: 1fr;
  }
}
```

## Utiliser Grid + Card dans Canvas

Voici comment assembler une section "Services" dans l'éditeur Canvas :

1. Glissez un composant **Grid** sur la page
2. Dans le panneau de droite, configurez :
   - **Titre de la section** : "Nos Services"
   - **Nombre de colonnes** : 3
3. Dans le slot **Éléments de la grille**, glissez 3 composants **Card**
4. Configurez chaque Card (icône, titre, texte)

```
Grid (3 colonnes, titre "Nos Services")
├── Card (icône 🎨, "Design", texte…)
├── Card (icône ⚡, "Performance", texte…)
└── Card (icône 🔒, "Sécurité", texte…)
```

Le résultat :

```
        NOS SERVICES
   ─────────────────────

  ┌─────────┐ ┌─────────┐ ┌─────────┐
  │   🎨    │ │   ⚡    │ │   🔒    │
  │ Design  │ │Perf.    │ │Sécurité │
  │ Texte…  │ │Texte…   │ │Texte…   │
  └─────────┘ └─────────┘ └─────────┘
```

```bash
drush cr
```

::: tip Composants imbriqués
Canvas gère nativement l'imbrication de composants via les slots. Vous pouvez imbriquer autant de niveaux que nécessaire : Grid → Card, ou Grid → Grid → Card.
:::
