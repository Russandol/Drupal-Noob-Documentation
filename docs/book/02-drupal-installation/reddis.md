# Drupal - Le cache avec Redis

## C'est quoi Redis ?

**Redis** est une base de données en mémoire orientée clé-valeur, souvent utilisée comme système de cache pour améliorer 
les performances et réduire les accès à la base de données.

Dans **Drupal**, **Redis** est utilisé pour stocker en mémoire des données telles que les pages, 
les sessions ou les métadonnées, afin de réduire les requêtes vers la base de données et d’accélérer le rendu des pages.

Nous avons déjà évoqué **Redis** lors de la configuration des environnements **Docker**. Mais si, rappelez-vous ! Nous
avons défini un service `redis` et nous avons même créé un volume dédié `redis-data`.

## Installation

Connectez-vous au conteneur du service `drupal` avec notre commande **Make** :
```shell
make shell
```

Installer le module **Redis** et initialisez-le avec **Drush** :
```shell
composer require drupal/redis
drush en redis
```

## Configurations

Nous allons devoir rajouter des configurations dans nos fichiers settings.

Mais pour éviter de surcharger le fichier *settings.php*, nous allons créer un nous fichier de configuration.

Tout d'abord commençons par nous donner les droits : 

```shell
chmod u+w web/sites/default
chmod u+w web/sites/default/settings.php
```

Créons un dossier *settings* qui regroupera l'ensemble de nos fichiers personnalisés : 
```shell
mkdir web/sites/default/settings
```

Maintenant créons un fichier *redis.php* : 
```shell
touch web/sites/default/settings/redis.php
```

Dans ce fichier, ajoutez la configuration suivante : 
```php
// Activer Redis comme backend de cache par défaut.
$settings['redis.connection']['interface'] = 'PhpRedis';
$settings['redis.connection']['host'] = 'redis'; // correspond au nom du service Docker

// Définir Redis comme backend de cache par défaut.
$settings['cache']['default'] = 'cache.backend.redis';

// Ajouter aux services la configuration de redis
$settings['container_yamls'][] = $app_root . '/' . $site_path . '/settings/services.redis.yml';
```

Comme vous vous en doutez, il faut maintenant créer le fichier *web/sites/default/settings/services.redis.yml*.
```shell
touch web/sites/default/settings/services.redis.yml
```

Et ajoutez le contenu suivant :
```yaml
# Définition des paramètres généraux pour Redis
parameters:
  # Paramètres de connexion Redis
  redis.connection:
    host: 'redis'     # Nom d'hôte ou service Docker où Redis est exposé
    port: 6379        # Port sur lequel Redis écoute (par défaut 6379)

services:
  # Backend pour le checksum des cache tags. Utilisé par Redis et la plupart des autres backends
  # pour gérer l'invalidation des cache tags.
  cache_tags.invalidator.checksum:
    class: Drupal\redis\Cache\RedisCacheTagsChecksum
    arguments: ['@redis.factory']
    tags:
      - { name: cache_tags_invalidator }

  # Remplace le backend de verrouillage par défaut par une implémentation Redis.
  lock:
    class: Drupal\Core\Lock\LockBackendInterface
    factory: ['@redis.lock.factory', get]

  # Remplace le backend de verrouillage persistant par défaut par une implémentation Redis.
  lock.persistent:
    class: Drupal\Core\Lock\LockBackendInterface
    factory: ['@redis.lock.factory', get]
    arguments: [true]

  # Remplace le backend de flood par défaut par une implémentation Redis.
  flood:
    class: Drupal\Core\Flood\FloodInterface
    factory: ['@redis.flood.factory', get]
```

Il ne reste plus qu'à indiquer à *web/sites/default/settings.php* de prendre en compte tous les fichiers de configurations
de notre dossier *settings*.

Dans le fichier *web/sites/default/settings.php*, faites les modifications suivantes : 
```php
// Code existant
if (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {
  include $app_root . '/' . $site_path . '/settings.local.php';
}

// Import all additionals settings
foreach (glob($app_root . '/' . $site_path . '/settings/*.php') as $filename) {
  include $filename;
}
```

