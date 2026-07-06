# 🔬 Anatomie d'une Recipe

Pour créer votre propre **Recipe**, le meilleur point de départ est d'en disséquer une existante. Dans cette section, nous explorons d'abord la structure de fichiers d'une **Recipe**, puis nous analysons en détail une **Recipe** officielle du core de **Drupal**.

## 📁 Structure de fichiers

Une **Recipe** est un dossier autonome qui contient au minimum **deux fichiers** :

```
ma-recipe/
├── recipe.yml         ← Fichier principal : définit tout ce que la recipe fait
└── composer.json      ← Déclare les dépendances externes (modules, thèmes)
```

### Le fichier `recipe.yml`

C'est le cœur de la **Recipe**. Il est structuré en plusieurs blocs optionnels :

```yaml
name: 'Nom lisible de la Recipe'
description: 'Description optionnelle'

# Recipes à appliquer avant celle-ci
recipes:
  - core/recipes/autre-recipe

# Modules et thèmes à installer
install:
  - module_a
  - module_b
  - mon_theme

# Actions de configuration
config:
  # Importer des fichiers de config depuis le dossier config/
  import:
    mon_module:
      - config.yml
  # Modifier une configuration existante
  actions:
    system.site:
      simpleConfigUpdate:
        name: 'Mon site'
```

### Le fichier `composer.json`

Il déclare les **dépendances Composer** spécifiques à cette **Recipe** (modules, thèmes contrib) :

```json
{
    "name": "mon-vendor/ma-recipe",
    "type": "drupal-recipe",
    "require": {
        "drupal/gin": "^3.0",
        "drupal/gin_toolbar": "^1.0"
    }
}
```

::: info ℹ️
Ce *composer.json* est propre à la **Recipe**. Quand vous l'appliquez, `drupal/core-recipe-unpack` transfère automatiquement ces dépendances dans le *composer.json* de votre projet.
:::

## 🔍 Analyse du core : `administrator_role`

Le core de **Drupal 11** fournit plusieurs **Recipes** dans *web/core/recipes/*. La recipe `administrator_role` est un excellent exemple pédagogique de par sa simplicité.

### Localisation

```
web/core/recipes/administrator_role/
├── recipe.yml
└── config/
    └── user.role.administrator.yml
```

> Notez qu'ici il n'y a pas de *composer.json* car cette **Recipe** n'a pas de dépendances externes : elle n'utilise que des modules déjà présents dans le core.

### Contenu du `recipe.yml`

```yaml
name: 'Administrator role'
description: 'Provides the Administrator role.'
type: 'User role'
config:
  # If the administrator role already exists, we don't really care what it looks like.
  strict: false
```

Décortiquons chaque bloc :

| Bloc            | Rôle |
|-----------------|---|
| `name`          | Nom lisible affiché dans les logs **Drush** |
| `description`   | Documentation inline de la **Recipe** |
| `type`          | Catégorie/classification de la **Recipe** (ex : *"User role"*, *"Content type"*…) |
| `config.strict` | `false` = ne pas échouer si la configuration existe déjà avec des valeurs différentes |

::: info ℹ️
`config.strict: false` est particulièrement utile pour les **Recipes** du core. Cela signifie que si le rôle *Administrator* existe déjà sur votre site (avec des permissions personnalisées), la **Recipe** importera quand même *user.role.administrator.yml* sans planter. Par défaut (`strict: true`), une configuration déjà existante provoque une erreur.
:::

### Le fichier de configuration importé

```yaml
# config/user.role.administrator.yml
langcode: en
status: true
dependencies: {  }
id: administrator
label: Administrator
weight: 3
is_admin: true
permissions: {  }
```

::: tip 💡 Bonne pratique
Vos fichiers de configuration à importer se placent dans un sous-dossier *config/* de votre **Recipe**. Vous pouvez les exporter depuis un site de référence avec `drush config:export`, puis les copier dans ce dossier.
:::

## 🗺️ Vue d'ensemble des blocs `recipe.yml`

| Bloc | Obligatoire | Rôle |
|---|---|---|
| `name` | ✅ Oui | Identifiant lisible |
| `description` | Non | Documentation inline |
| `type` | Non | Catégorie/classification de la **Recipe** |
| `recipes` | Non | Inclusion d'autres recipes |
| `install` | Non | Modules/thèmes à activer |
| `config.strict` | Non | `false` = tolérant si la config existe déjà (défaut : `true`) |
| `config.import` | Non | Import de fichiers YAML de config |
| `config.actions` | Non | Modification de config existante |

::: warning ⚠️ Attention
L'ordre des blocs dans *recipe.yml* est important. Les `recipes` incluses sont appliquées **en premier**, puis les `install`, puis les `config`. Concevez vos dépendances en conséquence.
:::

::: details Aller plus loin
**Drupal** fournit d'autres recipes dans *web/core/recipes/* que vous pouvez explorer comme modèles :
- *basic_html_format_editor* : configure CKEditor 5 avec le format HTML de base
- *standard_page_type* : crée le type de contenu Page de base
- *tags_vocabulary* : crée le vocabulaire Tags

Ces recipes sont conçues pour être composées entre elles, et constituent de bonnes références pour apprendre les patterns courants.
:::
