# Étape 8.2 — Performance

## Pourquoi la performance est importante

Un site lent pénalise à la fois l'**expérience utilisateur** et le **référencement SEO**. Google utilise les Core Web Vitals (LCP, INP, CLS) comme critères de classement. Drupal et Canvas offrent plusieurs leviers pour optimiser les performances.

## CSS et JS des composants SDC

### Chargement conditionnel (lazy loading)

L'un des grands avantages des SDC est que chaque composant charge son propre CSS et JS **uniquement quand il est présent sur la page**. Contrairement à un thème classique qui charge tout le CSS en une seule fois, les SDC sont naturellement optimisés.

```
Page d'accueil utilise : Hero + Grid + Card
→ Seuls hero.css, grid.css, card.css sont chargés

Page Contact utilise : Page Header + Webform
→ Seuls page-header.css et webform.css sont chargés
```

::: info
Vérifiez dans l'onglet **Réseau** (DevTools) que seuls les fichiers CSS des composants utilisés sont chargés.
:::

### Agrégation CSS/JS dans Drupal

En production, activez l'agrégation des fichiers CSS et JS :

```
Administration → Configuration → Performances
☑ Agréger les fichiers CSS
☑ Agréger les fichiers JavaScript
```

Ou via la configuration :

```bash
drush config:set system.performance css.preprocess 1
drush config:set system.performance js.preprocess 1
drush cr
```

## Cache Drupal

### Activer le cache sur les environnements de production

```bash
# Vérifier le statut du cache
drush status | grep cache

# Activer le cache des pages
drush config:set system.performance cache.page.max_age 900
```

### Vider le cache après chaque déploiement

```bash
drush cr
```

::: warning
En développement avec DDEV, le cache est souvent désactivé (`$settings['cache']['bins']['render'] = 'cache.backend.null'` dans `settings.local.php`). Pensez à le réactiver sur la staging/production.
:::

## Images

### Utiliser les styles d'image Drupal

Evitez de charger des images originales de grande taille. Créez des **styles d'image** adaptés :

```
Administration → Configuration → Média → Styles d'image
```

Styles recommandés :

| Nom              | Dimensions    | Usage                        |
|------------------|---------------|------------------------------|
| `hero_bg`        | 1920×800      | Images de fond Hero          |
| `card_thumbnail` | 600×400       | Images dans les Cards        |
| `team_portrait`  | 300×300       | Photos d'équipe              |

### Attribut `loading="lazy"`

Dans vos composants Twig, ajoutez `loading="lazy"` sur toutes les images hors-écran :

```twig
<img src="{{ image }}"
     alt="{{ image_alt }}"
     loading="lazy"
     width="600"
     height="400">
```

::: tip Width et Height
Spécifier les dimensions `width` et `height` en HTML évite le **Cumulative Layout Shift (CLS)** : le navigateur réserve l'espace avant que l'image soit chargée.
:::

### Format WebP

Drupal peut convertir automatiquement les images en **WebP** (format plus léger) :

```bash
composer require drupal/imageapi_optimize_webp
drush en imageapi_optimize_webp
```

## Mesurer les performances

### Outils recommandés

| Outil                  | URL                         | Usage                       |
|------------------------|-----------------------------|-----------------------------|
| **PageSpeed Insights** | pagespeed.web.dev           | Score global + suggestions  |
| **Lighthouse**         | DevTools → Onglet Lighthouse| Analyse locale complète     |
| **WebPageTest**        | webpagetest.org             | Analyse détaillée par réseau|

### Interpréter les Core Web Vitals

| Métrique | Seuil "Bon"  | Ce qu'elle mesure                              |
|----------|--------------|------------------------------------------------|
| **LCP**  | < 2.5s       | Temps d'affichage du plus grand élément visible|
| **INP**  | < 200ms      | Réactivité aux interactions                    |
| **CLS**  | < 0.1        | Stabilité visuelle (layout shifts)             |

## Checklist performance

- [ ] Agrégation CSS/JS activée en production
- [ ] Images redimensionnées avec les styles Drupal
- [ ] Attribut `loading="lazy"` sur les images
- [ ] Dimensions `width`/`height` précisées sur les images
- [ ] Cache Drupal activé
- [ ] Score Lighthouse ≥ 90 sur Performance
- [ ] LCP < 2.5s vérifié sur PageSpeed Insights
