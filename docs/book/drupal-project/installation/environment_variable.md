# 🔐 Gérer les données sensibles : les variables d'environnement

[//]: # (TODO à rédiger)

Comme nous l'avons vu dans le chapitre précédent, nous avons créé un fichier *web/sites/default/settings/database.php*
qui contient les identifiants de connexion à la base de données. Seulement ses identifiants sont en clair dans le fichier.

La solution pour gérer les identifiants et autres données sensibles est de les stocker dans des variables d'environnement.

Mais par défaut **Drupal** ne les prend pas en compte nativement.

Heureusement, il y a un module pour ça !

### Dotenv

#### Installation du module Dotenv

**[Dotenv](https://www.drupal.org/project/dotenv)** rend **Drupal** compatible aux fichiers d'environnement *.env*. Il
permet à **Drupal** de lire les variables d'environnement et de les utiliser.

Pour installer le module **Dotenv**, utilisez cette commande :
```shell
ddev composer require drupal/dotenv
```

Les fichiers du module sont installés par **Composer** dans le dossier *web/modules/contrib*.

::: warning ⚠️ Mais le module n'est pas encore fonctionnel !
Quand nous installons un module **Drupal**, il faut faire la distinction entre *installer* le module et *l'activer*.

La plupart des modules ont besoin d'effectuer des modifications dans la base de données, installer de la configuration
par défaut, créer des permissions, etc..

Pour garantir un meilleur contrôle sur notre site, l'ajout d'un module est donc divisé en deux étapes :
- **L'installation** qui télécharge les fichiers.
- **L'activation** qui applique les modifications.
:::

Par défaut, l'activation d'un module se fait via l'administration de **Drupal**. Il est également possible d'activer
un module en ligne de commande... avec **Drush** ! (Quand je vous disais que ce module était incontournable).

Pour activer le module **Dotenv**, utilisez la commande suivante :
```shell
ddev drush en dotenv
```

`drush en` est un alias de `drush pm:enable`.

Le message suivant doit s'afficher :
```shell
[success] Module dotenv has been installed.
```

Notre module est désormais installé ET activé. Et pourtant rien n'a vraiment changé dans notre projet.

C'est normal, comme le précise [la documentation du module Dotenv](https://www.drupal.org/project/dotenv), il est nécessaire
d'effectuer de la configuration.

Heureusement, les développeurs du module ont pensé à tout : ils ont créé un script **Drush** qui permet de configurer
automatiquement le module.

Ce script va exécuter les actions suivantes :
- Créer un fichier *.env* avec `APP_ENV` et vos identifiants de base de données depuis le fichier *web/sites/default/settings.php*.
- Créer un fichier *.env.example* avec toutes les clés du fichier *.env*, sans les valeurs.
- Ajouter le fichier *.env* au *.gitignore*.
- Créer le fichier *load.environment.php* dans votre projet et le configurer pour l'auto-chargement via Composer.

La commande pour exécuter le script est la suivante :
```shell
ddev drush dotenv:init
```

La bonne initialisation est confirmée par les messages suivants :

```shell
[success] The .env and .env.example files have been created.
[success] The load.environment.php file has been created and added to the autoload.files in composer.json.
[success] The .env file has been added to the .gitignore file
```

#### Tour d'horizon des fichiers créés par le module

- *.env* : contient les variables d'environnement.
- *.env.example* : contient les clés des variables d'environnement à utiliser dans le fichier *.env*.
- *load.environment.php* : est le script qui va récupérer les variables d'environnement et les injecter dans l'autoload de **Composer**.

::: tip .env.example
Ce fichier est le template des variables d'environnement nécessaires au bon fonctionnement de notre site. Dans le cas où 
un nouveau développeur récupère le projet, ou s'il est installé sur un autre environnement, ce fichier doit être copié 
et renommé en *.env*.

Si vous ajoutez de nouvelles variables d'environnement, pensez à les ajouter aussi dans ce fichier.
:::

Comme vous vous en doutez, le fichier *.env* ne doit pas être versionné pour éviter que les valeurs soient exposées. C'est
pour cette raison que le script d'initialisation de **Dotenv** a automatiquement rajouté le fichier *.env* au *.gitignore*.

Ouvrez le fichier *.gitignore* et vous devriez voir le code suivant en fin de document :

```ini
# Ignore all files in the .env directory.
.env
```

### Utiliser les variables d'environnement avec Dotenv

Ouvrez le fichier *.env*. Vous pouvez constater que le script d'initialisation a déjà prérempli les valeurs avec les
identifiants de connexion à la base de données.

```dotenv
APP_ENV=prod

DB_NAME=db
DB_USER=db
DB_PASSWORD=db
DB_HOST=db
DB_PORT=3306
DB_DRIVER=mysql
DB_PREFIX=
```

Le script a également modifié le fichier *web/sites/default/settings.php* pour adapter la configuration de connexion
à la base de données avec les variables d'environnement.

```php
$databases['default']['default']['database'] = $_ENV['DB_NAME'];
$databases['default']['default']['username'] = $_ENV['DB_USER'];
$databases['default']['default']['password'] = $_ENV['DB_PASSWORD'];
$databases['default']['default']['host'] = $_ENV['DB_HOST'];
$databases['default']['default']['port'] = $_ENV['DB_PORT'];
$databases['default']['default']['driver'] = $_ENV['DB_DRIVER'];
$databases['default']['default']['prefix'] = $_ENV['DB_PREFIX'];
```

Comme nous avons créé un fichier spécifique pour la configuration de connexion à la base de données, coupez ce code du fichier
*web/sites/default/settings.php* et remplacez le code dans le fichier *web/sites/default/settings/database.php*.

### Hash salt

Le *hash salt* est une chaîne aléatoire unique utilisée par **Drupal** pour renforcer la sécurité des hachages et des jetons.
Il garantit que les mêmes données produisent des hachages différents d’un site à l’autre.

Lors de l'installation d'un projet **Drupal**, un *hash salt* est généré automatiquement et ajouté dans le fichier
*settings.php*.

Comme nous avons effectué une installation avec **DDEV**, le *hash salt* est définie dans le fichier 
*web/sites/default/settings.ddev.php* : 

```php
$settings['hash_salt'] = 'xxx'; // xxx étant la chaîne de caractère.
```

Comme vous vous en doutez : cette valeur est sensible et doit être différente en fonction des environnements.

Nous allons donc l'ajouter dans nos variables d'environnement.

Pour commencer, ajoutez cette ligne dans les fichiers *.env* et *.env.example* :

```dotenv
HASH_SALT=
```

Comme la configuration du *hash salt* se trouve en amont du chargement du fichier *settings.ddev.php*, dans le fichier
*web/sites/default/settings.php*, nous pourrions directement ajouter la variable d'environnement dans ce fichier.

Je vous propose de garder notre architecture de fichiers de configuration, comme vu dans le chapitre sur les
[fichiers settings](/drupal-project/installation/settings_files).

Créez un fichier *web/sites/default/settings/hash_salt.php* :

```shell
touch web/sites/default/settings/hash_salt.php
```

Puis ajoutez le code suivant dans ce fichier : 

```php
<?php

$hash_salt = $_ENV['HASH_SALT'];
```

Et voilà, nous avons adapté notre configuration de **Drupal** pour un environnement qui n'utilise pas **DDEV**. 
Et surtout, nous avons utilisé des variables d'environnement pour protéger les données sensibles.

::: info Les fichiers de configuration
Il nous reste une dernière chose à prendre en compte dans les fichiers settings : [la gestion des fichiers de 
configuration](/drupal-project/installation/site_config) de **Drupal**.
:::