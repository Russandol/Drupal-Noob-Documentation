# 📝 Les fichiers settings

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
│       ├── default/
│       │   ├── default.services.yml
│       │   ├── default.settings.php
│       │   ├── settings.ddev.php
│       │   └── settings.php
│       ├── development.services.yml
│       ├── exemple.settings.local.php
│       └── exemple.sites.php   
```

::: tip ❓Pourquoi ces fichiers sont dans un dossier *default* ?
**Drupal** permet nativement de faire fonctionner plusieurs sites web à partir d'une seule installation de code.
C'est ce qu'on appelle le **multisite**. Chaque site possède le même codebase, mais possède sa propre configuration et
sa propre base de données.

Pour distinguer la configuration de chaque site, les fichiers de configuration sont donc dans un dossier, */default* est
celui par défaut.
:::

Ça en fait des fichiers de configuration !

Faisons un tour d'horizon.

## Définition des fichiers

### Les fichiers modèles.

Plusieurs d'entre eux sont des fichiers modèles fournis par **Drupal**. Ils sont utilisés soit par **Drupal**, soit par
nous comme références de configuration.

#### /default/default.settings.php

Ce fichier contient toutes les directives de configuration possibles avec leurs **valeurs par défaut** et de 
nombreux commentaires explicatifs.

Lors de l'installation de **Drupal**, ce fichier est copié pour créer le vrai fichier *settings.php* qui sera utilisé 
par le site. Il sert uniquement de référence et est écrasé à chaque mise à jour du cœur de **Drupal**.

#### /default/default.services.yml

C'est la configuration des services **Symfony** utilisés par **Drupal**. Il permet de personnaliser le comportement 
bas niveau du framework, comme :

* Les paramètres de **cache** (cache des pages, cache de rendu…)
* La configuration des **sessions**
* Les paramètres **CORS** (Cross-Origin Resource Sharing)
* Le niveau de **logging** et de débogage (affichage des erreurs Twig, collecte des données de debug…)

#### /exemple.settings.local.php

C'est un fichier modèle destiné à la configuration locale du développeur. Il est pensé pour être copié en 
*settings.local.php* et contient des réglages utiles en environnement de développement, par exemple :

* Désactiver le **cache** (cache de rendu, cache des pages agrégées…)
* Activer l'**affichage détaillé des erreurs**
* Activer le mode **debug de Twig** (rechargement des templates, commentaires HTML…)
* Charger un fichier *services.yml* spécifique au développement

#### /exemple.sites.php

C'est le fichier modèle pour la configuration multisite. Il permet de créer un mapping (correspondance) entre des noms 
de domaine ou des URLs et les dossiers de configuration dans sites/.

Par exemple, on peut y définir que :

* `monsite.local` → utilise *sites/default/*
* `blog.monsite.com` → utilise *sites/blog/*
* `localhost:8080` → utilise *sites/dev/*

Ce fichier n'est utile que si vous utilisez la fonctionnalité multisite de Drupal ou si vous avez besoin d'associer un 
alias de domaine à un dossier de configuration spécifique. Dans le cas d'un site unique, il n'est pas nécessaire de le configurer.

### /default/settings.php

C'est le fichier de configuration principal de votre site **Drupal**. C'est lui qui est réellement lu et utilisé par **Drupal** 
à chaque requête. Il est généré à partir du modèle *default.settings.php* lors de l'installation.

On y retrouve notamment :

* La connexion à la **base de données** (hôte, nom de la base, identifiants…)
* Le **salt** de hachage, utilisé pour sécuriser les cookies et les tokens
* Le chemin vers le dossier de **synchronisation de configuration**
* Les **paramètres de confiance** (`trusted_host_patterns`) pour protéger le site contre les attaques par en-tête `Host`
* L'inclusion conditionnelle d'autres fichiers de configuration (comme *settings.local.php* ou *settings.ddev.php*)

### /default/settings.ddev.php

C'est un fichier de configuration généré automatiquement par **DDEV**. Il est inclus par *settings.php* et a pour rôle de 
surcharger la configuration pour l'adapter à l'environnement **Docker** de **DDEV**.

Il contient principalement :

* La connexion à la **base de données** avec les paramètres propres au conteneur **DDEV** (db comme hôte, db comme nom de base, 
utilisateur et mot de passe par défaut…)
* La configuration du **host de Solr** ou d'autres services si vous les utilisez dans **DDEV**
* Le réglage des **trusted host patterns** pour accepter les URLs locales générées par **DDEV** (ex : `monsite.ddev.site`)

## Nouvelle architecture

### La problématique

Cette configuration de base est suffisante pour un site **Drupal** simple. Mais elle présente deux limites importantes :

1. Notre projet est liée à **DDEV**.

Actuellement c'est le fichier *settings.ddev.php* qui surcharge la configuration de connexion à la base de données,
le `hash_salt`, etc.. Si demain nous devons déployer notre projet sur un serveur de staging, de production ou même sur
un environnement de développement sans **DDEV**, notre site ne fonctionnera pas. La configuration dépend d'un outil qui 
n'existera pas partout.

2. Le fichier *settings.php* peut devenir ingérable.

Au fil du projet, nous allons avoir besoin d'ajouter de la configuration spécifique : paramètres de synchronisation de
configuration, cache **Redis**, etc.. Si nous ajoutons tout dans *settings.php*, le fichier deviendra rapidement un bloc
monolithique difficile à lire et à maintenir.

### La solution

Pour résoudre ces deux problèmes, nous allons adopter une architecture de settings modulaire :

* Créer des fichiers de settings séparés, chacun dédié à un aspect précis de la configuration 
(base de données, cache, synchronisation de config…). Cela permet de garder chaque fichier court, 
lisible et avec une responsabilité claire.
* Modifier *settings.php* pour qu'il importe automatiquement tous ces fichiers. L'import doit se faire avant l'inclusion 
de *settings.ddev.php*, afin que **DDEV** puisse toujours surcharger la configuration en local si nécessaire, 
tout en gardant une base qui fonctionne sur n'importe quel environnement.

Notre architecture de fichier de configuration ressemblera à ceci :
```
..
├── web/
│   └── sites/
│       ├── default/
│       │   └── settings/
│       │   │   ├── database.php
│       │   │   └── trust_host_patterns.php
│       │   ├── default.services.yml
│       │   ├── default.settings.php
│       │   ├── settings.ddev.php
│       │   └── settings.php
│       ├── development.services.yml
│       ├── exemple.settings.local.php
│       └── exemple.sites.php   
```

#### Le dossier /settings

Commençons par créer le dossier *settings* et les fichiers de configuration.

```shell
mkdir web/sites/default/settings
touch web/sites/default/settings/database.php
touch web/sites/default/settings/trusted_host_patterns.php
```

Et nous allons pour le moment simplement reprendre le contenu du fichier *default/settings.ddev.php*.

```php
<?php
# web/sites/default/settings/database.php

