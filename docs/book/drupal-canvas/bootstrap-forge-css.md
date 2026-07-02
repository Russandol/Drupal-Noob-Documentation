# Étape 2.6 — CSS avec Bootstrap Forge et Webpack

## Bonne nouvelle : pas de contournement nécessaire

Contrairement à Mercury (Tailwind), **Bootstrap Forge n'a pas de problème de compatibilité avec les composants SDC Canvas**. Vous pouvez créer des composants SDC en utilisant des classes Bootstrap directement dans vos templates Twig, sans manipulation supplémentaire.

## Pipeline CSS : Webpack + SASS

Bootstrap Forge génère un sous-thème avec un pipeline **Webpack + SASS** déjà configuré. Contrairement à Mercury qui utilise Vite, le compilateur ici est **Webpack**.

### Lancer la compilation en mode développement

Depuis la racine du projet DDEV :

```bash
ddev exec "cd web/themes/custom/mon_site_bootstrap && npm run build:dev"
```

::: tip
Cette commande fonctionne depuis n'importe où dans le projet — pas besoin de naviguer dans le dossier du thème.
:::

### Compiler pour la production

```bash
ddev exec "cd web/themes/custom/mon_site_bootstrap && npm run build"
```

### Mode watch (recompilation automatique)

```bash
ddev exec "cd web/themes/custom/mon_site_bootstrap && npm run watch"
```

Les fichiers compilés sont générés dans `dist/` et automatiquement chargés par Drupal via les bibliothèques déclarées dans `.libraries.yml`.

## Résoudre les avertissements SASS

Si vous voyez un grand nombre d'avertissements après `npm run build:dev`, installez une version spécifique de SASS :

```bash
ddev exec "cd web/themes/custom/mon_site_bootstrap && npm install sass@1.77.6 --save-dev"
```

## Personnaliser Bootstrap via SASS

Le principal avantage de Bootstrap Forge est la personnalisation via les **variables SASS Bootstrap** — bien plus puissante qu'une simple surcharge CSS.

### Le fichier `src/scss/main.scss`

C'est le point d'entrée SASS. La bonne pratique est de déclarer vos variables **avant** l'import de Bootstrap :

```scss
// src/scss/main.scss

// ─── 1. Surcharger les variables Bootstrap ───────────────────────────────────
$primary:               #0053a5;
$secondary:             #6c757d;
$success:               #198754;
$font-family-sans-serif: 'Inter', system-ui, -apple-system, sans-serif;
$border-radius:         0.375rem;
$border-radius-lg:      0.5rem;

// Cards
$card-border-width:     0;
$card-box-shadow:       0 2px 8px rgba(0, 0, 0, 0.08);

// Navbar
$navbar-padding-y:      1rem;

// ─── 2. Importer Bootstrap ──────────────────────────────────────────────────
@import "bootstrap/scss/bootstrap";

// ─── 3. Styles custom de votre thème ────────────────────────────────────────

// Personnalisations au-delà des variables Bootstrap
.card {
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
  }
}
```

Recompilez après chaque modification :

```bash
ddev exec "cd web/themes/custom/mon_site_bootstrap && npm run build:dev"
ddev drush cr
```

## Créer des composants SDC avec Bootstrap

Pour les composants SDC personnalisés (en plus de ceux fournis par Canvas Bootstrap), utilisez les classes Bootstrap dans les templates Twig.

### Exemple — Composant Hero

```twig
{# components/hero/hero.twig #}
<section {{ attributes.addClass('hero', 'py-5', 'text-white', 'text-center') }}
  {% if background_image %}
    style="background: url('{{ background_image }}') center/cover no-repeat; position: relative;"
  {% else %}
    style="background-color: var(--bs-primary);"
  {% endif %}
>
  <div class="container py-5">
    <h1 class="display-4 fw-bold mb-3">{{ title }}</h1>
    {% if subtitle %}
      <p class="lead mb-4">{{ subtitle }}</p>
    {% endif %}
    {% if cta_url and cta_label %}
      <a href="{{ cta_url }}" class="btn btn-light btn-lg px-5">
        {{ cta_label }}
      </a>
    {% endif %}
  </div>
</section>
```

