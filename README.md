# Drupal-Noob-Documentation

Drupal Noob est une documentation pour celles et ceux qui débutent avec Drupal.

Cette formation vous propose de concevoir un projet Drupal avec son environnement de développement sous Docker.

## Environnement système

- Docker Engine 20.10+
- Docker Compose 2.0+
- Make 4.0+
- Git

## Stack technique

- PHP 8.3
- MariaDB
- Drupal 11.x
- Node 20.x
- Redis 7.x

## ✅ Installation

Les lignes de commande suivantes doivent être effectuées dans l'interpréteur de commande Linux.

🛠️ Vérifier si Make est installé :
```bash
make --version
```

🛠️ Si non, l'installer :
```bash
sudo apt update
sudo apt install make
```

📁 Cloner le projet Git :
```bash
git clone https://github.com/Russandol/Drupal-Noob-Documentation.git
cd Drupal-Noob-Documentation
```

🐳 Construire les images Docker
```bash
docker compose build
```

🐳 Démarrer l'environnement de développement Docker
```bash
docker compose up
```

Une fois l'environnement démarré, ce message s'affiche dans le terminal : 
```bash
Attaching to docs-1
docs-1  | 
docs-1  |   vitepress v1.6.4
docs-1  | 
docs-1  |   ➜  Local:   http://localhost:5173/
docs-1  |   ➜  Network: http://172.19.0.2:5173/
```

Dans le navigateur, se rendre à l'adresse indiquée.