# 🗄️ Le cache avec Redis dans Drupal

**Redis** est un système de stockage de données en mémoire, utilisé ici comme backend de cache pour **Drupal 11**.
En remplaçant le cache par défaut (base de données), **Redis** améliore significativement les performances en stockant 
les données en RAM.

**Objectifs :**
- Installer et configurer **Redis** dans un environnement **DDEV**.
- Comprendre la configuration générée automatiquement.
- Savoir utiliser le CLI **Redis** pour inspecter et gérer le cache.

## 🧩 Présentation

Par défaut, **Drupal** stocke ses caches dans la base de données **MySQL**. Chaque requête de cache génère donc des 
requêtes SQL, ce qui ralentit l'application.

**Redis** (Remote Dictionary Server) est une base de données clé-valeur en mémoire. En déléguant le cache à **Redis**, on 
évite ces requêtes SQL coûteuses et on réduit considérablement le temps de réponse des pages.

::: info ℹ️ Quand utiliser Redis ?
**Redis** est particulièrement utile sur des projets avec un volume de contenu important, des pages fréquemment 
visitées, ou des traitements en arrière-plan intensifs (Queue, Migrate, etc.).
:::

## ⚙️ Installation de l'add-on Redis pour DDEV

**DDEV** propose un add-on officiel pour intégrer **Redis** directement dans l'environnement de développement.

```shell
ddev add-on get ddev/ddev-redis
ddev restart
```

L'add-on va :
- Créer un nouveau conteneur **Docker** dédié à **Redis**.
- Générer le fichier *web/sites/default/settings.ddev.redis.php*.
- Rendre **Redis** accessible depuis le conteneur **PHP** de **DDEV**.

