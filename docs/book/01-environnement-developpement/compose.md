# Docker Compose

**Docker** est une plateforme qui permet d'encapsuler des applications et leurs dépendances dans des conteneurs isolés.
Pour notre projet **Drupal 11**, **Docker** va nous permettre de créer rapidement un environnement de développement complet
et identique pour tous.

**Docker Compose** est l’outil qui décrit et orchestre plusieurs conteneurs comme un seul service applicatif, 
via un fichier de configuration (*compose.yml*) où l’on définit services, réseaux, volumes, variables d’environnement 
et dépendances. 

Il permet de démarrer, arrêter et observer toute la stack avec quelques commandes, plutôt que de lancer chaque 
conteneur manuellement.

## compose.yml

Le fichier *compose.yml* est un fichier au format YAML qui définit et configure l'ensemble des services,
réseaux et volumes nécessaires à notre application. C'est le "plan d'architecture" de notre environnement Docker.

Pour notre projet **Drupal 11**, nous aurons besoin des services :

- **Drupal**, qui contiendra tout notre code,
- **MariaDB**, qui contiendra notre base de données,
- **PHPMyAdmin**, qui nous permettra de visualiser notre base de données via une interface,
- **Redis**, qui nous permettra de gérer le cache de Drupal,
- **Mailhog**, qui nous permettra d'intercepter et tester l'envoie de mail.

Nous aurons également besoin de plusieurs volumes pour enregistrer nos données :

- **data**, pour la base de données,
- **redis-data**, pour le cache.

### Création des services

Commencez par créer le fichier *compose.yml* à la racine du projet et ajoutez le code suivant :

```yaml
services:

volumes:
```

#### Drupal

Nous allons créer le premier service : **drupal**.

En dessous de `services:`, ajoutez le code suivant.

> ⚠️ Attention de bien respecter l'indentation ! Le format YAML est très strict en ce qui concerne l'indentation.
> `drupal` est enfant de `services`.

```yaml
drupal:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        PHP_VERSION: ${PHP_VERSION:-8.3}
    env_file:
      - .docker/.env.docker
    depends_on:
      mariadb:
        condition: service_healthy
      redis:
        condition: service_healthy
    ports:
      - "${WEB_PORT_HTTP:-80}:80"
      - "${WEB_PORT_HTTPS:-443}:443"
    volumes:
      - ./:/app
      - ./.docker/php/php.ini:/usr/local/etc/php/conf.d/custom.ini
    environment:
      - PHP_DEBUGGER=${PHP_DEBUGGER:-xdebug}
      - PHP_IDE_CONFIG=serverName=${DOMAIN_NAME:-drupal.test}
      - XDEBUG_CLIENT_HOST=${XDEBUG_CLIENT_HOST:-host.docker.internal}
      - XDEBUG_OUTPUT_DIR=${XDEBUG_OUTPUT_DIR:-/tmp/debug}
      - WEB_ALIAS_DOMAIN=${DOMAIN_NAME:-drupal.test}
      - WEB_DOCUMENT_ROOT=/app/web
      - PHP_DISMOD=ioncube
      - REDIS_HOST=redis
      - PHP_DATE_TIMEZONE=${TIMEZONE:-Europe/Paris}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 1m
      timeout: 10s
      retries: 3
      start_period: 30s
    restart: unless-stopped
```

Voyons en détail la configuration de notre service.

##### build

```yaml
build:
  context: . # Utilise le répertoire courant comme contexte de construction de l'image Docker
  dockerfile: Dockerfile # Chemin vers le Dockerfile qui définiera l'image
  args: # Version par défaut si non définie, cet argument est envoyé au Dockerfile
    PHP_VERSION: ${PHP_VERSION:-8.3}
```

La partie `build` permet de définir quelle image sera utilisée pour construire le service. Ici, nous précisons
que nous allons utiliser un fichier *Dockerfile*. On s'occupera de ce fichier plus tard.

Nous créons également un argument `PHP_VERSION` dans lequel on définit la version de **PHP** que l'on souhaite. Cet argument
sera transmis au *Dockerfile*.

La valeur `${PHP_VERSION:-8.3}` signifie que nous allons utiliser la variable d'environnement `PHP_VERSION` avec `8.3`
comme valeur par défaut.

##### env_file

```yaml
env_file:
  - .docker/.env.docker
```

`env_file` nous permet de spécifier à Docker quel fichier d'environnement utiliser. Comme vu précédemment, nous allons
utiliser des variables d'environnement. Il faut donc spécifier à **Docker** quel fichier d'environnement utiliser.

Nous nous occuperons de la création de ces fichiers d'environnement plus tard.

##### depends_on

