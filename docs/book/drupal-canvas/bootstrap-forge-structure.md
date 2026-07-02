# Étape 2.4 — Créer son thème avec Bootstrap Forge

## Qu'est-ce que Bootstrap Forge ?

**Bootstrap Forge** est un thème Drupal 11 qui sert d'**outil de scaffolding** pour générer un sous-thème Bootstrap 5 
personnalisé via un script interactif.

Le sous-thème généré utilise **Bootstrap Barrio** comme base theme et intègre **Webpack + SASS** pour la compilation CSS.

## Installation

### Étape 1 — Installer Bootstrap Forge (et Canvas Bootstrap si disponible)

```bash
ddev composer require drupal/bootstrap_barrio
ddev composer require drupal/bootstrap_forge
```

::: tip ❓ Pourquoi installer **bootstrap_barrio** alors qu'il est en dépendance de **bootstrap_forge** ?
Bootstrap Forge est uniquement un outil de génération. Une fois le sous-thème créé, le garder ne sert à rien et peut
porter à confusion. Bootstrap Barrio, en revanche, reste nécessaire en tant que base theme.

Si on n'installe pas ces deux modules séparément, **Bootstrap Barrio** se retirera avec **Bootstrap Forge**.
:::

### Étape 2 — Naviguer dans le dossier Bootstrap Forge

```bash
cd web/themes/contrib/bootstrap_forge
```

### Étape 3 — Rendre le script exécutable

```bash
chmod +x scripts/create_subtheme.sh
```

### Étape 4 — Lancer le script de création du sous-thème

```bash
./scripts/create_subtheme.sh
```

Le script vous pose des questions interactives (nom du thème, machine name, etc.) et génère votre sous-thème 
automatiquement dans `web/themes/custom/`.

::: tip Nom du sous-thème
Choisissez un nom clair et en snake_case, par exemple `mon_theme_bootstrap`. Ce nom est utilisé comme machine name du 
thème et comme préfixe de tous ses fichiers.
:::

### Étape 5 — Nettoyer Bootstrap Forge

Une fois votre sous-thème généré, Bootstrap Forge n'est plus nécessaire. Avant de le retirer, il faut d'abord **déclarer 
Bootstrap Barrio explicitement** dans vos dépendances Composer — sinon il serait retiré avec Bootstrap Forge, cassant 
votre sous-thème.

```shell
ddev composer remove drupal/bootstrap_forge
ddev drush cr
```

## Structure générée

Après exécution du script, votre structure ressemble à ceci :

```
web/
└── themes/
    ├── contrib/
    │   └── bootstrap_barrio/   ← Base theme (conservé)
    └── custom/
        └── mon_site_bootstrap/ ← Votre sous-thème généré
            ├── mon_site_bootstrap.info.yml
            ├── mon_site_bootstrap.libraries.yml
            ├── mon_site_bootstrap.theme
            ├── package.json        ← Dépendances npm (Webpack + SASS)
            ├── webpack.config.js   ← Configuration Webpack
            ├── scss/               ← Sources SASS à modifier
            ├── components/         ← Vos composants SDC personnalisés
            └── templates/          ← Overrides de templates Twig
```

## Installer les dépendances npm

Depuis la racine de votre projet DDEV :

```bash
ddev npm install --prefix web/themes/custom/mon_site_bootstrap
```

Ou en naviguant dans le dossier :

```bash
cd web/themes/custom/mon_site_bootstrap
ddev npm install
```

## Activer votre thème

```bash
ddev drush theme:enable mon_site_bootstrap
ddev drush config:set system.theme default mon_site_bootstrap
```

Ou depuis l'administration :

```
Administration → Apparence → Mon Site Bootstrap → Définir comme thème par défaut
```

::: warning Ne pas versionner `node_modules`
Ajoutez ces dossiers dans `.gitignore` si ce n'est pas déjà fait :

```
web/themes/custom/mon_site_bootstrap/node_modules/
```

Chaque développeur lancera `ddev npm install` et `npm run build:dev` de son côté.
:::

## Différence avec Mercury

| Aspect                | Mercury                              | Bootstrap Forge                          |
|-----------------------|--------------------------------------|------------------------------------------|
| **Création du thème** | Script Drupal `generate-theme`       | Script shell `create_subtheme.sh`        |
| **CSS framework**     | Tailwind CSS                         | Bootstrap 5 via SASS                     |
| **Compilateur CSS**   | Vite                                 | Webpack                                  |
| **Emplacement**       | `themes/custom/mon_theme/`           | `themes/custom/mon_site_bootstrap/`      |
| **Base theme**        | Autonome (starterkit)                | Bootstrap Barrio (conservé)              |
| **Scaffold retiré ?** | Non (Mercury reste en contrib)       | Oui, mais après `require bootstrap_barrio` |
