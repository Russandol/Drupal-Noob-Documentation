# Étape 1.3 — Les types de composants Canvas

Dans **Drupal Canvas**, il existe trois familles de composants. Comprendre leurs rôles respectifs est essentiel avant 
de commencer à construire.

## Vue d'ensemble

| Type                        | Créé par        | Modifiable dans l'UI | Portée              |
|-----------------------------|-----------------|----------------------|---------------------|
| **Code Components (SDC)**   | Le développeur  | Oui (contenu/style)  | Une page            |
| **Pattern Components**      | L'éditeur       | Oui                  | Toutes les pages    |
| **Global Components**       | Le développeur + l'éditeur | Oui      | Toutes les pages    |

---

## 1. Code Components (SDC)

Les **Code Components** sont des composants développés en code, selon la norme **Single Directory Components (SDC)** 
introduite dans Drupal 10.3.

### Comment ils fonctionnent

Chaque composant est un dossier auto-suffisant dans le thème, contenant :

```
mon_theme/
└── components/
    └── hero/
        ├── hero.component.yml   ← définition du composant + props
        ├── hero.twig            ← template HTML
        ├── hero.css             ← styles du composant
        └── hero.js              ← comportements JS (optionnel)
```

### Leur rôle dans Canvas

Une fois développés, ces composants apparaissent **dans le panneau de gauche de l'éditeur Canvas**. L'éditeur peut 
les glisser-déposer sur la page et remplir leurs champs (props) depuis le panneau de droite.

::: tip Analogie
Un Code Component, c'est une **brique LEGO** : c'est le développeur qui la fabrique, et l'éditeur qui l'assemble.
:::

### Ce que vous allez créer dans ce cours

Nous allons créer ensemble les composants SDC suivants :

| Composant     | Description                                |
|---------------|--------------------------------------------|
| `hero`        | Bannière principale pleine largeur         |
| `card`        | Carte réutilisable (image + titre + texte) |
| `grid`        | Grille conteneur pour d'autres composants  |
| `navigation`  | Menu de navigation + logo                  |

---

## 2. Pattern Components

Les **Pattern Components** (ou simplement "Patterns") sont des **assemblages de composants SDC sauvegardés depuis 
l'interface Canvas**.

### Comment ils se créent

1. Vous construisez une mise en page dans Canvas (ex : une grille de 3 cartes avec un titre au-dessus).
2. Vous sauvegardez cet ensemble comme **Pattern réutilisable**.
3. Le Pattern apparaît alors dans la bibliothèque, disponible pour toutes les pages du site.

### Leur rôle

Les Patterns permettent à l'**éditeur de contenu** de réutiliser des mises en page sans avoir à tout reconstruire à 
chaque fois.

```
Pattern "Services" =
  Titre de section
  + Grille 3 colonnes
      + Carte (icône + titre + texte)
      + Carte (icône + titre + texte)
      + Carte (icône + titre + texte)
```

::: info
Les Patterns sont stockés en base de données (configuration Drupal), pas dans les fichiers du thème. Ils sont donc 
exportables via `drush config:export`.
:::

---

## 3. Global Components

Les **Global Components** sont des zones partagées sur **toutes les pages du site** : typiquement le **Header** et le **Footer**.

### Comment ils fonctionnent

Canvas met à disposition des **Régions globales** (Global Regions), indépendantes des pages individuelles. Ce que 
vous placez dans une Global Region apparaît automatiquement sur chaque page.

```
Chemin : Canvas → Global Components → Header
                                    → Footer
```

### Leur particularité

| Aspect            | Détail                                                          |
|-------------------|-----------------------------------------------------------------|
| **Portée**        | Toutes les Canvas Pages du site                                 |
| **Édition**       | Depuis l'interface Canvas dédiée aux Global Components          |
| **Contenu**       | Logo, navigation, liens footer, copyright…                      |
| **Modification**  | Changer le Header ici le met à jour sur toutes les pages        |

::: warning ⚠️ Attention
Les Global Components ne s'appliquent qu'aux **Canvas Pages**. Les pages Drupal classiques (nœuds) utilisent les 
régions du thème définies dans le `.info.yml`.
:::

---

## Récapitulatif : qui fait quoi ?

```
DÉVELOPPEUR                     ÉDITEUR
─────────────────────           ─────────────────────────────────
Crée les SDC                →   Assemble les SDC sur les pages
(code, Twig, CSS)               (drag & drop dans Canvas)

                            →   Crée des Patterns
                                (sauvegarde des assemblages)

Crée la structure               Remplit le contenu
du Header/Footer SDC        →   dans les Global Components
```

Dans la suite de ce cours, vous allez d'abord créer les composants SDC (Module 3), puis les assembler pour construire 
le Header/Footer (Module 4), les pages (Module 5) et les Patterns (Module 6).
