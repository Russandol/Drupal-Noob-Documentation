# Recipes Drupal

Présentation des recipes

drupal/core-recipe-unpack est désormais automatiquement présent depuis drupal 11.2.
il permet de décompresser les recipes dans le dossier de votre projet. (notamment les modules ou theme ajouté)

Pour ajouter des modules à installer, il faut ajouter un composer.json à la recipes

```json
{
  "name": "drupal/my-recipe",
  "description": "MyRecipe",
  "type": "drupal-recipe",
  "require": {
    "drupal/gin": "^3.0",
    "drupal/gin_toolbar": "^1.0"
  }
}
```

et dans le composer du projet (pas de la recipe) il faut ajouter : 

```json
{
    "repositories": [
        {
            "type": "path",
            "url": "./recipes/my-recipe"
        }
    ]
}
```

Créer ensuite le fichier recipe.yml

```yaml
name: "MyRecipe"
description: "Test de recette"
type: "Site"

recipes:
  - core/recipes/administrator_role
  - core/recipes/core_recommended_performance
  - core/recipes/core_recommended_maintenance
  - core/recipes/basic_html_format_editor
  - core/recipes/full_html_format_editor
  - core/recipes/image_media_type

install:
  # Admin content
  - block_content
  - menu_ui
  - menu_link_content
  - path
  - taxonomy
  - views
  - views_ui

  # Fields
  - datetime
  - field_ui
  - image
  - link
  - media
  - options

  # Theme
  - toolbar
  - gin
  - gin_toolbar

  # Tools
  - config_split
  - dotenv

config:
  import:
    media: '*'
    media_library: '*'
    node:
      - views.view.content
    gin:
      - gin.settings
      - block.block.gin_breadcrumbs
      - block.block.gin_content
      - block.block.gin_local_actions
      - block.block.gin_messages
      - block.block.gin_page_title
      - block.block.gin_primary_local_tasks
      - block.block.gin_secondary_local_tasks
  actions:
    system.theme:
      simpleConfigUpdate:
        admin: gin
```

Après avoir créé la recipe, pour récupérer les dépendances
ddev composer require drupal/my-recipe
en cas de problème de stabilité, rajouter `:@dev` à la fin

et installer la recipe
ddev drush recipe ../recipes/my-recipe
`my-recipe` étant le nom de la recipe
