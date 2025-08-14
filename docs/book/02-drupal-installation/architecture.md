# Drupal - Architecture des fichiers

Notre site Drupal est installé et initialisé.

Notre projet a maintenant l'architecture suivante :
```
.
├── .docker/
│   ├── php/php.ini
│   ├── .env.database
│   └── .env.docker
├── make/
│   ├── docker.mk
│   └── drupal.mk
├── recipes/
├── vendor/
├── web/
│   ├── sites/default
│   ├── modules
│   └── themes
├── .dockerignore
├── .gitignore
├── compose.yml
├── compose-prod.yml
├── composer.json
├── composer.lock
├── Dockerfile
└── Makefile
```
