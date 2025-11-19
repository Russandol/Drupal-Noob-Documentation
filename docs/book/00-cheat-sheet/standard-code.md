# Standard Code

## Drupal Coder

Installation : 
composer require --dev core/drupal-dev

Tester l'installation : 
phpcs -i

créer le fichier phpcs.xml à la racine du projet

```xml
<?xml version="1.0"?>
<ruleset name="Drupal Immo Coding Standards">
  <description>Standards de codage pour le projet Drupal Immo</description>
 
  <!-- Chemins à analyser -->
  <file>web/modules/custom</file>
  <file>web/themes/custom</file>

  <!-- Exclure certains dossiers -->
  <exclude-pattern>*/node_modules/*</exclude-pattern>
  <exclude-pattern>*/vendor/*</exclude-pattern>
  <exclude-pattern>*/libraries/*</exclude-pattern>
  <exclude-pattern>*/contrib/*</exclude-pattern>
  <exclude-pattern>*/core/*</exclude-pattern>
  <exclude-pattern>*.min.js</exclude-pattern>
  <exclude-pattern>*.min.css</exclude-pattern>

  <!-- Utiliser les standards Drupal -->
  <rule ref="Drupal">
    <!-- Ignorer certaines règles si nécessaire -->
    <!-- <exclude name="Drupal.Commenting.InlineComment.SpacingAfter"/> -->
  </rule>

  <!-- Utiliser les bonnes pratiques Drupal -->
  <rule ref="DrupalPractice">
    <!-- Exclure la vérification des @file docblocks dans les tests -->
    <exclude-pattern>*/tests/*</exclude-pattern>
  </rule>

  <!-- Extensions de fichiers à vérifier -->
  <arg name="extensions" value="php,module,inc,install,test,profile,theme,css,info,txt,md,yml"/>

  <!-- Affichage -->
  <arg name="colors"/>
  <arg value="sp"/> <!-- s = afficher les erreurs, p = progression -->

  <!-- Nombre de processus parallèles -->
  <arg name="parallel" value="4"/>

  <!-- Encodage -->
  <arg name="encoding" value="utf-8"/>

  <!-- Afficher les sniffs utilisés -->
  <!-- <arg name="report" value="summary"/> -->
</ruleset>
```

## PHPStan

The mglaman/phpstan-drupal allows PHPStan to understand how to read code in a Drupal codebase and understand how its 
dynamic return types operate.

The phpstan/extension-installer package autoconfigures PHPStan to load the phpstan-drupal package and phpstan/phpstan-deprecation-rules. 
This is the package that enables reporting usages of deprecated code.

Créer un fichier phpstan.neon
```neon
parameters:
  # Niveau de strictness (0 = souple, 9 = très strict)
  level: 5

  # Chemins à analyser
  paths:
    - web/modules/custom
    - web/themes/custom

  # Exclure certains dossiers
  excludePaths:
    - web/modules/custom/*/tests/*
    - web/modules/custom/*/vendor/*

  # Dossiers à scanner pour comprendre le code
  # (Drupal core, contrib, etc.)
  scanDirectories:
    - web/core
    - web/modules/contrib

  # Type inference
  inferPrivatePropertyTypeFromConstructor: true
```

Lancer une analyse : phpstan analyse

## PHPUnit

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         bootstrap="PATH-TO/core/tests/bootstrap.php"
         colors="true"
         beStrictAboutTestsThatDoNotTestAnything="true"
         beStrictAboutOutputDuringTests="true"
         beStrictAboutChangesToGlobalState="true"
         cacheResult="false"
         xsi:noNamespaceSchemaLocation="https://schema.phpunit.de/10.5/phpunit.xsd"
         cacheDirectory=".phpunit.cache">
    <php>
        <ini name="error_reporting" value="32767" />
        <ini name="memory_limit" value="-1" />
        <env name="SIMPLETEST_BASE_URL" value="http://LOCAL-SITE-URL" force="true" />
        <env name="SIMPLETEST_DB" value="mysql://USERNAME:PASSWORD@HOST/DBNAME" />
    </php>
    <extensions>
        <bootstrap class="Drupal\TestTools\Extension\HtmlLogging\HtmlOutputLogger">
            <parameter name="outputDirectory" value="PATH-TO/sites/simpletest/browser_output" />
            <parameter name="verbose" value="true" />
        </bootstrap>
    </extensions>
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
    </testsuites>
</phpunit>
```

replace PATH-TO, LOCAL-SITE-URL, and USERNAME/PASSWORD/HOST/DBNAME as appropriate

Créer les fichiers d'export pour les tests et donner les droits
mkdir -p web/sites/simpletest/browser_output
chmod -R 777 web/sites/simpletest

Ajouter dans le .gitignore

# Ignore PHPUnit files and cache
.phpunit.cache
web/sites/simpletest/**