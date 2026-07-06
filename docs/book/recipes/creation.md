# 🏗️ Créer sa propre Recipe

Passons maintenant à la pratique. Nous allons créer de A à Z une **Recipe** qui installe et configure le thème d'administration **Gin** avec sa barre d'outils. Ce cas d'usage concret couvre tous les mécanismes clés : dépendances, inclusion de recipes core, et import de configuration.

## 3.1 Initialisation du projet

### Arborescence cible

Votre **Recipe** doit vivre dans un dossier *recipes/* à la racine du projet **Composer**, aux côtés de *web/* et *composer.json* :

```
mon-projet/
├── web/                    ← Drupal
├── composer.json           ← Composer du projet
├── composer.lock
└── recipes/
    └── setup-gin-admin/    ← Notre Recipe
        ├── recipe.yml
        └── composer.json
```

### Nommage

Adoptez une convention de nommage claire pour vos **Recipes** :

```
[contexte]-[fonctionnalite]
```

Exemples : *setup-gin-admin*, *setup-editorial*, *setup-seo*, *setup-performance*.

::: tip 💡 Bonne pratique
Préfixez toutes vos **Recipes** projet par un namespace métier (`setup-`, `config-`, `install-`). Cela les distingue des **Recipes** core et contrib dans vos logs et votre historique **Git**.
:::

## 3.2 Déclarer les dépendances dans `composer.json`

Créez le fichier *recipes/setup-gin-admin/composer.json* :

```json
{
    "name": "mon-projet/setup-gin-admin",
    "type": "drupal-recipe",
    "description": "Installe et configure le thème d'administration Gin",
    "require": {
        "drupal/gin": "^3.0",
        "drupal/gin_toolbar": "^1.0"
    }
}
```

::: info ℹ️
Le champ `"type": "drupal-recipe"` est obligatoire. Il indique à **Composer** comment installer ce package et permet à `drupal/core-recipe-unpack` de détecter les dépendances à extraire.
:::

### Configurer le `composer.json` du projet

Assurez-vous que votre *composer.json* de projet contient bien la configuration `installer-paths` pour les **Recipes** :

```json
{
    "extra": {
        "installer-types": ["drupal-recipe"],
        "installer-paths": {
            "recipes/{$name}": ["type:drupal-recipe"]
        }
    }
}
```

::: warning ⚠️ Attention
Les **Recipes** locales (dans votre dossier *recipes/*) ne nécessitent pas de `require` dans le *composer.json* du projet. Vous les appliquez directement par leur chemin. Le `require` est uniquement nécessaire pour les **Recipes** contrib publiées sur Packagist ou Drupal.org.
:::

## 3.3 Rédiger le `recipe.yml`

Créez le fichier principal *recipes/setup-gin-admin/recipe.yml* :

```yaml
name: 'Setup Gin Admin'
description: 'Configure le thème d'administration Gin avec Gin Toolbar et ses blocs.'

# Inclusion de recipes du core
recipes:
  - core/recipes/administrator_role

# Modules et thèmes à installer
install:
  - gin_toolbar
  - gin
```

### Détail des blocs

**`recipes`** : on inclut `administrator_role` du core pour s'assurer que le rôle *Administrator* existe avant d'appliquer nos configurations.

**`install`** : liste les modules et thèmes à activer. L'ordre compte :
- `gin_toolbar` : module compagnon (dépend de **Gin**)
- `gin` : le thème lui-même

::: tip 💡 Bonne pratique
Listez les dépendances avant les dépendants dans le bloc `install`. Même si **Drupal** gère les dépendances modules automatiquement, être explicite améliore la lisibilité.
:::

## 3.4 Définir Gin comme thème d'administration

Pour que **Gin** devienne le thème par défaut de l'interface d'administration, on utilise `config.actions` avec `simpleConfigUpdate` :

```yaml
name: 'Setup Gin Admin'
description: 'Configure le thème d'administration Gin avec Gin Toolbar et ses blocs.'

recipes:
  - core/recipes/administrator_role

install:
  - gin_toolbar
  - gin

config:
  actions:
    system.theme:
      simpleConfigUpdate:
        admin: gin
```

### Comment fonctionne `simpleConfigUpdate` ?

`simpleConfigUpdate` effectue une **mise à jour partielle** d'une configuration existante. Ici, on cible l'objet de configuration `system.theme` et on met à jour uniquement la clé `admin` pour la définir à `gin`.

::: info ℹ️
`simpleConfigUpdate` est l'action la plus courante dans les **Recipes**. Elle est **idempotente** : si la valeur est déjà celle attendue, rien ne se passe. On peut rejouer la **Recipe** sans risque.
:::

::: warning ⚠️ Attention
Pour connaître le nom de l'objet de configuration à modifier (ici `system.theme`), exportez la configuration de votre site de référence avec `drush config:export` et inspectez les fichiers YAML générés dans le dossier *config/sync/*.
:::

## 3.5 Importer les configurations du thème Gin

**Gin** utilise des blocs spécifiques (fil d'Ariane, messages, onglets…) qui doivent être configurés. On les importe via `config.import` :

```yaml
name: 'Setup Gin Admin'
description: 'Configure le thème d'administration Gin avec Gin Toolbar et ses blocs.'

recipes:
  - core/recipes/administrator_role

install:
  - gin_toolbar
  - gin

config:
  import:
    gin:
      - block.block.gin_breadcrumbs
      - block.block.gin_content
      - block.block.gin_local_actions
      - block.block.gin_local_tasks
      - block.block.gin_messages
  actions:
    system.theme:
      simpleConfigUpdate:
        admin: gin
```

### Comment fonctionne `config.import` avec un module ?

Quand vous écrivez `config.import: gin: [liste]`, **Drupal** ne cherche **pas** les fichiers dans votre **Recipe**. Il les cherche directement dans les dossiers de configuration du module **Gin** :

```
web/modules/contrib/gin/
├── config/
│   ├── install/      ← configs installées avec le module
│   └── optional/     ← configs optionnelles (blocs, vues…)
│       ├── block.block.gin_breadcrumbs.yml   ✅ déjà là
│       ├── block.block.gin_content.yml       ✅ déjà là
│       └── ...
```

Il vous suffit donc de **connaître les noms** des fichiers à activer et de les lister dans votre *recipe.yml*. Aucune copie de fichier n'est nécessaire.

### Trouver les noms des fichiers disponibles

```bash
# Lister les configs optionnelles du module Gin après installation
ls web/modules/contrib/gin/config/optional/
```

::: tip 💡 Bonne pratique
Pour découvrir quels fichiers de configuration un module fournit, parcourez son dossier *config/optional/*. Ce sont ces fichiers — déjà présents dans le module — que vous référencez dans `config.import`. Votre **Recipe** reste ainsi légère : pas de duplication de fichiers de configuration.
:::

::: details Aller plus loin
Le bloc `config.import` peut importer des configurations pour **n'importe quel module**, pas seulement le thème principal. Vous pouvez importer des vues, des types de contenu, des formats de texte, des rôles utilisateur… Tout ce qui est exportable avec `drush config:export` est importable dans une **Recipe**.
:::
