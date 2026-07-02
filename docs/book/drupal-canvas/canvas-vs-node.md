# Étape 1.1 — Différence entre une "Canvas Page" et un nœud classique

## Le nœud Drupal classique : un rappel

Avant **Drupal Canvas**, la manière traditionnelle de créer du contenu dans **Drupal** reposait sur les **nœuds** (nodes).

Un **nœud**, c'est :

* Un formulaire de saisie avec des champs définis à l'avance (titre, corps, image…).
* Un rendu visuel disponible uniquement après sauvegarde (on ne voit pas le résultat en temps réel).
* Une gestion via `Administration → Contenu`.

:::warning ⚠️ Le problème
L'éditeur travaille "à l'aveugle". Il remplit des champs sans voir à quoi ressemblera la page finale. C'est puissant
mais peu intuitif pour un non-développeur.
:::

## La Canvas Page : une approche radicalement différente

Une **Canvas Page** est un nouveau type d'entité introduit par **Drupal Canvas**. Ce n'est pas un **nœud**, c'est une 
entité totalement distincte dans **Drupal**.

Elle apporte :

* Une interface **WYSIWYG** (*What You See Is What You Get*) : vous construisez la page directement dans le navigateur 
et voyez le résultat en temps réel.
* Une construction par assemblage de composants visuels plutôt que par remplissage de champs.
* Un rendu immédiat sans avoir à sauvegarder pour voir le résultat.

:::tip Analogie
Si un **nœud** classique, c'est comme remplir un formulaire **Word**, une **Canvas Page**, c'est comme travailler directement 
dans **Figma** ou **Canva**. Vous voyez, vous déplacez, vous ajustez.
:::

## Installer Drupal Canvas

[//]: # (TODO revoir cette partie)

```shell
ddev composer require drupal/canvas
```

## Où trouver les Canvas Pages dans l'administration ?

Les Canvas Pages ont leur propre espace dans l'administration, séparé des contenus classiques.
Chemin d'accès : `Administration → Contenu → Pages`

ou via le menu de navigation rapide en haut de l'interface : `Drupal Canvas  (lien dédié dans la barre d'administration)`

:::tip À noter
L'onglet "Contenu" liste vos **nœuds** classiques, tandis que l'onglet "Pages" liste vos **Canvas Pages**.

Ce sont deux espaces bien distincts.
:::

## La hiérarchie d'une Canvas Page

Une Canvas Page est structurée selon une hiérarchie en 3 niveaux :

```
PAGE
   └──  SECTION  (ex: "Bloc Hero", "Section services", "Footer")
      └──  COMPOSANT  (ex: titre, image, bouton, carte…)
```

| Niveau        | Rôle                     | Analogie                     |
|---------------|--------------------------|------------------------------|
| **Page**      | La page web complète     | Une feuille entière          |
| **Section**   | Un grand bloc horizontal | Une rangée sur la feuille    |
| **Composant** | Un élément de contenu    | Un mot, une image, un bouton |

## Canvas Page vs Nœud : tableau comparatif

| Caractéristique        | Nœud classique                     | Canvas Page         |
|------------------------|------------------------------------|---------------------|
| **Interface**          | Formulaire de champs               | Éditeur visuel WYSIWYG |
| **Prévisualisation**   | Après sauvegarde                   | En temps réel |
| **Structure**          | Fixée par le type de contenu       | Libre, par assemblage |
| **Public cible**       | Développeurs / éditeurs techniques | Tous profils, y compris non-techniques |
| **Localisation admin** | Contenu → Contenu                  | Contenu → Pages |
| **Type d'entité**      | Node | Canvas Page (entité distincte) |
| **Idéal pour**         | Articles, fiches produits, données structurées | Pages marketing, landing pages, homepage |

## Quand utiliser Canvas plutôt qu'un nœud ?

Utilisez une Canvas Page pour :

* ✅ La page d'accueil.
* ✅ Les landing pages marketing.
* ✅ Les pages "À propos", "Contact", "Services".
* ✅ Toute page avec une mise en page unique et créative.

Utilisez un nœud classique pour :

* ✅ Les articles de blog (contenu répétitif et structuré).
* ✅ Les fiches produits (données structurées avec des champs précis).
* ✅ Les événements, offres d'emploi, etc.
* ✅ Tout contenu géré en grande quantité.

::: info Bonne pratique
**Canvas** et les **nœuds** sont complémentaires. Une **Canvas Page** peut d'ailleurs afficher une liste d'articles 
(nœuds) via un composant dédié. Les deux coexistent sur le même site.
:::