# Étape 2.5 — Configurer les régions du thème Bootstrap Forge

## Régions héritées de Bootstrap Forge

Votre sous-thème hérite automatiquement des régions définies dans Bootstrap Forge via `base theme: bootstrap_forge`. Vous n'avez pas besoin de les redéfinir — elles sont disponibles dès le départ.

Si vous souhaitez **modifier ou étendre** les régions, déclarez-les dans votre `mon_theme_bootstrap.info.yml` : votre déclaration prend le dessus sur celle du thème parent.

## Régions recommandées pour Canvas

Assurez-vous que ces régions sont bien présentes (héritées ou déclarées) :

```yaml
# mon_theme_bootstrap.info.yml
regions:
  header: Header
  primary_menu: 'Menu principal'
  breadcrumb: Fil d'Ariane
  highlighted: Highlighted
  content: Contenu
  sidebar_first: 'Colonne latérale gauche'
  sidebar_second: 'Colonne latérale droite'
  footer: Footer
```

| Région        | Utilisée par Canvas pour         |
|---------------|----------------------------------|
| `header`      | Global Component → Header        |
| `footer`      | Global Component → Footer        |
| `content`     | Rendu des Canvas Pages           |

## Le template `page.html.twig`

Bootstrap Forge fournit déjà un `page.html.twig` adapté à Bootstrap. Si vous avez besoin de le personnaliser, créez un override dans `templates/layout/page.html.twig` dans votre sous-thème.

Exemple minimal avec les structures Bootstrap :

```twig
<body>

  {% if page.header %}
    <header class="site-header" role="banner">
      <div class="container-fluid">
        {{ page.header }}
      </div>
    </header>
  {% endif %}

  <main class="main-content" role="main">
    <div class="container">

      {% if page.breadcrumb %}
        <nav aria-label="breadcrumb" class="mt-3">
          {{ page.breadcrumb }}
        </nav>
      {% endif %}

      <div class="row">
        <div class="{{ page.sidebar_first ? 'col-lg-9' : 'col-12' }}">
          {{ page.content }}
        </div>

        {% if page.sidebar_first %}
          <aside class="col-lg-3">
            {{ page.sidebar_first }}
          </aside>
        {% endif %}
      </div>

    </div>
  </main>

  {% if page.footer %}
    <footer class="site-footer">
      <div class="container">
        {{ page.footer }}
      </div>
    </footer>
  {% endif %}

</body>
```

::: tip Classes Bootstrap dans les templates
Notez l'utilisation de `.container`, `.row`, `.col-lg-9` etc. directement dans le template Twig — c'est la façon naturelle de structurer une mise en page Bootstrap dans Drupal.
:::

## Canvas et la région `content`

Le rendu des Canvas Pages fonctionne de la même manière qu'avec Mercury :

```
Canvas Page
  → rendu dans la région "content"
     → affiché via {{ page.content }} dans page.html.twig
     → Bootstrap gère la mise en page autour
```

Les **Global Components** Header et Footer de Canvas sont placés dans les régions `header` et `footer`, qui dans Bootstrap Forge sont wrappées dans des balises Bootstrap.

## Vérifier les régions

```bash
ddev drush cr
```

Puis :

```
Administration → Structure → Blocs
```

Chaque région apparaît dans la liste des zones de blocs disponibles.

::: warning Override de template et cache
Dès que vous créez un fichier dans `templates/`, vous devez vider le cache pour que Drupal le prenne en compte :
```bash
ddev drush cr
```
:::
