# Drupal - Gestion de la configuration de notre site

## La distinction entre la configuration et le contenu

**Drupal** est un gestionnaire de contenu qui permet de concevoir et gérer un site internet sans avoir besoin de
connaître le développement web.

Mais pour l'utiliser de manière efficace, il est très important de bien comprendre la distinction entre la 
**configuration** et le **contenu**.

La **configuration** représente tous les changements que l'on fait dans l'administration de notre site. Ces changements
se font dans l'espace administrateur. Elle correspond par exemple à :
- Créer un vocabulaire de taxonomie.
- Ajouter des champs à un type de contenu.
- Mettre le site en mode maintenance.
- Etc..

Le **contenu** de son côté représente tout le contenu que l'on ajoute au site. Elle correspond par exemple à :
- Ajouter une liste de termes à une taxonomie.
- Créer une page sur notre site en remplissant les champs d'un type de contenu.
- Ajouter des liens à notre menu principal.
- Etc..

Je sais que pour le moment tout ça peut paraître flou. Ne vous inquiétez pas, nous aurons l'occasion de revenir en long, 
en large et en travers sur cette distinction.

L'important était de vous présenter cette distinction. Car dans ce chapitre, nous allons nous intéresser à la **configuration**.

> ⚠️ Attention : dans le reste de ce chapitre, lorsque je fais mention à la **configuration**, je parle bien des
> modifications que l'on fait dans l'espace administrateur du site.

Dans **Drupal**, lorsque nous effectuons des changements dans l'administration, ces informations sont enregistrées en
base de données.

Mais **Drupal** offre également une fonctionnalité très pratique : l'export de la configuration dans des fichiers *.yml*.
Ces fichiers représentent l'ensemble des paramètres et réglages du site. Ce qui permet de : 

- **Versionner** la configuration avec **Git**, comme on le fait avec le code.
- **Travailler en équipe** : chaque développeur peut importer ou exporter la configuration sur sa propre instance et rester
synchronisé avec les autres.
- **Faciliter les déploiements** : la configuration d'un environnement de développement peut être transférée vers un
autre environnement de recette ou de production.

En résumé, la gestion de la configuration via des fichiers exportables rend le développement de **Drupal** plus fluide,
reproductible et collaboratif. C'est un des éléments clef des bonnes pratiques pour tous les projets, même de petites tailles.

> ❓ Mais pourquoi je vous parle de tout ça alors qu'on n'a même pas encore été dans l'administration du site.

Parce que nous avons des changements à faire dans les dossiers de notre projet et le fichier *settings.php* pour gérer
efficacement ces fichiers de configuration.

## Gérer les fichiers .yml de configuration


- mettre à jour settings pour définir un dossier à la racine pour les configurations
- penser à supprimer ensuite le dossier d'origine
- les commandes Drush d'imports / exports de configuration