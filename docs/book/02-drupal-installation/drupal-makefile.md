# Drupal - Makefile

Durant l'étape d'installation, nous avons utilisé plusieurs commandes pour installer Drupal. Comme l'objectif de
cette formation est de mettre en place un projet type pour des sites Drupal, nous allons utiliser Make pour
automatiser l'installation.

Ainsi, une simple commande suffira pour installer Drupal.

## Refactoring

### Création des fichiers Makefile

Actuellement, nous avons un fichier `Makefile` qui contient les commandes Docker. Nous pourrions tout simplement ajouter
nos commandes Drupal dans ce fichier. Mais à force, notre fichier `Makefile` risque de devenir trop long et complexe.

Je vous propose donc de créer des fichiers `Makefile` pour chaque contexte.

A la racine du projet, créez un dossier `make`. Dans ce dossier, créez les fichiers `docker.mk` et `drupal.mk` puis
couper / coller tout le contenu de votre `Makefile` dans `docker.mk`. `Makefile` est maintenant vide.

Nous pouvons maintenant mettre à jour le fichier `Makefile` pour qu'il importe les fichiers `docker.mk` et `drupal.mk`.

```makefile
# Include make files
include make/docker.mk
include make/drupal.mk
```

### La commande help

En l'état, la commande `help` est déclarée dans le fichier `docker.mk`. Nous aurons bien évidemment besoin d'une commande
`help` pour décrire les commandes Drupal.

Mais si on crée une commande `help` dans le fichier `drupal.mk`, cette dernière écrase la commande `help` du fichier
`docker.mk`.

Pour éviter ce problème, nous allons tout simplement déclarer des variables qui contiendront les textes des commandes
`help`. Puis générer la commande `help` dans le fichier `Makefile` en utilisant ces variables.

Dans le fichier `Makefile`, ajoutez le texte suivant :

```makefile
# Define default target
.DEFAULT_GOAL := help

# Include make files
include make/docker.mk
include make/drupal.mk

# Prevents conflicts if files with the same name exist
.PHONY: help

# Display help (default command)
help:
	@echo "🚀 Available commands:"
	@echo ""
	@echo "📦 Docker Commands:"
	@echo $(DOCKER_HELP_TEXT)
	@echo ""
	@echo "🌐 Drupal Commands:"
	@echo $(DRUPAL_HELP_TEXT)
	@echo ""
	@echo "💡 Usage: make <command>"
```

Comme vous pouvez le voir, nous avons défini la méthode `help` en utilisant des variables.

Nous avons également prévenu les conflits avec `.PHONY`.

Et avez-vous remarqué `.DEFAULT_GOAL := help` ?

Comme la première chose que fait notre fichier `Makefile` est de charger le fichier `make/docker.mk`, la commande
par défaut sera la première commande de ce fichier. Pour le moment, c'est bien la méthode `help`, mais comme nous allons
la transformer en variable, à chaque fois que vous taperez la commande `make` vous verrez la première commande de
`make/docker.mk` qui sera `init`.

Pour éviter ça, nous utilisons la directive `.DEFAULT_GOAL` pour préciser quelle est la commande par défaut.

Il est temps maintenant de remplacer la commande `help` du fichier `docker.mk` par une variable `DRUPAL_HELP_TEXT`.

Dans le fichier `docker.mk`, remplacez le code suivant :

```makefile
# Prevents conflicts if files with the same name exist
.PHONY: help init build dev status logs down restart shell prod-build prod prod-down prod-status prod-logs

# Display help (default command)
help:
  @echo "Commandes disponibles :"
  @echo "  make init           - Initialise les fichiers d'environnement"
  @echo "  make build          - Construit les images Docker (dev)"
  @echo "  make dev            - Démarre l'environnement de développement"
  @echo "  make status         - Affiche l'état des conteneurs de développement"
  @echo "  make logs           - Affiche les logs de développement en temps réel"
  @echo "  make down           - Arrête l'environnement de développement"
  @echo "  make restart        - Redémarre l'environnement de développement"
  @echo "  make shell          - Accéder à un terminal à l'intérieur du conteneur avec l'utilisateur 'application'"
  @echo "  make prod-build     - Construit les images Docker (prod)"
  @echo "  make prod           - Démarre l'environnement de production"
	@echo "  make prod-down      - Arrête l'environnement de production"
	@echo "  make prod-status    - Affiche l'état des conteneurs de production"
	@echo "  make prod-logs      - Affiche les logs de production en temps réel"
```

