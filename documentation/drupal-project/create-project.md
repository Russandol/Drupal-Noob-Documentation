# 🎬 Le projet : CinéCritique

Pour rendre cette formation concrète, nous allons construire ensemble un **site de notation et d'avis de films**,
inspiré de plateformes comme [Letterboxd](https://letterboxd.com/).

## Fonctionnalités prévues

Notre site **CinéCritique** proposera :

| Fonctionnalité | Description |
|---|---|
| 🎥 **Fiches films** | Chaque film aura sa fiche : titre, synopsis, affiche, date de sortie, genre, durée… |
| ⭐ **Notation** | Les utilisateurs pourront attribuer une note sur 5 à chaque film |
| 💬 **Avis / Critiques** | Les utilisateurs pourront rédiger un avis détaillé sur un film |
| 👤 **Comptes utilisateurs** | Inscription, connexion et profil utilisateur |
| 🔍 **Recherche et filtres** | Rechercher un film par titre, genre ou année |

## Préparer l'espace de travail

Avant de lancer la moindre installation, nous allons préparer la structure de notre projet.

### Créer le dossier du projet

Ouvrez un terminal **WSL** (Ubuntu) et créez un dossier dédié à vos projets, puis le dossier du projet :

```shell
# Créer un dossier pour regrouper tous vos projets (si ce n'est pas déjà fait)
mkdir -p ~/projets

# Créer le dossier du projet CinéCritique
mkdir ~/projets/cinecritique

# Se placer dans le dossier
cd ~/projets/cinecritique
```

::: info ❓ Où se trouve ce dossier ?
Sous Windows, le dossier est accessible depuis l'explorateur de fichiers à l'adresse :
`\\wsl.localhost\Ubuntu\home\UTILISATEUR\projets\cinecritique`

Remplacez *UTILISATEUR* par votre nom d'utilisateur Linux (WSL).
:::

::: danger 🚨 Important
Travaillez toujours depuis le système de fichiers Linux (dans WSL) et non depuis un dossier Windows
classique (C:\Users\...). Les performances de Docker et DDEV sont nettement meilleures sur le système de fichiers Linux.
:::

## Versionnage avec Git (recommandé)

Il est fortement recommandé d'utiliser Git pour versionner votre projet dès le départ. Cela vous permettra de :

* 💾 Sauvegarder chaque étape de votre progression
* ↩️ Revenir en arrière en cas d'erreur
* 👥 Collaborer avec d'autres développeurs
* ☁️ Héberger votre code sur une plateforme comme GitHub ou GitLab

Pour initialiser un dépôt Git dans votre projet :

``` shell
cd ~/projets/cinecritique
git init
```

::: info Drupal va devoir attendre encore un peu !
Car nous allons d'abord nous intéresser à un outil qui va nous permettre de mettre en place rapidement un environnement
de développement local : [DDEV](/drupal-project/installation/ddev).
:::