$host = "db";
$port = 3306;
$driver = "mysql";

$databases['default']['default']['database'] = "db";
$databases['default']['default']['username'] = "db";
$databases['default']['default']['password'] = "db";
$databases['default']['default']['host'] = $host;
$databases['default']['default']['port'] = $port;
$databases['default']['default']['driver'] = $driver;

```

```php
<?php
# web/sites/default/settings/trusted_host_patterns.php

$settings['trusted_host_patterns'] = [];
```

::: tip ❓Pourquoi un fichier dédié pour si peu ?
On peut légitimement se demander l'intérêt d'avoir un fichier qui ne contient au final qu'une seule ligne de code.
Et surtout la ligne est déjà présente dans le fichier *default/settings.php* !

Là, c'est purement une préférence personnelle. Je trouve plus pratique d'avoir un fichier dédié plutôt que de devoir
chercher à l'intérieur du fichier *default/settings.php*, surtout lorsque l'on doit faire une modification dans le code
depuis un terminal (lors d'une connexion en SSH par exemple).

Mais vous pouvez très bien décider de laisser cette info dans le fichier *default/settings.php*.
:::

Bien entendu, nous allons créer d'autres fichiers de configuration au fur et à mesure de la formation.

#### Mise à jour du fichier *default/settings.php*

Nous devons maintenant indiquer dans le fichier *default/settings.php* qu'il faut charger tous les fichiers qui 
se trouvent dans le dossier *default/settings*.

Et comme précisé plus haut, cette inclusion doit être faite avant l'inclusion du fichier *default/settings.ddev.php*.

Dans le fichier *default/settings.php*, cherchez les lignes suivantes (normalement vers la fin du fichier) :

```php
// Automatically generated include for settings managed by ddev.
if (getenv('IS_DDEV_PROJECT') == 'true' && file_exists(__DIR__ . '/settings.ddev.php')) {
  include __DIR__ . '/settings.ddev.php';
}
```

Avant ça, ajoutez le code suivant : 

```php
// Import all additional settings (e.g. database.php, config.php, etc..).
$settingsFiles = glob($app_root . '/' . $site_path . '/settings/*.php') ?: [];

