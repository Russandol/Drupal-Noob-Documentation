# Étape 3.2 — Créer un composant Hero

## Objectif

Créer un composant **Hero** : une grande bannière affichée en haut de page avec un titre, un sous-titre, une image de fond et un bouton d'appel à l'action (CTA).

À la fin de cette étape, le composant Hero sera disponible dans l'éditeur Canvas et configurable directement depuis l'interface.

## Créer la structure du dossier

```bash
mkdir -p web/themes/custom/mon_theme/components/hero
```

```
mon_theme/components/hero/
├── hero.component.yml
├── hero.twig
└── hero.css
```

## Étape 1 — `hero.component.yml`

```yaml
name: Hero
description: "Bannière principale avec titre, sous-titre, image de fond et bouton CTA."
status: experimental

props:
  type: object
  properties:
    title:
      type: string
      title: Titre principal
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
      description: "URL de l'image affichée en arrière-plan"
    overlay_opacity:
      type: integer
      title: Opacité de l'overlay (0-100)
      default: 40
  required:
    - title
```

| Prop               | Type    | Obligatoire | Description                        |
|--------------------|---------|-------------|------------------------------------|
| `title`            | string  | Oui         | Titre principal                    |
| `subtitle`         | string  | Non         | Sous-titre                         |
| `cta_label`        | string  | Non         | Texte du bouton CTA                |
| `cta_url`          | string  | Non         | Lien du bouton CTA                 |
| `background_image` | string  | Non         | URL de l'image de fond             |
| `overlay_opacity`  | integer | Non         | Opacité du voile sombre (défaut 40)|

## Étape 2 — `hero.twig`

```twig
{% set overlay_opacity_decimal = (overlay_opacity | default(40)) / 100 %}

<section {{ attributes.addClass('hero') }}
  {% if background_image %}
    style="background-image: url('{{ background_image }}');"
  {% endif %}
>
  {% if background_image %}
    <div class="hero__overlay"
         style="background: rgba(0,0,0,{{ overlay_opacity_decimal }});"></div>
  {% endif %}

  <div class="hero__inner">
    <h1 class="hero__title">{{ title }}</h1>

    {% if subtitle %}
      <p class="hero__subtitle">{{ subtitle }}</p>
    {% endif %}

    {% if cta_url and cta_label %}
      <a href="{{ cta_url }}" class="hero__cta">{{ cta_label }}</a>
    {% endif %}
  </div>
</section>
```

## Étape 3 — `hero.css`

```css
.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  background-size: cover;
  background-position: center;
  background-color: #1a1a2e;
  text-align: center;
  color: white;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__inner {
  position: relative;
  z-index: 1;
  max-width: 900px;
  padding: 3rem 2rem;
  width: 100%;
}

.hero__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 1rem;
}

.hero__subtitle {
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  margin: 0 0 2rem;
  opacity: 0.9;
}

.hero__cta {
  display: inline-block;
  padding: 0.875rem 2.5rem;
  background-color: #0053a5;
  color: white;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.hero__cta:hover {
  background-color: #003d7a;
  transform: translateY(-2px);
}
```

## Étape 4 — Tester dans Canvas

```bash
drush cr
```

Ouvrez une **Canvas Page** dans l'éditeur. Dans le panneau de gauche, cherchez "Hero". Glissez-le dans la zone centrale — le panneau de droite affiche toutes vos props.

## Résultat attendu

```
┌─────────────────────────────────────────┐
│                                         │
│    [IMAGE DE FOND avec overlay sombre]  │
│                                         │
│         TITRE PRINCIPAL                 │
│         Sous-titre accrocheur           │
│                                         │
│         [  En savoir plus  ]            │
│                                         │
└─────────────────────────────────────────┘
```

::: warning ⚠️ URL des images
Utilisez le chemin vers un fichier uploadé dans Drupal : `/sites/default/files/mon-image.jpg`, ou une URL externe complète.
:::
