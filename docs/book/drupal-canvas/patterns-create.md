# Étape 6.1 — Créer un Pattern depuis l'UI Canvas

## Qu'est-ce qu'un Pattern ?

Un **Pattern** est un assemblage de composants SDC que vous sauvegardez depuis l'interface Canvas pour le **réutiliser facilement** sur d'autres pages.

Imaginez que vous avez construit une section "Services" avec un Grid + 3 Cards. Plutôt que de reconstruire cette mise en page à chaque nouvelle page, vous la sauvegardez comme Pattern. Il apparaît alors dans la bibliothèque, prêt à être utilisé en un clic.

::: tip Analogie
Un Pattern, c'est comme un **bloc LEGO déjà assemblé** que vous mettez de côté pour le réutiliser. Les SDC sont les briques individuelles, les Patterns sont des constructions pré-fabriquées.
:::

## Créer un Pattern "Section Services"

### Étape 1 — Construire l'assemblage dans Canvas

Ouvrez n'importe quelle Canvas Page dans l'éditeur et construisez la mise en page que vous souhaitez sauvegarder.

Exemple — Section Services :
1. Ajoutez une section
2. Placez un composant **Grid** (3 colonnes, titre "Nos Services")
3. Ajoutez 3 composants **Card** avec des valeurs d'exemple

### Étape 2 — Sélectionner la section à sauvegarder

1. Cliquez sur la section entière (cliquez sur le bord/l'en-tête de section, pas sur un composant)
2. Un contour orange entoure la section sélectionnée
3. Dans la barre d'actions de la section, cliquez sur l'icône **Sauvegarder comme Pattern** (📋 ou similaire)

### Étape 3 — Nommer le Pattern

Une fenêtre s'ouvre :

```
┌────────────────────────────────────┐
│  Sauvegarder comme Pattern         │
├────────────────────────────────────┤
│  Nom : [Section Services      ]    │
│  Catégorie : [Sections        ▼]   │
│  Description : [_____________ ]    │
│                                    │
│  [ Annuler ]    [ Sauvegarder ]    │
└────────────────────────────────────┘
```

Renseignez :
- **Nom** : `Section Services`
- **Catégorie** : `Sections` (ou créez-en une nouvelle)
- **Description** : `Grille 3 colonnes avec Cards icônes/titre/texte`

Cliquez sur **Sauvegarder**.

## Le Pattern est maintenant disponible

Dans le panneau gauche de Canvas, onglet **Patterns**, votre nouveau Pattern apparaît sous la catégorie choisie.

```
Panneau gauche → Patterns → Sections → Section Services
```

## Autres Patterns utiles à créer

Voici des assemblages courants que vous pouvez sauvegarder comme Patterns :

| Nom du Pattern         | Contenu                                     |
|------------------------|---------------------------------------------|
| `Section Services`     | Grid 3 colonnes + 3 Cards icônes            |
| `Section À propos`     | Grid 2 colonnes (image + texte)             |
| `Page intérieure`      | Page Header + Grid contenu/sidebar          |
| `CTA Banner`           | Hero mini centré + bouton                   |
| `Section Témoignages`  | Grid 3 colonnes + Cards texte + auteur      |
| `Section Équipe`       | Grid 4 colonnes + Cards photo + nom + poste |

## Modifier un Pattern existant

Les Patterns ne sont **pas dynamiques** : modifier un Pattern ne met pas à jour les pages où il est déjà utilisé. Un Pattern est une copie de l'assemblage au moment de la sauvegarde.

Pour modifier un Pattern :
1. Trouvez une page où ce Pattern est utilisé
2. Modifiez l'assemblage
3. Sauvegardez comme **nouveau Pattern** (ou remplacez l'ancien)

::: warning
Supprimer un Pattern n'affecte pas les pages où il a déjà été utilisé. La suppression ne concerne que la disponibilité dans la bibliothèque.
:::

## Où sont stockés les Patterns ?

Les Patterns sont stockés en **configuration Drupal** (table `config`). Vous pouvez donc les exporter/importer avec les commandes habituelles :

```bash
# Exporter la configuration (inclut les Patterns)
drush config:export

# Importer sur un autre environnement
drush config:import
```

Cela vous permet de versionner vos Patterns dans Git et de les déployer d'un environnement à l'autre.
