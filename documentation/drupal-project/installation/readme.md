# 📄 README

Le fichier *README.md* est l'élément central de la communication technique d'un projet. C'est la porte d'entrée
principale qui doit permettre à n'importe qui de comprendre le projet et de l'utiliser.

L'objectif est de répondre à une question toute simple : si un nouveau développeur intègre le projet, est-il capable
de l'installer et de l'utiliser en moins de 15 minutes ?

Et bien entendu, un fichier *README.md* doit évoluer en même temps que l'application. Il est donc important que ce fichier
soit mis à jour régulièrement.

Un fichier *README.md* complet doit contenir :
- Les **prérequis techniques**
- La **procédure d'installation**
- La **configuration** du projet
- La **structure** du projet
- Et les sections complémentaires comme la **résolution des problèmes** courants, les **workflows**, les **tests**, etc..

Malheureusement, ce fichier est bien trop souvent négligé, peu mis à jour, voir parfois inexistant.

C'est la raison pour laquelle je vous propose de le créer dès maintenant dans notre projet. 

A la racine du projet, créez un fichier *README.md*

```shell
touch README.md
```

Et ajoutez le contenu suivant :

```markdown
    # Cinécritique
    
    Cinécritique est un site de notation et d'avis de films.
    
    ## 📝 Prérequis
    
    ### Environnement système
    
    - DDEV 1.25+
    - Docker 27.4+
    - Docker Compose 5.1+
    
    ### Stack technique

    - PHP 8.4
    - mariaDB 11.8
    - Drupal 11

    ## ✅ Installation

    Les lignes de commande suivantes doivent être effectuées dans l'interpréteur de commande Linux.
    
    🛠️ Vérifier si DDEV est installé : 
    ```shell
    ddev --version
    ```
    
    📁 Cloner le projet Git :
    ```shell
    git clone [url-du-projet]
    cd [nom-du-projet]
    ```
    
    🐳 Démarrer l'environnement DDEV :
    ```shell
    ddev start
    ```
    
    🔨 Installer Drupal et ses dépendances
    ```shell
    ddev composer install
    ```
    
    📋 Copier le fichier .env.exemple et le renommer en .env :
    ```shell
    cp .env.example .env
    ```
    
    ⚙️ Générer un hash_salt avec la commande suivante et le copier dans le fichier `.env` :
    ```shell
    ddev drush eval "var_dump(Drupal\Component\Utility\Crypt::randomBytesBase64(55))"
    ```
    
    📝 Créer les fichiers 'settings.local.php' et 'local.services.yml'
    ```shell
    cp web/sites/example.settings.local.php web/sites/default/settings.local.php
    cp web/sites/default/default.services.yml web/sites/default/local.services.yml
    ```
    
    🔨 Installer le site à partir des configurations
    ```shell
    ddev drush si --existing-config
    ```

    📁 Créer le dossier utilisé par PHPUnit pour enregistrer les captures HTML générées lors des 
    tests fonctionnels : 
    ```shell
    mkdir -p web/sites/simpletest/browser_output
    ```
    
    ## 🔧 Configuration

    ### Fichiers de configuration
    
    * `.env` : Variables d'environnement.
    * `web/sites/default/settings.php` : Configurations par défaut.
    * `web/sites/default/settings/*.php` : Fichiers de configurations custom.
    * `web/sites/default/settings.ddev.php` : Configurations DDEV.
    * `web/sites/default/settings.local.php` : Configurations locales.

    ## 📁 Structure du projet
    
    ```
      ├── .ddev/               # 🐳 Configuration DDEV
      ├── config/              # ⚙️ Fichiers de configurations Drupal
      ├── recipes/             # 📦 Recipes Drupal
      ├── web/                 # 🌐 Racine web Drupal standard
      │ ├── modules/           # Contient les modules contrib et custom
      │ ├── sites/             # Contient les fichiers settings de notre site
      │ └── themes/            # Contient les thèmes contrib et custom
      ├── .env
      ├── .env.example
      ├── .gitignore
      ├── composer.json
      ├── composer.lock
      ├── load.environment.php # Importe les variables d'environnement dans Drupal
      ├── phpcs.xml            # Fichier de configuration de CodeSniffer
      ├── phpstan.neon         # Fichier de configuration de PHPStan
      └── phpunit.xml          # Fichier de confugration de PHPUnit
    ```
```

::: warning Versions Docker
J'ai indiqué les versions minimales requises pour **DDEV**, **Docker** et **Docker Compose** que j'ai actuellement. 
Vous pouvez les adapter à votre configuration.
:::

Bien entendu, ce fichier sera mis à jour au fur et à mesure de la progression du projet.

::: info Un dernier fichier pour la route !
Depuis le début de la formation, nous avons vu pas mal de commandes.

Il est temps de faire le point avec [le fichier COMMANDS.md](/drupal-project/installation/commands).
:::