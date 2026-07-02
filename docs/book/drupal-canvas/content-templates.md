# Étape 7.1 — Content Templates dans Canvas

## Objectif

Apprendre à utiliser Canvas pour **afficher des contenus Drupal structurés** (nœuds, comme des articles de blog) avec une mise en page Canvas. Les **Content Templates** permettent de définir l'affichage d'un type de contenu via Canvas au lieu des templates Twig classiques.

## Le problème que ça résout

Sans Canvas, pour personnaliser l'affichage d'un type de contenu (ex: Article), vous devez :
- Créer un template Twig `node--article--full.html.twig`
- Écrire du HTML/Twig à la main
- Vider le cache à chaque modification

Avec les **Content Templates** de Canvas, vous pouvez définir cette mise en page **visuellement dans l'éditeur Canvas**, en utilisant les champs du nœud comme props dans vos composants.

## Créer un Content Template pour les Articles

### Étape 1 — Accéder aux Content Templates

```
Canvas → Content Templates → Ajouter un template
```

Ou depuis :
```
Administration → Structure → Types de contenu → Article → Canvas Templates
```

### Étape 2 — Choisir le type de contenu et le mode d'affichage

| Paramètre          | Valeur              |
|--------------------|---------------------|
| Type de contenu    | Article             |
| Mode d'affichage   | Complet (Full)      |

### Étape 3 — Construire la mise en page dans l'éditeur Canvas

L'éditeur s'ouvre avec des **jetons de champs** disponibles dans le panneau gauche. Ce sont les champs réels du type de contenu que vous pouvez injecter dans vos composants.

```
Panneau gauche — Champs disponibles :
├── Titre (field:title)
├── Corps (field:body)
├── Image (field:field_image)
├── Date de publication (field:created)
├── Auteur (field:uid)
└── Tags (field:field_tags)
```

### Étape 4 — Exemple de mise en page pour un Article

**Section 1 — En-tête de l'article**

Composant **Page Header** :
- Titre → glissez le jeton `Titre (field:title)` dans la prop Titre
- Le titre s'affichera dynamiquement depuis le nœud Drupal

**Section 2 — Contenu**

Grid 2 colonnes (2/3 + 1/3) :

*Colonne principale :*
- Image → jeton `Image (field:field_image)`
- Corps → jeton `Corps (field:body)`

*Sidebar :*
- Date : `Publié le {field:created}`
- Auteur : `Par {field:uid}`
- Tags : jeton `Tags (field:field_tags)`

### Étape 5 — Prévisualiser avec un vrai nœud

Canvas vous permet de prévisualiser le template avec un **nœud existant** :

```
Barre d'outils → Prévisualiser → Sélectionner un nœud Article
```

Vous voyez immédiatement le rendu avec de vraies données.

## Utiliser les jetons dans les composants

Dans vos composants SDC, les props peuvent recevoir des jetons Canvas :

```
Composant Card :
  Titre → [field:title]
  Texte → [field:body:summary]
  Image → [field:field_image:url]
  URL   → [node:url]
```

::: info Mode de rendu des champs
Chaque champ Drupal peut être affiché dans différents **modes** (formatters) :
- `body` → HTML complet
- `body:summary` → Résumé
- `field_image:url` → URL de l'image
- `field_image:alt` → Texte alt de l'image

Ces modes sont accessibles depuis le sélecteur de jetons dans l'éditeur Canvas.
:::

## Exemple complet : template Article

Voici la structure cible pour un article de blog :

```
┌─────────────────────────────────────────────────────┐
│  Blog > [Titre de l'article]                        │
│  [TITRE DE L'ARTICLE]                               │
│  Publié le 15 janvier 2025 par Jean Dupont          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [IMAGE PRINCIPALE]                                 │
│                                                     │
│  [CONTENU DE L'ARTICLE]                             │
│                                                     │
│  Lorem ipsum dolor sit amet, consectetur            │
│  adipiscing elit. Sed do eiusmod tempor…            │
│                                                     │
│  Tags : [Drupal] [Canvas] [Tutoriel]                │
└─────────────────────────────────────────────────────┘
```

## Avantages par rapport aux templates Twig classiques

| Aspect               | Template Twig classique          | Content Template Canvas       |
|----------------------|----------------------------------|-------------------------------|
| Modification         | Fichier + cache à vider          | Interface visuelle, instantané|
| Compétences requises | Twig + HTML                      | Aucune compétence technique   |
| Réutilisation        | Copier-coller du code            | Bibliothèque de Patterns      |
| Prévisualisation     | Après sauvegarde + cache         | Temps réel dans l'éditeur     |

::: warning Limitations
Les Content Templates Canvas ne remplacent pas totalement les templates Twig pour les cas complexes (logique conditionnelle avancée, preprocessing de données). Pour des cas simples à moyennement complexes, ils sont largement suffisants.
:::
