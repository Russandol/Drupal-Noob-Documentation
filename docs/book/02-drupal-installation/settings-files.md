# Drupal - Premiers modules et settings

Après avoir réalisé l'installation initiale de Drupal, il est essentiel de procéder à certaines configurations pour
optimiser notre environnement. Cette étape cruciale nécessite des modifications dans les fichiers de configurations.

Cependant, avant de procéder à ces modifications, nous allons d'abord installer un module indispensable : Drush.

## Premier module

### Description

Un module Drupal est un ensemble de fichiers PHP qui étend les fonctionnalités de base, en ajoutant de
nouvelles capacités comme des types de contenu, des formulaires ou des intégrations avec des services externes.
Les modules suivent une structure standardisée avec des fichiers de configuration, des hooks et des services qui
permettent de s'intégrer parfaitement dans l'architecture de Drupal.

Les caractéristiques d'un module sont :
- Chaque module est indépendant et peut fonctionner seul ou en intéraction avec d'autres.
- Un module peut être utilisé sur différents sites Drupal.
- Un module peut proposer des options de configuration.
- Un module peut étendre le cœur de Drupal et peut lui-même être étendus par d'autres modules.

[La documentation de Drupal](https://www.drupal.org/project/project_module) référence et propose un outil de recherche de modules.

Les modules s'installent avec `Composer` et se trouve dans le dossier `web/modules/contrib`.

### Drush

**[Drush](https://www.drupal.org/docs/develop/development-tools/drush)** est un outil en ligne de commande incontournable.
Il propose de nombreuses lignes de commandes pour automatiser des tâches courantes. Il permet par exemple la gestion
simplifiée des modules et des thèmes, la gestion des caches, etc..

Certains modules implémentent même des commandes Drush pour simplifier leur utilisation.

Pour installer Drush, tapez la commande suivante :
```shell
composer require drush/drush
```

> ⚠️ Il est bien entendu nécessaire d'être connecté au conteneur Docker pour accéder à `Composer`.

Une fois l'installation terminée, vous pouvez tester en tapant tout simplement `drush` dans votre terminal. La commande
doit afficher une liste de commandes disponibles.

Normalement, cette commande `drush` n'est disponible qu'en tapant `vendor\bin\drush` mais souvenez-vous, lors de la
configuration de Docker, dans le fichier `Dockerfile` nous avons ajouté le dossier `vendor\bin` dans le *PATH* de notre
environnement. Taper `drush` revient à taper `vendor\bin\drush`.

## Les fichiers settings



- présentation des fichiers settings
- settings.php les infos de base de données
- les fichiers sont protégés
- utiliser les variables d'environnement
- le module dotenv
  - installation
  - activation
  - configuration pour prendre en compte le fichier .docker/.env.database
- versionner settings.php ou non ?
- settings.local.php
- local.services.yml


Les **fichiers settings** dans Drupal (principalement `settings.php` et `settings.local.php`) contiennent
la configuration fondamentale de votre site comme les paramètres de connexion à la base de données, les clés
de sécurité et les variables d'environnement. Ces fichiers définissent comment Drupal se connecte aux services
externes et personnalisent le comportement du système selon l'environnement (développement, production, test).
Ils sont essentiels au fonctionnement de Drupal et doivent être configurés correctement lors de l'installation,
avec des permissions de fichier restrictives pour des raisons de sécurité.




### Dotenv

**[Dotenv](https://www.drupal.org/project/dotenv)** rend Drupal compatible avec les fichiers d'environnement `.env`. Il
permet à Drupal de lire les variables d'environnement et de les utiliser comme variables de configuration.

Vu le temps que l'on a passé à paramétrer des variables d'environnement lors de la configuration de notre environnement
Docker, ça serait dommage de ne pas les exploiter aussi dans notre projet Drupal !

Pour installer le module Dotenv, utilisez cette commande :
```shell
composer require drupal/dotenv
```

Les fichiers du module sont installés par Composer.

> ⚠️ Mais le module n'est pas encore fonctionnel !

Quand nous installons un module Drupal, il faut faire la distinction entre *installer* le module et *l'activer*.

La plupart des modules ont besoin d'effectuer des modifications dans la base de données, installer de la configuration
par défaut, créer des permissions, etc..

Pour garantir un meilleur contrôle sur notre site, l'ajout d'un module est donc divisé en deux étapes :
- **L'installation** qui télécharge les fichiers.
- **L'activation** qui applique les modifications.

Par défaut, l'activation d'un module se fait via l'administration de Drupal. Il est également possible d'activer
un module en ligne de commande... avec Drush ! (Quand je vous disais que ce module était incontournable).

Pour activer le module Dotenv, utilisez la commande suivante :
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

Heureusement, les développeurs du module ont pensé à tout : ils ont créé un script Drush qui permet de configurer
automatiquement le module.

Ce script va exécuter les actions suivantes :
- Créer un fichier `.env` avec APP_ENV et vos identifiants de base de données depuis le fichier `web/sites/default/settings.php`.
- Créer un fichier `.env.example` avec toutes les clés du fichier `.env`, sans les valeurs.
- Ajouter le fichier `.env` au `.gitignore`.
- Copier le fichier `load.environment.php` dans votre projet et le configurer pour l'auto-chargement via Composer.





[//]: # (TODO)

il faut donc permettre au code d'accéder à settings.php
lancer la commande init
Modifier load.environment.php pour qu'il prenne en compte le fichier .docker/.env.database





Tapez donc le code suivant dans votre terminal :
```shell
drush dotenv:init
```


```shell
composer require drupal/dotenv
drush en dotenv
drush dotenv:init
```

Cette commande va automatiquement :
- créer un fichier .env
- créer un fichier .env.example
- ajouter le .env au .gitignore
- copier le fichier load.environment.php et l'ajouter à l'autoloading de composer.


Les settings

TODO faire une présentation de l'arborescence des fichiers


explication du fonctionnement des fichiers de settings

On constate que c'est dans le fichier settings.php que nous avons
les identifiants de connexion à la base de données, et ils sont en claires.
Ce qui n'est pas ouf.

Nous allons donc utiliser nos variables d'environnement.

Texte sur la protection des fichiers

Les fichiers dans `web/sites/default` sont protégés en écriture pour plusieurs raisons de sécurité importantes :
1. **Protection des configurations sensibles** :
  - Le fichier contient des informations sensibles comme les identifiants de base de données `settings.php`
  - La protection en lecture seule empêche la modification non autorisée de ces paramètres critiques

2. **Sécurité contre les attaques** :
  - Empêche les attaquants potentiels de modifier les configurations via des vulnérabilités
  - Protège contre les injections de code malveillant dans les fichiers de configuration

3. **Stabilité du site** :
  - Évite les modifications accidentelles qui pourraient rendre le site inaccessible
  - Maintient l'intégrité des configurations essentielles

pour effectuer des modifications nous devons d'abord donner les droits sur le
fichier mais aussi sur le dossier parent :

```shell
chmod a+w web/sites/default
chmod a+w web/sites/default/settings.php
```

A la fin du fichier settings.php, changer les informations de connexion à
la base de données avec les variables d'environnement.

```php
$databases['default']['default'] = array (
  'database' => $_ENV['DB_NAME'],
  'username' => $_ENV['DB_USER'],
  'password' => $_ENV['DB_PASSWORD'],
  'prefix' => '',
  'host' => 'mariadb',
  'port' => $_ENV['DB_PORT'],
  'isolation_level' => 'READ COMMITTED',
  'driver' => 'mysql',
  'namespace' => 'Drupal\\mysql\\Driver\\Database\\mysql',
  'autoload' => 'core/modules/mysql/src/Driver/Database/mysql/',
);
```
Nous pouvons supprimer les settings rajoutées par Dotenv lors de l'initialisation:
Supprimer les lignes suivantes :

```php
$databases['default']['default']['database'] = $_ENV['DB_NAME'];
$databases['default']['default']['username'] = $_ENV['DB_USER'];
$databases['default']['default']['password'] = $_ENV['DB_PASSWORD'];
$databases['default']['default']['host'] = $_ENV['DB_HOST'];
$databases['default']['default']['port'] = $_ENV['DB_PORT'];
$databases['default']['default']['driver'] = $_ENV['DB_DRIVER'];
$databases['default']['default']['prefix'] = $_ENV['DB_PREFIX'];
```

Nous avons fini avec le fichier settings, ne pas oublier de limiter à nouveau
les droits

```shell
chmod a-w web/sites/default
chmod a-w web/sites/default/settings.php
```

A la base se fichier n'est pas versionné pour des raisons de sécurité.
Si jamais le projet Git est piraté, nous ne voulons pas que des personnes
malveillantes accèdent aux identifiants de connexion de notre base de données.

Mais comme nous utilisons un fichier .env qui lui est propre à chaque environnement
pour simplifier le travail en équipe nous pouvons versionner le fichier settings.

Pour ça il suffit d'ouvrir le fichier .gitignore à la racine du projet et commenter
ou supprimer la ligne suivante :

```.gitignore
/web/sites/*/settings.php
```

Préparer une configuration locale.

Texte explicatif nous avons une configuration globale, maintenant nous voulons
définir une configuration pour notre environnement de développement.

Settings.local

Présentation du fichier
Pour dupliquer le fichier example.settings.local.php :

```shell
chmod a+w web/sites/default
cp web/sites/example.settings.local.php web/sites/default/settings.local.php
chmod a-w web/sites/default
```

local.services

Présentation du fichier
Pour dupliquer le fichier local.services.php :

```shell
chmod a+w web/sites/default
cp web/sites/default/default.services.yml web/sites/default/local.services.yml
chmod a-w web/sites/default
```

Il nous reste plus qu'à indiquer à Drupal que ces fichiers existent
Authorisez la modification du fichier settings.php avec :

```shell
chmod a+w web/sites/default
chmod a+w web/sites/default/settings.php
```

puis décommentez cette partie du code :

```php
# if (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {
#   include $app_root . '/' . $site_path . '/settings.local.php';
# }
```

Le fichier settings.local est bien pris en compte.

Et pour prendre en compte le fichier local.services.yml, ajoutez la seconde ligne
en dessous de la première (déjà présente)

```php
$settings['container_yamls'][] = $app_root . '/' . $site_path . '/services.yml';
$settings['container_yamls'][] = $app_root . '/' . $site_path . '/local.services.yml';
```
Une fois les modifications effectuées, on retire les droits sur le dossier default
et le fichier settings.php

```shell
chmod a-w web/sites/default
chmod a-w web/sites/default/settings.php
```
