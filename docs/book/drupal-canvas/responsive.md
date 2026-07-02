# Étape 8.1 — Responsive design

## Principes du responsive dans Canvas

Canvas offre des outils intégrés pour tester et ajuster votre site sur différentes tailles d'écran. Votre travail de responsive se passe à deux niveaux :

1. **Dans l'éditeur Canvas** : tester les breakpoints visuellement
2. **Dans le CSS des composants SDC** : ajuster les styles avec des media queries

## Tester dans l'éditeur Canvas

La barre d'outils de Canvas propose un sélecteur de viewport :

```
Barre d'outils → [🖥️ Desktop] [📱 Tablette] [📱 Mobile]
```

| Mode     | Largeur simulée | Correspond à                    |
|----------|-----------------|---------------------------------|
| Desktop  | 1200px+         | Ordinateurs                     |
| Tablette | 768px–1024px    | Tablettes (iPad, etc.)          |
| Mobile   | < 640px         | Téléphones                      |

::: tip
Testez chaque page dans les 3 modes **avant de la publier**. Un composant qui paraît parfait sur desktop peut être cassé sur mobile.
:::

## Points critiques à vérifier

### Le Hero

Sur mobile, vérifiez que :
- [ ] Le titre reste lisible (taille de police suffisante)
- [ ] L'image de fond se recadre correctement (`background-position: center`)
- [ ] Le bouton CTA n'est pas rogné

Si le titre est trop grand sur mobile, le CSS `clamp()` que nous avons utilisé s'en charge automatiquement :

```css
/* Bonne pratique : clamp() pour une taille fluide */
.hero__title {
  font-size: clamp(1.75rem, 5vw, 3.5rem);
  /* min: 1.75rem | fluide | max: 3.5rem */
}
```

### Le Grid

Les grilles passent automatiquement en 1 colonne sur mobile grâce aux media queries dans `grid.css` :

```css
@media (max-width: 640px) {
  .grid--cols-2,
  .grid--cols-3,
  .grid--cols-4 {
    grid-template-columns: 1fr;
  }
}
```

### La Navigation

Le menu mobile est géré par le composant Navigation avec le bouton burger (étape 4.1). Vérifiez que :
- [ ] Le bouton burger est visible
- [ ] Le menu s'ouvre/ferme correctement
- [ ] Les liens sont facilement cliquables (hauteur minimum 44px)

### Le Footer

Sur mobile, les colonnes doivent s'empiler verticalement :

```css
@media (max-width: 768px) {
  .footer__columns {
    grid-template-columns: 1fr;
  }
}
```

## Ajouter des ajustements responsive à vos composants

Si un composant ne s'adapte pas correctement, ajoutez des règles dans son fichier CSS.

### Exemple : Card

```css
/* card.css */

/* Desktop : les Cards dans une Grid gèrent leur taille */
.card {
  /* styles de base */
}

/* Tablette : padding réduit */
@media (max-width: 1024px) {
  .card__body {
    padding: 1.25rem;
  }
}

/* Mobile : ajustements typographiques */
@media (max-width: 640px) {
  .card__title {
    font-size: 1.1rem;
  }

  .card__text {
    font-size: 0.9rem;
  }
}
```

## Breakpoints recommandés

Définissez vos breakpoints de manière cohérente dans tous vos composants :

| Nom       | Valeur     | Usage                           |
|-----------|------------|---------------------------------|
| `sm`      | 640px      | Mobile large / paysage          |
| `md`      | 768px      | Tablette portrait               |
| `lg`      | 1024px     | Tablette paysage / laptop       |
| `xl`      | 1280px     | Desktop                         |

```css
/* Variables CSS recommandées dans mon_theme/css/global.css */
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}
```

## Checklist responsive complète

Avant de passer en production, testez ces points sur chaque page :

**Desktop (1200px+)**
- [ ] Mise en page grille correcte
- [ ] Textes non tronqués
- [ ] Images correctement proportionnées

**Tablette (768px–1024px)**
- [ ] Grilles passent en 2 colonnes
- [ ] Navigation visible et fonctionnelle
- [ ] Formulaires correctement dimensionnés

**Mobile (< 640px)**
- [ ] Grilles en 1 colonne
- [ ] Menu burger fonctionnel
- [ ] Textes lisibles sans zoom
- [ ] Boutons tactiles (min 44x44px)
- [ ] Pas de défilement horizontal
- [ ] Images non déformées

::: tip Tester sur de vrais appareils
Les outils de simulation du navigateur donnent une bonne indication, mais rien ne remplace un test sur un **vrai téléphone**. Utilisez l'URL locale de DDEV (accessible en Wi-Fi depuis votre mobile avec `ddev describe`).
:::
