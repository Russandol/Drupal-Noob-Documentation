### Étape 1.3 — Les types de composants Canvas [2]

Type
Description
Code Components (SDC)
Composants custom en Twig/CSS/JS
Pattern Components
Mises en page réutilisables créées dans l'UI
Global Components
Header, footer partagés sur toutes les pages

## 📚 MODULE 2 — Préparer le thème Blank

Le thème Blank est une base vierge, il faut le configurer pour Canvas.

### Étape 2.1 — Structure du thème Blank
Comprendre les fichiers : .info.yml, templates/, components/
Activer et définir le thème comme thème par défaut

### Étape 2.2 — Configurer les régions du thème
Déclarer les régions dans le .info.yml (header, footer, main…)
Comprendre comment Canvas utilise ces régions

### Étape 2.3 — Mise en place des outils CSS (optionnel)
Intégrer Tailwind CSS via Vite pour styliser les composants [1]
Ou utiliser du CSS classique

## 📚 MODULE 3 — Créer vos premiers composants SDC

Les SDC (Single Directory Components) sont les briques de base de Canvas. [5]

### Étape 3.1 — Anatomie d'un composant SDC

```
mon_theme/
components/
hero/
hero.component.yml   ← définition + props
hero.twig            ← template HTML
hero.css             ← styles
hero.js              ← (optionnel) JS
```


### Étape 3.2 — Créer un composant Hero
Définir les props (titre, sous-titre, image, bouton)
Écrire le template Twig
Le rendre disponible dans Canvas

### Étape 3.3 — Créer un composant Carte (Card)
Composant réutilisable avec image, titre, texte, lien

### Étape 3.4 — Créer un composant Grille (Grid)
Composant conteneur avec des slots pour accueillir d'autres composants
 
## 📚 MODULE 4 — Construire le Header et Footer globaux

Le Header et Footer apparaissent sur toutes les pages. [2]

### Étape 4.1 — Créer le composant Navigation
Logo, menu principal, menu mobile

### Étape 4.2 — Assembler le Header global dans Canvas
Canvas → Global Regions → Header
Ajouter logo + navigation + éventuellement une barre de recherche

### Étape 4.3 — Assembler le Footer global
Canvas → Global Regions → Footer
Ajouter colonnes de liens, copyright, réseaux sociaux
 
## 📚 MODULE 5 — Construire les pages du site

On assemble les composants pour créer les pages.

### Étape 5.1 — Page d'accueil (Home)
Section Hero pleine largeur
Section "Services" en 3 colonnes
Section "À propos" avec image + texte
Appel à l'action (CTA)

### Étape 5.2 — Gabarit de page intérieure
En-tête de page (breadcrumb + titre)
Zone de contenu principal
Sidebar (optionnel)

### Étape 5.3 — Page de contact
Formulaire de contact via composant Webform
 
## 📚 MODULE 6 — Créer des Pattern Components (gabarits réutilisables)

Sauvegarder des arrangements de composants pour les réutiliser. [2]

### Étape 6.1 — Créer un Pattern depuis l'UI Canvas
Assembler plusieurs composants
Sauvegarder comme Pattern réutilisable

### Étape 6.2 — Utiliser les Patterns sur plusieurs pages
 
## 📚 MODULE 7 — Relier Canvas aux contenus Drupal (Nœuds)

Canvas peut aussi afficher des contenus Drupal classiques.

### Étape 7.1 — Content Templates dans Canvas [9]
Créer un template Canvas pour l'affichage d'un type de contenu (ex: Article)
Utiliser les champs du nœud dans les composants

### Étape 7.2 — Intégrer des Views (listes de contenus)
Afficher une liste d'articles dans un composant Canvas [8]
 
## 📚 MODULE 8 — Finalisation et bonnes pratiques


### Étape 8.1 — Responsive design
Tester et adapter les composants sur mobile/tablette

### Étape 8.2 — Performance
Vérifier le chargement CSS/JS des composants

### Étape 8.3 — Accessibilité
Vérifier les contrastes, les alt text, la navigation clavier
 
## 🗓️ Récapitulatif du plan

``` 
MODULE 1 → Comprendre Canvas (concepts clés)
MODULE 2 → Préparer le thème Blank
MODULE 3 → Créer les composants SDC de base
MODULE 4 → Header & Footer globaux
MODULE 5 → Construire les pages
MODULE 6 → Pattern Components réutilisables
MODULE 7 → Connexion aux contenus Drupal
MODULE 8 → Finalisation & bonnes pratiques
```
