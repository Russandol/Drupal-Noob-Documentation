# 🧹 Qualité du code

La qualité du code est un sujet souvent négligé, surtout quand les délais sont serrés. Raison de plus pour
investir dans des outils d'analyse automatique dès le début du projet.

Ce qui permet, dans la durée, d'éviter : 

* des **bugs** difficiles à traquer
* des **régressions** silencieuses
* un **code incohérent** entre développeurs

Heureusement, pour simplifier l'installation et la maintenance, l'écosystème **Drupal** propose un module qui regroupe
tous les outils nécessaires : `drupal/core-dev`.

## Installation de drupal/core-dev

Le module `drupal/core-dev` rassemble les dépendances de développement utilisées par **Drupal** pour garantir la
qualité du code. Il inclut les librairies suivantes : 

* **PHPUnit** - pour les tests automatisés (unitaires, kernel et fonctionnels)
* **PHPStan** - pour les analyses statiques
* **CodeSniffer** - pour le respect des standards de codage

Pour installer le module, utilisez le code suivant : 

```shell
ddev composer require --dev drupal/core-dev:^11.3 -W
```

:::warning Pourquoi le flag `-W` ?
Quand **Drupal** 11 est passé à **PHPUnit** 11, la dépendance `sebastien/diff` a été montée en version 7 via 
`drupal/core-recommended`.

Mais `drupal/core-dev` (qui inclut **PHPUnit**) a besoin de `sebastien/diff` en version `^6.0.2`. Il y a donc un conflit
entre les deux librairies. On est donc obligé d'utiliser le flag `-W` pour forcer la mise à jour de la dépendance.

Comme la librairie `sebastien/diff` n'est utilisée que par **PHPUnit** pour l'affichage des différences dans les assertions
de tests, le comportement est identique entre la v6 et la v7. Redescendre de version ne pose donc aucun problème.
:::

:::danger ⚠️ Ce module ne doit jamais être installé en production
Ces outils n'ont rien à faire sur un environnement de production. C'est pour cette raison qu'il faut utiliser le flag
`--dev` lors de l'installation pour spécifier que ces dépendances sont destinées à l'environnement de développement.
:::

## PHPUnit

**PHPUnit** est le framework de tests automatisés utilisé par **Drupal**. Il permet de s'assurer que le code
fonctionne comme prévu et de détecter les régressions lors des évolutions du projet.

### Les types de tests

