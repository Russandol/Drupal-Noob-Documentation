# ▶️ Appliquer une Recipe

Votre **Recipe** est rédigée, vos fichiers de configuration sont en place. Il est maintenant temps de l'appliquer sur votre site **Drupal**. Cette section couvre l'installation des dépendances **Composer** et l'exécution de la **Recipe** via **Drush**.

## 4.1 Installer les dépendances

Avant d'exécuter la **Recipe**, ses dépendances déclarées dans *composer.json* doivent être installées dans votre projet. Il y a deux cas de figure.

### Cas 1 : Recipe locale (dans votre dossier `recipes/`)

Pour une **Recipe** locale, vous devez installer les dépendances déclarées dans son *composer.json* directement dans le projet :

```bash
# Installer Gin et Gin Toolbar déclarés dans la recipe
composer require drupal/gin:^3.0 drupal/gin_toolbar:^1.0
```

::: info ℹ️
Quand vous appliquerez la **Recipe**, `drupal/core-recipe-unpack` vérifiera que toutes les dépendances sont présentes dans votre *composer.lock*. Si ce n'est pas le cas, l'application échouera avec un message d'erreur explicite.
:::

### Cas 2 : Recipe contrib (depuis Drupal.org ou Packagist)

Pour une **Recipe** publiée en tant que package **Composer** :

```bash
# Installer la recipe et ses dépendances en une seule commande
composer require mon-vendor/ma-recipe-contrib
```

`drupal/core-recipe-unpack` se déclenche automatiquement lors du `composer require` et injecte toutes les dépendances de la **Recipe** dans votre *composer.json* de projet.

### Gestion de la stabilité

Si une **Recipe** ou ses dépendances sont en version de développement :

```bash
# Forcer l'acceptation des versions @dev
composer require drupal/gin:^3.0 --prefer-stable
```

::: warning ⚠️ Attention
N'abaissez la stabilité minimale (`minimum-stability`) de votre *composer.json* à `dev` que si c'est absolument nécessaire. Préférez l'utilisation du flag `@dev` sur le package concerné uniquement, pour éviter d'ouvrir la porte à des dépendances instables sur tout le projet.
:::

```json
{
    "require": {
        "drupal/gin": "^3.0@dev"
    }
}
```

## 4.2 Exécuter la Recipe

### La commande `drush recipe`

```bash
drush recipe recipes/setup-gin-admin
```

La commande prend en paramètre le **chemin relatif** vers le dossier de la **Recipe** (depuis la racine du projet).

### Ce qui se passe lors de l'exécution

**Drush** exécute les étapes dans cet ordre :

1. **Validation** : vérifie que le *recipe.yml* est valide et que toutes les dépendances sont disponibles.
2. **Recipes incluses** : applique récursivement les recipes listées dans le bloc `recipes`.
3. **Installation** : active les modules et thèmes listés dans le bloc `install`.
4. **Import de config** : importe les fichiers YAML depuis le dossier *config/* de la **Recipe**.
5. **Actions de config** : applique les modifications déclarées dans `config.actions`.

### Exemple de sortie console

```
[notice] Applying recipe: Setup Gin Admin
[notice] Applying recipe: Administrator role (core)
[notice] Module(s) installed: gin_toolbar
[notice] Theme(s) installed: gin
[notice] Config imported: block.block.gin_breadcrumbs
[notice] Config imported: block.block.gin_content
[notice] Config imported: block.block.gin_local_actions
[notice] Config imported: block.block.gin_local_tasks
[notice] Config imported: block.block.gin_messages
[notice] Config updated: system.theme (admin: gin)
[success] The recipe Setup Gin Admin was applied successfully.
```

::: tip 💡 Bonne pratique
Après chaque application de **Recipe**, videz les caches **Drupal** pour que les changements de configuration (thèmes, blocs) soient pris en compte immédiatement :

```bash
drush cache:rebuild
```
:::

### Vérification du résultat

```bash
# Vérifier que Gin est bien le thème d'admin actif
drush config:get system.theme admin

# Vérifier que les modules sont activés
drush pm:list --status=enabled | grep gin
```

::: danger 🚨 Erreurs courantes
**`Recipe not found`** : vérifiez le chemin passé à `drush recipe`. Il doit être relatif à la racine du projet, pas au dossier *web/*.

**`Missing dependency`** : une dépendance déclarée dans *composer.json* de la Recipe n'est pas installée. Exécutez `composer require` avant de relancer.

**`Config already exists`** : un fichier importé par la Recipe existe déjà dans la config active. Supprimez-le manuellement ou utilisez `simpleConfigUpdate` au lieu de `config.import`.
:::

::: details Aller plus loin
Les **Recipes** sont **idempotentes** par conception : vous pouvez les appliquer plusieurs fois sans risque. Si un module est déjà installé, **Drupal** l'ignore. Si une config est déjà à la bonne valeur, `simpleConfigUpdate` ne fait rien. C'est idéal pour les pipelines CI/CD ou pour standardiser un parc de sites.
:::
