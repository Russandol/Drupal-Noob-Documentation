# Étape 2.3 — Mise en place des outils CSS

## ⚠️ Problème connu : SDC incompatible avec Tailwind

::: danger Incompatibilité actuelle entre Canvas SDC et Mercury/Tailwind
Les **composants SDC (code components)** de Canvas sont actuellement **incompatibles avec les thèmes basés sur Tailwind CSS**, dont Mercury.

**Symptôme** : dès que vous créez un composant SDC dans votre thème et que Canvas l'utilise, **les styles Tailwind de Mercury disparaissent** de votre site.

Ce problème est connu et documenté par l'équipe Canvas. Un correctif est en cours. En attendant, vous devez appliquer le **contournement décrit ci-dessous**.
:::

---

## Contournement officiel : injecter le CSS dans l'éditeur Canvas

La solution recommandée par l'équipe Canvas consiste à copier le CSS compilé de votre thème **directement dans l'éditeur de CSS global de Canvas**. Ainsi, Canvas charge ce CSS indépendamment du système de bibliothèques Drupal.

### Étape 1 — Compiler le CSS de votre thème

Si ce n'est pas déjà fait, lancez la compilation Tailwind de votre thème :

```bash
cd web/themes/custom/mon_theme
npm run build
```

Cela génère les fichiers compilés, typiquement :
- `theme.css` — styles de base du thème
- `main.css` (ou `dist/css/main.css`) — styles Tailwind compilés

### Étape 2 — Ouvrir l'éditeur CSS global de Canvas

Dans l'éditeur Canvas (depuis n'importe quelle Canvas Page) :

```
Barre d'outils → ⚙️ Paramètres → Global CSS
```

Ou directement depuis :

```
Canvas → Global CSS
```

### Étape 3 — Coller le contenu des fichiers CSS

Dans l'éditeur, collez les contenus **dans cet ordre précis** :

**1. D'abord, le contenu de `theme.css`** (en entier, tel quel)

**2. Ensuite, le contenu de `main.css`** — mais en **supprimant les lignes `@import` au début** du fichier avant de coller.

```
┌──────────────────────────────────────────────┐
│  Global CSS (Canvas)                         │
├──────────────────────────────────────────────┤
│  /* === Contenu de theme.css === */           │
│  :root { ... }                               │
│  body { ... }                                │
│  ...                                         │
│                                              │
│  /* === Contenu de main.css (sans @import) === */  │
│  .hero { ... }                               │
│  .card { ... }                               │
│  ...                                         │
└──────────────────────────────────────────────┘
```

::: warning ⚠️ À répéter après chaque modification CSS
Cette étape doit être **répétée à chaque fois que vous modifiez et recompilez le CSS de votre thème**. C'est la contrepartie du contournement actuel.
:::

### Étape 4 — Sauvegarder le Global CSS

Cliquez sur **Sauvegarder** dans l'éditeur Canvas. Les styles de votre thème sont maintenant chargés par Canvas et ne seront plus écrasés par les composants SDC.

---

## Approches CSS pour vos composants SDC

Maintenant que le problème de compatibilité est contourné, voici comment styliser vos propres composants SDC.

### Option A — CSS classique avec BEM (recommandé)

Pour les composants SDC que vous créez (Hero, Card, Grid…), utilisez du **CSS classique** avec la convention BEM. Cela évite tout conflit avec Tailwind et fonctionne parfaitement dans le contexte actuel.

Chaque composant SDC charge son propre fichier CSS **uniquement quand il est utilisé** sur la page :

```
hero/
├── hero.component.yml
├── hero.twig
└── hero.css   ← chargé automatiquement par Drupal si le composant est présent
```

Exemple de `hero.css` avec BEM :

```css
.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
}

.hero__title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.hero__cta {
  display: inline-block;
  padding: 0.75rem 2rem;
  background-color: #0053a5;
  color: white;
  border-radius: 4px;
  text-decoration: none;
}
```

::: tip Convention BEM
- `.hero` → le bloc
- `.hero__title` → un élément du bloc
- `.hero--dark` → un modificateur (variante)

Cette convention maintient le CSS propre et sans conflit entre composants.
:::

### Option B — Classes Tailwind dans les Twig

Grâce au contournement (CSS Tailwind injecté dans le Global CSS de Canvas), vous pouvez également utiliser les classes Tailwind directement dans vos templates Twig :

```twig
{# hero/hero.twig — avec classes Tailwind #}
<section class="relative flex items-center justify-center min-h-[500px] bg-cover bg-center text-white text-center">
  <div class="max-w-3xl px-4">
    <h1 class="text-5xl font-bold mb-4">{{ title }}</h1>
    <p class="text-xl mb-8">{{ subtitle }}</p>
    {% if cta_url %}
      <a href="{{ cta_url }}" class="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded">
        {{ cta_label }}
      </a>
    {% endif %}
  </div>
</section>
```

::: warning ⚠️ Attention à la purge Tailwind
Pour que Tailwind conserve les classes utilisées dans vos Twig, assurez-vous que votre configuration Tailwind scanne bien les fichiers du dossier `components/` :

```js
// vite.config.js ou tailwind.config.js
content: [
  './templates/**/*.twig',
  './components/**/*.twig',
]
```
:::

---

## Récapitulatif

| Situation | Approche recommandée |
|-----------|----------------------|
| Styles globaux du thème (layout, typographie…) | Tailwind via Mercury + contournement Canvas Global CSS |
| Styles des composants SDC | CSS classique (BEM) **ou** classes Tailwind dans les Twig |
| Après chaque `npm run build` | Répéter le copier-coller dans Canvas Global CSS |

**Pour la suite de cette formation**, les exemples utilisent du **CSS classique avec BEM** dans les fichiers `.css` des composants SDC. C'est l'approche la plus simple et la plus robuste dans le contexte actuel.
