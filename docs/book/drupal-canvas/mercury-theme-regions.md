# Étape 2.2 — Configurer les régions du thème

## Qu'est-ce qu'une région dans Drupal ?

Dans Drupal, une **région** est une zone nommée de la page dans laquelle vous pouvez placer des **blocs**. Ces régions sont déclarées dans le fichier `.info.yml` du thème et utilisées dans le template `page.html.twig`.

```
┌────────────────────────────────────────────────┐
│                  HEADER (région)               │
├────────────────────────────────────────────────┤
│              BREADCRUMB (région)               │
├──────────────────────────┬─────────────────────┤
│                          │                     │
│    CONTENT (région)      │  SIDEBAR (région)   │
│                          │                     │
├────────────────────────────────────────────────┤
│                  FOOTER (région)               │
└────────────────────────────────────────────────┘
```

## Régions et Canvas : comment ça s'articule ?

Canvas utilise les régions du thème pour placer ses **Global Components** (Header et Footer). Il est donc important de bien les déclarer.

| Région déclarée dans `.info.yml` | Utilisée par Canvas pour        |
|----------------------------------|---------------------------------|
| `header`                         | Global Component → Header       |
| `footer`                         | Global Component → Footer       |
| `content`                        | Les Canvas Pages elles-mêmes    |

::: tip
Pour les Canvas Pages, Canvas gère le contenu de la région `content` de manière autonome. Vous n'avez pas besoin de placer manuellement des blocs dans cette région.
:::

## Déclarer les régions dans `mon_theme.info.yml`

Le starterkit Mercury génère déjà des régions par défaut. Ouvrez le fichier et assurez-vous qu'elles correspondent à vos besoins :

```yaml
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

### Règles de nommage des régions

| Règle                     | Exemple correct      | Exemple incorrect |
|---------------------------|----------------------|-------------------|
| Clé en minuscules         | `header`             | `Header`          |
| Pas d'espaces dans la clé | `sidebar_first`      | `sidebar first`   |
| Label lisible (valeur)    | `'Colonne latérale'` | `sidebar_first`   |

::: info
Après toute modification du `.info.yml`, videz toujours le cache : `drush cr`
:::

## Le template `page.html.twig`

Mercury génère un template `page.html.twig` de base. Voici un exemple de structure :

```twig
<body>

  {# Région Header — gérée par le Global Component Canvas #}
  {% if page.header %}
    <header role="banner">
      {{ page.header }}
    </header>
  {% endif %}

  {# Zone principale #}
  <main>
    {% if page.breadcrumb %}
      <nav aria-label="Fil d'Ariane">{{ page.breadcrumb }}</nav>
    {% endif %}

    <div class="layout-container">
      {{ page.content }}

      {% if page.sidebar_first %}
        <aside>{{ page.sidebar_first }}</aside>
      {% endif %}
    </div>
  </main>

  {# Région Footer — gérée par le Global Component Canvas #}
  {% if page.footer %}
    <footer>
      {{ page.footer }}
    </footer>
  {% endif %}

</body>
```

::: info
La condition `{% if page.header %}` évite d'afficher une balise `<header>` vide si aucun bloc n'est assigné à la région.
:::

## Vérifier les régions dans l'administration

Après avoir déclaré vos régions et vidé le cache, vous pouvez les voir dans :

```
Administration → Structure → Blocs
```

Chaque région apparaît comme une catégorie dans laquelle vous pouvez glisser des blocs.

## Régions et Canvas Pages

Pour les **Canvas Pages**, la région `content` contient automatiquement le rendu de la page Canvas. Canvas injecte ses sections et composants dans cette région via son propre système de rendu.

```
Canvas Page
  → rendu dans la région "content"
     → affiché via {{ page.content }} dans page.html.twig
```

Les régions `header` et `footer` sont gérées par les **Global Components** de Canvas (voir Module 4).

::: warning
Si vous avez d'autres blocs placés dans la région `content` (ex : blocs Drupal standards), ils cohabiteront avec le contenu Canvas. Soyez vigilant à ne pas créer de conflits d'affichage.
:::
