# Drupal - Host Windows

Lorsque vous développez un site en local, le serveur de développement vous donne généralement accès via une adresse comme
`http://127.0.0.1` ou `http://localhost`.

Cette approche a des inconvénients :
- URL peu lisible.
- Si vous avez plusieurs sites qui utilisent la même URL vous pouvez rencontrer des problèmes de chevauchement de cookies.

Et surtout, comme nous faisons un projet `Drupal`, certaines fonctionnalités nécessitent un vrai domaine.

Heureusement, il est tout à fait possible d'indiquer à Windows qu'un nom de domaine pointe vers l'URL du localhost.

Pour ça nous devons modifier le fichier `hosts` qui se trouve dans : `C:\Windows\System32\drivers\etc\hosts`.

⚠️ **Important** Vous devez ouvrir votre éditeur de texte en tant qu'administrateur, sinon vous ne pourrez pas enregistrer
les modifications.

Pour créer un nom de domaine, ajoutez cette ligne à la fin du fichier :

```
127.0.0.1    drupal-project.test
```

Pour correspondre à la configuration de notre environnement Docker, j'ai utilisé le nom de domaine précisé dans le fichier
`.env.docker`.

Le RFC 6761, le document officiel qui définit les standards Internet, recommande d'utiliser `.test`.

Déjà parce qu'à l'inverse de `.dev` que l'on utilisait il y a quelques années et qui a été racheté par Google, `.test`
ne sera jamais vendu comme TLD public. De plus, contrairement à `.local`, il ne risque pas d'engendrer des conflits réseau.
Et enfin, il n'oblige pas à avoir un HTTPS.

Une fois les modifications enregistrées, redémarrez votre navigateur et rendez-vous sur `drupal-project.test`.

