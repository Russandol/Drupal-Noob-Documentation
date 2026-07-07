# Drush

## Présentation

**[Drush](https://www.drupal.org/docs/develop/development-tools/drush)** est un outil en ligne de commande incontournable.
Il propose de nombreuses lignes de commandes pour automatiser des tâches courantes. Il permet par exemple la gestion
simplifiée des modules et des thèmes, la gestion des caches, etc..

Certains modules implémentent même des commandes **Drush** pour simplifier leur utilisation.

## Installation

Pour installer **Drush**, tapez la commande suivante :

```shell
ddev composer require drush/drush
```

Une fois l'installation terminée, vous pouvez tester en tapant tout simplement `ddev drush` dans votre terminal. La commande
doit afficher une liste de commandes disponibles.

::: tip 💡 La commande `drush`
Normalement, la commande `drush` n'est disponible qu'en tapant `vendor\bin\drush` en étant connecté au conteneur **Docker**.
Tout comme avec **Composer**, **DDEV** permet de simplifier énormément l'utilisation des commandes.
:::

## Liste des commandes disponibles

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