Drupal propose **4 types de tests** PHPUnit, chacun adapté à un niveau de vérification 
différent [[1]](https://www.drupal.org/docs/develop/automated-testing/types-of-tests) :

| Type | Classe de base | Description |
|------|---------------|-------------|
| **Unit** | `UnitTestCase` | Teste une classe ou une fonction isolément, sans Drupal ni base de données. C'est le test le plus rapide. |
| **Kernel** | `KernelTestBase` | Teste l'intégration avec les API Drupal (services, entités…). Nécessite une base de données mais pas de serveur web. |
| **Functional** | `BrowserTestBase` | Teste le comportement complet d'une page (formulaires, redirections…). Démarre une instance Drupal complète. |
| **FunctionalJavascript** | `WebDriverTestBase` | Comme Functional, mais exécute aussi le JavaScript dans un vrai navigateur (via ChromeDriver). |

### Configuration

PHPUnit se configure via un fichier *phpunit.xml*. Drupal fournit un fichier d'exemple dans *web/core/phpunit.xml.dist*
qu'il faut copier et adapter à votre projet.

L'approche recommandée est de placer ce fichier **à la racine du projet** plutôt que dans *web/core/*, car ce
répertoire est écrasé à chaque mise à jour de Drupal via Composer.

Copiez le fichier de distribution :

```shell
cp web/core/phpunit.xml.dist phpunit.xml
```

Puis modifiez les valeurs suivantes dans le fichier `phpunit.xml` :

```xml
<!-- L'attribut bootstrap doit pointer vers le fichier bootstrap de Drupal -->
<phpunit bootstrap="web/core/tests/bootstrap.php">
  <php>
    <!-- URL de base du site Drupal -->
    <env name="SIMPLETEST_BASE_URL" value="http://cinecritique.ddev.site/"/>

    <!-- Connexion à la base de données de test -->
    <env name="SIMPLETEST_DB" value="mysql://db:db@db:3306/db"/>

    <!-- Répertoire de sortie des captures HTML des tests fonctionnels -->
    <env name="BROWSERTEST_OUTPUT_DIRECTORY" value="web/sites/simpletest/browser_output"/>
  </php>
</phpunit>

<!-- Remplacer les testsuites trop générique -->
<testsuites>
    <testsuite name="unit">
        <directory>web/modules/custom/**/tests/src/Unit</directory>
        <directory>web/themes/custom/**/tests/src/Unit</directory>
    </testsuite>
    <testsuite name="kernel">
        <directory>web/modules/custom/**/tests/src/Kernel</directory>
        <directory>web/themes/custom/**/tests/src/Kernel</directory>
    </testsuite>
    <testsuite name="functional">
        <directory>web/modules/custom/**/tests/src/Functional</directory>
        <directory>web/themes/custom/**/tests/src/Functional</directory>
    </testsuite>
    <testsuite name="functional-javascript">
        <directory>web/modules/custom/**/tests/src/FunctionalJavascript</directory>
        <directory>web/themes/custom/**/tests/src/FunctionalJavascript</directory>
    </testsuite>
</testsuites>
```

Les trois variables d'environnement essentielles sont :

* `SIMPLETEST_BASE_URL` — L'URL à laquelle **Drupal** est accessible. Avec **DDEV**, elle correspond à l'URL du projet 
(ex: https://mon-projet.ddev.site).
* `SIMPLETEST_DB` — La chaîne de connexion à la base de données utilisée pour les tests Kernel et Functional. 
Avec **DDEV** : mysql://db:db@db:3306/db.
* `BROWSERTEST_OUTPUT_DIRECTORY` — Le répertoire où **PHPUnit** enregistre les captures HTML générées lors des tests 
fonctionnels, utile pour le débogage.

Il reste maintenant à créer le dossier en question : 
```shell
mkdir -p web/sites/simpletest/browser_output
```


:::tip Pensez au `.gitignore`
Ajoutez le répertoire de sortie des tests au `.gitignore` pour ne pas le versionner :

```.gitignore
# PHPUnit output
web/sites/simpletest/browser_output
```
:::

Maintenant que **PHPUnit** est configuré, vous pouvez lancer les tests avec la commande suivante :

```shell
ddev exec phpunit
```

## PHPStan

**PHPStan** est un outil d'analyse statique pour PHP. Il analyse votre code source sans l'exécuter et détecte des erreurs 
potentielles : variables indéfinies, types incorrects, appels à des méthodes inexistantes, arguments manquants, etc.

L'intérêt principal est de détecter des bugs avant même de lancer l'application. Contrairement aux tests unitaires qui 
vérifient un comportement attendu, **PHPStan** vérifie la cohérence logique du code.

Voici ce qu'il est capable de repérer :

* **Types incorrects** : Passer un string à une fonction qui attend un int.
* **Méthodes inexistantes** : Appeler `->getFoo()` sur un objet qui n'a pas cette méthode.
* **Variables indéfinies** : Utiliser une variable `$result` qui n'a jamais été déclarée.
* **Arguments manquants** : Appeler une fonction avec 2 arguments au lieu de 3.
* **Code mort** : Détecter des conditions toujours vraies ou toujours fausses.
* **Retours incohérents** : Une fonction déclare retourner `string` mais peut retourner `null`.

### Le système de niveaux

PHPStan fonctionne avec un système de niveaux de rigueur allant de 0 (le plus permissif) à 10 (le plus strict) :

* **0** - Vérifications de base : classes inconnues, fonctions inconnues, méthodes inconnues appelées sur `$this`, 
nombre incorrect d’arguments passés à ces méthodes et fonctions, variables toujours non définies.
* **1** - Variables potentiellement non définies, méthodes magiques et propriétés inconnues sur les classes 
avec `__call` et `__get`.
* **2** - Méthodes inconnues vérifiées sur toutes les expressions (et pas seulement `$this`), validation de la 
documentation **PHP**.
* **3** - Types de retour, types assignés aux propriétés.
* **4** - Vérification de base du code mort : `instanceof` toujours faux et autres vérifications de type, 
branches `else` mortes, code inaccessible après `return`, etc.
* **5** - Vérification des types des arguments passés aux méthodes et fonctions.
* **6** - Signaler les annotations de type manquantes.
* **7** - Signaler les types union partiellement incorrects : si vous appelez une méthode qui n’existe que sur certains 
types d’un type union, le niveau 7 commence à le signaler. Autres situations potentiellement incorrectes.
* **8** - Signaler les appels de méthodes et l'accès aux propriétés sur des types nullables.
* **9** - Être strict concernant les types mixtes explicites : la seule opération autorisée est de les passer à un 
autre type mixte.
* **10** - Être encore plus strict concernant les types mixtes : signaler des erreurs même pour les types mixtes 
implicites (type manquant), et pas seulement pour les types mixtes explicites.

::: tip 💡 Compréhension de Drupal
L'extension `mglaman/drupal-phpstan`, fournie dans `drupal/core-dev`, permet de configurer **PHPStan** pour **Drupal** et 
ses spécificités comme le conteneur de services, les hooks, les annotations de plugins, etc.., ce qui évite les faux positifs.
:::

### Configuration

Tout comme **PHPUnit**, **PHPStan** est configurable via un fichier de configuration *phpstan.neon*.

A la racine du projet, créez le fichier :

```shell
touch phpstan.neon
```

Et ajoutez le contenu suivant : 

```neon
parameters:
  level: 5

  # Path to analyse
  paths:
    - web/modules/custom
    - web/themes/custom

  # Exclude some directories
  excludePaths:
    - web/modules/custom/*/tests/*
    - web/modules/custom/*/vendor/*

  # Folders to scan to understand the structure of the code
  # (Drupal core, contrib, etc.)
  scanDirectories:
    - web/core
    - web/modules/contrib
    - vendor/drush/drush/src

  # treat deprecations warnings as errors
  reportUnmatchedIgnoredErrors: false
```

::: tip 💡 Quel niveau de rigueur choisir ?
Le plus simple est de commencer avec un niveau de rigueur moyen (5). Et ensuite de monter petit à petit le niveau de rigueur
pour corriger les erreurs au fur et à mesure.
:::

Vous pouvez lancer la vérification du code avec la commande suivante :

```shell
ddev exec phpstan
```

## CodeSniffer

**PHP CodeSniffer** est un outil qui vérifie que votre code respecte un ensemble de **règles de codage** (coding standards).
Il détecte les problèmes de formatage, de nommage et de style : indentation incorrecte, accolades mal placées,
espaces manquants, documentation absente, etc.

L'objectif est de garantir un **code homogène** entre tous les développeurs du projet. Peu importe qui écrit le code,
le résultat doit toujours ressembler à la même chose.

PHP CodeSniffer fournit deux commandes :

* **`phpcs`** — Analyse le code et **signale** les violations de standards.
* **`phpcbf`** — Corrige **automatiquement** les violations qui peuvent l'être.

### Les standards Drupal

Drupal définit ses propres règles de codage via le module `drupal/coder`, fourni dans `drupal/core-dev`. Ce module
embarque deux jeux de règles :

* **Drupal** — Les conventions de codage officielles de Drupal : indentation, nommage des fonctions, documentation
  des hooks, formatage des tableaux, etc.
* **DrupalPractice** — Des règles supplémentaires orientées bonnes pratiques : utilisation correcte des API Drupal,
  détection de code déprécié, etc.

### Configuration

PHP CodeSniffer se configure via un fichier *phpcs.xml* à placer **à la racine du projet**.

Créez le fichier :

```shell
touch phpcs.xml
```

Et ajoutez le contenu suivant :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ruleset name="Custom Drupal coding standards">
  <description>Coding standards for custom Drupal code.</description>

  <!-- Standards à appliquer -->
  <rule ref="Drupal"/>
  <rule ref="DrupalPractice"/>

  <!-- Répertoires à analyser -->
  <file>web/modules/custom</file>
  <file>web/themes/custom</file>

  <!-- Extensions de fichiers à vérifier -->
  <arg name="extensions" value="php,module,inc,install,theme,profile,info.yml"/>

  <!-- Afficher la progression et les couleurs dans le terminal -->
  <arg value="sp"/>
  <arg name="colors"/>

  <!-- Exclure les répertoires non pertinents -->
  <exclude-pattern>*/node_modules/*</exclude-pattern>
  <exclude-pattern>*/vendor/*</exclude-pattern>
  <exclude-pattern>*/tests/*</exclude-pattern>
</ruleset>
```

::: info L'incontournable de tous les projets
Dans le prochain chapitre, nous allons écrire un fichier incontournable pour tous les projets et qui est pourtant bien
trop souvent négligé : [le fichier README](/drupal-project/installation/readme).
:::