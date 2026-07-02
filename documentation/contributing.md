# Workflow de contribution — Drupal 11 avec Merge Requests

## Table des matières

1. [Introduction](#introduction)
2. [Le problème](#le-problème)
3. [La solution retenue](#la-solution-retenue)
4. [Configuration de GitLab](#configuration-de-gitlab)
5. [Le Makefile](#le-makefile)
6. [Workflows détaillés](#workflows-détaillés)
   - [Démarrer un ticket](#démarrer-un-ticket)
   - [Terminer un ticket et créer une MR](#terminer-un-ticket-et-créer-une-mr)
   - [Changer de branche](#changer-de-branche)
   - [MR refusée : retour sur la branche pour corrections](#mr-refusée--retour-sur-la-branche-pour-corrections)
   - [MR approuvée : rebase et merge](#mr-approuvée--rebase-et-merge)
7. [La règle d'or](#la-règle-dor)
8. [Exemple complet](#exemple-complet)
9. [Récapitulatif des commandes](#récapitulatif-des-commandes)

---

## Introduction

Ce document décrit le workflow Git à suivre pour contribuer au projet. Il repose sur l'utilisation de **Merge Requests**
(MR) et d'un **Makefile** qui automatise les opérations récurrentes liées à la gestion de configuration Drupal.

### Pourquoi des Merge Requests ?

- **Review de code** : chaque modification est relue avant d'intégrer `develop`
- **Historique propre** : traçabilité complète des modifications
- **Filet de sécurité** : le code qui casse `develop` est rejeté avant le merge
- **Intégration CI** : possibilité d'exécuter des tests automatisés avant le merge

---

## Le problème

Dans un projet Drupal, la configuration (types de contenu, vues, permissions, etc.) est exportée sous forme de fichiers
YAML via `drush cex` dans le dossier `config/sync`. Ces fichiers sont versionnés dans Git.

Lorsqu'un développeur travaille sur une branche feature et installe un nouveau module, deux choses se passent :

1. Le module est ajouté dans `composer.json` / `composer.lock` (fichiers versionnés)
2. Le module est **activé dans la base de données** et sa configuration est exportée dans `config/sync`

**Le problème survient au retour sur `develop`** : le code du module disparaît du filesystem (car absent du `composer.lock`
de develop), mais il reste **activé en base de données**. `drush cim` plante car il ne peut pas gérer un module dont le code est absent.

Ce problème n'existe **que** lorsqu'un nouveau module a été installé et activé. Les autres modifications de configuration
(champs, vues, permissions, etc.) sont gérées sans problème par `drush cim` dans les deux sens.

---

## La solution retenue

La solution est en trois parties :

### 1. Un Makefile pour automatiser les séquences de commandes

Chaque opération courante (démarrer un ticket, terminer, changer de branche) est encapsulée dans une commande `make`
qui exécute les bonnes commandes dans le bon ordre.

### 2. Une règle simple pour les développeurs

> **Avant de quitter une branche sur laquelle un nouveau module a été installé, le désinstaller avec `drush pm:uninstall`.**

C'est la seule action manuelle requise. Le Makefile se charge du reste.

### 3. GitLab configuré en fast-forward merge

GitLab est configuré pour **interdire le merge si la branche n'est pas à jour avec `develop`**. Cela garantit que
le rebase est toujours fait avant le merge, sans reposer sur la discipline humaine.

### Pourquoi ne pas rebaser au moment du push ?

Le rebase sur `develop` n'est effectué **qu'au moment où la MR est approuvée**, juste avant le merge. Cela évite :

- De gérer des conflits pour rien si la MR est refusée
- De devoir rebaser plusieurs fois si `develop` bouge pendant la review
- De complexifier l'étape de push

---

## Configuration de GitLab

Cette configuration est à faire **une seule fois** par projet.

### 1. Protéger la branche `develop`

Aller dans **Settings > Repository > Protected branches** :

| Paramètre | Valeur |
|---|---|
| **Branch** | `develop` |
| **Allowed to merge** | `Maintainers` |
| **Allowed to push and merge** | `No one` |

Cela **interdit** le push direct sur `develop`. Tout le monde est obligé de passer par une Merge Request.

### 2. Configurer la méthode de merge

Aller dans **Settings > Merge Requests**, section **Merge method** :

- Sélectionner : **Fast-forward merge**

Avec cette configuration, le bouton "Merge" est **grisé** tant que la branche n'est pas à jour avec `develop`.
GitLab affiche alors :

> *"The source branch is X commits behind the target branch. Rebase before merge."*

Cela **empêche** quiconque de merger sans avoir rebasé au préalable.

### 3. Configurer les règles d'approbation (optionnel mais recommandé)

Toujours dans **Settings > Merge Requests**, section **Merge request approvals** :

- Ajouter une règle d'approbation : **1 approbation minimum**
- Cocher **Prevent approval by author** (l'auteur ne peut pas s'auto-approuver)
- Cocher **Prevent editing approval rules in merge requests**

### Résumé de la configuration

| Paramètre | Emplacement | Valeur |
|---|---|---|
| Branche protégée | Settings > Repository | `develop` — push: `No one`, merge: `Maintainers` |
| Méthode de merge | Settings > Merge Requests | `Fast-forward merge` |
| Approbation requise | Settings > Merge Requests | 1 approbation minimum |
| Auteur ne peut pas approuver | Settings > Merge Requests | ✅ activé |

---

## Le Makefile

Placez ce fichier `Makefile` à la racine du projet :

```makefile
.PHONY: start finish back switch rebase

DEVELOP := develop
CURRENT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)

## Démarre un nouveau ticket : make start BRANCH=feature/mon-ticket
start:
	git checkout $(DEVELOP)
	git pull origin $(DEVELOP)
	composer install --no-interaction
	drush updatedb -y
	drush cr
	drush cim -y
	drush cr
	git checkout -b $(BRANCH)

## Termine un ticket et pousse (sans rebase)
finish:
	drush cex -y
	git add -A
	@read -p "Commit: " MSG; git commit -m "$$MSG"
	git push origin $(CURRENT_BRANCH) \
		-o merge_request.create \
		-o merge_request.target=$(DEVELOP) \
		-o merge_request.remove_source_branch

## Rebase sur develop : à faire uniquement quand la MR est approuvée
rebase:
	@if [ "$(CURRENT_BRANCH)" = "$(DEVELOP)" ]; then \
		echo "❌ Vous êtes sur $(DEVELOP), checkout sur votre branche feature d'abord"; \
		exit 1; \
	fi
	git fetch origin $(DEVELOP)
	git rebase origin/$(DEVELOP)
	composer install --no-interaction
	drush updatedb -y
	drush cr
	drush cim -y
	drush cex -y
	git add config/
	git diff --cached --quiet || git commit -m "fix: config after rebase"
	git push origin $(CURRENT_BRANCH) --force-with-lease

## Retour sur develop
back:
	@echo "⚠️  Avez-vous désinstallé les nouveaux modules de cette branche ?"
	@read -p "Continuer ? (o/n) " CONFIRM; \
	if [ "$$CONFIRM" != "o" ]; then exit 1; fi
	git checkout $(DEVELOP)
	git pull origin $(DEVELOP)
	composer install --no-interaction
	drush updatedb -y
	drush cr
	drush cim -y
	drush cr

## Revenir sur une branche existante : make switch BRANCH=feature/mon-ticket
switch:
	@echo "⚠️  Avez-vous désinstallé les nouveaux modules de la branche courante ($(CURRENT_BRANCH)) ?"
	@read -p "Continuer ? (o/n) " CONFIRM; \
	if [ "$$CONFIRM" != "o" ]; then exit 1; fi
	git checkout $(BRANCH)
	composer install --no-interaction
	drush updatedb -y
	drush cr
	drush cim -y
	drush cr
```

Workflows détaillés
Démarrer un ticket``` shell
make start BRANCH=feature/JIRA-123
```

Ce que ça fait :
Checkout sur develop et pull des dernières modifications
composer install pour synchroniser les dépendances
drush updatedb pour appliquer les éventuelles mises à jour de schéma
drush cim pour importer la configuration de develop dans la BDD
Création de la branche feature/JIRA-123
Le développeur travaille ensuite normalement : modification de code, composer require, drush en, etc.
 
Terminer un ticket et créer une MR``` shell
make finish
```

Ce que ça fait :
drush cex pour exporter la configuration courante
git add de tous les fichiers modifiés
Demande le message de commit
Push de la branche sur le dépôt distant
Crée automatiquement une Merge Request vers develop sur GitLab
Si la MR existe déjà (cas d'un deuxième make finish après corrections), elle est simplement mise à jour avec les nouveaux commits. L'option de création est ignorée par GitLab.
L'option merge_request.remove_source_branch indique à GitLab de supprimer automatiquement la branche sur le dépôt distant une fois la MR mergée (la branche locale n'est pas affectée).
Aucun rebase n'est fait à cette étape.

Changer de branche
Que ce soit pour retourner sur develop et démarrer un nouveau ticket, ou pour passer sur une autre branche feature, la même règle s'applique : si un nouveau module a été installé sur la branche courante, il faut le désinstaller avant de partir.
Retourner sur develop pour un nouveau ticket``` shell
# Si un nouveau module a été installé sur la branche courante
drush pm:uninstall webform -y

# Retour sur develop
make back

# Démarrer un nouveau ticket
make start BRANCH=feature/JIRA-456
```

Passer directement sur une autre branche feature``` shell
# Si un nouveau module a été installé sur la branche courante
drush pm:uninstall webform -y

# Aller sur l'autre branche
make switch BRANCH=feature/JIRA-456
```

Pourquoi désinstaller le module ? Parce que le changement de branche va supprimer le code du module (absent du composer.lock de la branche de destination). Si le module reste activé en BDD, drush cim plantera. La désinstallation retire le module de la BDD, ce qui permet à composer install et drush cim de fonctionner sans erreur.
Important : cette désinstallation est temporaire et locale. Le module reste dans la configuration de la branche feature. Il sera réactivé automatiquement par drush cim lors du retour sur la branche.

MR refusée : retour sur la branche pour corrections``` shell
# Désinstaller les éventuels nouveaux modules de la branche courante
drush pm:uninstall autre_module -y

# Revenir sur la branche refusée
make switch BRANCH=feature/JIRA-123
```

Ce que fait make switch :
Checkout sur la branche demandée
composer install → remet le code des modules de cette branche
drush cim → réactive les modules et restaure la configuration de la branche
Les données de test (contenus, taxonomies, utilisateurs) sont conservées puisqu'on ne touche jamais à la base de données en dehors des commandes Drush standards.
Le développeur corrige, puis refait un make finish pour pousser les corrections. La MR existante est automatiquement mise à jour.
 
MR approuvée : rebase et merge
Quand la MR est approuvée par le reviewer, il ne clique pas encore sur "Merge" (de toute façon, avec le fast-forward merge, GitLab l'empêche si la branche n'est pas à jour).``` shell
# 1. Désinstaller les éventuels nouveaux modules de la branche courante
drush pm:uninstall autre_module -y

# 2. Revenir sur la branche approuvée (si on n'y est plus)
make switch BRANCH=feature/JIRA-123

# 3. Rebaser sur develop et pousser
make rebase
```

Ce que fait make rebase :
Fetch de develop distant
Rebase de la branche courante sur origin/develop
composer install pour synchroniser les dépendances après le rebase
drush cim puis drush cex pour garantir la cohérence de la configuration
Commit automatique si la config a changé après le rebase
Push avec --force-with-lease (force sécurisé)
Le bouton "Merge" est maintenant actif sur GitLab. Le reviewer (ou le développeur) clique sur "Merge".
En cas de conflit durant le rebase :``` shell
# 1. Résoudre les conflits manuellement dans les fichiers
# 2. Ajouter les fichiers résolus
git add <fichiers-résolus>

# 3. Continuer le rebase
git rebase --continue

# 4. Synchroniser Drupal
composer install --no-interaction
drush updatedb -y
drush cr
drush cim -y
drush cex -y

# 5. Commiter les éventuels changements de config et pousser
git add config/
git diff --cached --quiet || git commit -m "fix: config after rebase"
git push origin HEAD --force-with-lease
```

 
La règle d'or
Avant de quitter une branche, désinstaller les modules qui n'existent pas sur la branche de destination.
C'est la seule action manuelle du workflow. Concrètement :
Situation
Action requise
La branche n'a ajouté aucun module
Rien à faire, make back / make switch directement
La branche a installé un nouveau module
drush pm:uninstall mon_module -y avant de quitter
Retour sur une branche avec un module
Rien à faire, drush cim le réactive automatiquement