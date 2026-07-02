# Étape 8.3 — Accessibilité

## Pourquoi l'accessibilité est essentielle

Un site accessible est utilisable par **toutes les personnes**, y compris celles qui ont des déficiences visuelles, motrices, auditives ou cognitives. En France, la loi impose aux organismes publics de respecter le **RGAA** (Référentiel Général d'Amélioration de l'Accessibilité), et les bonnes pratiques d'accessibilité bénéficient à tous les utilisateurs.

## Textes alternatifs pour les images

### Dans vos composants SDC

Chaque image doit avoir un attribut `alt` descriptif :

```twig
{# Bonne pratique : alt depuis une prop #}
<img src="{{ image }}"
     alt="{{ image_alt | default('') }}"
     loading="lazy">
```

### Règles pour le texte alt

| Type d'image           | Règle                                    | Exemple                          |
|------------------------|------------------------------------------|----------------------------------|
| Image informative      | Description courte et précise            | `"Équipe en réunion dans les bureaux de Paris"` |
| Image décorative       | `alt=""` (vide, pas absent)              | Séparateurs, fonds décoratifs    |
| Image de lien          | Décrire la destination du lien           | `"Retour à l'accueil"`           |
| Logo                   | Nom + contexte si lien                   | `"Mon Site – Retour à l'accueil"`|

::: warning
Un attribut `alt` absent est différent d'un `alt=""`. Un `alt` absent force les lecteurs d'écran à lire le nom du fichier image. Toujours préciser `alt`, même vide pour les images décoratives.
:::

## Contrastes des couleurs

### Ratios minimum requis (WCAG AA)

| Élément              | Ratio minimum |
|----------------------|---------------|
| Texte normal (< 18px)| 4.5:1         |
| Grand texte (≥ 18px) | 3:1           |
| Composants d'UI      | 3:1           |

### Vérifier vos couleurs

Testez les contrastes de vos composants :

| Outil                   | URL                          |
|-------------------------|------------------------------|
| **WebAIM Contrast Checker** | webaim.org/resources/contrastchecker |
| **Colour Contrast Analyser** | Application desktop gratuite |
| **DevTools Chrome**     | DevTools → Accessibilité → Couleurs |

### Contrastes dans nos composants

```css
/* hero.css — texte blanc sur fond sombre */
/* Fond : rgba(0,0,0,0.4) sur image sombre */
/* Blanc #ffffff sur noir : 21:1 ✅ */

/* card.css */
/* Texte principal #1a1a2e sur blanc #ffffff : 15.8:1 ✅ */
/* Texte secondaire #555555 sur blanc : 7.5:1 ✅ */
/* Lien #0053a5 sur blanc : 5.9:1 ✅ */
```

## Navigation au clavier

### Principes

Tous les éléments interactifs doivent être accessibles via la **touche Tab** :

```
Tab → passer à l'élément suivant
Shift+Tab → revenir à l'élément précédent
Entrée/Espace → activer un élément
Echap → fermer un modal/menu
```

### Focus visible

Ne supprimez jamais le style focus sans le remplacer :

```css
/* ❌ À éviter */
* { outline: none; }
a:focus { outline: none; }

/* ✅ À faire : style focus personnalisé */
:focus-visible {
  outline: 3px solid #0053a5;
  outline-offset: 3px;
  border-radius: 3px;
}
```

### Menu de navigation

Dans notre composant Navigation, le menu mobile gère correctement `aria-expanded` :

```js
burger.setAttribute('aria-expanded', !isOpen);
```

Vérifiez que :
- [ ] Le bouton burger est focusable au clavier
- [ ] L'état `aria-expanded` change correctement
- [ ] Le menu peut être fermé avec `Échap`

Pour ajouter la fermeture au clavier :

```js
// Ajouter dans navigation.js
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && menu.classList.contains('is-open')) {
    burger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    burger.focus();
  }
});
```

## Structure sémantique HTML

### Hiérarchie des titres

Chaque page doit avoir **un seul `<h1>`** (le titre principal), suivi de `<h2>`, `<h3>` dans l'ordre logique.

```
h1 : Titre de la page
  h2 : Section "Nos Services"
    h3 : Service 1
    h3 : Service 2
  h2 : Section "À propos"
  h2 : Section "Contact"
```

### Landmarks ARIA

Utilisez les balises HTML sémantiques dans vos templates :

```twig
<header role="banner">   {# Navigation principale #}
<nav aria-label="...">   {# Menus de navigation #}
<main>                   {# Contenu principal #}
<aside>                  {# Sidebar #}
<footer>                 {# Pied de page #}
```

## Tester l'accessibilité

### Outils automatiques

| Outil          | Comment l'utiliser                                |
|----------------|---------------------------------------------------|
| **WAVE**       | Extension navigateur, analyse la page courante    |
| **axe DevTools** | Extension Chrome/Firefox, rapport détaillé      |
| **Lighthouse** | DevTools → Accessibility → Score                  |

::: info
Les outils automatiques détectent environ **30 à 40%** des problèmes d'accessibilité. Le reste nécessite un audit manuel avec un vrai lecteur d'écran (NVDA sur Windows, VoiceOver sur macOS/iOS).
:::

### Test rapide avec le clavier

1. Rechargez la page
2. Utilisez uniquement la touche **Tab** pour naviguer
3. Vérifiez que vous pouvez atteindre tous les liens et boutons
4. Vérifiez que l'indicateur de focus est toujours visible

## Checklist accessibilité

**Images**
- [ ] Toutes les images ont un attribut `alt`
- [ ] Les images décoratives ont `alt=""`
- [ ] Les logos/images de liens ont un alt descriptif

**Contrastes**
- [ ] Textes normaux : ratio ≥ 4.5:1
- [ ] Grands textes : ratio ≥ 3:1
- [ ] Composants d'UI (boutons, champs) : ≥ 3:1

**Navigation clavier**
- [ ] Tous les éléments interactifs accessibles au Tab
- [ ] Focus visible sur tous les éléments
- [ ] Menu mobile utilisable au clavier

**Structure**
- [ ] Un seul `<h1>` par page
- [ ] Hiérarchie de titres cohérente
- [ ] Landmarks HTML sémantiques utilisés

**Score Lighthouse**
- [ ] Accessibilité ≥ 90
