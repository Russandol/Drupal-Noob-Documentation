# Étape 6.2 — Utiliser les Patterns sur plusieurs pages

## Utiliser un Pattern existant

Maintenant que vous avez créé des Patterns, voyons comment les utiliser efficacement pour construire de nouvelles pages rapidement.

### Insérer un Pattern dans une Canvas Page

1. Ouvrez une Canvas Page dans l'éditeur
2. Dans le **panneau de gauche**, cliquez sur l'onglet **Patterns**
3. Parcourez les catégories ou utilisez la recherche
4. Cliquez ou glissez-déposez le Pattern dans la zone centrale

Le Pattern est inséré avec **toute sa structure** : sections, composants et leurs configurations.

### Personnaliser le Pattern après insertion

Une fois inséré, le Pattern devient une **copie indépendante** sur votre page. Vous pouvez :
- Modifier les textes dans chaque Card
- Changer les images
- Ajouter ou supprimer des éléments
- Modifier les props de chaque composant

Ces modifications n'affectent **pas** le Pattern original ni les autres pages.

```
Pattern "Section Services" (bibliothèque)
        ↓ insertion
Copie sur Page "À propos" → modifiable indépendamment
Copie sur Page "Accueil"  → modifiable indépendamment
```

## Flux de travail recommandé

### Pour construire un site complet avec Canvas

```
1. Créez vos composants SDC (Module 3)
         ↓
2. Assemblez Header + Footer (Module 4)
         ↓
3. Construisez la page d'accueil (Module 5)
         ↓
4. Sauvegardez les sections récurrentes comme Patterns
         ↓
5. Construisez les autres pages en utilisant les Patterns
         ↓
6. Personnalisez le contenu de chaque page
```

### Exemple concret

Vous avez construit la page d'accueil avec :
- Section Hero
- Section Services (Grid 3 Cards)
- Section CTA

Vous voulez maintenant créer la page "Services" :

1. Créez une nouvelle Canvas Page `Services`
2. Insérez le Pattern **Page intérieure** (Page Header + sidebar)
3. Insérez le Pattern **Section Services** en bas de page
4. Personnalisez le contenu pour les services détaillés

En 5 minutes, la page "Services" a une structure complète et cohérente.

## Organiser sa bibliothèque de Patterns

Prenez le temps d'organiser vos Patterns par catégories pour une meilleure productivité :

| Catégorie      | Patterns inclus                                     |
|----------------|-----------------------------------------------------|
| **Héros**      | Hero pleine largeur, Hero centré, Hero mini         |
| **Sections**   | Services 3 col, Équipe 4 col, Témoignages, À propos |
| **Pages**      | Page intérieure, Page contact, Landing page         |
| **CTAs**       | CTA Banner, CTA avec image, CTA footer              |

## Patterns vs Pages complètes

Pour les pages très standardisées (ex: toutes les pages de services ont exactement la même structure), vous pouvez créer un Pattern qui représente **la page entière** :

1. Construisez la page complète (Header exclu, car c'est un Global Component)
2. Sélectionnez toutes les sections
3. Sauvegardez comme Pattern "Page Service Standard"

Chaque nouvelle page de service utilise ce Pattern et vous n'avez plus qu'à changer les textes.

::: tip Gain de temps
Avec une bibliothèque de 8 à 10 Patterns bien conçus, vous pouvez créer une nouvelle page en **moins de 10 minutes**, tout en maintenant une cohérence visuelle parfaite sur l'ensemble du site.
:::
