# Étape 4.1 — Créer le composant Navigation

## Objectif

Créer un composant **Navigation** comprenant le logo du site et le menu principal. Ce composant sera ensuite intégré dans le Header global (étape 4.2).

```
mon_theme/components/navigation/
├── navigation.component.yml
├── navigation.twig
├── navigation.css
└── navigation.js
```

## Étape 1 — `navigation.component.yml`

```yaml
name: Navigation
description: "Barre de navigation avec logo et menu principal."
status: experimental

props:
  type: object
  properties:
    logo_url:
      type: string
      title: URL du logo
      description: "Chemin vers l'image du logo"
    logo_alt:
      type: string
      title: Texte alternatif du logo
      default: "Retour à l'accueil"
    site_name:
      type: string
      title: Nom du site
      description: "Affiché si aucun logo n'est fourni"
    home_url:
      type: string
      title: URL de la page d'accueil
      default: '/'
    sticky:
      type: boolean
      title: Navigation collante (sticky)
      default: false

slots:
  menu:
    title: Menu principal
    description: "Bloc de menu Drupal"
```

::: info Menu Drupal dans un slot
Le menu principal sera injecté via un **bloc Drupal** dans le slot `menu`. Cela permet de gérer les liens directement depuis `Administration → Structure → Menus`, sans toucher au code.
:::

## Étape 2 — `navigation.twig`

```twig
{% set nav_classes = [
  'nav',
  sticky ? 'nav--sticky' : '',
] | filter(v => v) %}

<header {{ attributes.addClass(nav_classes) }}>
  <div class="nav__container">

    {# Logo ou nom du site #}
    <a href="{{ home_url | default('/') }}" class="nav__brand">
      {% if logo_url %}
        <img class="nav__logo"
             src="{{ logo_url }}"
             alt="{{ logo_alt | default('Retour à l\'accueil') }}">
      {% else %}
        <span class="nav__site-name">{{ site_name }}</span>
      {% endif %}
    </a>

    {# Bouton burger mobile #}
    <button class="nav__burger"
            aria-label="Ouvrir le menu"
            aria-expanded="false"
            aria-controls="nav-menu">
      <span class="nav__burger-line"></span>
      <span class="nav__burger-line"></span>
      <span class="nav__burger-line"></span>
    </button>

    {# Menu principal (injecté via slot) #}
    <nav id="nav-menu" class="nav__menu" aria-label="Navigation principale">
      {{ slots.menu }}
    </nav>

  </div>
</header>
```

## Étape 3 — `navigation.css`

```css
.nav {
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 100;
}

.nav--sticky {
  position: sticky;
  top: 0;
}

.nav__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

/* Logo / Brand */
.nav__brand {
  text-decoration: none;
  flex-shrink: 0;
}

.nav__logo {
  height: 40px;
  width: auto;
  display: block;
}

.nav__site-name {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1a1a2e;
}

/* Menu */
.nav__menu {
  display: flex;
  align-items: center;
}

/* Styles pour le bloc menu Drupal */
.nav__menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 0.25rem;
}

.nav__menu a {
  display: block;
  padding: 0.5rem 0.875rem;
  color: #1a1a2e;
  text-decoration: none;
  font-weight: 500;
  border-radius: 4px;
  transition: background 0.15s;
}

.nav__menu a:hover,
.nav__menu a.is-active {
  background: #f0f4f8;
  color: #0053a5;
}

/* Burger (mobile) */
.nav__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.nav__burger-line {
  display: block;
  width: 24px;
  height: 2px;
  background: #1a1a2e;
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}

/* Mobile */
@media (max-width: 768px) {
  .nav__burger {
    display: flex;
  }

  .nav__menu {
    display: none;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .nav__menu.is-open {
    display: block;
  }

  .nav__menu ul {
    flex-direction: column;
    gap: 0;
  }

  .nav__menu a {
    padding: 0.75rem 0;
  }

  /* Animation burger ouvert */
  .nav__burger[aria-expanded="true"] .nav__burger-line:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .nav__burger[aria-expanded="true"] .nav__burger-line:nth-child(2) {
    opacity: 0;
  }
  .nav__burger[aria-expanded="true"] .nav__burger-line:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
}
```

## Étape 4 — `navigation.js`

```js
(function (Drupal) {
  Drupal.behaviors.navigation = {
    attach: function (context) {
      const burger = context.querySelector('.nav__burger');
      const menu = context.querySelector('.nav__menu');

      if (!burger || !menu) return;

      burger.addEventListener('click', function () {
        const isOpen = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', !isOpen);
        menu.classList.toggle('is-open', !isOpen);
        burger.setAttribute('aria-label', isOpen ? 'Ouvrir le menu' : 'Fermer le menu');
      });
    }
  };
})(Drupal);
```

## Tester le composant

```bash
drush cr
```

Le composant **Navigation** apparaît dans la bibliothèque Canvas. Dans l'étape suivante, vous l'assemblerez dans le Header Global.

::: tip Menu responsive
Testez le menu en redimensionnant la fenêtre : en dessous de 768px, le bouton burger apparaît et le menu se masque. Cliquez sur le burger pour l'ouvrir/fermer.
:::
