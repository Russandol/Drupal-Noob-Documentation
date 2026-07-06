# 🍳 Qu'est-ce qu'une Recipe ?

## Définition

Une **Recipe** (recette) Drupal est un mécanisme qui **automatise l'installation de modules,
de thèmes et la mise en place de configurations** sur un site **Drupal** existant.

L'idée est simple : plutôt que de répéter à la main les mêmes étapes d'installation et de
configuration sur chaque nouveau projet, on les **encapsule une fois pour toutes** dans un
fichier déclaratif, que l'on peut rejouer à volonté.

::: tip 💡 Bonne pratique
Comme une recette de cuisine, une **Recipe** **Drupal** liste les **ingrédients** (modules, thèmes)
et les **étapes de préparation** (configuration à appliquer). N'importe quel développeur peut
la reproduire, avec le même résultat garanti.
:::

## 🎯 Ce qu'une Recipe peut faire

Une **Recipe** est capable de :

- ✅ **Appeler d'autres recipes** (composition de recipes)
- ✅ **Installer des modules et des thèmes**
- ✅ **Importer des fichiers de configuration** (blocs, vues, formats de texte…)
- ✅ **Modifier des configurations existantes** via des actions déclaratives

::: warning ⚠️ Attention
Une **Recipe** s'applique sur un **site déjà installé**. Elle ne remplace pas le processus
d'installation initial de **Drupal**. Elle vient enrichir et configurer un site existant.
:::

## 🌍 Pourquoi les Recipes sont-elles importantes ?

Avant les **Recipes**, pour livrer un ensemble cohérent de fonctionnalités préconfigurées,
les développeurs n'avaient qu'une seule option sérieuse : créer un **profil d'installation**.
Cette approche avait de nombreuses limites *(nous y reviendrons en section 1.2)*.

Les **Recipes** répondent à un besoin fondamental exprimé par la communauté **Drupal** :
**partager et réutiliser des patterns de configuration** de manière simple, composable et
sans effet de bord.

> *"Les Recipes condensent des années d'expertise en solutions reproductibles et partageables."*
> — Dries Buytaert, DrupalCon Barcelona 2024

## 🗂️ Les Recipes dans l'écosystème Drupal 11

Les **Recipes** font partie de l'initiative stratégique **Distributions and Recipes** portée
par le cœur de **Drupal**. Depuis **Drupal 11.1**, l'API Recipe est intégrée directement dans
le core.

On les retrouve à plusieurs niveaux :

| Niveau | Exemple |
|---|---|
| **Core** | *core/recipes/administrator_role*, *core/recipes/basic_html_format_editor* |
| **Contrib** | Packages publiés sur Drupal.org avec le type `drupal-recipe` |
| **Custom** | Recipes propres à votre projet, versionnées dans votre dépôt |

::: info ℹ️
Les **Recipes** de votre projet se placent généralement dans un dossier *recipes/* à la racine
de votre projet, aux côtés de *web/* et *composer.json*.
:::

::: details Aller plus loin
Le package **`drupal/core-recipe-unpack`** est automatiquement présent depuis **Drupal 11.2**.
Il permet de décompresser les dépendances déclarées dans une **Recipe** (modules, thèmes)
directement dans le *composer.json* du projet, assurant ainsi une gestion propre
des dépendances **Composer**.
:::