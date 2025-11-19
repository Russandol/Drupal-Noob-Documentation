# Makefile : simplifier son workflow Docker

## Présentation

### Description de Make

Comme nous l'avons vu précédemment, nous aurons besoin de taper régulièrement des lignes de commande à chaque fois
que nous travaillerons sur notre projet.

Heureusement nous avons les moyens de simplifier notre workflow grace à **Make**.

Créé en 1976 par Stuart Feldman aux Bell Labs, **Make** a d'abord été conçu pour la compilation.

Aujourd'hui, il est l'un des outils d'automatisation les plus utilisés pour :
- **Orchestrer** des conteneurs **Docker**.
- **Gérer des environnements** de développement.
- **Automatiser** les tests et le déploiement.
- **Standardiser** les commandes dans les projets d'équipe.

### Structure du fichier Makefile

Les commandes sont écrites dans un fichier *Makefile* et doivent respecter la structure :

```makefile
cible: dépendance1 dépendance2
    commande1
    commande2
```

### Exemple simple

```makefile
hello:
	@echo "Hello world!"

fichier.txt:
	@echo "Contenu du fichier" > fichier.txt

tout: hello fichier.txt
	@echo "Toutes les tâches sont terminées!"
```

Dans cet exemple :
- `make hello` affichera "Hello world!".
- `make fichier.txt` créera un fichier avec le texte "Contenu du fichier".
- `make tout` exécutera les deux tâches précédentes puis affichera un message final.

Le symbole `@` avant la ligne de commande spécifie que la commande ne doit pas être écrite avant d'être exécutée.

Sans le symbole `@` le résultat est :

```shell
echo "Hello World!"
Hello World!
```

Avec le symbole `@` :

```shell
Hello World!
```

## Utiliser Make

### Installation

Commençons par vérifier si **Make** est installé avec la commande :

```shell
make --version
```

Si le numéro de version s'affiche cela signifie que **Make** est déjà installé !

Si ce n'est pas le cas, utilisez les commandes suivantes pour l'installer :

```shell
sudo apt update
sudo apt install make
```

Une fois l'installation terminée, créez le fichier *Makefile* (sans extension)

```shell
touch Makefile
```

### Première commandes

#### help

Ouvrez le fichier *Makefile* et ajoutez le code suivant :

```makefile
.PHONY: help

help:
    @echo "Commandes disponibles :"
    @echo "  make init      - Initialise les fichiers d'environnement."
```

Nous venons de rajouter une commande `help` qui affichera le détail des commandes disponibles.

Et avant ça nous avons utilisé la directive `.PHONY` qui indique que certaines cibles ne représentent pas des fichiers
réels, mais plutôt des actions ou des commandes à exécuter.

Par défaut, **Make** fonctionne ainsi :
- Il vérifie si la cible (target) existe sous forme de fichier dans le répertoire.
- Il vérifie si les dépendances sont plus récentes que la cible.
- Si la cible n'existe pas OU si une dépendance est plus récente, il exécute les commandes.

Avec `.PHONY`, les cibles seront toujours exécutées, peu importe s'il existe des fichiers portant le même nom.

#### init

Vous l'avez surement remarqué, dans la commande `help` nous avons défini la commande `make init` qui permet d'initialiser
les fichiers d'environnement.

Comme nous l'avons vu lors de la création des fichiers de Docker, nous avons créé deux fichiers de configuration :
- *.docker/.env.example* : qui regroupe les variables d'environnements utilisées par **Docker**.
- *.docker/php/php.ini.example* : qui regroupe les configurations de **PHP**.

Mais ces deux fichiers sont des templates avec des valeurs par défaut. À l'initialisation de notre projet, nous avons
donc besoin de dupliquer ces fichiers.

Nous allons donc créer la commande `init` qui s'occupera de les générer.

Ajoutons le code au fichier *Makefile* :

```makefile
.PHONY: help init

help:
    @echo "Commandes disponibles :"
    @echo "  make init      - Initialise les fichiers d'environnement"

init:
	@if [ ! -f .docker/.env ]; then \
  		cp .docker/.env.example .docker/.env; \
  		echo "✅ File .docker/.env created from example"; \
  	else \
		echo "ℹ️ File .docker/.env already exists"; \
	fi

	@if [ ! -f .docker/php/php.ini ]; then \
		cp .docker/php/php.ini.example .docker/php/php.ini; \
		echo "✅ File .docker/php/php.ini created from example"; \
	else \
		echo "ℹ️ File .docker/php/php.ini already exists"; \
	fi
```

Ce que nous avons fait :
- Nous avons ajouté la commande `init` à la directive `.PHONY`.
- Si les fichiers *.docker/.env*  et *.docker/php/php.ini* n'existe pas, nous dupliquons et renommons
les fichiers *.docker/.env.example*, et *.docker/php/php.ini.example*.

Félicitation, vous venez d'écrire votre première commande **Make**. Vous pouvez la tester avec la commande :

```shell
make init
```

### Commandes Docker

Nous allons maintenant ajouter des commandes **Make** pour notre workflow **Docker**.

#### Build

```makefile
ENV_FILE = .docker/.env

.PHONY: help init build

help:
    @echo "Commandes disponibles :"
    @echo "  make init      - Initialise les fichiers d'environnement"
    @echo "  make build     - Construit les images Docker (dev)"

# Code à ajouter à la fin du fichier
build: init
	@echo "🔨 Building Docker images for development..."
	@docker compose --env-file $(ENV_FILE) build --no-cache
	@echo "✅ Images built"
```

Les changements :
- Nous avons créé une variable `ENV_FILE` qui contient le chemin du fichier *.docker/.env*.
- Nous avons rajouté notre cible dans la directive `.PHONY`.
- Nous avons rajouté une ligne dans la commande `help` pour décrire notre nouvelle commande.

