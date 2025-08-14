# Table des matières :

Le but de cette documentation et de mettre en place et de comprendre un environnement Drupal pour un ou plusieurs projets

Création de l'environnement
- Docker :
  - Présentation
  - compose.yml
    - example.env
    - php.example.ini
  - Dockerfile
  - compose.prod.yml
  - .dockerignore et .gitignore
  - Lignes de commande
  - Makefile
  - README : rédaction de la documentation de l'installation de l'environnement Docker

Installation de Drupal et outils de développement
- Installer Drupal
  - ajouter un host dans windows
  - refacto makefile pour avoir plusieurs fichiers
  - README : rédaction de la documentation de l'installation du projet Drupal
  - présentation de l'arborescence
  - modifier le .gitignore pour prendre en compte Drupal
  - configuration web
    - modifier les fichiers settings
      - mettre les variables d'environnements à la place des variables en dures
      - Le principe des différents fichiers de settings
- Les premiers modules
  - Installer Drush
  - dotenv
    - inclure le fichier .docker/.env.database
    - modification du fichier settings
- Initialiser XDebug
    - pour le local
    - pour les commandes Drush
- Configurer Mailhog
    - avec Symfony Mailer
      - Attention à l'attachment d'un fichier s'il est protégé
    - gérer la configuration par environnement avec config split
- Configurer Redis
- Template
    - theme admin : adminimal + tester Gin Admin
    - installation template de base : Bootstrap 5
    - création d'un template enfant
    - compilation des fichiers scss
    - surcharge de bootstrap dans notre template enfant
- Installation du français
- Créer une recipes pour l'installation de base.

Drupal module
