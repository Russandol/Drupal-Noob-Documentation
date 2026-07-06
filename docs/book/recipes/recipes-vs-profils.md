# 🔄 Recipes vs Profils d'installation

Si vous avez déjà travaillé avec **Drupal**, vous connaissez certainement les **profils d'installation** : *Standard*, *Minimal*, *Demo Umami*… Ils permettent de préconfigurer un site à l'installation. Mais ils présentent de nombreuses limitations que les **Recipes** viennent résoudre.

## 📦 Rappel : qu'est-ce qu'un profil d'installation ?

Un **profil d'installation** est un ensemble de fichiers **PHP** et de configuration qui pilote le processus d'installation initiale de **Drupal**. Il définit les modules à activer, les configurations par défaut, les thèmes, etc.

Exemples de profils fournis par le core :

| Profil | Description |
|---|---|
| *standard* | Profil par défaut avec les modules essentiels |
| *minimal* | Installation minimale, sans configuration superflue |
| *demo_umami* | Site de démonstration culinaire |

## ⚔️ Comparaison directe

| Critère | Profil d'installation | Recipe |
|---|---|---|
| **Moment d'application** | À l'installation uniquement | Sur un site existant, à tout moment |
| **Modifiable après coup** | Non (état verrouillé) | Oui (réapplicable) |
| **Composition** | Impossible d'en combiner plusieurs | Oui, une recipe peut en appeler d'autres |
| **Syntaxe** | PHP + hooks complexes | YAML déclaratif |
| **Partage communautaire** | Difficile (trop couplé) | Simple (package Composer) |
| **Idempotence** | Non | Oui (conçu pour être rejoué) |

::: warning ⚠️ Attention
Un profil d'installation **verrouille** l'état initial du site. Une fois installé, vous ne pouvez plus changer de profil sans réinstaller **Drupal** from scratch. Les **Recipes** n'ont pas cette contrainte.
:::

## 🏆 Pourquoi les Recipes l'emportent

### 1. Applicables à tout moment

```shell
# Une recipe s'applique sur un site déjà installé
drush recipe recipes/mon-setup-gin
```

Pas besoin de réinstaller le site pour bénéficier d'un nouveau setup. C'est idéal pour **migrer un projet existant** ou **standardiser un parc de sites**.

### 2. Composables

```yaml
# Une recipe peut inclure d'autres recipes
recipes:
  - core/recipes/basic_html_format_editor
  - core/recipes/standard_page_type
```

Les profils ne peuvent pas s'inclure mutuellement. Les **Recipes**, si. Vous pouvez construire un setup complexe en empilant des briques indépendantes.

### 3. Déclaratives et lisibles

Un profil d'installation nécessite des fichiers **PHP** avec des hooks (`hook_install()`, `hook_update_N()`) que seul un développeur expérimenté maîtrise. Une **Recipe** s'écrit en **YAML** simple, lisible et auditable par toute l'équipe.

::: tip 💡 Bonne pratique
Réservez les **profils d'installation** aux cas où vous devez piloter l'écran d'installation de **Drupal** (sites SaaS, hébergement mutualisé). Pour tout le reste, préférez les **Recipes** : elles sont plus flexibles, plus simples et plus maintenables.
:::

## 🔀 Coexistence : profil + Recipes

Les deux approches ne s'excluent pas ! La combinaison recommandée est :

1. Profil *minimal* ou *standard* à l'installation initiale.
2. **Recipes** pour chaque couche fonctionnelle (admin, éditorial, SEO, performance…).

```shell
# Installation initiale avec profil minimal
drush site:install minimal

# Configuration de l'interface d'administration
drush recipe recipes/setup-gin-admin

# Configuration de l'espace éditorial
drush recipe recipes/setup-editorial
```

::: info ℹ️
Les **Recipes** officielles du core de **Drupal** sont d'ailleurs conçues pour compléter les profils existants, pas les remplacer.
:::

::: details Aller plus loin
Le projet **Drupal Starshot** (initiative de simplification de **Drupal** portée par Dries Buytaert) repose entièrement sur les **Recipes** pour livrer une expérience prête à l'emploi. L'objectif est de remplacer les distributions monolithiques par des ensembles de **Recipes** légères et composables, publiées sur Drupal.org comme n'importe quel module contrib.
:::
