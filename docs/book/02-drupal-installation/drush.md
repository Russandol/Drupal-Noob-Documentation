# Drupal - Premier module

Après avoir réalisé l'installation initiale de **Drupal**, il est essentiel de procéder à certaines configurations pour
optimiser notre environnement. Cette étape cruciale nécessite des modifications dans les fichiers de configurations.

Cependant, avant de procéder à ces modifications, nous allons d'abord installer un module indispensable : **Drush**.

## C'est quoi un module ?

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

## Drush

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