### Exemple — Composant Card

```twig
{# components/card/card.twig #}
<div {{ attributes.addClass('card', 'h-100') }}>
  {% if image %}
    <img src="{{ image }}" class="card-img-top" alt="{{ image_alt | default(title) }}" loading="lazy">
  {% endif %}
  <div class="card-body d-flex flex-column">
    <h3 class="card-title h5">{{ title }}</h3>
    {% if text %}
      <p class="card-text text-muted flex-grow-1">{{ text }}</p>
    {% endif %}
    {% if link_url and link_label %}
      <a href="{{ link_url }}" class="btn btn-outline-primary mt-auto">
        {{ link_label }}
      </a>
    {% endif %}
  </div>
</div>
```

### Exemple — Composant Grid

```twig
{# components/grid/grid.twig #}
<section {{ attributes.addClass('py-5') }}>
  <div class="container">
    {% if section_title %}
      <div class="{{ centered ? 'text-center' : '' }} mb-4">
        <h2>{{ section_title }}</h2>
        {% if section_subtitle %}
          <p class="lead text-muted">{{ section_subtitle }}</p>
        {% endif %}
      </div>
    {% endif %}

    <div class="row row-cols-1 row-cols-md-{{ columns | default(3) }} g-4">
      {{ slots.items }}
    </div>
  </div>
</section>
```

::: info `row-cols-md-3`
Bootstrap 5 propose les classes `row-cols-*` pour définir le nombre de colonnes. `row-cols-md-3` = 3 colonnes à partir du breakpoint `md` (≥ 768px), 1 colonne en dessous. Le responsive est géré nativement par Bootstrap.
:::

## Pas de fichier `.css` nécessaire pour les composants Bootstrap

Avec Bootstrap, vos composants SDC n'ont généralement **pas besoin de fichier `.css`** : les styles viennent des classes Bootstrap et des variables SASS globales. Le `hero.component.yml` n'a donc pas de `libraryOverrides` :

```yaml
name: Hero
status: experimental
props:
  type: object
  properties:
    title:
      type: string
      title: Titre
    # ... autres props
```

## Récapitulatif des commandes

| Action                    | Commande                                                                        |
|---------------------------|---------------------------------------------------------------------------------|
| Installer les dépendances | `ddev npm install --prefix web/themes/custom/mon_site_bootstrap`                |
| Compiler (dev)            | `ddev exec "cd web/themes/custom/mon_site_bootstrap && npm run build:dev"`      |
| Compiler (production)     | `ddev exec "cd web/themes/custom/mon_site_bootstrap && npm run build"`          |
| Watcher                   | `ddev exec "cd web/themes/custom/mon_site_bootstrap && npm run watch"`          |
| Fix avertissements SASS   | `ddev exec "cd web/themes/custom/mon_site_bootstrap && npm install sass@1.77.6 --save-dev"` |

## Comparatif Mercury vs Bootstrap Forge

| Aspect                    | Mercury (Tailwind)                   | Bootstrap Forge                          |
|---------------------------|--------------------------------------|------------------------------------------|
| **CSS des composants SDC**| Fichier `.css` avec BEM              | Classes Bootstrap dans les Twig          |
| **Compilateur**           | Vite                                 | Webpack                                  |
| **Personnalisation**      | Variables CSS / Tailwind config      | Variables SASS Bootstrap                 |
| **Incompatibilité SDC**   | Oui, contournement requis            | Non, intégration native                  |
| **Responsive**            | Classes Tailwind (`md:`, `lg:`…)    | Classes Bootstrap (`col-md-*`, etc.)     |
| **Composants fournis**    | Aucun — à créer de zéro             | Via Canvas Bootstrap                     |
