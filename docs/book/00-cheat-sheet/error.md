# Erreurs rencontrées

## PHPStorm

### $entityTypeManager must not be accessed before initialization

#### context

J'ai créé un formulaire dans lequel j'ai un champ radio qui appelle de l'ajax. la première valeur est sélectionnée par défaut.
Si je sélectionne la seconde valeur, l'ajax est appelé correctement.
Si ensuite je sélectionne la première valeur, j'ai l'erreur.

#### Explication

La classe qui gère mon formulaire à des dépendances qui ne sont pas correctement instanciée lors de l'appel ajax.

#### Solution

Drupal propose un trait qui permet de gérer ce genre de problème. Il suffit d'ajouter à l'intérieur de la classe le trait
`Drupal\Core\DependencyInjection\DependencySerializationTrait` : 

```php
use DependencySerializationTrait;
```

### Git is not installed: Cannot identify version of git executable: no response

file -> Invalidate caches... -> Invalidate and restart

### Configurer Git ssh dans le terminal de PHPStorm

Générer une clef ssh: 
```shell
ssh-keygen -t ed25519 -C "maclef@gitlab" -f ~/.ssh/id_ed25519_maclef
```

Vérifier le remote dans le repo local : 
```shell
git remote -v
```
L'url doit correspondre à celle du ssh.

Si non (remplacer URL par l'url du repo) : 
```shell
git remote set-url originer URL
```

Modifier le fichier .ssh/config : 
```text
Host gitlab-project
  HostName gitlab.com
  User git
  IdentityFile ~/.ssh/id_ed25519_maclef
  AddKeysToAgent yes
```

Tester la connexion : 
```ssh
ssh -T git@gitlab-project
```

Renvois : 
```ssh
Welcome to GitLab, @user
```