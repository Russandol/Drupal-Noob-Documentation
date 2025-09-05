# Dockerfile

## Définition

Le fichier *Dockerfile* est un script de configuration qui contient une série d'instructions permettant de
construire une image **Docker**. C'est la "recette" qui définit l'environnement, les dépendances et la configuration
nécessaires pour exécuter votre application dans un conteneur.

Rappelez-vous, lorsque nous avons défini la configuration du service `drupal` dans le fichier *compose.yml*, nous avons
défini dans la propriété `build` le chemin vers le fichier *Dockerfile* qui nous permet de construire l'image **Docker**.

Construisons pas à pas notre image **Docker**.

Créez un fichier *Dockerfile* (sans extension) à la racine du projet. Une fois le fichier créé, nous allons y ajouter 
nos instructions

## Définir l'image

Une image Docker est une collection organisée et immuable de fichiers système, de bibliothèques, de dépendances,
d'outils et de code application, empaquetée dans un format standardisé. C'est essentiellement un **instantané complet**
d'un système d'exploitation et d'un environnement d'exécution, prêt à être démarré comme un conteneur.

Je vous rassure, nous n'allons pas nous même définir l'ensemble des bibliothèques et autres outils.
Nous allons plutôt utiliser une image existante.

[webdevops/php-apache-dev](https://dockerfile.readthedocs.io/en/latest/content/DockerImages/dockerfiles/php-apache-dev.html),
est un **package autonome et exécutable** qui contient tout ce qui est nécessaire pour faire fonctionner une application.

Cette image intègre déjà **PHP**, **Apache** ainsi que des outils comme **Composer**.

Dans le fichier *Dockerfile*, ajoutez les lignes suivantes
```Dockerfile
# Définit une variable qu'on pourra utiliser ailleurs dans le Dockerfile
# Ici, on définit la version de PHP (8.3 par défaut), mais on peut la modifier
# lors de la construction avec --build-arg PHP_VERSION=8.2 par exemple
ARG PHP_VERSION=8.3

# Spécifie l'image de base à utiliser
# webdevops/php-apache-dev est une image qui combine PHP et Apache avec des outils de développement
# ${PHP_VERSION} utilise la valeur définie précédemment, ce qui rend notre Dockerfile flexible
FROM webdevops/php-apache-dev:${PHP_VERSION}
```

Nous retrouvons la variable `PHP_VERSION` que nous avons défini en tant qu'argument (`args`) dans le service `drupal`
du fichier *compose.yml*.

## Extensions PHP

Maintenant que nous avons défini quelle image nous allons utiliser, nous allons installer les extensions **PHP**
requises par **Drupal**.

```Dockerfile
# apt-get update : Met à jour la liste des paquets disponibles
# apt-get install -y : Installe les paquets sans demander de confirmation (-y)
# Les bibliothèques installées sont nécessaires pour :
#   - libpng-dev : Traitement d'images PNG
#   - libjpeg-dev : Traitement d'images JPEG
#   - libfreetype6-dev : Support des polices TrueType
#   - libzip-dev : Manipulation d'archives ZIP
#   - libzstd-dev : Compression Zstandard
# La dernière commande supprime les fichiers temporaires pour réduire la taille de l'image
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libzstd-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
```

## Modification du PATH

Nous modifions la variable d'environnement `PATH` pour inclure le répertoire *bin* de **Composer**.
Cela permet d'exécuter les binaires installés par **Composer** sans specifier le chemin complet.

Par exemple : on peut directement écrire `drush` au lien de `vendor/bin/drush`.

Vu le nombre de fois où nous allons utiliser les commandes de **Drush** je vous assure que c'est indispensable !
(Et si vous vous demandez ce qu'est **Drush**, un peu de patience !).

```Dockerfile
ENV PATH="${PATH}:/app/vendor/bin"
```

## Droit du dossier private

Nous aurons besoin d'un répertoire à la racine du conteneur pour tous les fichiers privés de notre application. Nous
donnons les droits du dossier à l'utilisateur `application` qui est l'utilisateur utilisé par l'image.

```Dockerfile
RUN mkdir /private && chown 1000:1000 /private
```

## Répertoire de travail

Enfin, il nous reste à définir le repertoire de travail par défaut dans le conteneur. Toutes les commandes RUN, CMD,
ENTRYPOINT, COPY et ADD qui suivent utiliseront `/app` comme répertoire courant

```Dockerfile
WORKDIR /app
```

## Conclusion

Et voilà, notre environnement de développement est prêt ! Nous pourrions nous arrêter là et commencer à installer **Drupal**.
Mais nous pouvons aller plus loin dans la configuration.