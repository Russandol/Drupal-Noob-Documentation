# Les variables d'environnement - .env.example

Comme vous l'avez remarqué, nous utilisons des variables d'environnement dans notre fichier *compose.yml* ce qui a plusieurs avantages :
- **Séparation de la configuration et du code** : les variables d'environnement permettent de garder les informations sensibles
  (mots de passe, clés API) et les paramètres spécifiques à l'environnement en dehors du code source.
- **Flexibilité entre environnements** : une même application peut fonctionner dans différents environnements (développement,
  recette, production) sans modification du code, simplement en changeant les variables d'environnements.
- **Personnalisation** : nous pourrons plus facilement faire évoluer notre configuration en changeant les valeurs des variables
  d'environnement.

Nous allons donc créer un fichier modèle contenant les variables d'environnements ainsi que les valeurs par défaut.

A la racine du projet créer un fichier *.docker/.env.example*. 

```shell
mkdir -p .docker && touch .docker/.env.example
```

> ❓ Pourquoi ne pas mettre le fichier directement à la racine du projet ?

Lors de l'installation de **Drupal**, nous aurons besoin des variables d'environnement qui permettent de configurer la base de données.
Pourquoi ne pas mettre le fichier directement à la racine du projet comme son contenu n'est pas exclusif à **Docker** ? 

Là c'est un choix personnel, je préfère organiser tout ce qui concerne la configuration de **Docker** dans un dossier *.docker*
dédié.

De plus, **Drupal** ne gère pas nativement les fichiers d'environnement. Nous allons devoir utiliser un module qui, lors
de son initialisation, génère un fichier d'environnement. Pour éviter les éventuels conflits et surcharges, autant bien 
séparer les logiques de configuration de l'application.

Créez donc un fichier *.docker/.env.example* et ajoutez les variables suivantes :

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

# Database settings

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

> ❓ Pourquoi créer un fichier *.env.example* et pas un fichier *.env* directement ?

Le fichier *.env.example* sert de templates pour le vrai fichier. Cette approche permet de répondre aux exigences suivantes : 

- **Réutilisable** : Ils permettent à chaque développeur de créer facilement sa propre configuration locale en copiant le
  template et en adaptant les valeurs selon son environnement.
- **Sécurité** : Ce fichier contient souvent des informations sensibles (mot de passe, clés API, etc..) qui ne doivent
jamais être versionnés dans Git.
- **Documentation** : Ils servent à montrer quelles variables sont nécessaires et leur format attendu.

Cette méthode garantit que votre projet reste facilement partageable tout en préservant la sécurité et la flexibilité
des configurations individuelles.

Il faudra bien entendu indiquer dans la documentation que ce fichier doit être copié et renommé pour correspondre
au fonctionnement de **Docker**.