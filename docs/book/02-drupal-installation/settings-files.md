# Drupal - Premiers modules et settings

Après avoir réalisé l'installation initiale de **Drupal**, il est essentiel de procéder à certaines configurations pour
optimiser notre environnement. Cette étape cruciale nécessite des modifications dans les fichiers de configurations.

Cependant, avant de procéder à ces modifications, nous allons d'abord installer un module indispensable : **Drush**.

## Premier module

### Description

Un module **Drupal** est un ensemble de fichiers **PHP** qui étend les fonctionnalités de base, en ajoutant de
nouvelles capacités comme des types de contenu, des formulaires ou des intégrations avec des services externes.
Les modules suivent une structure standardisée avec des fichiers de configuration, des hooks et des services qui
permettent de s'intégrer parfaitement dans l'architecture de **Drupal**.

Les caractéristiques d'un module sont :
- **Chaque module est indépendant** et peut fonctionner seul ou en intéraction avec d'autres.
- Un module peut être utilisé sur **différents sites** **Drupal**.
- Un module peut proposer des **options de configuration**.
- Un module peut **étendre le cœur** de **Drupal** et peut lui-même être étendus par d'autres modules.

[La documentation de Drupal](https://www.drupal.org/project/project_module) référence et propose un outil de recherche de modules.

Les modules s'installent avec **Composer** et se trouvent dans le dossier *web/modules/contrib*.

### Drush

**[Drush](https://www.drupal.org/docs/develop/development-tools/drush)** est un outil en ligne de commande incontournable.
Il propose de nombreuses lignes de commandes pour automatiser des tâches courantes. Il permet par exemple la gestion
simplifiée des modules et des thèmes, la gestion des caches, etc..

Certains modules implémentent même des commandes **Drush** pour simplifier leur utilisation.

Pour installer **Drush**, tapez la commande suivante :
```shell
composer require drush/drush
```

> ⚠️ Il est bien entendu nécessaire d'être connecté au conteneur Docker pour accéder à **Composer**. Pour ça il vous suffit
> d'utiliser notre commande `make shell`.

Une fois l'installation terminée, vous pouvez tester en tapant tout simplement `drush` dans votre terminal. La commande
doit afficher une liste de commandes disponibles.

Normalement, cette commande `drush` n'est disponible qu'en tapant `vendor\bin\drush` mais souvenez-vous, lors de la
configuration de **Docker**, dans le fichier *Dockerfile*, nous avons ajouté le dossier `vendor\bin` dans le *PATH* de notre
environnement. Taper `drush` revient à taper `vendor\bin\drush`.

## Les fichiers settings

Les fichiers "settings" sont le point d'ancrage de la configuration de **Drupal**. Ils relient le code du CMS à notre
environnement concret (base de données, secrets, caches) sans modifier le cœur ni les modules.

Ils sont donc essentiels pour : 

- **Séparer le code de l'infrastructure** : tout ce qui dépend de l'environnement (dev, test, prod) vit dans les settings, pas
dans le code applicatif.
- **Assurer la sécurité** : gestion des secrets, des hôtes de confiance, etc..
- **Optimiser les performances et le debug** : activer / désactiver le cache, les logs, et les services.

A l'installation, **Drupal** va mettre en place les fichiers de settings dans le dossier *web/sites*.

La structure des fichiers est la suivante : 
```
..
├── web/
│   └── sites/
│       ├── default
│       │   ├── default.services.yml
│       │   ├── default.settings.php
│       │   └── settings.php
│       ├── development.services.yml
│       ├── exemple.settings.local.php
│       └── exemple.sites.php   
```

### settings.php

Le fichier qui nous intéresse pour le moment est le fichier *web/sites/default/settings.php*. C'est LE fichier de configuration
actif. C'est dans ce fichier par exemple que sont définies les configurations de connexion à la base de données.

Ouvrez le fichier et positionnez-vous tout à la fin. Vous devriez voir ce code : 

```php
$databases['default']['default'] = array (
  'database' => 'drupal',
  'username' => 'db',
  'password' => 'db',
  'prefix' => '',
  'host' => 'mariadb',
  'port' => '3306',
  'isolation_level' => 'READ COMMITTED',
  'driver' => 'mysql',
  'namespace' => 'Drupal\\mysql\\Driver\\Database\\mysql',
  'autoload' => 'core/modules/mysql/src/Driver/Database/mysql/',
);
```

Lors de l'initialisation de **Drupal** via l'interface web, **Drupal** a récupéré les identifiants de base de données
que nous avons renseigné dans le formulaire et a automatiquement rempli le fichier *settings.php*.

Et là, je pense que vous avez tout de suite remarqué un problème : les identifiants de la base de données sont en clair
dans le fichier.

Lors de la configuration de notre environnement de développement, nous avons créé un fichier *.docker/.env.database* qui 
contient les identifiants. Mais nous ne pouvons pas utiliser ce fichier en l'état dans notre projet car **Drupal** ne
prend pas en compte nativement les variables d'environnement.

Pour ça nous allons devoir installer un nouveau module.

### Dotenv

**[Dotenv](https://www.drupal.org/project/dotenv)** rend **Drupal** compatible aux fichiers d'environnement *.env*. Il
permet à **Drupal** de lire les variables d'environnement et de les utiliser.

Vu le temps que l'on a passé à paramétrer des variables d'environnement lors de la configuration de notre environnement
**Docker**, ça serait dommage de ne pas les exploiter aussi dans notre projet **Drupal** !

Pour installer le module **Dotenv**, utilisez cette commande :
```shell
composer require drupal/dotenv
```

Les fichiers du module sont installés par **Composer** dans le dossier *web/modules/contrib*.

> ⚠️ Mais le module n'est pas encore fonctionnel !

Quand nous installons un module **Drupal**, il faut faire la distinction entre *installer* le module et *l'activer*.

La plupart des modules ont besoin d'effectuer des modifications dans la base de données, installer de la configuration
par défaut, créer des permissions, etc..

Pour garantir un meilleur contrôle sur notre site, l'ajout d'un module est donc divisé en deux étapes :
- **L'installation** qui télécharge les fichiers.
- **L'activation** qui applique les modifications.

Par défaut, l'activation d'un module se fait via l'administration de **Drupal**. Il est également possible d'activer
un module en ligne de commande... avec **Drush** ! (Quand je vous disais que ce module était incontournable).

Pour activer le module **Dotenv**, utilisez la commande suivante :
```shell
drush en dotenv
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
drush dotenv:init
```

Seulement si vous utilisez cette commande en l'état vous devriez tomber sur une erreur : 
```shell
[warning] fopen(/app/web/sites/default/settings.php): Failed to open stream: Permission denied DotenvInitCommand.php:101
```

Comme le fichier *settings.php* contient les données sensibles, le fichier est configuré par défaut avec seulement des droits
en lecture seule.

Ce qui permet de : 
- **Protéger les identifiants** de base de données.
- **Eviter la modification** de secrets (hash_salt, clés).
- **Empêcher des altérations malveillantes** via le serveur web.
- **Prévenir les erreurs humaines** en production.

Si vous tapez la commande qui permet de lister les fichiers et leurs droits : 
```shell
ls -la web/sites/default
```

Vous pouvez voir la ligne suivante : 
```shell
-r--r--r-- 1 application application 35165 Aug 19 06:27 settings.php
```

Cette ligne indique que le fichier est en lecture seule (`r` pour "read") pour le propriétaire, le groupe et tous les autres.

Avant de faire la moindre modification sur le fichier *settings.php*, nous devons modifier les droits pour permettre l'écriture.

Pour ajouter des droits d'écriture, utilisez la commande : 
```shell
chmod u+w web/sites/default/settings.php
```

Nous pouvons maintenant lancer la commande **Drush** du module **Dotenv** :
```shell
drush dotenv:init
```

> ⚠️ Si vous avez déjà testé la commande avant d'ouvrir les droits de *settings.php*, la commande va vous afficher l'erreur 
> `[warning] The .env file already exists at path /app/.env`. Même si la première utilisation de la commande a échoué,
> des modifications ont été effectuées. Supprimez les fichiers *.env* et *.env.example*, puis relancez la commande.

La bonne initialisation est confirmée par les messages suivants : 
```shell
[success] The .env and .env.example files have been created.
[success] The load.environment.php file has been created and added to the autoload.files in composer.json.
[success] The .env file has been added to the .gitignore file
```

Plusieurs fichiers ont bien été créé, à nous d'adapter ces fichiers à nos besoins.

Dans le fichier *.env.example*, supprimer le code suivant : 
```dotenv
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_DRIVER=
DB_PREFIX=
```

Ces valeurs sont gérées par notre fichier *.docker/.env.database*.

Idem pour le fichier *.env*, vous pouvez supprimer ces lignes : 
```dotenv
DB_NAME=drupal
DB_USER=db
DB_PASSWORD=db
DB_HOST=mariadb
DB_PORT=3306
DB_DRIVER=mysql
DB_PREFIX=
```

[//]: # (TODO expliquer que l'on peut utiliser les variables d'environnement déjà créé pour Docker)

Pour que **Drupal** prenne en compte les variables d'environnement, le module **Dotenv** a ajouté un script de chargement
automatique dans le fichier *load.environment.php*. Nous allons ajouter du code pour qu'il prenne aussi en compte le fichier
d'environnement *.docker/.env.database*.

Ouvrez le fichier *load.environment.php* et ajoutez le code suivant : 
```php
<?php

/**
 * @file
 * Load environment variables from the .env file.
 */

use Symfony\Component\Dotenv\Dotenv;

(new Dotenv())->usePutenv()->bootEnv(DRUPAL_ROOT . '/../.env', 'dev', ['test'], TRUE);

// Ajout de notre fichier, "overload" permet de remplacer les variables existantes.
(new Dotenv())->usePutenv()->overload(DRUPAL_ROOT . '/../.docker/.env.database');

```

Maintenant si nous regardons à la fin du fichier *settings.php*, nous devrions voir ce code : 

```php
$databases['default']['default'] = array (
  'database' => 'drupal',
  'username' => 'db',
  'password' => 'db',
  'prefix' => '',
  'host' => 'mariadb',
  'port' => '3306',
  'isolation_level' => 'READ COMMITTED',
  'driver' => 'mysql',
  'namespace' => 'Drupal\\mysql\\Driver\\Database\\mysql',
  'autoload' => 'core/modules/mysql/src/Driver/Database/mysql/',
);
$settings['config_sync_directory'] = 'sites/default/files/config_WBmFLiilAet2ktWEQm9PLXbNkroBArAomZJfPfuUEdAR0Dhrq8uN80XNUrFDxNIbW6nrY0qi7Q/sync';

$databases['default']['default']['database'] = $_ENV['DB_NAME'];
$databases['default']['default']['username'] = $_ENV['DB_USER'];
$databases['default']['default']['password'] = $_ENV['DB_PASSWORD'];
$databases['default']['default']['host'] = $_ENV['DB_HOST'];
$databases['default']['default']['port'] = $_ENV['DB_PORT'];
$databases['default']['default']['driver'] = $_ENV['DB_DRIVER'];
$databases['default']['default']['prefix'] = $_ENV['DB_PREFIX'];
```

**Dotenv** a bien rajouté les variables d'environnement dans le fichier. Sauf qu'il a fait ça comme un cochon car on se 
retrouve avec du contenu dupliqué. Nous allons procéder à des ajustements.

> ⚠️ Même si on a accordé des droits en écriture sur le fichier *settings.php*, nous ne pourrons toujours pas modifier
> le fichier. Car le dossier *web/sites/default* est, lui aussi, protégé.

Avant de faire nos modifications, nous devons aussi donner les droits d'écriture au dossier *web/sites/default*.

```shell
chmod u+w web/sites/default
```

Nous pouvons maintenant modifier le fichier *settings.php* dans notre IDE.

Pour commencer, supprimez le code suivant : 
```php
$databases['default']['default']['database'] = $_ENV['DB_NAME'];
$databases['default']['default']['username'] = $_ENV['DB_USER'];
$databases['default']['default']['password'] = $_ENV['DB_PASSWORD'];
$databases['default']['default']['host'] = $_ENV['DB_HOST'];
$databases['default']['default']['port'] = $_ENV['DB_PORT'];
$databases['default']['default']['driver'] = $_ENV['DB_DRIVER'];
$databases['default']['default']['prefix'] = $_ENV['DB_PREFIX'];
```

Puis modifiez ce code pour ajouter nos variables d'environnement : 
```php
$databases['default']['default'] = array (
  'database' => getenv('DB_NAME'),
  'username' => getenv('DB_USER'),
  'password' => getenv('DB_PASSWORD'),
  'prefix' => '',
  'host' => 'mariadb',
  'port' => getenv('DB_PORT'),
  'isolation_level' => 'READ COMMITTED',
  'driver' => 'mysql',
  'namespace' => 'Drupal\\mysql\\Driver\\Database\\mysql',
  'autoload' => 'core/modules/mysql/src/Driver/Database/mysql/',
);
```

Et voilà, nous avons adapté notre configuration de **Drupal** à notre environnement.
Si vous actualisez le site sur le navigateur, tout devrait continuer à fonctionner.

Mais nous n'en avons pas fini avec les fichiers de configuration pour autant !

### settings.local

Nous avons défini une configuration globale de notre projet. Nous pouvons également préciser des configurations
qui ne seront disponibles que pour notre environnement local de développement.

Pour ça nous pouvons créer un fichier *settings.local.php*.

Dans le terminal, toujours connecté au conteneur en shell, tapez la commande suivante : 

```shell
cp web/sites/example.settings.local.php web/sites/default/settings.local.php
```

Cette commande copie le fichier *example.settings.local.php* qui est un exemple de configuration locale.

Ensuite, dans le fichier *settings.php*, décommentez les lignes suivantes (souvent en fin de fichier) :
```php
# if (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {
#   include $app_root . '/' . $site_path . '/settings.local.php';
# }
```

Ce script vérifie s'il existe un fichier *settings.local.php* dans le dossier *web/sites/default* et si oui, l'inclut.

Pour le moment, nous n'allons pas modifier la configuration en local, mais au moins le fichier sera disponible au 
besoin.

### local.services

Le fichier *local.services.yml* est une surcharge locale du conteneur de services de Drupal, utilisée en développement 
pour ajuster des services et paramètres sans toucher la config globale. Il permet notamment d’activer le debug (ex. Twig), 
de désactiver ou rediriger certains caches, et de modifier des backends/logs pour faciliter le travail en local.

Tout comme pour le fichier *settings.local.php*, un fichier d'exemple est déjà fourni par **Drupal**.

Pour créer le fichier, tapez la commande suivante : 

```shell
cp web/sites/default/default.services.yml web/sites/default/local.services.yml
```

Là aussi, il faut préciser à **Drupal** que le fichier existe. Pour cela, dans le fichier *settings.php*, ajoutez la ligne suivante : 

```php
/**
 * Load services definition file.
 */
$settings['container_yamls'][] = $app_root . '/' . $site_path . '/services.yml'; // Code déjà présent dans le fichier.
$settings['container_yamls'][] = $app_root . '/' . $site_path . '/local.services.yml'; // <== Code à ajouter.
```

> ⚠️ Il est possible que votre IDE émette une erreur sur les variables `$app_root` et `$site_path` car ces deux
> variables ne sont pas créées dans le fichier *settings.php*. Vous pouvez ignorer cette erreur.

### Protéger les fichiers settings

Nous avons terminé d'ajouter / modifier des fichiers settings. Il est important maintenant de retirer 
les droits en écriture sur le fichier *settings.php* et le dossier parent.

Utilisez la commande :
```shell
chmod u-w web/sites/default/settings.php
chmod u-w web/sites/default
```
