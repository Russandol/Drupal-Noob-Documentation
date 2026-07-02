# 🙈 Le fichier .gitignore

Le fichier *.gitignore* est un fichier de configuration qui indique à **Git** quels fichiers et dossiers ignorer lors des
opérations de versionnement. Il permet d'éviter d'ajouter au dépôt des fichiers qui ne devraient pas être partagés.

Ce qui est très pratique pour :
- **Eviter de versionner** les fichiers de configuration personnels, comme ceux de l'IDE par exemple.
- **Protéger les informations sensibles** en évitant que les fichiers *.env* et les mots de passe soient visibles dans le git.
- **Réduire la taille du dépôt** en excluant les dossiers de dépendances comme *vendor/* ou *node_modules/*.
- **Eviter les conflits inutiles**, comme sur les fichiers de logs ou de cache qui changent constamment.

Créez le fichier *.gitignore* à la racine du projet

```shell
touch .gitignore
```

## Ignorer des dossiers et des fichiers

Nous allons ignorer les fichiers suivants : 

* Les fichiers de **configuration de l'IDE** : **PHPSTORM**, **VSCode** et autres IDE ajoute des fichiers de configuration
dans les projets. Comme ces fichiers ne concerne que la configuration de votre IDE, il est préférable de les exclure du versionnement.
* Les **dépendances** et modules contrib de **Drupal** : comme nous utilisons **Composer** pour gérer les dépendances, 
il est préférable d'exclure les dossiers associés pour éviter de surcharger le dépôt.
* Les fichiers **auto-générés** par **Drupal** : à chaque `composer install` ou `composer update`, **Drupal** génère et met à jour
certains fichiers. Les versionner est donc inutile.
* Les fichiers **générés par les utilisateurs** : certains fichiers sont créés par les utilisateurs. Par exemple, si vous ajoutez
une image sur votre article de blog, l'image sera enregistrée dans un dossier spécifique. Les contenus étant liés à l'environnement
il est préférable d'exclure ces dossiers pour éviter de surcharger le dépôt.

Ouvrez donc le fichier `.gitignore` et ajoutez le code suivant : 

```ini
# IDE files
.idea/
.vscode/

# Ignore dependencies managed with Composer.
/vendor/
/web/core/
/web/modules/contrib/
/web/themes/contrib/
/web/profiles/contrib/

# Ignore auto-generated files
web/.htaccess

# Ignore paths that contain user-generated content.
web/sites/*/files
web/sites/*/private

```

::: warning ⚠️ Ce fichier n'est pas statique
Au fur et à mesure de notre projet, nous reviendrons sur ce fichier pour le mettre à jour en fonction de nos besoins.
:::

::: info Notre tout premier module
Pour faciliter la gestion du projet, avant d'aller plus loin dans la formation je vous propose de découvrir et d'installer
notre tout premier module : [Drush](/drupal-project/installation/drush)
:::