```yaml
depends_on:
  mariadb:
    condition: service_healthy
  redis:
    condition: service_healthy
```

Cette configuration nous permet de préciser que notre service aura besoin de deux autres services pour fonctionner. De
plus nous précisons que le service `drupal` ne démarrera pas tant que ces deux services ne seront pas opérationnels.
Sans cette condition, notre application pourrait démarrer avant que la base de données soit prête à accepter des connexions.

##### ports

```yaml
ports:
  - "${WEB_PORT_HTTP:-80}:80"
  - "${WEB_PORT_HTTPS:-443}:443"
```

Nous précisons les ports utilisés pour atteindre notre service
- `80:80` pour le port HTTP.
- `443:443` pour le port HTTPS.

##### volumes

```yaml
volumes:
  - ./:/app
  - ./.docker/php/php.ini:/usr/local/etc/php/conf.d/custom.ini
```

Défini les volumes montés pour notre service.

- `./:/app`

Monte le répertoire courant du projet (`./`) à l'intérieur du conteneur au chemin `/app`.
Cela signifie que tous les fichiers de votre projet local seront accessibles dans le dossier `/app` du conteneur ce
qui permet de travailler sur votre code en local tout en l'exécutant dans le conteneur. Les modifications apportées
localement sont immédiatement reflétées dans le conteneur sans avoir à reconstruire l'image

- `./.docker/**/php.ini:/usr/local/etc/php/conf.d/custom.ini`

Monte un fichier de configuration **PHP** personnalisé depuis votre projet (`./.docker/php/php.ini`) vers l'emplacement
standard des configurations **PHP** dans le conteneur ce qui permet de personnaliser la configuration **PHP** sans modifier
l'image **Docker**. Les paramètres définis dans ce fichier surchargeront la configuration **PHP** par défaut du conteneur.

##### environment

```yaml
environment:
  - PHP_DEBUGGER=${PHP_DEBUGGER:-xdebug} # Définit l'outil de débogage PHP à utiliser
  - PHP_IDE_CONFIG=serverName=${DOMAIN_NAME:-drupal.test} # Configure l'IDE PHP pour le débogage distant
  - XDEBUG_CLIENT_HOST=${XDEBUG_CLIENT_HOST:-host.docker.internal} # Spécifie l'adresse IP de l'hôte (votre machine) où l'IDE est en cours d'exécution
  - XDEBUG_OUTPUT_DIR=${XDEBUG_OUTPUT_DIR:-/tmp/debug} # Définit le répertoire où les fichiers de profiling et de trace Xdebug seront stockés
  - WEB_ALIAS_DOMAIN=${DOMAIN_NAME:-drupal.test} # Définit le nom de domaine pour le serveur Apache
  - WEB_DOCUMENT_ROOT=/app/web # Spécifie le répertoire racine du document pour le serveur
  - PHP_DISMOD=ioncube # Désactive des modules PHP spécifiques. Ici, désactive le module IonCube qui peut parfois causer des conflits avec Drupal
  - REDIS_HOST=redis # Nom d'hôte du service Redis pour la mise en cache
  - PHP_DATE_TIMEZONE=${TIMEZONE:-Europe/Paris} # Définit le fuseau horaire PHP
```

Nous pouvons également définir directement dans le service des variables d'environnement pour notre conteneur.

##### healthcheck et restart

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost/"]
  interval: 1m
  timeout: 10s
  retries: 3
  start_period: 30s