Ainsi, peu importe le fichier settings que nous ajouterons dans notre dossier, il sera pris en compte dans la configuration
de **Drupal**.

Nous pourrions tout aussi bien créer un fichier de settings spécifique pour les informations de connexion à la base de données.
Je vous laisse le soin de le faire si vous le souhaitez.

Une fois les modifications terminées, n'oublions pas de fermer les droits en écriture : 
```shell
chmod u-w web/sites/default
chmod u-w web/sites/default/settings.php
```

## Tester

Pour pouvoir tester si **Redis** fonctionne, nous aurons avant tout besoin de nous connecter au conteneur du service `redis`.

Déconnectez-vous du conteneur du service `drupal` avec la commande `exit`. Puis utilisez la commande suivante : 
```shell
docker compose exec redis redis-cli
```

`redis-cli` est le client en ligne de commande officiel de **Redis**. Il nous permet d’interagir directement avec notre 
serveur Redis depuis un terminal.

Une fois connectez, tapez la commande `ping`. **Redis** devrait répondre avec `PONG`.

> ⚠️ Les développeurs ont généralement beaucoup d'humour, il est important d'être préparé à l'hilarité.

Cette commande permet de vérifier que **Redis** est accessible et fonctionne.

Nous pouvons également vérifier le bon fonctionnement de **Redis** avec la commande `monitor`.
Cette commande permet de voir en temps réel toutes les commandes qui sont exécutées sur le serveur **Redis**.

Vous devriez voir ce type de message apparaitre de manière régulière : 
```shell
1758286293.633563 [0 127.0.0.1:60694] "ping"
```

C'est tout à fait normal, car lors de notre configuration **Docker**, nous avons ajouter un `healthcheck` au service `redis` qui 
lance un `ping` toutes les 30 secondes.

Et pour vérifier que **Redis** est bien configuré à **Drupal**, il vous suffit d'actualiser la page d'accueil de notre site.

De nombreuses lignes apparaissent dans le moniteur avec une clef qui commence par `drupal.redis.11.2.4..`.

C'est la preuve que **Redis** fonctionne correctement.

Vous pouvez quitter le moniteur avec la touche `CTRL + C`. Puis quitter le conteneur avec la commande `exit`.

## Mise à jour du Makefile

Toujours dans l'idée de simplifier notre workflow de travail, je vous propose de rajouter une commande `make redis-cli` 
dans son propre **Makefile**.

Créez un fichier *make/redis.mk* :
```shell
touch make/redis.mk
```

Et ajoutez le contenu suivant : 
```makefile
# Dependencies: Requires DOCKER_EXEC variable from main Makefile

# Help messages
REDIS_HELP_TEXT = "\
  make redis-cli - Access a terminal inside the container\n"

# Prevents conflicts if files with the same name exist
.PHONY: redis-cli

redis-cli:
	@$(DOCKER_EXEC) redis redis-cli
```

Puis modifier le fichier *Makefile* :
```makefile
# Define default target
.DEFAULT_GOAL := help

# Docker variables
PROD_COMPOSE = compose-prod.yml
DOCKER_EXEC = docker compose exec
DOCKER_EXEC_DRUPAL = $(DOCKER_EXEC) -u application drupal

# Include make files
include make/docker.mk
include make/drupal.mk
include make/redis.mk

# Prevents conflicts if files with the same name exist
.PHONY: help

# Display help (default command)
help:
	@echo "🚀 Available commands:"
	@echo ""
	@echo "📦 Docker Commands:"
	@echo $(DOCKER_HELP_TEXT)
	@echo ""
	@echo "🌐 Drupal Commands:"
	@echo $(DRUPAL_HELP_TEXT)
	@echo ""
	@echo "📝 Redis Commands:"
	@echo $(REDIS_HELP_TEXT)
	@echo ""
	@echo "💡 Usage: make <command>"
```