# Redis

Installation du module **Redis**

```shell
composer require drupal/redis
drush en redis
```

donner les droits d'écritures au dossier et fichier de configuration

[//]: # (TODO proposer de créer un fichier de settings particulier, appelé dans settings.php)
dans *settings.php*, ajouter : 

```php
// Activer Redis comme backend de cache par défaut.
$settings['redis.connection']['interface'] = 'PhpRedis';
$settings['redis.connection']['host'] = 'redis'; // correspond au nom du service Docker

// Définir Redis comme backend de cache par défaut.
$settings['cache']['default'] = 'cache.backend.redis';
```

Création d'un fichier *services.redis.yml*

```yaml
# Définition de paramètres généraux pour Redis
parameters:
  # Paramètres de connexion Redis
  redis.connection:
    host: 'redis'     # Nom d'hôte ou service Docker où Redis est exposé
    port: 6379        # Port sur lequel Redis écoute (par défaut 6379)

# Définition des services Symfony (Drupal utilise le service container de Symfony)
services:
  # Service "factory" pour créer une connexion Redis
  redis.factory:
    class: Redis                             # Classe PHP utilisée pour représenter la connexion
    factory: ['Drupal\redis\ClientFactory', 'getFactory']
    # Méthode statique qui renvoie une instance de Redis
    # '@redis.factory' sera utilisé dans d'autres services pour obtenir la connexion

  # Service du cache principal utilisant Redis
  cache.backend.redis:
    class: Drupal\redis\Cache\PhpRedis       # Classe Drupal pour utiliser Redis comme cache backend
    arguments: ['@redis.factory', 'default']
    # '@redis.factory' : injecte la connexion Redis
    # 'default' : nom du cache bucket (pour les clés par défaut)

  # Service pour gérer les verrous (locks) via Redis
  lock.redis:
    class: Drupal\redis\Lock\RedisLockBackend # Classe Drupal qui remplace le système de verrouillage par Redis
    arguments: ['@redis.factory']
    # '@redis.factory' : injecte la connexion Redis pour stocker les locks

```

Ajouter cette ligne dans notre settings

```php
$settings['container_yamls'][] = $app_root . '/' . $site_path . '/services.redis.yml';
```

Tester si ça marche : 
```shell
docker exec -it din-os-redis-1 redis-cli ping
```