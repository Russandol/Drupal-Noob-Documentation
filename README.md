# Drupal-Noob-Documentation

Drupal Noob est une documentation pour celles et ceux qui débutent avec Drupal.

Cette formation vous propose de concevoir un projet Drupal avec son environnement de développement sous Docker.

## Environnement système

- Docker Engine 20.10+
- Docker Compose 2.0+
- Git

## Stack technique

- PHP 8.3
- MariaDB
- Drupal 11.x
- Node 20.x
- Redis 7.x

## ✅ Installation

Les lignes de commande suivantes doivent être effectuées dans l'interpréteur de commande Linux.

📁 Cloner le projet Git :
```bash
git clone https://github.com/Russandol/Drupal-Noob-Documentation.git
cd Drupal-Noob-Documentation
```

🐳 Construire l'environnement avec DDEV
```bash
ddev start
```

Installer les dépendances
```bash
ddev npm install
```

Se rendre sur le site en http
```bash
ddev launch :5172
```

## Arrêter le projet

Arrêter DDEV
```bash
ddev stop
```