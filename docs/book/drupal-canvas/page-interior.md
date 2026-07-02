# Étape 5.2 — Gabarit de page intérieure

## Objectif

Créer un gabarit réutilisable pour les **pages intérieures** (Services, À propos, Équipe…) : une mise en page cohérente avec un en-tête de page, une zone de contenu principal et une sidebar optionnelle.

## Structure cible

```
PAGE INTÉRIEURE
│
├── Section — En-tête de page
│     Titre de la page + fil d'Ariane
│
├── Section — Contenu principal
│     ├── Zone principale (article, texte…)
│     └── Sidebar (navigation secondaire, bloc…) — optionnel
│
└── Section — CTA de bas de page (optionnel)
```

## Créer le composant Page Header

Pour l'en-tête de page intérieure, créez un composant SDC `page-header` :

```
mon_theme/components/page-header/
├── page-header.component.yml
├── page-header.twig
└── page-header.css
```

### `page-header.component.yml`

```yaml
name: Page Header
description: "En-tête de page intérieure avec titre et fil d'Ariane."
status: experimental

props:
  type: object
  properties:
    title:
      type: string
      title: Titre de la page
    subtitle:
      type: string
      title: Sous-titre (optionnel)
    background_color:
      type: string
      title: Couleur de fond
      default: '#f8f9fa'
  required:
    - title

slots:
  breadcrumb:
    title: Fil d'Ariane
    description: "Bloc Breadcrumb de Drupal"
```

### `page-header.twig`

```twig
<div {{ attributes.addClass('page-header') }}
     style="background-color: {{ background_color | default('#f8f9fa') }};">
  <div class="page-header__container">

    {% if slots.breadcrumb %}
      <div class="page-header__breadcrumb">{{ slots.breadcrumb }}</div>
    {% endif %}

    <h1 class="page-header__title">{{ title }}</h1>

    {% if subtitle %}
      <p class="page-header__subtitle">{{ subtitle }}</p>
    {% endif %}

  </div>
</div>
```

### `page-header.css`

```css
.page-header {
  padding: 2.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.page-header__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-header__breadcrumb {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
}

.page-header__breadcrumb a {
  color: #0053a5;
  text-decoration: none;
}

.page-header__breadcrumb a:hover {
  text-decoration: underline;
}

.page-header__title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  color: #1a1a2e;
  margin: 0 0 0.5rem;
}

.page-header__subtitle {
  font-size: 1.1rem;
  color: #555;
  margin: 0;
}
```

## Assembler le gabarit dans Canvas

### Créer une nouvelle Canvas Page

```
Administration → Contenu → Pages → Ajouter une page
```

Titre : `Services` (par exemple)

### Section 1 — En-tête de page

1. Ajoutez une section
2. Placez le composant **Page Header**
3. Configurez :
   - **Titre** : `Nos Services`
   - **Sous-titre** : `Des solutions adaptées à vos besoins`
4. Dans le slot **Fil d'Ariane**, ajoutez le bloc **Breadcrumb** de Drupal

::: info Activer le breadcrumb
Le bloc Breadcrumb de Drupal doit être activé :
`Administration → Structure → Blocs → Breadcrumb → Assigner`

Ou glissez-le directement depuis le panneau Blocs dans l'éditeur Canvas.
:::

### Section 2 — Contenu principal avec sidebar

Créez une section avec un **Grid 2 colonnes** (ratio 2/3 - 1/3) :

**Colonne principale (gauche, 2/3) :**
- Texte riche (contenu de la page)
- Ou un composant dédié

**Sidebar (droite, 1/3) :**
- Bloc de navigation secondaire
- Bloc "Contact rapide"
- Ou n'importe quel autre bloc Canvas

::: tip Grid asymétrique
Pour créer un ratio 2/3 - 1/3, vous pouvez surcharger le CSS du composant Grid avec une classe personnalisée, ou créer un composant `content-with-sidebar` dédié.

```css
.grid--layout-main-sidebar {
  grid-template-columns: 2fr 1fr;
}
```
:::

### Sans sidebar

Si la page n'a pas besoin de sidebar, utilisez simplement un composant **texte riche** ou un composant dédié dans une section à largeur maximale :

```
Section (max-width: 800px, centré)
  └── Composant Texte riche
```

## Réutiliser ce gabarit

Pour ne pas reconfigurer ce gabarit à chaque nouvelle page, utilisez les **Pattern Components** (Module 6). Vous pourrez sauvegarder cet assemblage (Page Header + Grid contenu/sidebar) comme Pattern réutilisable.

## Résultat attendu

```
┌─────────────────────────────────────────────────────┐
│  Accueil > Services                                 │
│  NOS SERVICES                                       │
│  Des solutions adaptées à vos besoins               │
├────────────────────────────┬────────────────────────┤
│                            │                        │
│  Contenu principal         │  Sidebar               │
│  Lorem ipsum dolor sit…    │  Navigation            │
│                            │  secondaire            │
│  Plus de contenu…          │                        │
│                            │  [Nous contacter]      │
└────────────────────────────┴────────────────────────┘
```
