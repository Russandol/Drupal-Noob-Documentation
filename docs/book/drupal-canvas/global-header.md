# Étape 4.2 — Assembler le Header global dans Canvas

## Qu'est-ce qu'un Global Component ?

Un **Global Component** est une zone Canvas partagée sur **toutes les Canvas Pages** du site. Contrairement aux composants que vous placez sur une page spécifique, ce que vous configurez dans un Global Component apparaît partout.

Le **Header** est le Global Component le plus important : il contient votre navigation, votre logo, et éventuellement une barre de recherche.

## Accéder aux Global Components

Dans l'administration Drupal :

```
Canvas → Global Components → Header
```

Ou depuis n'importe quelle Canvas Page, cliquez sur la zone Header en haut de l'éditeur.

## Assembler le Header

### Étape 1 — Placer le composant Navigation

1. Ouvrez l'éditeur des **Global Components → Header**
2. Dans le **panneau de gauche**, recherchez "Navigation"
3. Glissez-le dans la zone Header

### Étape 2 — Configurer les props du composant Navigation

Dans le **panneau de droite**, renseignez :

| Prop           | Valeur exemple                          |
|----------------|-----------------------------------------|
| URL du logo    | `/themes/custom/mon_theme/logo.svg`     |
| Alt du logo    | `Mon site – Retour à l'accueil`         |
| Nom du site    | `Mon Site` (si pas de logo)             |
| Navigation sticky | Oui (recommandé)                    |

### Étape 3 — Injecter le menu Drupal dans le slot

Le slot **Menu principal** attend un bloc Drupal. Pour l'injecter :

1. Dans le panneau de gauche, passez sur l'onglet **Blocs**
2. Recherchez "Main navigation" (ou le nom de votre menu)
3. Glissez ce bloc dans le slot **Menu principal** du composant Navigation

::: info Créer un menu dans Drupal
Si vous n'avez pas encore de menu, créez-en un dans :
`Administration → Structure → Menus → Ajouter un menu`

Puis ajoutez-y des liens : `Administration → Structure → Menus → [Votre menu] → Ajouter un lien`
:::

### Étape 4 — Ajouter une barre de recherche (optionnel)

Si vous souhaitez ajouter une recherche dans le header :

1. Activez le module **Search** de Drupal : `drush en search`
2. Dans l'éditeur Header, ajoutez un bloc "Formulaire de recherche" après le composant Navigation

## Résultat attendu

```
┌─────────────────────────────────────────────────────────────┐
│  [LOGO]    Accueil   Services   À propos   Contact    [🔍]  │
└─────────────────────────────────────────────────────────────┘
```

Sur mobile :

```
┌──────────────────────────────┐
│  [LOGO]                 [☰]  │
└──────────────────────────────┘
   ↓ (menu ouvert)
┌──────────────────────────────┐
│  Accueil                     │
│  Services                    │
│  À propos                    │
│  Contact                     │
└──────────────────────────────┘
```

## Sauvegarder le Header global

Cliquez sur **Sauvegarder** dans la barre d'outils de Canvas. Le Header est maintenant appliqué à toutes vos Canvas Pages.

::: warning
La sauvegarde d'un Global Component **met immédiatement à jour toutes les pages** du site. Vérifiez bien votre configuration avant de sauvegarder.
:::

## Vérifier sur plusieurs pages

Créez ou ouvrez deux Canvas Pages différentes. Le Header doit être identique sur les deux. Si vous modifiez le Header depuis n'importe laquelle de ces pages, le changement s'applique à toutes.
