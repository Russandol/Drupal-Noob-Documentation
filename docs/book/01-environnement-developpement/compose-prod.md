# Environnement de production

## compose-prod.yml

Notre configuration **Docker** actuelle fonctionne parfaitement pour le développement. Nous disposons d'un environnement
local complet et isolé pour développer sereinement.

Bien que cette configuration soit idéale pour le développement, elle n'est pas optimisée pour un environnement
de production. En effet, un environnement de production a des exigences différentes :
- **Performance** optimisée.
- **Sécurité** renforcée.
- **Absence d'outils** de développement superflus.
- **Configuration adaptée** aux charges réelles.

Nous allons donc créer un fichier *compose-prod.yml* qui contiendra la configuration **Docker** adaptée spécifiquement à
l'environnement de production.

Cette séparation entre les fichiers de composition pour le développement et la production présente plusieurs avantages :
- **Clarté** : Chaque environnement a sa propre configuration, facile à identifier.
- **Maintenance** : Les modifications spécifiques à un environnement n'affectent pas l'autre.
- **Flexibilité** : Possibilité d'adapter précisément chaque configuration aux besoins spécifiques.
- **Sécurité** : Les paramètres sensibles de production ne sont pas exposés dans l'environnement de développement.

Nous avons déjà eu le bon réflexe de définir tout ce qui concerne la sécurité dans un fichier *.env*.

Il nous reste simplement à définir la configuration spécifique à l'environnement de production.

Créez un fichier *compose-prod.yml* et copier / coller le contenu du fichier *compose.yml*.

La différence avec la configuration de développement est que nous n'aurons pas besoin des services suivants :

### phpmyadmin

Très utile en développement mais présente plusieurs risques :
- PHPMyAmdmin a connu de nombreuses vulnérabilités au fil des ans.
- Risque d'erreurs humaines catastrophiques (suppression de tables, modification de données critiques).
- Tentatives d'exploitation de vulnérabilités connues ou de force brute.
- Peut révéler des informations sensibles sur l'architecture de l'application.

### mailhog

**Mailhog** est un service qui intercepte les emails envoyés par votre application et les affiche dans une interface web,
sans les envoyer réellement aux destinataires. C'est un outil précieux en développement pour tester les fonctionnalités
d'envoi d'emails.

Si nous installons **Mailhog** sur l'environnement de production, les utilisateurs ne recevront jamais leurs emails !

Supprimez donc ces deux services du fichier *compose-prod.yml*.