::: tip 💡 Bonne pratique
Commitez le dossier *.ddev/* dans votre dépôt **Git**. Cela permet à tous les membres de l'équipe d'avoir la même 
configuration **Redis** automatiquement après un `ddev start`.
:::

## 📦 Installation du module Redis pour Drupal

Le module contrib **Redis** fournit l'intégration côté **Drupal** pour utiliser **Redis** comme backend de cache.

```shell
ddev composer require drupal/redis
ddev drush en redis
```

::: warning ⚠️ Attention
N'activez pas le module avant d'avoir configuré la connexion dans *settings.php*, sinon **Drupal** tentera de se 
connecter à **Redis** avec des paramètres invalides et affichera une erreur.
:::

## 📄 Le fichier *settings.ddev.redis.php*

L'add-on **DDEV** génère automatiquement le fichier *web/sites/default/settings.ddev.redis.php*. Ce fichier contient la 
configuration de connexion à **Redis** ainsi que la configuration du module.

Voici le contenu typique de ce fichier :

```php
<?php
// #ddev-generated
use Drupal\Core\Installer\InstallerKernel;

if (!InstallerKernel::installationAttempted() && extension_loaded('redis') && class_exists('Drupal\redis\ClientFactory')) {
  // Set Redis as the default backend for any cache bin not otherwise specified.
  $settings['cache']['default'] = 'cache.backend.redis';
  $settings['redis.connection']['host'] = 'redis';
  $settings['redis.connection']['port'] = 6379;

  // Apply changes to the container configuration to better leverage Redis.
  // This includes using Redis for the lock and flood control systems, as well
  // as the cache tag checksum. Alternatively, copy the contents of that file
  // to your project-specific services.yml file, modify as appropriate, and
  // remove this line.
  $settings['container_yamls'][] = 'modules/contrib/redis/example.services.yml';

  // Allow the services to work before the Redis module itself is enabled.
  $settings['container_yamls'][] = 'modules/contrib/redis/redis.services.yml';

  // Manually add the classloader path, this is required for the container cache bin definition below
  // and allows to use it without the redis module being enabled.
  $class_loader->addPsr4('Drupal\\redis\\', 'modules/contrib/redis/src');

  // Use redis for container cache.
  // The container cache is used to load the container definition itself, and
  // thus any configuration stored in the container itself is not available
  // yet. These lines force the container cache to use Redis rather than the
  // default SQL cache.
  $settings['bootstrap_container_definition'] = [
    'parameters' => [],
    'services' => [
      'redis.factory' => [
        'class' => 'Drupal\redis\ClientFactory',
      ],
      'cache.backend.redis' => [
        'class' => 'Drupal\redis\Cache\CacheBackendFactory',
        'arguments' => ['@redis.factory', '@cache_tags_provider.container', '@serialization.phpserialize'],
      ],
      'cache.container' => [
        'class' => '\Drupal\redis\Cache\PhpRedis',
        'factory' => ['@cache.backend.redis', 'get'],
        'arguments' => ['container'],
      ],
      'cache_tags_provider.container' => [
        'class' => 'Drupal\redis\Cache\RedisCacheTagsChecksum',
        'arguments' => ['@redis.factory'],
      ],
      'serialization.phpserialize' => [
        'class' => 'Drupal\Component\Serialization\PhpSerialize',
      ],
    ],
  ];
}
```

::: info ℹ️ Le hostname `redis`
Dans l'environnement **DDEV**, le conteneur **Redis** est accessible via le hostname `redis`. Ce nom est résolu 
automatiquement par le réseau interne **Docker**.
:::

## 🔧 Modifier *settings.php* pour préserver *settings.local.php*

Le fichier *web/sites/default/settings.php* inclut par défaut *settings.local.php* à la fin. Or, l'add-on **DDEV** ajoute 
ses propres inclusions (dont *settings.ddev.redis.php*) via *settings.ddev.php*, qui est inclus plus bas.

Si *settings.local.php* est chargé **avant** les fichiers **DDEV**, ses paramètres risquent d'être écrasés. Il faut donc 
s'assurer que *settings.local.php* est chargé **en dernier**.

Vérifiez que la fin de votre *settings.php* ressemble à ceci :

```php
// Inclusions DDEV en premier (Redis, Mailpit, etc.)
if (file_exists($app_root . '/' . $site_path . '/settings.ddev.php')) {
  include $app_root . '/' . $site_path . '/settings.ddev.php';
}

// settings.local.php en dernier pour surcharger si nécessaire.
if (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {
  include $app_root . '/' . $site_path . '/settings.local.php';
}
```

::: warning ⚠️ Ordre de chargement
Si *settings.local.php* est chargé **avant** *settings.ddev.php*, les paramètres de connexion **Redis** définis par 
**DDEV** seront ignorés, et le cache ne fonctionnera pas correctement.
:::

::: tip 💡 Bonne pratique
Ne commitez jamais *settings.local.php* dans **Git**. Ajoutez-le à votre *_.gitignore_*. Il doit contenir uniquement 
des surcharges locales à chaque développeur.
:::

## 🖥️ Le CLI Redis

**DDEV** expose directement le CLI **Redis** via la commande `ddev redis-cli`, permettant d'inspecter et de gérer le cache en temps réel depuis le terminal.

```shell
ddev redis-cli
```

## 🛠️ Les commandes utiles

Accédez au CLI **Redis** directement depuis **DDEV** :

```shell
ddev redis-cli
```

| Commande | Description |
|---|---|
| `PING` | Vérifier que Redis répond (`PONG`) |
| `INFO` | Afficher les statistiques du serveur Redis |
| `DBSIZE` | Afficher le nombre de clés stockées |
| `KEYS *` | Lister toutes les clés (à éviter en production) |
| `GET <clé>` | Lire la valeur d'une clé |
| `DEL <clé>` | Supprimer une clé |
| `FLUSHDB` | Vider toute la base de données Redis courante |
| `MONITOR` | Surveiller les commandes en temps réel |

::: danger 🚨 FLUSHDB et FLUSHALL
`FLUSHDB` supprime **toutes** les données de la base courante. `FLUSHALL` supprime les données de **toutes** les bases. 
Ne jamais exécuter ces commandes en production sans en mesurer l'impact.
:::

### Commandes DDEV

| Commande | Description |
|---|---|
| `ddev redis-cli` | Ouvrir le CLI Redis |
| `ddev logs -s redis` | Afficher les logs du conteneur Redis |

::: details Aller plus loin
Pour inspecter les clés de cache **Drupal** dans **Redis**, elles suivent le format `<prefix>:<bin>:<cid>`. Par exemple :

```
redis-cli KEYS "drupal:*"
```

Cela permet d'identifier rapidement quels bins de cache consomment le plus de mémoire.
:::
