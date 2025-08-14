# Mise à jour du fichier README.md

Maintenant que nous avons modifié notre projet en installant Drupal et revu le fonctionnement de Make, il est temps
de mettre à jour le fichier `README.md`.

Je sais que la documentation est une étape barbante dans la vie d'un projet. Mais c'est une étape essentielle pour la
maintenabilité. Dites-vous que chaque minute investie dans un bon README vous fera économiser des heures de support et
d'explications répétitives.

De plus il est toujours plus simple de documenter au fur et à mesure du développement plutôt que de tout faire d'un
coup à la fin.

Prenons donc l'habitude de mettre le fichier `README.md` à jour régulièrement !

Ouvrez le fichier `README.md` et ajoutez nos dernières modifications comme suit :

```markdown
# Drupal Noob

    Drupal Noob est un template de projet Drupal 11.

    ## 📝 Prérequis

    ### Environnement système

    - Docker Engine 20.10+
    - Docker Compose 2.0+
    - Make 4.0+
    - Git

    ### Stack technique

    - PHP 8.3
    - MariaDB 10.6+
    - Drupal 11.x

    ## ✅ Installer un nouveau projet Drupal

    Les lignes de commande suivantes doivent être effectuées dans l'interpréteur de commande Linux.

    🛠️ Vérifier si Make est installé :
    ```shell
    make --version
    ```

    🛠️ Si non, l'installer :
    ```shell
    sudo apt update
    sudo apt install make
    ```

    📁 Cloner le projet Git :
    ```bash
    git clone [url-du-projet]
    cd [nom-du-projet]
    ```

    📋 Initialiser les fichiers de configuration et d'environnement :
    ```bash
    make init
    ```

    Si nécessaire, effectuer les modifications dans les fichiers `.docker/.env.database`, `.docker/.env.database`
    et `.docker/php/php.ini`.

    🐳 Construire les images Docker
    ```bash
    make build
    ```

    🐳 Démarrer l'environnement de développement Docker
    ```bash
    make dev
    ```

    📁 Ouvrir en tant qu'administrateur le fichier `C:\Windows\System32\drivers\etc\hosts` et ajouter la ligne :
    ```bash
    127.0.0.1    drupal-project.test
    ```

    🔨 Installer Drupal et ses dépendances
    ```bash
    make drupal-install
    ```

    ## 🔧 Configuration

    ### Fichiers de configuration

    - Variables d'environnement Docker `.docker/.env.docker`
    - Variables d'environnement de base de données `.docker/.env.database`
    - Configuration PHP `.docker/php/php.ini`
    - Services Docker de développement `compose.yml`
    - Services Docker de production `compose-prod.yml`

    ### Accès aux services

    - **Site web** : [http://drupal-project.test](http://drupal-project.test)
    - **PHPMyAdmin** : [http://drupal-project.test:8080](http://drupal-project.test:8080)
    - **Mailhog** (emails de test) : [http://drupal-project.test:8025](http://drupal-project.test:8025)

    ## 🐳 Commandes Docker disponibles

    | Commande           | Description                                                     |
    |--------------------|-----------------------------------------------------------------|
    | `make init`        | Initialise les fichiers d'environnement                         |
    | `make build`       | Construit les images Docker                                     |
    | `make dev`         | Démarre l'environnement de développement                        |
    | `make status`      | Montre les statuts des conteneurs de développement              |
    | `make log`         | Affiche les logs en temps réel                                  |
    | `make down`        | Arrête l'environnement de développement                         |
    | `make restart`     | redémarre l'environnement de développement                      |
    | `make shell`       | Accède au terminal du container                                 |
    | `make prod-build`  | Construit les images Docker de l'environnement de production    |
    | `make prod`        | Démarre l'environnement de production                           |
    | `make prod-down`   | Arrête l'environnement de production                            |
    | `make prod-status` | Montre les statuts des conteneurs de production                 |
    | `make prod-logs`   | Affiche les logs en temps réel de l'environnement de production |

    ## 🌐 Commandes Drupal disponibles

    | Commande              | Description                            |
    |-----------------------|----------------------------------------|
    | `make drupal-install` | Télécharge et install un projet Drupal |

    ## 📁 Structure du projet

    ```
    .
    ├── .docker/
    │   ├── php/php.ini
    │   ├── .env.database
    │   └── .env.docker
    ├── make/
    │   ├── docker.mk
    │   └── drupal.mk
    ├── recipes/
    ├── vendor/
    ├── web/
    │   ├── sites/default
    │   ├── modules
    │   └── themes
    ├── .dockerignore
    ├── .gitignore
    ├── compose.yml
    ├── compose-prod.yml
    ├── composer.json
    ├── composer.lock
    ├── Dockerfile
    └── Makefile
    ```
```

Les modifications que nous avons effectuées :
- Ajout de la version de Drupal dans la `Stack technique`.
- Modification des étapes d'installation pour inclure l'installation de Drupal.
- Ajout de la section `Commandes Drupal disponibles`.
- Modification de la section `Structure du projet` pour inclure le dossier `make` et la structure de dossiers de Drupal.
