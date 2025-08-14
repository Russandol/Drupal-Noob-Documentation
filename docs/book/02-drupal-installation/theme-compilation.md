# Guide étape par étape : Intégrer Gulp pour la compilation SASS dans un projet Drupal 11 avec Docker
Voici un guide détaillé pour mettre en place une compilation SASS avec Gulp dans un environnement Drupal 11 conteneurisé avec Docker.
## Prérequis
- Docker et Docker Compose installés sur votre machine
- Un projet Drupal 11 fonctionnel avec Docker
- Accès à un terminal

## Étape 1 : Créer un thème personnalisé
Commençons par créer un thème personnalisé si vous n'en avez pas déjà un :
1. Dans votre projet Drupal, naviguez vers le dossier des thèmes :
``` bash
   cd web/themes/custom/
```
(Si le dossier `custom` n'existe pas, créez-le)
1. Créez un dossier pour votre thème :
``` bash
   mkdir mon_theme
   cd mon_theme
```
1. Créez un fichier `mon_theme.info.yml` :
``` yaml
   name: Mon Thème
   type: theme
   description: 'Thème personnalisé avec compilation SASS'
   core_version_requirement: ^11
   base theme: false
   libraries:
     - mon_theme/global-styling
```
1. Créez un fichier `mon_theme.libraries.yml` :
``` yaml
   global-styling:
     css:
       theme:
         css/styles.css: {}
     js:
       js/scripts.js: {}
```
## Étape 2 : Préparer la structure de fichiers pour SASS
1. Créez les dossiers nécessaires :
``` bash
   mkdir -p scss js css
```
1. Créez un fichier SASS initial :
``` bash
   touch scss/styles.scss
```
1. Ajoutez du contenu au fichier SCSS pour tester :
``` scss
   // Variables
   $primary-color: #0078d7;
   $secondary-color: #333;
   $padding: 15px;

   // Styles de base
   body {
     font-family: 'Arial', sans-serif;
     line-height: 1.6;
     color: $secondary-color;
   }

   h1, h2, h3 {
     color: $primary-color;
   }

   .container {
     max-width: 1200px;
     margin: 0 auto;
     padding: $padding;
   }
```
1. Créez un fichier JavaScript de base :
``` bash
   touch js/scripts.js
```
``` javascript

   (function ($, Drupal) {
     'use strict';
     Drupal.behaviors.monTheme = {
       attach: function (context, settings) {
         console.log('Mon thème est chargé');
       }
     };
   })(jQuery, Drupal);
```
## Étape 3 : Configurer Gulp dans le conteneur Docker
### Option 1 : Ajouter Node.js à votre image Docker existante
1. Modifiez votre `Dockerfile` pour inclure Node.js et npm (créez-en un si vous n'en avez pas) :
``` dockerfile
   # À ajouter à votre Dockerfile existant
   RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - \
       && apt-get install -y nodejs \
       && npm install -g gulp-cli
```
1. Reconstruisez votre image Docker :
``` bash
   docker-compose build
```
### Option 2 : Utiliser un conteneur Node.js séparé (Recommandé)
1. Modifiez votre `docker-compose.yml` pour ajouter un service Node.js :
``` yaml
   services:
     # Vos services existants (web, db, etc.)
     
     node:
       image: node:18
       volumes:
         - ./:/app
       working_dir: /app/web/themes/custom/mon_theme
       command: /bin/bash -c "npm install && gulp watch"
       tty: true
```
## Étape 4 : Configurer Gulp dans votre thème
1. Accédez au conteneur Docker (choisissez l'approche qui correspond à votre configuration) :
``` bash
   # Si vous avez ajouté Node.js à votre conteneur principal
   docker-compose exec web bash
   cd web/themes/custom/mon_theme
   
   # OU si vous utilisez un conteneur Node.js séparé
   docker-compose exec node bash
```
1. Initialisez npm dans votre thème :
``` bash
   npm init -y
```
1. Installez Gulp et les dépendances nécessaires :
``` bash
   npm install --save-dev gulp gulp-sass sass gulp-sourcemaps gulp-autoprefixer gulp-clean-css browser-sync
```
1. Créez un fichier `gulpfile.js` à la racine de votre thème :
``` javascript
   const gulp = require('gulp');
   const sass = require('gulp-sass')(require('sass'));
   const sourcemaps = require('gulp-sourcemaps');
   const autoprefixer = require('gulp-autoprefixer');
   const cleanCSS = require('gulp-clean-css');

   // Chemins des fichiers
   const paths = {
     scss: {
       src: './scss/**/*.scss',
       dest: './css'
     },
     js: {
       src: './js/**/*.js',
       dest: './js'
     }
   };

   // Tâche de compilation SASS
   function compileSass() {
     return gulp.src(paths.scss.src)
       .pipe(sourcemaps.init())
       .pipe(sass().on('error', sass.logError))
       .pipe(autoprefixer())
       .pipe(cleanCSS({ compatibility: 'ie8' }))
       .pipe(sourcemaps.write('./'))
       .pipe(gulp.dest(paths.scss.dest));
   }

   // Tâche de surveillance
   function watch() {
     gulp.watch(paths.scss.src, compileSass);
   }

   // Définition des tâches
   exports.sass = compileSass;
   exports.watch = watch;
   exports.default = gulp.series(compileSass, watch);
```
## Étape 5 : Lancer la compilation
1. Exécutez Gulp pour compiler vos fichiers SASS :
``` bash
   # Dans le conteneur
   gulp
```
1. Si vous utilisez l'option du conteneur Node.js séparé, il devrait déjà être en train d'exécuter `gulp watch` (comme spécifié dans la commande du service).

## Étape 6 : Activer votre thème dans Drupal
1. Dans l'interface d'administration de Drupal, naviguez vers Apparence (`/admin/appearance`).
2. Trouvez votre thème et cliquez sur "Installer et définir par défaut".

## Étape 7 : Configuration pour le développement continu
Pour faciliter votre workflow de développement, vous pouvez créer des scripts npm :
1. Modifiez votre `package.json` :
``` json
   "scripts": {
     "start": "gulp",
     "build": "gulp sass"
   }
```
1. Vous pouvez maintenant exécuter :
``` bash
   npm run start    # Pour démarrer la compilation et la surveillance
   npm run build    # Pour une compilation unique
```
## Structure finale du thème
Votre thème devrait maintenant avoir la structure suivante :
``` 
mon_theme/
├── css/
│   ├── styles.css
│   └── styles.css.map
├── scss/
│   └── styles.scss
├── js/
│   └── scripts.js
├── gulpfile.js
├── package.json
├── package-lock.json
├── node_modules/
├── mon_theme.info.yml
└── mon_theme.libraries.yml
```
## Conseils supplémentaires
1. **Organisation des fichiers SCSS** : Pour les projets plus importants, organisez vos fichiers SCSS en sous-dossiers thématiques :
``` 
   scss/
   ├── base/
   │   ├── _reset.scss
   │   └── _typography.scss
   ├── components/
   │   ├── _buttons.scss
   │   └── _forms.scss
   ├── layout/
   │   ├── _header.scss
   │   └── _footer.scss
   └── styles.scss (fichier principal qui importe tous les autres)
```
1. **Optimisation des performances** : Ajoutez une tâche pour optimiser les images et minifier le JavaScript.
2. **Vider le cache Drupal** : Après des modifications CSS significatives, n'oubliez pas de vider le cache Drupal.
3. **Mise en place d'un script Docker** : Pour simplifier davantage, vous pouvez créer un script shell qui lance automatiquement les tâches Gulp :
``` bash
   #!/bin/bash
   # Fichier: scripts/gulp-watch.sh
   docker-compose exec node npm run start
```
1. **Intégration avec Drush** : Vous pouvez configurer des hooks Drush pour compiler automatiquement le SASS lors du déploiement.

Votre installation est maintenant complète ! Vous avez un workflow de développement moderne avec compilation SASS via Gulp dans un environnement Drupal 11 conteneurisé
