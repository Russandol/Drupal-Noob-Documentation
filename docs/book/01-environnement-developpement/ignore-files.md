# les fichiers .ignore

Nous sommes presque au bout de notre configuration d'environnement sous **Docker**. Il nous reste un type de fichier à créer
pour que ça soit complet : les fichiers *.ignore*.

## .gitignore

Le fichier *.gitignore* est un fichier de configuration qui indique à **Git** quels fichiers et dossiers ignorer lors des
opérations de versionnement. Il permet d'éviter d'ajouter au dépôt des fichiers qui ne devraient pas être partagés.

Ce fichier permet d'exclure automatiquement des fichiers du versionnement, ce qui est très pratique pour :
- **Eviter de versionner** les fichiers de configuration personnels, comme ceux de l'IDE par exemple.
- **Protéger les informations sensibles** en évitant que les fichiers *.env* et les mots de passe soit visible dans le git.
- **Réduire la taille du dépôt** en excluant les dossiers de dépendances comme *vendor/* ou *node_modules/*.
- **Eviter les conflits inutiles**, comme sur les fichiers de logs ou de cache qui changent constamment.

Créez le fichier *.gitignore* à la racine du projet et copier le texte suivant :

```dotenv
# IDE files
.idea/

# Docker configuration
.docker/.env.database
.docker/.env.docker
.docker/php/php.ini

```

## .dockerignore

Le fichier *.dockerignore* fonctionne sur le même principe que le *.gitignore*, mais pour **Docker**. Il indique quels fichiers et
dossiers doivent être ignorés lors de la construction d'une image **Docker**.

Ce qui permet de :
- **Accélérer le processus de build** en excluant les fichiers inutiles au fonctionnement de l'application.
- **Renforcer la sécurité** en ignorant les informations sensibles dans l'image **Docker**.
- **Evite d'incorporer** les fichiers spécifiques à l'environnement.

Toujours à la racine du projet, créez le fichier *.dockerignore* et copier le texte suivant :

```dotenv
# IDE files
.idea/

# Contrôle de version
.git
.gitignore

# Docker files
.dockerignore
compose.yml
compose-prod.yml
Dockerfile
.docker/example.env.database
.docker/example.env.docker
.docker/.env.database
.docker/.env.docker
.docker/php/php.example.ini
.docker/php/php.ini
```