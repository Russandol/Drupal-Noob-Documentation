# 🏛️ Drupal - Architecture des fichiers

Notre site **Drupal** est installé et initialisé.

Notre projet a maintenant l'architecture suivante :
```
.
├── .ddev/
├── recipes/
├── vendor/
├── web/
│   ├── core
│   ├── modules
│   ├── profiles
│   ├── sites
│   └── themes
├── composer.json
└── composer.lock
```

Faisons un rapide tour d'horizon des nouveaux dossiers et fichiers.

## recipes/

Les **recipes** automatisent l’installation et la configuration des modules en créant des scripts capables d’installer des 
modules et des thèmes, et de configurer un site **Drupal** déjà existant.

Nous aborderons les **recipes** dans un prochain chapitre.

## vendor/

Le dossier *vendor* contient les dépendances de notre projet **Drupal**.

## web/

C'est le dossier racine de notre site **Drupal**. C'est dans ce dossier que se trouvent les fichiers principaux du site.
C'est également dans ce dossier que nous allons principalement développer.

D'ailleurs, souvenez-vous, lors de l'installation du projete avec **DDEV**, nous avons précisé `--docroot=web`.

### web/core/

Ce dossier contient les fichiers principaux du cœur de **Drupal**. Ce qui est un peu surprenant d'ailleurs, on pourrait
s'attendre à ce que tout se trouve dans le dossier *vendor*.

### web/modules/

Comme son nom l'indique, ce dossier contient les modules **Drupal**, qu'ils soient contribués, c'est-à-dire installés via
**Composer**, ou que nous développerons nous même.

### web/profiles/

Le dossier *web/profiles* contient les profils d'installation de Drupal. Ce sont des ensembles de configurations, 
modules et thèmes qui définissent comment un site Drupal sera configuré lors de son initialisation.

Avec l'apparition de la version 10.3 de **Drupal**, les profils d'installation vont peu à peu disparaître. Raison pour
laquelle nous n'aborderons pas les profils d'installation dans cette formation.

### web/themes/

Ce dossier contient les thèmes graphiques de **Drupal**. Tout comme pour le dossier *web/modules*, les thèmes peuvent
être contribués ou créés de toutes pièces.

### web/sites/

Ce dossier contient les fichiers de configuration du site **Drupal**.

## composer.json et composer.lock

Ces fichiers sont générés automatiquement par **Composer** lors de l'installation des dépendances du projet.

## Une architecture simple

Comme vous pouvez le voir, l'architecture d'un projet **Drupal** est sobre et bien structurée. Nous allons principalement
travailler dans le dossier *web/modules* et *web/themes*.

::: info Gérer le versionnage des fichiers
Comme vu lors d'un précédent chapitre, nous avons initialisé **Git** sur notre projet. Faisons un point sur les fichiers
que nous souhaitons versionner avec le fichier [*.gitignore*](/drupal-project/installation/gitignore).
:::
