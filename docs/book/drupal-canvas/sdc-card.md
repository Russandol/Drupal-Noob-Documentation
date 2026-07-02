# Étape 3.3 — Créer un composant Carte (Card)

## Objectif

Créer un composant **Card** réutilisable : une carte affichant une image, un titre, un texte court et un lien. Ce composant sera utilisé dans des grilles pour présenter des services, des articles ou des membres d'équipe.

```
mon_theme/components/card/
├── card.component.yml
├── card.twig
└── card.css
```

## Étape 1 — `card.component.yml`

```yaml
name: Card
description: "Carte réutilisable avec image, titre, texte et lien."
status: experimental

props:
  type: object
  properties:
    title:
      type: string
      title: Titre
    text:
      type: string
      title: Texte descriptif
    image:
      type: string
      title: Image
      description: "URL de l'image"
    image_alt:
      type: string
      title: Texte alternatif de l'image
    link_label:
      type: string
      title: Texte du lien
    link_url:
      type: string
      title: URL du lien
    icon:
      type: string
      title: Icône (optionnel)
      description: "Classe CSS d'une icône ou emoji"
  required:
    - title
```

## Étape 2 — `card.twig`

```twig
<article {{ attributes.addClass('card') }}>

  {% if image %}
    <div class="card__image-wrapper">
      <img class="card__image"
           src="{{ image }}"
           alt="{{ image_alt | default(title) }}"
           loading="lazy">
    </div>
  {% elseif icon %}
    <div class="card__icon" aria-hidden="true">{{ icon }}</div>
  {% endif %}

  <div class="card__body">
    <h3 class="card__title">{{ title }}</h3>

    {% if text %}
      <p class="card__text">{{ text }}</p>
    {% endif %}

    {% if link_url and link_label %}
      <a href="{{ link_url }}" class="card__link">
        {{ link_label }}
        <span class="card__link-arrow" aria-hidden="true">→</span>
      </a>
    {% endif %}
  </div>

</article>
```

## Étape 3 — `card.css`

```css
.card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

/* Image */
.card__image-wrapper {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .card__image {
  transform: scale(1.05);
}

/* Icône */
.card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  padding: 1.5rem 1.5rem 0;
}

/* Corps */
.card__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.5rem;
}

.card__title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
  color: #1a1a2e;
}

.card__text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #555;
  margin: 0 0 1.25rem;
  flex: 1;
}

/* Lien */
.card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: #0053a5;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.9rem;
  margin-top: auto;
}

.card__link:hover {
  text-decoration: underline;
}

.card__link-arrow {
  transition: transform 0.2s ease;
}

.card__link:hover .card__link-arrow {
  transform: translateX(4px);
}
```

## Tester dans Canvas

```bash
drush cr
```

Le composant **Card** apparaît dans le panneau de gauche. Vous pouvez le placer directement sur une page ou dans un composant Grid (que vous créerez à l'étape suivante).

::: tip Utilisation avec icônes
Pour le champ **Icône**, vous pouvez utiliser un emoji directement (`🚀`, `🎨`, `⚡`), ou une classe CSS si vous intégrez une bibliothèque d'icônes comme Font Awesome.
:::

::: info Variantes
Pour créer des variantes de la Card (ex: Card horizontale, Card sombre), vous pouvez ajouter une prop `variant` de type string et utiliser les classes BEM modificateurs : `.card--horizontal`, `.card--dark`.
:::
