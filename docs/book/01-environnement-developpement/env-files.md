# Environnement de développement : Docker

## example.env

Comme vous l'avez remarqué, nous utilisons des variables d'environnement dans notre fichier `compose.yml` ce qui a plusieurs avantages :
- Séparation de la configuration et du code : les variables d'environnement permettent de garder les informations sensibles
  (mots de passe, clés API) et les paramètres spécifiques à l'environnement en dehors du code source.
- Flexibilité entre environnements : une même application peut fonctionner dans différents environnements (développement,
  recette, production) sans modification du code, simplement en changeant les variables d'environnements.
- Personnalisation : nous pourrons plus facilement faire évoluer notre configuration en changeant les valeurs des variables
  d'environnement.

Nous allons donc créer des fichiers modèles contenant les variables d'environnements ainsi que les valeurs par défaut.

Nous pourrions tout mettre dans un seul fichier modèle, mais nous aurons besoin plus tard des variables de configuration
de la base de données pour configurer Drupal.

A la racine du projet créer un fichier `.docker/example.env.docker`. Comme ce fichier d'environnement sera spécifique à Docker
nous le mettons dans un dossier `.docker` pour ne pas le confondre avec le fichier d'environnement de l'application.

Nous pouvons maintenant ajouter nos variables :

```dotenv
# Project settings
PROJECT_NAME=drupal-project
DOMAIN_NAME=drupal-project.test

# Environment versions
PHP_VERSION=8.3

# Port settings
WEB_PORT_HTTP=80
WEB_PORT_HTTPS=443
MAILHOG_SMTP_PORT=1025
MAILHOG_UI_PORT=8025
REDIS_PORT=6379

# Timezone settings
TIMEZONE=Europe/Paris

# Debugging
PHP_DEBUGGER=xdebug
XDEBUG_CLIENT_HOST=host.docker.internal
XDEBUG_OUTPUT_DIR=/tmp/debug
```

Ensuite, toujours à la racine du projet, créez un fichier `.docker/example.env.database` et ajoutez les variables suivantes :

```dotenv
# MariaDB settings
# Environment versions
DB_VERSION=10.6.17

# Port settings
DB_PORT=3306
PHPMYADMIN_PORT=8080

# MariaDB settings
DB_ROOT_PASSWORD=root
DB_NAME=drupal
DB_USER=db
DB_PASSWORD=db
```

## Pourquoi créer des fichiers `.example.env` et pas les fichiers `.env` directement ?

Les fichiers `.example.env` servent de templates pour les vrais fichiers. Cette approche présente plusieurs avantages : 

- **Sécurité** : Ces fichiers contiennent souvent des informations sensibles (mot de passe, clés API, etc..) qui ne doivent
jamais être versionnés dans Git.
- **Réutilisable** : Ils permettent à chaque développeur de créer facilement sa propre configuration locale en copiant le 
template et en adaptant les valeurs selon son environnement.
- **Documentation** : Ils servent à montrer quelles variables sont nécessaires et leur format attendu.

Cette méthode garantit que votre projet reste facilement partageable tout en préservant la sécurité et la flexibilité
des configurations individuelles.

Il faudra bien entendu indiquer dans la documentation que ces fichiers doivent être copié et renommé pour correspondre
au fonctionnement de Docker.