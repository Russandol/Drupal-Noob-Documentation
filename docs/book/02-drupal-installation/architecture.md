# Drupal - Architecture des fichiers

Notre site **Drupal** est installé et initialisé.

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
│   ├── core
│   ├── modules
│   ├── sites
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

Faisons un rapide tour d'horizon des nouveaux dossiers et fichiers.

## recipes/

Les **recipes** automatisent l’installation et la configuration des modules en créant des scripts capables d’installer des 
modules et des thèmes, et de configurer un site **Drupal** déjà existant.

## vendor/

Est-il vraiment nécessaire de présenter ce dossier ?!

## web/

C'est le dossier racine de notre site **Drupal**. C'est dans ce dossier que se trouvent les fichiers principaux du site.
C'est également dans ce dossier que nous allons principalement développer.

D'ailleurs, souvenez-vous, lors de la configuration du service `drupal` du fichier *compose.yml* nous avons défini le 
dossier *web* comme étant le dossier racine du site avec la ligne : 

```yaml
- WEB_DOCUMENT_ROOT=/app/web
```

### web/core/

Ce dossier contient les fichiers principaux du cœur de **Drupal**. Ce qui est un peu surprenant d'ailleurs, on pourrait
s'attendre à ce que tout se trouve dans le dossier *vendor*.

### web/modules/

Comme son nom l'indique, ce dossier contient les modules **Drupal**, qu'ils soient contribués, c'est-à-dire installés via
**Composer**, ou que nous allons développer nous même.

### web/themes/

Ce dossier contient les thèmes graphiques de **Drupal**. Tout comme pour le dossier *web/modules*, les thèmes peuvent
être contribués ou créés de toutes pièces.

### web/sites/

Ce dossier contient les fichiers de configuration du site **Drupal**. Et d'ailleurs nous allons nous y intéresser dès 
maintenant.
