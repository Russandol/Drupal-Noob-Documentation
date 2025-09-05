# Fichier de configuration PHP - php.ini.example

Tout comme pour les variables d'environnement, notre configuration du service `drupal` nous permet de surcharger la 
configuration des variables d'environnement de **PHP** avec nos propres valeurs.

A la racine du projet créer un fichier *.docker/php/php.ini.example* et ajoutez le contenu suivant : 

```ini
[PHP]
; Execution time
max_execution_time = 30

; Memory
memory_limit = 256M

; File uploads
post_max_size = 64M
upload_max_filesize = 64M

; Error reporting
display_errors = On
```

Cette configuration de **PHP** correspond à celle recommandée pour un projet **Drupal 11**.