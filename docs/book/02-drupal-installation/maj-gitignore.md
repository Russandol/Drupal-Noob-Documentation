# Mise à jour du .gitignore

L'installation de **Drupal** a ajouté de nombreux fichiers à notre projet. Pour éviter de versionner des fichiers générés
ou sensibles, nous pouvons modifier le fichier *.gitignore*. Nous gardons ainsi le dépôt propre, nous réduisons les
conflits et ça facilite les déploiements entre environnements.

Actuellement notre fichier *.gitignore* ressemble à ceci : 

```.gitignore
# IDE files
.idea/

# Docker configuration
.docker/.env
.docker/php/php.ini

# Ignore .env files as they are personal
.env
```

> ❓ Hey mais attendez une minute ! Nous n'avons jamais ajouté la ligne `.env` dans notre fichier *.gitignore*.

Et bien en fait si, mais indirectement : rappelez-vous, lors de l'initialisation du module **Dotenv**, le module 
a non seulement créé le fichier *.env*, mais l'a aussi automatiquement ajouté dans notre fichier *.gitignore*.

À nous maintenant d'ajouter nos conditions d'exclusion. Mais nous n'avons presque rien à faire car **Drupal** a pensé à 
tout !

 # ! TODO ajouter de l'accent sur le 'A' => À 
  À l'installation le fichier *web/.exemple.gitignore* qui contient les principales exclusions recommandées. Ouvrez donc
ce fichier ainsi que notre *.env* et copiez / collez y les lignes suivantes :

```gitignore
# Ignore dependencies that are managed with Composer.
/vendor/

# Ignore configuration files that may contain sensitive information.
web/sites/*/settings*.php
web/sites/*/services*.yml

# Ignore paths that contain user-generated content.
web/sites/*/files
web/sites/*/private
```

>⚠️ Pensez à rajouter `web/` là où c'est nécessaire.

Comme vous pouvez le voir, par défaut **Drupal** conseille d'ignorer tous les fichiers de configuration. Ce qui est une
très bonne habitude : toujours éviter de versionner des données sensibles !

Mais comme nous l'avons vu dans le chapitre précédent, nous avons fait en sorte d'utiliser des variables d'environnement
pour toutes les données sensibles du fichier *settings.php*.

Je recommande donc d'ajouter une exception pour ce fichier : 

```gitignore
# But keep the main settings.php
!web/sites/default/settings.php
```

A titre personnel, je trouve qu'il est plus pratique de versionner le fichier *settings.php*. Nous y avons fait beaucoup
de modifications et le versionner permettra un gain de temps dans le cas ou un nouveau développeur rejoindra le projet.
Il lui suffira de modifier les variables d'environnement sans avoir à refaire la configuration.

