# Étape 7.2 — Intégrer des Views (listes de contenus)

## Objectif

Afficher une **liste d'articles** (ou tout autre type de contenu Drupal) dans une Canvas Page, via le module **Views**. Vous apprendrez à créer une View et à l'intégrer dans un composant Canvas.

## Prérequis

Le module **Views** est inclus dans Drupal core. Assurez-vous qu'il est activé :

```bash
drush en views views_ui
```

## Créer une View "Derniers articles"

### Étape 1 — Créer la View

```
Administration → Structure → Vues → Ajouter une vue
```

Configuration de base :

| Paramètre               | Valeur                 |
|-------------------------|------------------------|
| Nom de la vue           | `Derniers articles`    |
| Afficher                | Contenu                |
| Type                    | Article                |
| Trié par                | Date de création (desc)|
| Créer un affichage Page | Non                    |
| Créer un affichage Bloc | Oui                    |
| Éléments par page       | 6                      |

### Étape 2 — Configurer les champs affichés

Dans l'éditeur de Vue, ajoutez les champs :

| Champ                  | Label      | Options                     |
|------------------------|------------|-----------------------------|
| `Titre`                | (aucun)    | Lien vers le nœud           |
| `Image (field_image)`  | (aucun)    | Style d'image : Medium      |
| `Corps (body)`         | (aucun)    | Résumé (200 car.)           |
| `Date de création`     | Publié le  | Format : dd/MM/yyyy         |

::: tip Format d'affichage
Dans la View, choisissez **Format : HTML non formaté** (Unformatted list) pour avoir un rendu neutre que vous styliserez via vos composants SDC.
:::

### Étape 3 — Créer un style de résultat (Row style)

Dans la section **Paramètres**, choisissez :
- **Affichage des lignes** : Champs (Fields)

Cela affiche chaque résultat comme un ensemble de champs plutôt que le rendu complet du nœud.

### Étape 4 — Sauvegarder la View

Cliquez sur **Sauvegarder** pour enregistrer votre View.

## Intégrer la View dans Canvas

### Option A — Via un bloc Drupal dans Canvas

La méthode la plus simple : la View génère automatiquement un bloc.

1. Ouvrez une Canvas Page dans l'éditeur
2. Dans le panneau gauche → onglet **Blocs**
3. Recherchez `Derniers articles`
4. Glissez le bloc dans votre page

**Avantage** : Simple, rapide.
**Inconvénient** : Le markup HTML est généré par Drupal/Views, moins flexible pour le style.

### Option B — Créer un composant SDC dédié "Articles List"

Pour un rendu entièrement contrôlé avec vos composants SDC, créez un composant qui reçoit les données de la View.

```
mon_theme/components/articles-list/
├── articles-list.component.yml
├── articles-list.twig
└── articles-list.css
```

### `articles-list.component.yml`

```yaml
name: Articles List
description: "Liste d'articles avec titre, image et résumé."
status: experimental

slots:
  items:
    title: Articles
    description: "Injectez le bloc Views ici"

props:
  type: object
  properties:
    title:
      type: string
      title: Titre de la section
    columns:
      type: integer
      title: Nombre de colonnes
      default: 3
      enum: [1, 2, 3]
```

### `articles-list.twig`

```twig
<section {{ attributes.addClass('articles-list') }}>

  {% if title %}
    <div class="articles-list__header">
      <h2 class="articles-list__title">{{ title }}</h2>
    </div>
  {% endif %}

  <div class="articles-list__grid articles-list__grid--cols-{{ columns | default(3) }}">
    {{ slots.items }}
  </div>

</section>
```

### `articles-list.css`

```css
.articles-list {
  padding: 4rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.articles-list__header {
  margin-bottom: 2.5rem;
}

.articles-list__title {
  font-size: 2rem;
  font-weight: 800;
  color: #1a1a2e;
}

.articles-list__grid {
  display: grid;
  gap: 1.5rem;
}

.articles-list__grid--cols-1 { grid-template-columns: 1fr; }
.articles-list__grid--cols-2 { grid-template-columns: repeat(2, 1fr); }
.articles-list__grid--cols-3 { grid-template-columns: repeat(3, 1fr); }

@media (max-width: 768px) {
  .articles-list__grid--cols-2,
  .articles-list__grid--cols-3 {
    grid-template-columns: 1fr;
  }
}
```

### Utilisation dans Canvas

1. Placez le composant **Articles List** sur votre page
2. Configurez : Titre = `Nos derniers articles`, Colonnes = `3`
3. Dans le slot **Articles**, glissez le bloc Views "Derniers articles"

## Créer une page Blog

Mettez tout ensemble pour créer une page Blog complète :

```
Canvas Page "Blog"
│
├── Composant Page Header
│     Titre : "Blog"
│     Sous-titre : "Actualités et conseils"
│
└── Composant Articles List
      Titre : "Derniers articles"
      Colonnes : 3
      Slot → Bloc Views "Derniers articles"
```

## Pagination

Pour activer la pagination dans votre View :

```
Éditeur de Vue → Aucun pager → Changer → Afficher un pager
Éléments par page : 9
```

Le pager s'affiche automatiquement sous la liste des articles.

::: info Views et Canvas : bonne pratique
Les Views sont idéales pour les **listes de contenus dynamiques** (articles, événements, produits). Canvas est idéal pour les **pages éditoriales**. Combiner les deux vous donne le meilleur des deux mondes : des pages visuellement riches qui affichent du contenu structuré.
:::
