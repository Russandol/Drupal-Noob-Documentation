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