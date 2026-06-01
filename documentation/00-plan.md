
en gras : 
- outils (docker)
- framework (drupal)
- langage

en italique : 
- fichiers

blocs personnalisés : 

::: info
Ceci est un bloc d'information.
:::

::: tip
Ceci est une astuce.
:::

::: warning
Ceci est un avertissement.
:::

::: danger
Ceci est un avertissement critique.
:::

::: details
Ceci est un bloc dépliable (accordéon). Le contenu est masqué par défaut.
:::

Toujours sauter une ligne sous les titres

# Table des matières :

Le but de cette documentation et de mettre en place et de comprendre un environnement Drupal pour un ou plusieurs projets


Découvrir Drupal
  -> ajouter le theme admin
  -> faire le point sur les différentes sections
    -> Contenu
    -> Structure
    -> Apparence
    -> Extension
    -> Personnes
    -> Rapports
    -> Configuration


Template
  -> installer theme admin
  -> installer theme
    -> faire un theme enfant

Administration
  -> les types de contenu
    -> les champs
    -> l'affichage du formulaire
    -> l'affichage de la page
  -> les blocks
    -> block layout
    -> block personnalisés
  -> les vues

Module custom

-- OLD --

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
      - erreur pourcentage abs() == installation d'un patch.
    - création d'un template enfant
    - compilation des fichiers scss
    - surcharge de bootstrap dans notre template enfant
- Installation du français
- Créer une recipes pour l'installation de base.

Penser à parler des commandes Drush generate

Drupal module

paragraph
    -> attention lors d'utilisation d'un champ paragraphe == plus possible de faire de la duplication. modifier le
champ reviens à changer sur toutes les duplications.