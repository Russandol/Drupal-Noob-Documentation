# Étape 2.0 — Choisir son thème

## Deux parcours disponibles

Cette formation propose deux parcours parallèles selon le framework CSS que vous souhaitez utiliser. Vous suivrez 
**l'un ou l'autre** selon votre projet et vos préférences.

| | **Parcours A — Mercury** | **Parcours B — Bootstrap Forge** |
|---|---|---|
| **Framework CSS** | Tailwind CSS (utility-first) | Bootstrap 5 (component-first) |
| **Philosophie** | Classes utilitaires dans le HTML | Composants CSS préconçus |
| **Idéal pour** | Designs sur-mesure, équipes connaissant Tailwind | Équipes connaissant Bootstrap, projets rapides |
| **Composants Canvas** | À créer entièrement en SDC | Fournis par le module Canvas Bootstrap |
| **Point d'attention** | Contournement SDC/Tailwind nécessaire | Intégration directe, pas de contournement |

---

## Parcours A — Mercury (Tailwind CSS)

**Mercury** est le starterkit officiel pour Canvas sur Drupal Core. Il génère un thème basé sur **Tailwind CSS**.

```
composer require drupal/canvas drupal/mercury
→ génération du thème custom via generate-theme
→ styles via classes Tailwind
→ composants SDC créés de zéro
```

::: warning Attention
Les composants SDC Canvas ne sont actuellement **pas compatibles nativement** avec Tailwind. Un contournement est 
documenté dans l'étape 2.3.
:::

**Choisir Mercury si** :
- ✅ Vous aimez Tailwind CSS et ses classes utilitaires
- ✅ Vous voulez un contrôle total sur le design
- ✅ Vous construisez un design totalement sur-mesure

→ [Commencer le Parcours A — Mercury](/drupal-canvas/mercury-theme-structure)

---

## Parcours B — Bootstrap Forge + Canvas Bootstrap

**Bootstrap Forge** est un thème Drupal basé sur **Bootstrap 5**. Le module **Canvas Bootstrap** étend Canvas pour 
fournir une intégration native avec Bootstrap : composants SDC prêts à l'emploi, grille Bootstrap dans l'éditeur, etc.

```
composer require drupal/bootstrap_forge drupal/canvas_bootstrap
→ création d'un sous-thème de Bootstrap Forge
→ styles via classes Bootstrap 5
→ composants SDC fournis par Canvas Bootstrap
```

::: tip Avantage
Canvas Bootstrap fournit des composants SDC préconçus utilisant les classes Bootstrap (Card, Grid, Jumbotron…). 
Moins de code à écrire, intégration directe.
:::

**Choisir Bootstrap Forge si** :
- ✅ Vous connaissez Bootstrap et ses conventions
- ✅ Vous voulez des composants prêts à l'emploi
- ✅ Votre équipe ou client est familier avec Bootstrap

→ [Commencer le Parcours B — Bootstrap Forge](/drupal-canvas/bootstrap-forge-structure)

---

## Puis-je changer d'avis ?

Oui. Les deux parcours convergent à partir du **Module 3** (création des pages, Patterns, contenus Drupal). La 
principale différence réside dans le Module 2 et dans la façon d'écrire le CSS des composants SDC.

::: info Pour la suite de la formation
Les modules 3 à 8 présentent les concepts de manière commune, avec des notes spécifiques quand Mercury et 
Bootstrap Forge se comportent différemment.
:::
