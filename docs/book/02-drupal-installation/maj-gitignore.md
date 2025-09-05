# Mise à jour du .gitignore

L'installation de **Drupal** a ajouté de nombreux fichiers à notre projet. Pour éviter de versionner des fichiers générés
ou sensibles, nous pouvons modifier le fichier *.gitignore*. Nous gardons ainsi le dépôt propre, nous réduisons les
conflits et ça facilite les déploiements entre environnements.

Actuellement notre fichier *.gitignore* ressemble à ceci : 

```.gitignore
# IDE files
.idea/

# Docker configuration
.docker/.env.database
.docker/.env.docker
.docker/php/php.ini

# Ignore .env files as they are personal
.env
```

> ❓ Hey mais attendez une minute ! Nous n'avons jamais ajouté la ligne `.env` dans notre fichier *.gitignore*.

Et bien en fait si, mais indirectement : rappelez-vous, lors de l'initialisation du module **Dotenv**, le module 
a non seulement créé le fichier *.env*, mais l'a aussi automatiquement ajouté dans notre fichier *.gitignore*.

A nous maintenant d'ajouter nos conditions d'exclusion. Mais nous n'avons presque rien à faire car **Drupal** a pensé à 
tout !

A l'installation le fichier *web/.exemple.gitignore* qui contient les principales exclusions recommendées. Ouvrez donc
ce fichier ainsi que notre *.env* et copiez / collez y les lignes suivantes :

```.gitignore
# Ignore dependencies that are managed with Composer.
/vendor/

# Ignore configuration files that may contain sensitive information.
sites/*/settings*.php
sites/*/services*.yml

# Ignore paths that contain user-generated content.
sites/*/files
sites/*/private
```



[//]: # (TODO rajouter dans la partie settings de gérer le hash_salt)

Comme vous pouvez le voir, par défaut on ignore les fichiers de configuration de **Drupal**.


Ce qu’il faut savoir
- settings.php contient souvent des secrets et des paramètres spécifiques à l’environnement. On évite de versionner 
des secrets dans un dépôt public.
- Bonne pratique Drupal: versionner un settings.php “générique” (sans secrets), et surcharger via settings.local.php (non versionné) 
ou via des variables d’environnement.
- Ton fichier est déjà bien orienté “12-factor” pour la base de données (getenv), mais il contient encore au moins un secret en dur: hash_salt.

Ce qui pose problème dans ta version actuelle
- $settings['hash_salt'] est une valeur sensible. Ne la publie pas.
- Le chemin de config_sync_directory n’est pas un secret en soi, mais mieux vaut le rendre paramétrable (via env) et, 
idéalement, le placer hors webroot en production.
- DB host est en dur ('mariadb'). Pas un secret, mais moins portable; tu peux le rendre configurable par env.

Recommandation
- Oui, tu peux versionner settings.php si:
    - Tu retires/paramétrises hash_salt (via env ou fichier hors webroot).
    - Tu rends le host DB configurable (optionnel, mais conseillé).
    - Tu rends config_sync_directory configurable (et, en prod, pointe hors du webroot).
    - Tu gardes settings.local.php pour les overrides locaux et ne le versionnes pas.

Proposition d’édition minimale du fichier
- Remplace le hash_salt en dur par une lecture depuis une variable d’environnement (ou un fichier), avec fallback vide.
- Paramétrise DB host par env (fallback sur 'mariadb' pour Docker).
- Paramétrise config_sync_directory par env (fallback sur la valeur actuelle).





A la base se fichier n'est pas versionné pour des raisons de sécurité.
Si jamais le projet Git est piraté, nous ne voulons pas que des personnes
malveillantes accèdent aux identifiants de connexion de notre base de données.

Mais comme nous utilisons un fichier .env qui lui est propre à chaque environnement
pour simplifier le travail en équipe nous pouvons versionner le fichier settings.

Pour ça il suffit d'ouvrir le fichier .gitignore à la racine du projet et commenter
ou supprimer la ligne suivante :

```.gitignore
/web/sites/*/settings.php
```

