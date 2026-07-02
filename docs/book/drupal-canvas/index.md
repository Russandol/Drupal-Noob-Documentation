# Thème complet avec Drupal Canvas

**Drupal Canvas** est un outil de construction de pages visuelles (page builder) natif dans Drupal 11. Il permet de créer des mises en page riches en assemblant des composants directement dans le navigateur, sans écrire une seule ligne de HTML.

Cette formation vous guide de l'installation jusqu'à la mise en ligne d'un site complet.

## Prérequis

- Drupal 11 installé (voir la formation **Un projet de A à Z**)
- Connaissances de base en HTML/CSS
- Accès à l'administration Drupal

## Installation du module Canvas

```bash
ddev composer require drupal/canvas
ddev drush en canvas
ddev drush cr
```

Le choix du thème est traité dans le **Module 2**. Cette formation propose deux parcours :

| Parcours | Thème | Framework CSS |
|----------|-------|---------------|
| **A** | Mercury | Tailwind CSS |
| **B** | Bootstrap Forge + Canvas Bootstrap | Bootstrap 5 |

::: warning ⚠️ Thème Blank : Drupal CMS uniquement
Le thème **Blank** est exclusif à **Drupal CMS** (la distribution). Il n'est pas disponible sur Drupal Core. Cette formation utilise **Mercury** ou **Bootstrap Forge** selon le parcours choisi.
:::

## Ce que vous allez apprendre

| Module | Contenu |
|--------|---------|
| **Module 1** | Comprendre Canvas : Canvas Pages, interface, types de composants |
| **Module 2** | Choisir son thème — Parcours A (Mercury/Tailwind) ou Parcours B (Bootstrap Forge) |
| **Module 3** | Créer les composants SDC : Hero, Card, Grid |
| **Module 4** | Header & Footer globaux |
| **Module 5** | Construire les pages : accueil, intérieure, contact |
| **Module 6** | Pattern Components réutilisables |
| **Module 7** | Connexion aux contenus Drupal (nœuds, Views) |
| **Module 8** | Responsive, performance, accessibilité |

## À qui s'adresse cette formation ?

- **Développeurs Drupal** qui souhaitent intégrer Canvas dans leurs projets
- **Intégrateurs web** qui veulent comprendre l'architecture SDC
- **Chefs de projet** qui veulent autonomiser leurs clients sur la gestion des pages

::: tip Point de départ
Si vous débutez avec Drupal, commencez par la formation **Un projet de A à Z** avant de vous lancer dans cette formation Canvas.
:::
