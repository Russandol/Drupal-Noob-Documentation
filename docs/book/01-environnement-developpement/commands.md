# Commandes Docker

Nous avons préparé un environnement de développement complet basé sur **Docker**, prêt à l'emploi et
préconfiguré pour répondre à tous nos besoins. Cet environnement inclut tous les services nécessaires pour développer 
efficacement notre application **Drupal**, sans avoir à installer manuellement les dépendances sur notre machine.

L'arborescence des fichiers de notre projet doit ressembler à ceci : 

```
.
├── .docker/
│   ├── php/
│   │   └── php.ini.example
│   ├── .env.example
├── .dockerignore
├── .gitignore
├── compose.yml
├── compose-prod.yml
└── Dockerfile
```

Pour commencer à utiliser cet environnement, nous devrons exécuter quelques commandes **Docker Compose** dans notre terminal.

Ces commandes nous permettront de :
- **Construire** les images Docker nécessaires.
- **Démarrer** tous les conteneurs.
- **Accéder à un terminal** dans le conteneur principal.
- **Surveiller les logs** de notre application.
- **Arrêter** proprement l'environnement quand nous avons terminé.

Mais avant de voir ces commandes en détail, il est nécessaire de bien comprendre le workflow de **Docker**.

## Workflow Docker : build, up, down

Le workflow **Docker** s'articule autour de trois commandes qui forment le cycle de vie de nos conteneurs.

- **build** : construit (ou reconstruit) les images des services, interprète les directives du *Dockerfile*, prépare les
volumes et les ports, etc..
- **up** : crée les conteneurs à partir des images et démarre les services.
- **down** : arrête proprement les services et supprime les conteneurs, mais conserve les volumes.

## Construire les images sans utiliser le cache

```shell
docker compose build --env-file .docker/.env --no-cache
```

Cette commande :
- Exécute l'action `build` pour construire toutes les images définies dans le fichier *compose.yml*.
- l'option `--env-file` indique à **Docker** quel fichier contient les variables d'environnement.
- L'option `--no-cache` force **Docker** à reconstruire les images depuis zéro sans utiliser le cache d'images existant.

## Démarrer les conteneurs en mode détaché

```shell
docker compose up --env-file .docker/.env -d
```

Cette commande :
- Exécute l'action `up` pour démarrer tous les services définis.
- L'option `-d` (détaché) lance les conteneurs en arrière-plan.

## Exécuter un shell bash dans le conteneur drupal

```shell
docker compose exec -u application drupal bash
```
Cette commande :
- Exécute l'action `exec` pour exécuter une commande dans un conteneur en cours d'exécution.
- L'option `-u application` spécifie que la commande doit être exécutée en tant qu'utilisateur "application".
- Cible le service nommé `drupal`.
- Lance une session `bash` intéractive dans ce conteneur.

Il faut bien comprendre que nous allons travailler avec des conteneurs. Les outils comme **Composer** sont installés à 
l'intérieur de notre conteneur et ne sont pas disponibles sur notre machine. Nous devons donc avoir la possibilité de 
nous connecter à notre conteneur et de lancer des commandes.

> ❓ Pourquoi utiliser l'utilisateur "application" ?

Il est très important d'utiliser l'utilisateur "application" car c'est l'utilisateur créé automatiquement dans l'image
`webdevops/php-apache-dev` avec les privilèges et droits configurés.

Si on utilise l'utilisateur `root` par défaut, nous allons forcément nous retrouver avec des problèmes de droits sur les
fichiers et dossiers.

Par exemple, lorsque nous exécutons une commande avec **Composer**, tous les fichiers et dossiers créés seront fait avec 
l'utilisateur définit lors de la connexion en shell au conteneur.

## Afficher les logs en temps réel

```shell
docker compose logs -f
```

Cette commande :
- Exécute l'action pour afficher les logs de tous les services `logs`.
- L'option `-f` (follow) permet de suivre les logs en temps réel.

## Arrêter et supprimer les conteneurs

```shell
docker compose down
```

Cette commande exécute l'action d'arrêter et supprimer tous les conteneurs.

## Conclusion

Nous avons donc tout ce qu'il nous faut pour gérer notre environnement **Docker**. Mais on ne va pas se mentir, plusieurs
de ces commandes sont assez indigestes. Et encore, nous n'avons pas vu le cas où nous voulons lancer les commandes avec
la configuration de production !

Heureusement, nous avons une solution pour simplifier notre workflow !