Installation de phpstan / phpunit / phpcs

Installer le module :
composer require --dev drupal/core-dev -W

PHPStan

ajouter un fichier phpstan.neon

```neon
parameters:
  # Niveau de strictness (0 = souple, 9 = très strict)
  level: 8

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

PHPUnit

Ajouter un fichier phpunit.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         bootstrap="web/core/tests/bootstrap.php"
         colors="true"
         beStrictAboutTestsThatDoNotTestAnything="true"
         beStrictAboutOutputDuringTests="true"
         beStrictAboutChangesToGlobalState="true"
         failOnRisky="true"
         failOnWarning="true"
         displayDetailsOnTestsThatTriggerErrors="true"
         displayDetailsOnTestsThatTriggerWarnings="true"
         displayDetailsOnTestsThatTriggerDeprecations="true"
         cacheResult="false"
         xsi:noNamespaceSchemaLocation="https://schema.phpunit.de/10.5/phpunit.xsd"
         cacheDirectory=".phpunit.cache">
  <php>
    <!-- Set error reporting to E_ALL. -->
    <ini name="error_reporting" value="32767" />
    <!-- Do not limit the amount of memory tests take to run. -->
    <ini name="memory_limit" value="-1" />
    <env name="SIMPLETEST_BASE_URL" value="http://bn.test" force="true" />
    <env name="SIMPLETEST_DB" value="pgsql://db:db@postgres:5432/drupal" />
  </php>
  <extensions>
    <bootstrap class="Drupal\TestTools\Extension\HtmlLogging\HtmlOutputLogger">
      <parameter name="outputDirectory" value="web/sites/simpletest/browser_output" />
      <parameter name="verbose" value="true" />
    </bootstrap>
    <bootstrap class="Drupal\TestTools\Extension\Dump\DebugDump">
      <parameter name="colors" value="true"/>
      <parameter name="printCaller" value="true"/>
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