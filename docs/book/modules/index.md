# C'est quoi un module dans Drupal ?

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