Puis, nous avons ajouté la commande `build`. Cette commande va commencer par appeler la commande `init` pour vérifier
si les fichiers d'environnement existe bien. Enfin, nous avons simplement utilisé la commande `build` de **Docker** comme
vu dans le chapitre précédent.

#### Up

```makefile
.PHONY: help init build dev

help:
    @echo "Commandes disponibles :"
    @echo "  make init      - Initialise les fichiers d'environnement"
    @echo "  make build     - Construit les images Docker (dev)"
    @echo "  make dev       - Démarre l'environnement de développement"

# Code à ajouter à la fin du fichier
dev:
	@echo "🚀 Starting development environment..."
	@docker compose --env-file $(ENV_FILE) up -d
	@echo "✅ Development environment started"
```

Appeler cette méthode `dev` au lieu de `up` (pour correspondre à la commande **Docker**) nous permettra de faire la
distinction avec la commande pour l'environnement de production.

#### Status

```makefile
.PHONY: help init build dev status

help:
    @echo "Commandes disponibles :"
    @echo "  make init      - Initialise les fichiers d'environnement"
    @echo "  make build     - Construit les images Docker (dev)"
    @echo "  make dev       - Démarre l'environnement de développement"
    @echo "  make status    - Affiche l'état des conteneurs de développement"

# Code à ajouter à la fin du fichier
status:
	@echo "📊 Development containers status:"
	@docker compose ps
```

####  Logs

```makefile
.PHONY: help init build dev status logs

help:
    @echo "Commandes disponibles :"
    @echo "  make init      - Initialise les fichiers d'environnement"
    @echo "  make build     - Construit les images Docker (dev)"
    @echo "  make dev       - Démarre l'environnement de développement"
    @echo "  make status    - Affiche l'état des conteneurs de développement"
    @echo "  make logs      - Affiche les logs de développement en temps réel"

# Code à ajouter à la fin du fichier
logs:
	@echo "📜 Displaying development logs (Ctrl+C to quit):"
	@docker compose logs -f
```

#### Down

```makefile
.PHONY: help init build dev status logs down

help:
    @echo "Commandes disponibles :"
    @echo "  make init      - Initialise les fichiers d'environnement"
    @echo "  make build     - Construit les images Docker (dev)"
    @echo "  make dev       - Démarre l'environnement de développement"
    @echo "  make status    - Affiche l'état des conteneurs de développement"
    @echo "  make logs      - Affiche les logs de développement en temps réel"
    @echo "  make down      - Arrête l'environnement de développement"

# Code à ajouter à la fin du fichier
down:
	@echo "🛑 Stopping development environment..."
	@docker compose down
	@echo "✅ Development environment stopped"
```

#### Restart

```makefile
.PHONY: help init build dev status logs down restart

help:
    @echo "Commandes disponibles :"
    @echo "  make init      - Initialise les fichiers d'environnement"
    @echo "  make build     - Construit les images Docker (dev)"
    @echo "  make dev       - Démarre l'environnement de développement"
    @echo "  make status    - Affiche l'état des conteneurs de développement"
    @echo "  make logs      - Affiche les logs de développement en temps réel"
    @echo "  make down      - Arrête l'environnement de développement"
    @echo "  make restart   - Redémarre l'environnement de développement"

# Code à ajouter à la fin du fichier
restart: down dev
```

Cette commande est très simple, car elle se contente d'appeler les deux commandes déjà existantes `down` et `dev`.

#### Shell

```makefile
.PHONY: help init build dev status logs down restart shell

help:
    @echo "Commandes disponibles :"
    @echo "  make init      - Initialise les fichiers d'environnement"
    @echo "  make build     - Construit les images Docker (dev)"
    @echo "  make dev       - Démarre l'environnement de développement"
    @echo "  make status    - Affiche l'état des conteneurs de développement"
    @echo "  make logs      - Affiche les logs de développement en temps réel"
    @echo "  make down      - Arrête l'environnement de développement"
    @echo "  make restart   - Redémarre l'environnement de développement"
    @echo "  make shell     - Accéder à un terminal à l'intérieur du conteneur avec l'utilisateur 'application'"

# Code à ajouter à la fin du fichier
shell:
	@docker compose exec -u application drupal bash
```

#### Commandes de production

Nous avons fait le tour des commandes habituelles, il nous reste à traiter les versions des commandes `up`, `down`,
`status` et `logs` pour l'environnement de production.

```makefile
PROD_COMPOSE = compose-prod.yml

.PHONY: help init build dev status logs down restart shell prod-build prod prod-down prod-status prod-logs

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

# Code à ajouter à la fin du fichier
prod-build: init
	@echo "🔨 Rebuilding Docker images for production..."
	@docker compose -f $(PROD_COMPOSE) --env-file $(ENV_FILE) build --no-cache
	@echo "✅ Images rebuilt"

prod:
	@echo "🚀 Starting production environment..."
	@docker compose -f $(PROD_COMPOSE) --env-file $(ENV_FILE) up -d
	@echo "✅ Production environment started"

prod-down:
	@echo "🛑 Stopping production environment..."
	@docker compose -f $(PROD_COMPOSE) down
	@echo "✅ Production environment stopped"

prod-status:
	@echo "📊 Production containers status:"
	@docker compose -f $(PROD_COMPOSE) ps

prod-logs:
	@echo "📜 Displaying production logs (Ctrl+C to quit):"
	@docker compose -f $(PROD_COMPOSE) logs -f
```

Toutes nos commandes sont prêtes ! Mais avant de passer à la configuration de **Drupal**, il nous reste une dernière chose à faire.