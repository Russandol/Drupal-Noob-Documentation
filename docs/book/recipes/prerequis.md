# 🛠️ Prérequis et contexte

Avant de créer et d'appliquer votre première **Recipe**, il est essentiel de s'assurer que votre environnement est correctement configuré. Cette section détaille les versions requises, les packages **Composer** nécessaires et les outils indispensables.

## 📋 Version Drupal requise

Les **Recipes** sont intégrées dans le core de **Drupal** depuis la version **10.3** (en phase expérimentale), puis stabilisées dans **Drupal 11.1**.

| Version | Support des Recipes |
|---|---|
| Drupal < 10.3 | ❌ Non supporté |
| Drupal 10.3 – 11.0 | ⚠️ Expérimental |
| **Drupal 11.1+** | ✅ API stable, recommandé |
| **Drupal 11.2+** | ✅ `core-recipe-unpack` inclus |

::: warning ⚠️ Attention
Si votre projet tourne sur **Drupal** < 11.1, vous pouvez utiliser les **Recipes** mais l'API peut évoluer. Pour un usage en production, visez **Drupal 11.1** minimum.
:::

## 📦 Le package `drupal/core-recipe-unpack`

C'est le composant clé qui rend les **Recipes** utilisables en production. Son rôle est d'**extraire les dépendances** déclarées dans une **Recipe** et de les injecter dans le *composer.json* de votre projet.

### Pourquoi c'est important ?

Sans ce mécanisme, les modules et thèmes requis par une **Recipe** ne seraient pas enregistrés dans votre *composer.lock*, rendant la reproductibilité du projet impossible.

```bash
# Vérifier si le package est présent dans votre projet
composer show drupal/core-recipe-unpack
```

### Installation (si absent)

```bash
composer require drupal/core-recipe-unpack
```

::: info ℹ️
Depuis **Drupal 11.2**, le package `drupal/core-recipe-unpack` est inclus automatiquement dans le méta-package `drupal/core-recommended`. Vous n'avez plus besoin de l'installer manuellement.
:::

## 🔧 Drush : l'outil d'exécution

Les **Recipes** s'appliquent via la commande `drush recipe`. **Drush** version **12.5+** est requis.

```bash
# Vérifier la version de Drush
drush --version

# Mise à jour si nécessaire
composer require drush/drush:^13
```

::: tip 💡 Bonne pratique
Installez toujours **Drush** en tant que dépendance **du projet** (`require`), jamais en global. Cela garantit que tous les développeurs utilisent la même version.
:::

## 🗂️ Structure Composer du projet

Votre *composer.json* de projet doit déclarer le bon type pour que **Composer** sache où installer les **Recipes**.

```json
{
    "extra": {
        "installer-types": ["drupal-recipe"],
        "installer-paths": {
            "web/core/recipes/{$name}": ["type:drupal-core-recipe"],
            "recipes/{$name}": ["type:drupal-recipe"]
        }
    }
}
```

::: details Aller plus loin
Si vous utilisez le scaffolding officiel `drupal/recommended-project`, ces entrées sont déjà présentes depuis **Drupal 11.2**. Pour les projets plus anciens, vérifiez votre *composer.json* et ajoutez manuellement les entrées `installer-types` et `installer-paths` si nécessaire.
:::

## ✅ Checklist avant de commencer

Avant de passer à la création de votre première **Recipe**, vérifiez ces points :

- [ ] **Drupal 11.1+** installé et fonctionnel
- [ ] `drupal/core-recipe-unpack` présent (`composer show drupal/core-recipe-unpack`)
- [ ] **Drush 12.5+** disponible dans le projet (`drush --version`)
- [ ] `installer-paths` configuré dans *composer.json* pour le type `drupal-recipe`
- [ ] Dossier *recipes/* créé à la racine du projet (aux côtés de *web/* et *composer.json*)

::: tip 💡 Bonne pratique
Utilisez **DDEV** pour votre environnement de développement local. Il intègre toutes ces dépendances dans sa configuration par défaut pour les projets **Drupal 11**.
:::
