# Étape 1.2 — Découvrir l'interface visuelle de Canvas

## 🗺️ Vue d'ensemble de l'interface

Lorsque vous ouvrez ou créez une **Canvas Page**, vous accédez à l'éditeur visuel **Canvas**. 
L'interface est divisée en 3 grandes zones :

[//]: # (TODO remplacer par un screen)
```
┌─────────────────────────────────────────────────────────┐
│                    BARRE D'OUTILS (haut)                │
├──────────────────┬──────────────────┬───────────────────┤
│                  │                  │                   │
│   PANNEAU DE     │   ZONE CENTRALE  │   PANNEAU DE      │
│   GAUCHE         │                  │   DROITE          │
│                  │  Prévisualisation│                   │
│   Composants     │   en direct      │   Propriétés      │
│   disponibles    │                  │   du composant    │
│                  │                  │                   │
└──────────────────┴──────────────────┴───────────────────┘
```

## 🔵 Zone 1 — Le panneau de gauche : les composants disponibles

Le panneau de gauche est votre boîte à outils. C'est ici que vous trouvez tous les composants que vous pouvez ajouter à votre page.
Ce que vous y trouvez :

| Élément                        | Description |
|--------------------------------|--------------------------|
| **Bibliothèque de composants** | Tous les composants SDC disponibles dans votre thème     |
| **Patterns**                   | Des assemblages de composants pré-construits et réutilisables   |
| **Composants globaux**         | Header, Footer, éléments partagés sur toutes les pages   |
| **Barre de recherche**         | Pour retrouver rapidement un composant par son nom   |

Comment l'utiliser :

* Parcourez les catégories de composants disponibles.
* Recherchez un composant via la barre de recherche en haut du panneau.
* Glissez-déposez (drag & drop) un composant depuis le panneau vers la zone centrale.
* Ou cliquez sur le composant pour l'ajouter à la section active.

::: warning ⚠️ A noter :
Les composants disponibles dépendent de ceux qui ont été développés dans votre thème. Avec le thème Mercury fraîchement généré, la liste
est minimaliste au départ. C'est normal, nous allons les créer ensemble dans les prochains modules !
:::
 

## 🟢 Zone 2 — La zone centrale : la prévisualisation en direct

La zone centrale est le cœur de Canvas. C'est ici que vous construisez et visualisez votre page en temps réel.

### Ses caractéristiques :

* Ce que vous voyez ici est exactement ce que verra votre visiteur sur le site.
* Les modifications sont instantanées : pas besoin de sauvegarder pour voir le résultat.
* Vous pouvez cliquer directement sur un élément de la page pour le sélectionner et l'éditer.

### Les actions disponibles dans la zone centrale :

| Action                        | Comment faire |
|-------------------------------|--------------------------|
| **Sélectionner un composant** | Clic sur le composant dans la prévisualisation |
| **Déplacer un composant**     | Glisser-déposer vers le haut ou le bas |
| **Ajouter une section**       | Cliquer sur le bouton + entre deux sections |
| **Supprimer un élément**      | Sélectionner puis cliquer sur l'icône 🗑️ |
| **Dupliquer un élément**      | Sélectionner puis cliquer sur l'icône de copie |

### Les indicateurs visuels :

Lorsque vous survolez ou sélectionnez un élément, Canvas affiche des indicateurs visuels colorés :

* 🔵 Contour bleu → un composant est survolé.
* 🟠 Contour orange → un composant est sélectionné et éditable.
* ➕ Bouton + → zone où vous pouvez insérer un nouveau composant ou une section.

::: tip 💡 Astuce
Vous pouvez basculer entre une vue Desktop, Tablette et Mobile directement depuis la barre d'outils en haut pour 
tester le responsive de votre page. 
:::

## 🔴 Zone 3 — Le panneau de droite : les propriétés du composant

Le panneau de droite s'affiche uniquement lorsqu'un composant est sélectionné dans la zone centrale. C'est ici que 
vous configurez et personnalisez chaque composant.

### Ce que vous y trouvez :

| Onglet           | Contenu                                                     |
|------------------|-------------------------------------------------------------|
| **Contenu**      | Les champs éditables du composant (texte, image, lien…)     |
| **Style**        | Les options visuelles (couleurs, espacements, typographie…) |
| **Comportement** | Les options d'animation, de visibilité conditionnelle…      |
| **Avancé**       | Les classes CSS personnalisées, attributs HTML...           |


### Exemple concret — Composant "Hero" sélectionné :

``` 
┌─────────────────────────────┐
│  ⚙️ Propriétés : Hero        │
├─────────────────────────────┤
│ CONTENU                     │
│  Titre : [______________]   │
│  Sous-titre : [__________]  │
│  Image de fond : [📷]       │
│  Bouton CTA : [__________]  │
├─────────────────────────────┤
│ STYLE                       │
│  Hauteur : [___] px         │
│  Alignement texte : [⬛⬛⬛] │
│  Couleur overlay : [🎨]     │
└─────────────────────────────┘
```

::: warning ⚠️ Important : 
les propriétés disponibles dépendent de la définition du composant SDC (dans son fichier .component.yml). Plus un 
composant est bien défini, plus il offre d'options de personnalisation dans ce panneau.
:::

### 🔧 La barre d'outils du haut

En plus des 3 panneaux, la barre d'outils supérieure offre des actions globales sur la page :

| Bouton                 | Action   |
|------------------------|----------|
| **Annuler / Rétablir** | ↩️ Défaire ou refaire une action |
| **Prévisualiser**      | Voir la page comme un visiteur, hors éditeur |
| **Responsive**         | Basculer entre Desktop / Tablette / Mobile |
| **Sauvegarder**        | Enregistrer les modifications |
| **Publier**            | Rendre la page visible sur le site |












