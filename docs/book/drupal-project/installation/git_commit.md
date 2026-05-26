# Notre premier commit

Nous avons parcouru un bon bout de chemin depuis le début de cette formation ! Récapitulons ce que nous avons accompli :

* Installation de **Drupal** avec **DDEV** et **Composer**.
* Configuration de l'environnement local avec **DDEV**.
* Mise en place des fichiers **settings** et de leur architecture.
* Gestion des données sensibles avec les **variables d'environnement**.
* Export de la **configuration** de Drupal dans des fichiers *.yml*.
* Création des fichiers **README.md** et **COMMANDS.md**.

C'est le bon moment pour **versionner** tout ce travail avec **Git** et créer notre premier commit.

## Vérifier l'état de notre configuration

Avant de versionner, prenons une bonne habitude : **vérifier que notre configuration Drupal est bien synchronisée**.

En effet, nous avons fait de nombreuses modifications dans les fichiers *settings*, activé des modules, et exporté la
configuration. Il est important de s'assurer que rien n'a été oublié.

Pour cela, utilisez la commande suivante :

```shell
ddev drush cst
```

Cette commande compare la configuration active (en base de données) avec les fichiers de configuration exportés
(dans le dossier *config/default*).

Si tout est synchronisé, vous devriez obtenir le message suivant :

```shell
[notice] No differences between DB and sync directory.
```

::: warning ⚠️ Toujours vérifier avant de commiter
Prendre l'habitude de vérifier la synchronisation de la configuration avant chaque commit est une **bonne pratique
essentielle**. Un oubli d'export peut entraîner des incohérences entre votre code et votre base de données, ce qui
peut provoquer des erreurs difficiles à diagnostiquer.
:::

## Versionner avec Git

Maintenant que nous sommes sûrs que tout est en ordre, passons au versionning.

### Vérifier l'état des fichiers

Commençons par observer l'état actuel de notre dépôt :

```shell
git status
```

Cette commande affiche la liste de tous les fichiers modifiés, ajoutés ou supprimés depuis le dernier commit.
Vous devriez voir un bon nombre de fichiers, c'est normal : c'est notre premier commit !

Prenez le temps de **lire la liste des fichiers**. C'est une étape importante pour vérifier que :

* Les fichiers sensibles (*.env*, *settings.local.php*) **ne sont pas** dans la liste grâce au *.gitignore*.
* Les fichiers de configuration, les *settings* et les fichiers du projet **sont bien** présents.

### Ajouter les fichiers à l'index

Une fois la vérification faite, ajoutez tous les fichiers à l'index de **Git** (zone de préparation) :

```shell
git add .
```

::: tip 💡Pourquoi ` .` ?
Le `.` signifie "tous les fichiers du répertoire courant et de ses sous-dossiers".
:::

Vous pouvez vérifier ce qui a été ajouté au staging avec :

```shell
git status
```

Les fichiers devraient maintenant apparaître en **vert**, ce qui signifie qu'ils sont prêts à être commités.

### Créer le commit

Créez votre premier commit avec un message descriptif :

```shell
git commit -m "Initial commit : installation de Drupal avec DDEV"
```

::: tip 💡 Un bon message de commit
Un message de commit doit être **court**, **clair** et **décrire ce qui a été fait**. Il doit répondre à la question :
*"Qu'est-ce que ce commit apporte au projet ?"*.

Évitez les messages vagues comme "fix", "update" ou "modifications".
:::

::: info 🎉 Félicitation !
L'installation de notre projet **Drupal** est maintenant terminée et versionnée.

Il est maintenant temps de découvrir l'interface de **Drupal**.
:::