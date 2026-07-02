# ⚙️ Gestion de la configuration de notre site

## Configuration !== contenu

**Drupal** est un gestionnaire de contenu qui permet de concevoir et gérer un site internet sans avoir besoin de
connaître le développement web.

Mais pour l'utiliser de manière efficace, il est très important de bien comprendre la distinction entre la
**configuration** et le **contenu**.

La **configuration** représente tous les changements que l'on fait dans l'administration de notre site. Ces changements
se font dans l'espace administrateur. Elle correspond par exemple à :

* Créer un vocabulaire de taxonomie.
* Ajouter des champs à un type de contenu.
* Mettre le site en mode maintenance.
* Etc..

Le **contenu** de son côté représente tout le contenu que l'on ajoute au site. Elle correspond par exemple à :

* Ajouter une liste de termes à une taxonomie.
* Créer une page sur notre site en remplissant les champs d'un type de contenu.
* Ajouter des liens à notre menu principal.
* Etc..

Je sais que pour le moment tout ça peut paraître flou. Ne vous inquiétez pas, nous aurons l'occasion de revenir en long,
en large et en travers sur cette distinction.

L'important était de vous présenter cette distinction. Car dans ce chapitre, nous allons nous intéresser à la **configuration**.

::: warning ⚠️ Attention
Dans le reste de ce chapitre, lorsque je fais mention à la **configuration**, je parle bien des
modifications que l'on fait dans l'espace administrateur du site.
:::

Dans **Drupal**, lorsque nous effectuons des changements dans l'administration, ces informations sont enregistrées en
base de données.

Mais **Drupal** offre également une fonctionnalité très pratique : l'export de la configuration dans des fichiers *.yml*.
Ces fichiers représentent l'ensemble des paramètres et réglages du site. Ce qui permet de :

- **Versionner** la configuration avec **Git**, comme on le fait avec le code.
- **Travailler en équipe** : chaque développeur peut importer ou exporter la configuration sur sa propre instance et rester
  synchronisé avec les autres.
- **Faciliter les déploiements** : la configuration d'un environnement de développement peut être transférée vers un
  autre environnement de recette ou de production.

En résumé, la gestion de la configuration via des fichiers exportables rend le développement de **Drupal** plus fluide,
reproductible et collaboratif. C'est un des éléments clef des bonnes pratiques pour tous les projets, même de petites tailles.

::: info ❓Mais pourquoi je vous parle de tout ça alors qu'on n'a même pas encore été dans l'administration du site ?
Parce que nous avons des changements à faire dans les dossiers de notre projet et le fichier *settings.php* pour gérer
efficacement ces fichiers de configuration.
:::

## Gérer les fichiers .yml de configuration

Lors de l'installation du projet, **DDEV** a défini dans quel dossier les fichiers de configurations seront enregistrés : 

```php
# web/sites/default/settings.ddev.php

// Set $settings['config_sync_directory'] if not set in settings.php.
if (empty($settings['config_sync_directory'])) {
  $settings['config_sync_directory'] = 'sites/default/files/sync';
}
```

Par défaut, les configurations sont enregistrées dans le dossier *web/sites/default/files/sync*. Ce qui n'est pas une 
bonne pratique car le dossier */files* est ignoré par **Git**. (Nous l'avons ajouté à notre *.gitignore*).

Je trouve plus logique et pratique que les fichiers de configuration soient désolidarisés du dossier *web*.

A la racine du projet, créez les dossiers *config/default* :

```shell
mkdir -p config/default
```

Nous allons également créer un fichier spécifique à la configuration dans le dossier *web/sites/default/settings* :

```shell
touch web/sites/default/settings/config.php
```

Nous pouvons ajouter le code suivant : 
```php
<?php

// Define the config sync folder
$settings['config_sync_directory'] = '../config/default';
```

::: warning ⚠️ Par défaut, les fichiers settings sont dans le dossier *web*.
Il faut donc revenir en arrière dans l'arborescence pour trouver notre dossier *config*.
:::

::: tip Pas besoin de faire plus !
Rappelez-vous l'ordre de chargement des settings : 

les fichiers du dossier *settings/* -> *settings.ddev.php* -> *settings.local.php*

Même si le fichier *settings.ddev.php* se charge après notre fichier *settings/config.php*, il n'y a pas de risque
de surcharge, car si vous analysez le code dans *settings.ddev.php*, vous remarquerez que la valeur n'est surchargée
que si elle est vide.

C'est donc bien la valeur dans *settings/config.php* qui sera utilisée.
:::

Nous pouvons maintenant supprimer le dossier de configuration d'origine.

## Exporter la configuration actuelle

Depuis le début de ce chapitre, nous évoquons la possibilité d'exporter la configuration de notre site.

Mais on fait ça comment ?

Avec **Drush** tout simplement !

Nous allons d'abord utiliser la commande **Drush** qui permet de supprimer le cache pour que nos dernières modifications
soient prises en compte.

```shell
ddev drush cr
```

Puis nous allons utiliser la commande qui permet d'exporter la configuration :
```shell
ddev drush cex
```

::: tip 💡Que signifie cette commande ?
`drush cex` est l'alias de la commande `drush config:export`.
:::

Le terminal devrait afficher le message suivant :
```shell
[success] Configuration successfully exported to ../config/default.
```

Et si vous regardez dans le dossier *config/default*, vous devriez trouver un grand nombre de fichiers *.yml*.

Nous n'allons pas les analyser un par un. Mais parmi eux, il est intéressant de citer *config/default/system.site.yml*
qui contient les informations de notre site. On y retrouve d'ailleurs le nom de notre site ainsi que l'adresse mail que nous
avons indiqué lors de l'installation dans l'interface d'installation web.

Un autre fichier intéressant est *config/default/core.extension.yml*. Il référence tous les modules initialisés. Nous
pouvons voir `dotenv` dans la liste.

::: info Et ensuite ?
**Drupal** est installé, la configuration principale est en place, nous allons bientôt manipuler **Drupal**.
Mais il reste tout de même quelques étapes pour faciliter le travail et surtout améliorer la maintenabilité de notre
projet.

Commençons par ajouter **PHPMyAdmin** pour [gérer notre base de données](/drupal-project/installation/phpmyadmin).
:::