foreach ($settingsFiles as $filename) {
  include $filename;
}
```

## Les settings locaux

Les fichiers settings que nous venons de créer concerne la configuration globale de notre projet. Comme nous l'avons
vu quand nous avons analysé les fichiers disponibles par défaut, nous avons la possibilité de créer des fichiers
spécifique à notre environnement de développement.

Pour ça, nous pouvons créer deux fichiers !

### settings.local

Pour surcharger les configurations de base, créez un fichier *default/settings.local.php* à partir 
de *example.settings.local.php*

```shell
cp web/sites/example.settings.local.php web/sites/default/settings.local.php
```

Ensuite, dans le fichier *default/settings.php*, décommentez les lignes suivantes (souvent en fin de fichier) :
```php
# if (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {
#   include $app_root . '/' . $site_path . '/settings.local.php';
# }
```

::: warning ⚠️ Attention à la position du script
Vérifiez bien que ce code se trouve après les précédentes inclusions.

Le fichier *default/settings.php* doit charger la configuration dans cet ordre : 

configuration de base -> configuration **DDEV** -> configuration locale
:::

Pour le moment, nous n'allons pas modifier la configuration en local, mais au moins le fichier sera disponible au
besoin.

### local.services

Le fichier *local.services.yml* est une surcharge locale du conteneur de services de **Drupal**, utilisée en développement
pour ajuster des services et paramètres sans toucher la config globale. Il permet notamment d’activer le debug (ex. **Twig**),
de désactiver ou rediriger certains caches, et de modifier des *backends/logs* pour faciliter le travail en local.

Tout comme pour le fichier *settings.local.php*, un fichier d'exemple est déjà fourni par **Drupal**.

Pour créer le fichier, tapez la commande suivante :

```shell
cp web/sites/default/default.services.yml web/sites/default/local.services.yml
```

Là aussi, il faut préciser à **Drupal** que le fichier existe. Pour cela, dans le fichier *default/settings.php*, 
ajoutez la ligne suivante :

```php
/**
 * Load services definition file.
 */
$settings['container_yamls'][] = $app_root . '/' . $site_path . '/services.yml'; // Code déjà présent dans le fichier.
$settings['container_yamls'][] = $app_root . '/' . $site_path . '/local.services.yml'; // <== Code à ajouter.
```

::: warning ⚠️ Erreur dans l'IDE
Il est possible que votre IDE émette une erreur sur les variables `$app_root` et `$site_path` car ces deux
variables ne sont pas créées dans le fichier *default/settings.php*. 

Vous pouvez ignorer cette erreur.
:::

## Conclusion

Nos fichiers de configuration de **Drupal** sont maintenant bien en place. Notre architecture est : 

```
..
├── web/
│   └── sites/
│       ├── default/
│       │   └── settings/
│       │   │   ├── database.php
│       │   │   └── trust_host_patterns.php
│       │   ├── default.services.yml
│       │   ├── default.settings.php
│       │   ├── local.services.yml
│       │   ├── settings.ddev.php
│       │   ├── settings.local.php
│       │   └── settings.php
│       ├── development.services.yml
│       ├── exemple.settings.local.php
│       └── exemple.sites.php   
```

### Mise à jour du fichier *.gitignore*

Pour éviter que les fichiers settings utilisés en local soit versionnés, ajoutons ces quelques lignes dans le fichier
*.gitignore* :

```gitignore
# Ignore configuration files that may contain sensitive information.
web/sites/default/settings.local.php
web/sites/default/local.services.yml
```

:::info Je suis sûr que vous avez remarqué un problème !
Les identifiants de base de données sont en dur dans le fichier *default/settings/database.php* !

Nous allons régler ça tout de suite grâce aux [variables d'environnement](/drupal-project/installation/environment_variable)
:::
