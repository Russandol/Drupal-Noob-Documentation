# README

Maintenant que nous avons mis en place notre environnement Docker et organisé nos commandes Make, il est crucial de
documenter notre projet.

Le fichier `README.md` est l'élément central de la communication technique d'un projet. C'est la porte d'entrée
principale qui doit permettre à n'importe qui de comprendre le projet et de l'utiliser.

L'objectif est de répondre à une question toute simple : si un nouveau développeur intègre le projet, est-il capable
de l'installer et de l'utiliser en moins de 15 minutes ?

Et bien entendu, un fichier `README.md` doit évoluer en même temps que l'application. Il est donc important que ce fichier
soit mis à jour régulièrement.

Un fichier `README.md` complet doit contenir :
- Les prérequis techniques
- La procédure d'installation
- La configuration du projet
- Les commandes disponibles
- La structure du projet
- Et les sections complémentaires comme la résolution des problèmes courants, les workflows, les tests, etc..

A la racine du projet, créez un fichier `README.md` avec le contenu suivant :

```markdown
    # Drupal Project
    
    Drupal Project est un template de projet Drupal 11.
    
    ## 📝 Prérequis
    
    ### Environnement système
    
    - Docker Engine 20.10+
    - Docker Compose 2.0+
    - Make 4.0+
    - Git
    
    ### Stack technique
    
    - PHP 8.3
    - MariaDB 10.6+
    
    ## ✅ Installation rapide
    
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
    
    🌐 Ouvrir en tant qu'administrateur le fichier `C:\Windows\System32\drivers\etc\hosts` et ajouter la ligne :
    ```bash
    127.0.0.1    drupal-project.test
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
    
    ## 📁 Structure du projet
    
    ```
    .
    ├── .docker/
    │   ├── php/
    │   │   └── php.example.ini
    │   ├── example.env.database
    │   └── example.env.docker
    ├── .dockerignore
    ├── .gitignore
    ├── compose.yml
    ├── compose-prod.yml
    ├── Dockerfile
    └── Makefile
    ```
```
   

Notre environnement de développement est enfin prêt ! Nous avons tout ce qu'il faut pour gérer un projet Drupal 11. Et 
glaçage sur la part de flan : notre environnement est évolutif et extensible !

Il est temps d'installer Drupal maintenant.