Par :

```makefile
# Help messages
DOCKER_HELP_TEXT = "\
  make init          - Initialize environment files\n\
  make build         - Build Docker images (dev)\n\
  make dev           - Start development environment\n\
  make status        - Show development containers status\n\
  make logs          - Display development logs in real time\n\
  make down          - Stop development environment\n\
  make restart       - Restart development environment\n\
  make shell         - Access a terminal inside the container as 'application' user\n\
  make prod-build    - Build Docker images (prod)\n\
  make prod          - Start production environment\n\
  make prod-down     - Stop production environment\n\
  make prod-status   - Show production containers status\n\
  make prod-logs     - Display production logs in real time\n"

# Prevents conflicts if files with the same name exist
.PHONY: init build dev status logs down restart shell prod-build prod prod-down prod-status prod-logs
```

Nous avons supprimé la commande `help` ainsi que sa mention dans la directive `.PHONY`. Puis, nous avons créé une
variable `DOCKER_HELP_TEXT` qui contient le texte de la commande `help`.

Par convention, nous avons positionné la variable en haut du fichier (avant la directive `.PHONY` et les commandes).

Tout est presque prêt pour les commandes Drupal, il nous reste un dernier détail.

### Variables globales

Pour effectuer l'installation de Drupal, nous avons besoin de nous connecter en shell pour ensuite exécuter les commandes
`drush`.

Nous allons donc devoir répéter à plusieurs reprises la commande
`@docker compose exec -u application drupal bash`.

Pour faciliter la maintenabilité, nous allons déclarer nos variables de manière globale dans le fichier `Makefile` et
préciser les dépendances dans les sous fichiers.

Dans le fichier `Makefile`, ajoutez les variables suivantes :

```makefile
# Define default target
.DEFAULT_GOAL := help

# Docker variables
PROD_COMPOSE = compose-prod.yml
DOCKER_EXEC = docker compose exec -u application drupal

# Include make files
include make/docker.mk
include make/drupal.mk

#.. reste du fichier
```

Et dans le fichier `make/docker.mk`, faites les modifications suivantes :

```makefile
# Ajoutez tout en haut du fichier les dépendances aux variables globales
# Dependencies: Requires PROD_COMPOSE and DOCKER_EXEC variables from main Makefile

# Supprimez les variables

# Simplifiez la commande shell
shell:
	@$(DOCKER_EXEC) bash
```

Notre refactoring est terminé, tout est enfin prêt pour le fichier `make/drupal.mk`.

## Drupal.mk

Dans le fichier `make/drupal.mk` ajoutez le code suivant :

```makefile
# Dependencies: Requires DOCKER_EXEC variables from main Makefile

# Help messages
DRUPAL_HELP_TEXT = "\
  make drupal-install - Download and install Drupal\n"

# Prevents conflicts if files with the same name exist
.PHONY: drupal-install

drupal-install:
	@echo "📦 Downloading Drupal via Composer..."
	@$(DOCKER_EXEC) composer create-project drupal/recommended-project drupal-temp
	@echo "🔄 Copying Drupal files..."
	@$(DOCKER_EXEC) rsync -a drupal-temp/ ./
    @echo "🧹 Remove core-project-message module..."
	@$(DOCKER_EXEC) composer remove drupal/core-project-message
	@echo "🧹 Cleaning temporary files..."
	@$(DOCKER_EXEC) rm -rf drupal-temp/
	@echo "✅ Drupal has been successfully installed"
```

Et voilà, nous avons ajouté une commande `drupal-install` et revu le fonctionnement de notre Makefile pour qu'il
puisse être facilement réutilisé et maintenu.

Il ne reste plus qu'une dernière étape à accomplir avant de continuer la configuration de notre site Drupal.

Avez-vous deviné laquelle ?
