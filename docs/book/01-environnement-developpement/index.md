# Introduction — Environnement de développement Docker pour Drupal

Dans cette section, nous allons construire pas à pas un environnement de développement moderne, 
reproductible et prêt pour des projets Drupal. 

L’objectif est double :
- vous permettre de démarrer un nouveau projet en quelques minutes, quel que soit votre système,
- comprendre chaque pièce de l’infrastructure pour pouvoir la faire évoluer sereinement.

Au fil des chapitres, vous apprendrez à :
- concevoir les fichiers nécessaires à une configuration Docker,
- isoler et versionner proprement vos variables d’environnement,
- ajuster finement la configuration PHP pour Drupal (et le debug),
- préparer une image Docker cohérente pour l’application,
- décliner l’environnement en mode production,
- tenir vos dépôts propres avec les bons fichiers d’exclusion,
- automatiser les tâches courantes via des commandes et un Makefile,
- documenter le tout dans un README exploitable par n’importe quel développeur.

## Parcours de la section

- **Docker compose** : structurer les services et leurs dépendances (web, base de données, cache, mails, etc.).
- **Fichiers d’environnement** : centraliser et sécuriser la configuration (ports, identifiants, options).
- **PHP ini** : adapter PHP à Drupal et au debug (performances, extensions, Xdebug).
- **Dockerfile** : construire une image adaptée au projet.
- **Environnement de production** : décliner la stack pour des déploiements fiables.
- **Fichiers ignore** : garder un dépôt propre (.dockerignore, .gitignore).
- **Lignes de commandes** : piloter l’environnement au quotidien.
- **Makefile** : automatiser les tâches récurrentes (init, build, up, logs, etc.).
- **Readme** : documenter l’installation et l’usage pour onboarder rapidement.

## Résultat attendu

À la fin de cette section, vous disposerez d’un environnement Docker complet pour Drupal, documenté, automatisé et 
prêt à être utilisé par toute votre équipe, du développement à la production.