restart: unless-stopped
```

Cette section configure un mécanisme de surveillance pour vérifier si le conteneur fonctionne correctement.

La traduction de cette section est : toutes les minutes, utilise la commande `curl` sur `localhost`. S'il n'y a aucune réponse
en 10 secondes alors le test est échoué et s'il y a 3 tests échoués consécutifs, alors le service est considéré comme
"unhealthy".

`restart: unless-stopped` précise que le conteneur redémarrera automatiquement s'il plante ou si l'hôte **Docker** redémarre.

#### MariaDB

En dessous de notre service `drupal`, nous allons créer le service `mariadb`. Une fois encore soyez attentif à l'indentation,
les services sont tous au même niveau.

````yaml
mariadb:
    image: mariadb:${DB_VERSION:-10.6} # Image Docker MariaDB avec la version spécifiée
    env_file:
      - .docker/.env.database
    ports:
      - "${DB_PORT:-3306}:3306" # Mappe le port de base de données de l'hôte vers le port 3306 du conteneur
    volumes:
      - data:/var/lib/mysql # Volume persistant pour les données de la base
    environment:
      - MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD:-root} # Mot de passe pour l'utilisateur root
      - MYSQL_DATABASE=${DB_NAME:-drupal} # Nom de la base de données à créer
      - MYSQL_USER=${DB_USER:-db} # Nom de l'utilisateur à créer
      - MYSQL_PASSWORD=${DB_PASSWORD:-db} # Mot de passe pour l'utilisateur créé
    healthcheck:
      test: [ "CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p${DB_ROOT_PASSWORD:-root}" ]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
````

Comme vous pouvez le constater, nous utilisons un fichier de variables d'environnement différent. Lors de la configuration
de **Drupal**, nous aurons besoin de ces variables d'environnement. Raison pour laquelle nous les définissons dans un fichier
d'environnement distinct. Nous pourrons ainsi réutiliser ces variables dans **Drupal** sans devoir importer l'ensemble des 
variables d'environnement.

#### PHPMyAdmin

````yaml
phpmyadmin:
    image: phpmyadmin/phpmyadmin # Image Docker officielle de phpMyAdmin
    env_file:
      - .docker/.env.database
    depends_on:
      mariadb:
        condition: service_healthy # S'assure que MariaDB démarre avant phpMyAdmin
    ports:
      - "${PHPMYADMIN_PORT:-80}:80" # Mappe le port de phpMyAdmin de l'hôte vers le port 80 du conteneur
    environment:
      - PMA_HOST=mariadb # Nom d'hôte du serveur MySQL/MariaDB à administrer
      - MYSQL_USER=${DB_USER:-db} # Nom d'utilisateur par défaut pour la connexion
      - MYSQL_PASSWORD=${DB_PASSWORD:-db} # Mot de passe par défaut pour la connexion
      - MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD:-root} # Mot de passe root pour l'accès administrateur
    restart: unless-stopped
````

#### Redis

````yaml
redis:
    image: redis:7-alpine # Image Docker Redis légère (Alpine)
    env_file:
      - .docker/.env.docker
    ports:
      - "${REDIS_PORT:-6379}:6379" # Mappe le port Redis de l'hôte vers le port 6379 du conteneur
    volumes:
      - redis-data:/data # Volume persistant pour les données Redis
    healthcheck:
      test: [ "CMD", "redis-cli", "ping" ]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s
    restart: unless-stopped
````

#### Mailhog

````yaml
mailhog:
    image: mailhog/mailhog # Image Docker pour intercepter et afficher les emails en développement
    env_file:
      - .docker/.env.docker
    ports:
      - "${MAILHOG_SMTP_PORT:-1025}:1025" # Port SMTP pour l'envoi de mails
      - "${MAILHOG_UI_PORT:-8025}:8025" # Port pour l'interface web de MailHog
    restart: unless-stopped
````

Tous nos services sont désormais configurés. Nous pouvons maintenant créer les volumes pour finaliser la configuration
de notre container.

### Création des volumes

Comme vous avez été attentif, vous avez remarqué que nous utilisons déjà les volumes nécessaires dans la configuration
des services.

Il ne reste plus qu'à les définir dans la partie `volumes:`.

> ⚠️ Vous ai-je déjà alertés sur l'indentation des fichiers YAML ?! Chaque volume est enfant de `volumes:`

````yaml
volumes:
  data:
    name: ${PROJECT_NAME:-drupal-project}_data # Volume persistant pour les données MariaDB
  redis-data:
    name: ${PROJECT_NAME:-drupal-project}_redis-data # Volume persistant pour les données de cache Redis
````

Nous ne nous contentons pas de simplement déclarer les volumes, nous leur donnons également un nom. C'est une bonne pratique
pour avoir une meilleure isolation entre projets et éviter les conflits.

## Conclusion

Dans ce chapitre, nous avons configuré notre environnement de développement **Docker** avec un fichier complet qui définit
tous les services nécessaires pour notre projet **Drupal 11** : *docker-compose.yml*

- Un service `drupal` pour exécuter notre application
- Une base de données **MariaDB** pour stocker nos données
- **PHPMyAdmin** pour administrer facilement notre base de données
- **Redis** pour optimiser le cache de Drupal
- **Mailhog** pour tester l'envoi d'emails en développement

Nous avons également configuré les volumes nécessaires pour assurer la persistance des données essentielles.

Mais notre fichier ne peut pas être fonctionnel en l'état car nous faisons référence à de la configuration **PHP** et des
variables d'environnement.

Nous devons donc compléter notre configuration avec trois fichiers essentiels :
- `.docker/php/php.example.ini` pour définir les valeurs par défaut de la configuration **PHP**.
- `.docker/.example.env.database` pour définir les valeurs par défaut des variables d'environnement de la base de données.
- `.docker/.example.env.docker` pour définir les valeurs par défaut des variables d'environnement pour la configuration 
de Docker.
