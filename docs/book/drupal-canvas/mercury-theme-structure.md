# Étape 2.1 — Créer son thème avec Mercury

## Blank vs Mercury : quelle différence ?

::: warning ⚠️ Important : Blank n'est pas disponible sur Drupal Core
Le thème **Blank** affiché lors de l'installation de **Drupal CMS** est exclusif à cette distribution. Il fait partie des recettes embarquées dans Drupal CMS et **n'est pas disponible** dans une installation de Drupal Core seul, même avec le module Canvas installé.

Pour **Drupal Core + Canvas**, le thème recommandé est **Mercury**.
:::

## Qu'est-ce que Mercury ?

**Mercury** est le thème de départ officiel pour utiliser **Drupal Canvas sur Drupal Core**. Il fonctionne comme un **starterkit** : plutôt que d'utiliser Mercury directement, vous l'utilisez pour **générer votre propre thème personnalisé**, qui en hérite la structure.

Avantages par rapport à un thème contrib classique :
- Votre thème est dans `themes/custom/` → vous pouvez le modifier librement
- Pas de risque d'écrasement lors des mises à jour Composer
- Structure préparée pour Canvas et les SDC dès le départ

## Installer Mercury et créer votre thème

### Étape 1 — Installer le starterkit Mercury via Composer

```bash
ddev composer require drupal/mercury
```

### Étape 2 — Générer votre thème personnalisé

Drupal Core fournit un script pour générer un thème depuis un starterkit :

```bash
ddev php web/core/scripts/drupal generate-theme mon_theme \
  --starterkit mercury \
  --name "Mon Thème" \
  --description "Mon thème basé sur Mercury" \
  --path themes/custom
```

::: info
Remplacez `mon_theme` par le machine name de votre thème (lettres minuscules, underscores uniquement). Remplacez `"Mon Thème"` par le nom lisible de votre thème.
:::

Votre thème est créé dans :

```
web/themes/custom/mon_theme/
```

### Étape 3 — Activer votre thème

```bash
ddev drush theme:enable mon_theme
ddev drush config:set system.theme default mon_theme
ddev drush cr
```

Ou depuis l'administration :

```
Administration → Apparence → Mon Thème → Définir comme thème par défaut
```

## Structure des fichiers générés

Voici ce que le starterkit Mercury crée dans votre thème :

```
web/themes/custom/mon_theme/
├── mon_theme.info.yml          ← Déclaration du thème
├── mon_theme.libraries.yml     ← Déclaration des bibliothèques CSS/JS
├── mon_theme.theme             ← Hooks PHP du thème
├── components/                 ← Dossier pour vos composants SDC
│   └── (vide au départ)
├── templates/                  ← Templates Twig généraux
│   └── layout/
│       └── page.html.twig
└── css/
    └── global.css
```

## Le fichier `mon_theme.info.yml`

Voici le contenu généré par le starterkit :

```yaml
name: Mon Thème
type: theme
description: 'Mon thème personnalisé basé sur Mercury, pour Drupal Canvas.'
core_version_requirement: ^10 || ^11
starterkit: mercury

libraries:
  - mon_theme/global

regions:
  header: Header
  primary_menu: 'Menu principal'
  secondary_menu: 'Menu secondaire'
  highlighted: Highlighted
  breadcrumb: Fil d'Ariane
  content: Contenu
  sidebar_first: 'Colonne latérale gauche'
  sidebar_second: 'Colonne latérale droite'
  footer: Footer
```

### Ce que chaque clé signifie

| Clé                        | Rôle                                                      |
|----------------------------|-----------------------------------------------------------|
| `name`                     | Nom affiché dans l'admin Drupal                           |
| `type: theme`              | Indique que c'est un thème (et non un module)             |
| `core_version_requirement` | Versions Drupal compatibles                               |
| `starterkit: mercury`      | Indique que ce thème est généré depuis Mercury            |
| `libraries`                | Bibliothèques CSS/JS chargées sur toutes les pages        |
| `regions`                  | Zones disponibles dans le template `page.html.twig`       |

## Le dossier `components/`

C'est ici que vous allez créer tous vos composants SDC. Il est vide au départ — c'est normal.

```
components/
├── hero/
│   ├── hero.component.yml
│   ├── hero.twig
│   └── hero.css
├── card/
│   ├── card.component.yml
│   ├── card.twig
│   └── card.css
└── grid/
    ├── grid.component.yml
    ├── grid.twig
    └── grid.css
```

::: tip
Nous créerons ces composants un par un dans le **Module 3**. Pour l'instant, concentrez-vous sur la compréhension de la structure.
:::

## Vérifier que tout fonctionne

Après avoir activé votre thème, videz le cache et visitez votre site :

```bash
ddev drush cr
```

Vous devriez voir une page quasi vide, sans style CSS. C'est normal et attendu : Mercury est une ardoise vierge. C'est votre point de départ pour construire votre propre design composant par composant.

::: info Bonne pratique
Versionnez votre thème dans Git dès le départ :
```bash
git add web/themes/custom/mon_theme
git commit -m "Création du thème mon_theme depuis le starterkit Mercury"
```
:::

## ⚠️ Problème connu : SDC et Tailwind

Mercury utilise **Tailwind CSS** pour ses styles. Or, à ce jour, **les composants SDC (code components) de Canvas ne sont pas compatibles avec les thèmes basés sur Tailwind** comme Mercury. Créer un composant SDC peut casser les styles du thème.

Ce problème est suivi et sera corrigé dans une prochaine version de Canvas. En attendant, une page entière est dédiée à ce sujet et à son contournement :

→ **[Étape 2.3 — Mise en place des outils CSS](/drupal-canvas/mercury-theme-css)**
