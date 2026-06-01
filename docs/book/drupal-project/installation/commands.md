# 📄 COMMANDS

Depuis le début de cette formation, nous avons utilisé un bon nombre de commandes : **DDEV**, **Composer**, **Drush**,
**Git**... Et ce n'est que le début !

Au fil du temps, il devient difficile de se souvenir de toutes ces commandes, de leurs options et de leurs alias.
C'est pourquoi je vous propose de créer un fichier *COMMANDS.md* à la racine du projet.

Ce fichier a un objectif simple : servir de **mémo rapide** pour retrouver en un coup d'œil les commandes les plus
utilisées au quotidien. C'est un gain de temps pour vous, mais aussi pour toute personne qui rejoint le projet.

À la racine du projet, créez un fichier *COMMANDS.md* :

```shell
touch COMMANDS.md
```

Et ajoutez le contenu suivant :

```markdown
# 📄 COMMANDS

Ce fichier rassemble les commandes les plus utilisées dans le projet. Il sert de mémo rapide pour le quotidien.

* [DDEV](#-ddev)
* [Composer](#-composer)
* [Drush](#-drush)
* [Code Quality](#-code-quality)
* [Git](#-git)

## 🐳 DDEV

| Commande | Description |
  |---|---|
| `ddev start` | Démarrer l'environnement |
| `ddev stop` | Arrêter l'environnement |
| `ddev restart` | Redémarrer l'environnement |
| `ddev describe` | Afficher les informations du projet (URL, services, ports) |
| `ddev launch` | Ouvrir le site dans le navigateur |
| `ddev ssh` | Se connecter au conteneur web en SSH |
| `ddev import-db --file=dump.sql.gz` | Importer une base de données |
| `ddev export-db --file=dump.sql.gz` | Exporter la base de données |
| `ddev mysql` | Ouvrir un client MySQL |
| `ddev phpmyadmin` | Ouvrir phpMyAdmin dans le navigateur |
| `ddev poweroff` | Arrêter tous les projets DDEV |

## 📦 Composer

| Commande | Description |
  |---|---|
| `ddev composer install` | Installer les dépendances du projet |
| `ddev composer update` | Mettre à jour les dépendances |
| `ddev composer require vendor/package` | Ajouter une dépendance |
| `ddev composer remove vendor/package` | Supprimer une dépendance |
| `ddev composer outdated` | Lister les dépendances obsolètes |

## 🔨 Drush

### Cache

| Commande | Description |
  |---|---|
| `ddev drush cr` | Vider le cache (cache:rebuild) |

### Configuration

| Commande | Description |
  |---|---|
| `ddev drush cex` | Exporter la configuration (config:export) |
| `ddev drush cim` | Importer la configuration (config:import) |
| `ddev drush cst` | Afficher les différences de configuration (config:status) |

### Site

| Commande | Description |
  |---|---|
| `ddev drush si --existing-config` | Installer le site à partir de la configuration |
| `ddev drush uli` | Générer un lien de connexion administrateur |
| `ddev drush upwd` | Permet de changer le mot de passe d'un utilisateur |
| `ddev drush st` | Afficher le statut du site (status) |
| `ddev drush updb` | Exécuter les mises à jour de la base de données |

### Modules

| Commande | Description |
  |---|---|
| `ddev drush en nom_module` | Activer un module (pm:enable) |
| `ddev drush pmu nom_module` | Désactiver un module (pm:uninstall) |
| `ddev drush pml` | Lister les modules (pm:list) |

### Déploiement

| Commande | Description |
  |---|---|
| `ddev drush deploy` | Exécuter les étapes de déploiement (updb + cim + cr) |

### Flags utiles

Ces options globales peuvent être ajoutées à **n'importe quelle commande Drush** :

| Flag | Alias | Description |
|---|---|---|
| `--yes` | `-y` | Accepter automatiquement toutes les confirmations |
| `--no` | `-n` | Refuser automatiquement toutes les confirmations |
| `--verbose` | `-v` | Afficher des informations détaillées sur l'exécution |
| `--debug` | `-vvv` | Afficher les informations de débogage (très verbeux) |
| `--simulate` | | Simuler l'exécution sans appliquer les changements |
| `--uri=URI` | `-l` | Définir l'URL de base du site (utile en multisite) |
| `--xdebug` | | Activer Xdebug pour déboguer la commande Drush dans l'IDE |

## 🔍 Code Quality

### PHPUnit

| Commande | Description |
|---|---|
| `ddev exec phpunit` | Lancer tous les tests |
| `ddev exec phpunit --filter NomDuTest` | Lancer un test spécifique |
| `ddev exec phpunit path/to/tests` | Lancer les tests d'un répertoire |
| `ddev exec phpunit --coverage-html reports/` | Générer un rapport de couverture HTML |

### PHPStan

| Commande | Description |
|---|---|
| `ddev exec phpstan analyse` | Lancer l'analyse statique du code |
| `ddev exec phpstan analyse --level=max` | Lancer l'analyse au niveau le plus strict |
| `ddev exec phpstan analyse path/to/module` | Analyser un répertoire spécifique |

### PHP_CodeSniffer

| Commande | Description |
|---|---|
| `ddev exec phpcs` | Vérifier le respect des standards de codage |
| `ddev exec phpcs --standard=Drupal path/to/module` | Vérifier avec le standard Drupal |
| `ddev exec phpcs --standard=DrupalPractice path/to/module` | Vérifier les bonnes pratiques Drupal |
| `ddev exec phpcbf` | Corriger automatiquement les erreurs de codage |
| `ddev exec phpcbf --standard=Drupal path/to/module` | Corriger automatiquement avec le standard Drupal |

## 🌿 Git

### Commandes de base

| Commande | Description |
  |---|---|
| `git status` | Afficher l'état des fichiers |
| `git add .` | Ajouter tous les fichiers modifiés |
| `git commit -m "message"` | Créer un commit |
| `git push` | Envoyer les commits sur le dépôt distant |
| `git pull` | Récupérer les dernières modifications |

### Branches

| Commande | Description |
  |---|---|
| `git branch` | Lister les branches |
| `git checkout -b nom-branche` | Créer et basculer sur une nouvelle branche |
| `git checkout nom-branche` | Basculer sur une branche existante |
| `git merge nom-branche` | Fusionner une branche dans la branche courante |

### Historique

| Commande | Description |
  |---|---|
| `git log --oneline` | Afficher l'historique des commits (résumé) |
| `git diff` | Afficher les modifications non indexées |

```

Tout comme le *README.md*, ce fichier doit **évoluer avec le projet**. N'hésitez pas à le compléter au fur et à mesure
que de nouvelles commandes deviennent indispensables dans votre workflow.

::: tip 💡 Bonne pratique
Ce fichier n'est pas un standard universel comme le *README.md*, mais c'est une habitude que je recommande fortement.

Sur un projet avec plusieurs développeurs, un fichier *COMMANDS.md* bien maintenu évite les allers-retours sur la
documentation et les messages du type *"c'est quoi déjà la commande pour... ?"*.
:::

::: info Le projet est enfin prêt !
Nous allons enfin mettre les mains dans le cambouis ! **Drupal** nous tend les bras.

MAIS il reste un dernier petit détail : [faire un commit](/drupal-project/installation/git_commit).
:::