# 🎓 Synthèse et aller plus loin

Vous avez parcouru l'ensemble du cycle de vie d'une **Recipe** **Drupal** : de la compréhension du concept à l'exécution en passant par la création. Cette section récapitule les points essentiels et vous ouvre des pistes pour aller plus loin.

## 5.1 Ce qu'il faut retenir

### Les concepts fondamentaux

| Concept | Résumé |
|---|---|
| **Recipe** | Mécanisme déclaratif (**YAML**) pour installer des modules, des thèmes et appliquer des configurations sur un site existant |
| **recipe.yml** | Fichier principal : `name`, `recipes`, `install`, `config.import`, `config.actions` |
| **composer.json** | Déclare les dépendances externes de la **Recipe** (modules, thèmes contrib) |
| **`drush recipe`** | Commande d'application d'une **Recipe** |
| **`simpleConfigUpdate`** | Action pour modifier partiellement une configuration existante |
| **`config.import`** | Importe des fichiers YAML de configuration depuis le dossier *config/* de la **Recipe** |
| **`core-recipe-unpack`** | Extrait les dépendances d'une **Recipe** vers le *composer.json* du projet |

### Le flux complet en résumé

```
1. Créer le dossier de la Recipe
        ↓
2. Déclarer les dépendances (composer.json de la Recipe)
        ↓
3. Rédiger le recipe.yml
        ↓
4. Exporter et placer les fichiers de config dans config/
        ↓
5. composer require [les dépendances]
        ↓
6. drush recipe recipes/[nom-de-la-recipe]
        ↓
7. drush cache:rebuild
```

::: tip 💡 Bonne pratique
Créez une **Recipe** par "couche fonctionnelle" de votre projet : une pour l'admin, une pour l'éditorial, une pour le SEO… Cette granularité vous permet de les appliquer indépendamment et de les réutiliser sur d'autres projets.
:::

## 5.2 Bonnes pratiques

### Idempotence : concevez pour le rejeu

Une bonne **Recipe** peut être appliquée **plusieurs fois sans effet de bord**. Pour cela :

- Utilisez `simpleConfigUpdate` plutôt que des fichiers de config entiers quand c'est possible.
- Évitez les actions qui créent du contenu (nœuds, utilisateurs) : elles ne sont pas idempotentes.
- Testez toujours votre **Recipe** sur un site vierge **et** sur un site partiellement configuré.

```bash
# Tester l'idempotence : appliquer deux fois
drush recipe recipes/setup-gin-admin
drush recipe recipes/setup-gin-admin
# → Aucune erreur ne doit survenir au second passage
```

### Versioning dans Git

Versionnez systématiquement vos **Recipes** avec votre code :

```
recipes/
├── setup-gin-admin/
│   ├── recipe.yml        ← Versionné
│   ├── composer.json     ← Versionné
│   └── config/           ← Versionné
└── setup-editorial/
    ├── recipe.yml
    └── ...
```

::: warning ⚠️ Attention
Ne versionnez **pas** le dossier *vendor/* dans votre **Recipe**. Les dépendances **Composer** sont gérées par *composer.lock* du projet parent.
:::

### Réutilisabilité

Conçevez vos **Recipes** pour être utilisables par d'autres projets :

- Évitez les configurations trop spécifiques à un projet (noms de domaine, emails, etc.).
- Externalisez les valeurs variables dans des `simpleConfigUpdate` documentés.
- Publiez vos **Recipes** génériques sur Drupal.org pour contribuer à l'écosystème.

### Nommage cohérent

```
[prefixe]-[contexte]-[fonctionnalite]

Exemples :
  setup-gin-admin       → Configuration de l'admin
  setup-editorial       → Configuration éditoriale
  setup-seo             → Modules et config SEO
  install-media-suite   → Suite médias
```

## 5.3 Ressources officielles

### Documentation Drupal.org

| Ressource | Description |
|---|---|
| [Recipes (Drupal.org)](https://www.drupal.org/docs/distributions-and-recipes/drupal-recipes) | Documentation officielle complète |
| [API Recipe reference](https://www.drupal.org/docs/distributions-and-recipes/drupal-recipes/recipe-file-format) | Référence du format *recipe.yml* |
| [Core recipes](https://git.drupalcode.org/project/drupal/-/tree/11.x/core/recipes) | Exemples officiels du core |

### Outils complémentaires

```bash
# Lister toutes les recipes disponibles dans le core
ls web/core/recipes/

# Valider la syntaxe d'un recipe.yml (sans l'appliquer)
drush recipe:validate recipes/setup-gin-admin

# Voir l'aide de la commande recipe
drush help recipe
```

::: info ℹ️
La commande `drush recipe:validate` n'est disponible qu'avec **Drush 13+**. Elle permet de vérifier la syntaxe et la cohérence de votre *recipe.yml* sans modifier le site.
:::

## 🏁 Récapitulatif de la formation

::: tip 💡 Ce que vous savez maintenant faire
- ✅ Expliquer ce qu'est une **Recipe** et en quoi elle diffère d'un profil d'installation
- ✅ Lire et comprendre un *recipe.yml* (blocs `name`, `recipes`, `install`, `config`)
- ✅ Analyser une **Recipe** officielle du core de **Drupal**
- ✅ Créer une **Recipe** de A à Z avec dépendances et configurations
- ✅ Appliquer une **Recipe** avec `drush recipe` et vérifier le résultat
- ✅ Concevoir des **Recipes** idempotentes, versionnées et réutilisables
:::

::: details Aller plus loin
**Pour approfondir les Recipes :**
- Explorez l'initiative **Drupal Starshot** et ses recipes officielles
- Étudiez le fonctionnement de `drupal/core-recipe-unpack` dans le code source
- Contribuez une **Recipe** sur Drupal.org en suivant le guide de contribution

**Sujets connexes à explorer :**
- **Config Split** : gérer des configurations par environnement
- **Features** : l'ancienne approche (à connaître pour les projets legacy)
- **Distributions Drupal** : combiner profil + Recipes pour livrer une distribution complète
:::
