# Étape 3.1 — Anatomie d'un composant SDC

## Qu'est-ce qu'un SDC ?

Un **Single Directory Component (SDC)** est une norme introduite dans **Drupal 10.3** pour regrouper dans un seul dossier tous les fichiers d'un composant : sa définition, son template, ses styles et ses comportements JavaScript.

L'idée est simple : **un composant = un dossier**. Tout ce dont le composant a besoin est contenu dans ce dossier.

```
components/
└── hero/
    ├── hero.component.yml   ← La "carte d'identité" du composant
    ├── hero.twig            ← Le template HTML
    ├── hero.css             ← Les styles
    └── hero.js              ← Les comportements JS (optionnel)
```

## Le fichier `.component.yml` : la carte d'identité

C'est le fichier le plus important. Il décrit le composant, ses **props** (les données qu'il accepte) et ses **slots** (les zones de contenu libre).

### Structure complète

```yaml
# hero/hero.component.yml

name: Hero
description: "Bannière principale pleine largeur avec titre, sous-titre et CTA."
status: experimental

# Les props : données typées passées au composant
props:
  type: object
  properties:
    title:
      type: string
      title: Titre
      description: "Le titre principal affiché dans le Hero"
    subtitle:
      type: string
      title: Sous-titre
    cta_label:
      type: string
      title: Texte du bouton
    cta_url:
      type: string
      title: URL du bouton
    background_image:
      type: string
      title: Image de fond
      description: "URL de l'image de fond"
  required:
    - title
```

### Les types de props disponibles

| Type      | Usage                              | Exemple                     |
|-----------|------------------------------------|-----------------------------|
| `string`  | Texte simple                       | Titre, URL, classe CSS      |
| `boolean` | Vrai/Faux                          | `dark_mode: true`           |
| `integer` | Nombre entier                      | Nombre de colonnes          |
| `object`  | Objet complexe                     | Données d'une image         |
| `array`   | Liste d'éléments                   | Liste de liens de navigation |

### Les slots

Les **slots** sont des zones de contenu libre dans lesquelles vous pouvez injecter du HTML ou d'autres composants. Ils se déclarent dans le `.component.yml` :

```yaml
slots:
  content:
    title: Contenu
    description: "Zone de contenu libre au centre du Hero"
```

Et dans le Twig, vous les affichez avec :

```twig
{{ slots.content }}
```

## Le fichier `.twig` : le template HTML

Le template Twig reçoit les props déclarées dans le `.component.yml` comme variables.

```twig
{# hero/hero.twig #}

{% set classes = [
  'hero',
  background_image ? 'hero--with-image' : 'hero--no-image',
] %}

<div {{ attributes.addClass(classes) }}
     {% if background_image %}style="background-image: url('{{ background_image }}')"{% endif %}>
  <div class="hero__inner">
    <h1 class="hero__title">{{ title }}</h1>
    {% if subtitle %}
      <p class="hero__subtitle">{{ subtitle }}</p>
    {% endif %}
    {% if cta_url and cta_label %}
      <a href="{{ cta_url }}" class="hero__cta">{{ cta_label }}</a>
    {% endif %}
  </div>
</div>
```

### L'objet `attributes`

L'objet `attributes` est automatiquement mis à disposition dans tout template SDC par Drupal. Il transporte :
- Les classes CSS ajoutées par Drupal ou Canvas
- Les attributs `id`, `data-*`, etc.

Utilisez toujours `attributes.addClass()` plutôt que d'écrire les classes à la main, afin de ne pas perdre les attributs injectés par Drupal.

## Le fichier `.css` : les styles

```css
/* hero/hero.css */

.hero {
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.hero--with-image {
  background-size: cover;
  background-position: center;
}

.hero__inner {
  position: relative;
  z-index: 1;
  max-width: 800px;
  padding: 2rem;
}

.hero__title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero__subtitle {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.hero__cta {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #0053a5;
  color: white;
  border-radius: 4px;
  text-decoration: none;
}
```

## Le fichier `.js` : les comportements (optionnel)

Si votre composant a besoin de JavaScript, créez un fichier `.js` dans le dossier. Drupal l'associe automatiquement au composant.

```js
// hero/hero.js

(function (Drupal) {
  Drupal.behaviors.hero = {
    attach: function (context, settings) {
      const heroes = context.querySelectorAll('.hero');
      heroes.forEach(function (hero) {
        // Votre code JS ici
      });
    }
  };
})(Drupal);
```

::: info
Le JavaScript doit utiliser la syntaxe des **Drupal Behaviors** (`Drupal.behaviors`) pour être correctement exécuté, y compris lors des chargements AJAX.
:::

## Récapitulatif visuel

```
hero.component.yml
┌──────────────────────────────────┐
│ name: Hero                       │  ← Nom affiché dans Canvas
│ props:                           │  ← Variables disponibles dans Twig
│   title: string (requis)         │
│   subtitle: string               │
│   cta_label: string              │
│   cta_url: string                │
│   background_image: string       │
└──────────────────────────────────┘
         ↓ injecté dans
hero.twig
┌──────────────────────────────────┐
│ <div class="hero">               │
│   <h1>{{ title }}</h1>           │  ← Prop "title"
│   <p>{{ subtitle }}</p>          │  ← Prop "subtitle"
│   <a href="{{ cta_url }}">...</a>│  ← Props "cta_*"
│ </div>                           │
└──────────────────────────────────┘
         ↓ stylisé par
hero.css
┌──────────────────────────────────┐
│ .hero { ... }                    │
│ .hero__title { ... }             │
│ .hero__cta { ... }               │
└──────────────────────────────────┘
```

Dans les prochaines étapes, vous allez créer vos premiers composants SDC en partant de zéro.
