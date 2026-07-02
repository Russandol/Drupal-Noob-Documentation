# Étape 4.3 — Assembler le Footer global

## Objectif

Créer le Footer qui apparaîtra sur toutes les Canvas Pages : colonnes de liens, copyright, réseaux sociaux.

## Créer le composant Footer SDC

Avant d'assembler dans Canvas, créez le composant SDC `footer` :

```
mon_theme/components/footer/
├── footer.component.yml
├── footer.twig
└── footer.css
```

### `footer.component.yml`

```yaml
name: Footer
description: "Pied de page global avec colonnes de liens et copyright."
status: experimental

props:
  type: object
  properties:
    copyright:
      type: string
      title: Texte de copyright
      description: "Ex: © 2025 Mon Site. Tous droits réservés."
    logo_url:
      type: string
      title: Logo du footer (optionnel)
    logo_alt:
      type: string
      title: Alt du logo
    background_color:
      type: string
      title: Couleur de fond
      default: '#1a1a2e'
    text_color:
      type: string
      title: Couleur du texte
      default: '#e0e0e0'

slots:
  column_1:
    title: Colonne 1
  column_2:
    title: Colonne 2
  column_3:
    title: Colonne 3
  social:
    title: Réseaux sociaux
```

### `footer.twig`

```twig
<footer {{ attributes.addClass('footer') }}
        style="background-color: {{ background_color | default('#1a1a2e') }}; color: {{ text_color | default('#e0e0e0') }};">

  <div class="footer__container">

    <div class="footer__columns">

      {% if slots.column_1 %}
        <div class="footer__column">{{ slots.column_1 }}</div>
      {% endif %}

      {% if slots.column_2 %}
        <div class="footer__column">{{ slots.column_2 }}</div>
      {% endif %}

      {% if slots.column_3 %}
        <div class="footer__column">{{ slots.column_3 }}</div>
      {% endif %}

    </div>

    <div class="footer__bottom">
      {% if logo_url %}
        <img class="footer__logo" src="{{ logo_url }}" alt="{{ logo_alt | default('') }}">
      {% endif %}

      <p class="footer__copyright">{{ copyright }}</p>

      {% if slots.social %}
        <div class="footer__social">{{ slots.social }}</div>
      {% endif %}
    </div>

  </div>
</footer>
```

### `footer.css`

```css
.footer {
  padding: 4rem 0 2rem;
}

.footer__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Colonnes */
.footer__columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
}

.footer__column {
  /* Styles pour les menus Drupal injectés */
}

/* Styles des menus Drupal dans le footer */
.footer__column ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer__column li + li {
  margin-top: 0.5rem;
}

.footer__column a {
  color: inherit;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.2s;
  font-size: 0.9rem;
}

.footer__column a:hover {
  opacity: 1;
  text-decoration: underline;
}

/* Barre inférieure */
.footer__bottom {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.footer__logo {
  height: 32px;
  width: auto;
  filter: brightness(0) invert(1);
  opacity: 0.7;
}

.footer__copyright {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.7;
  flex: 1;
}

.footer__social {
  display: flex;
  gap: 0.75rem;
}

/* Responsive */
@media (max-width: 768px) {
  .footer__columns {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

## Assembler le Footer dans Canvas

### Accéder au Footer global

```
Canvas → Global Components → Footer
```

### Contenu recommandé à placer dans les slots

| Slot         | Contenu suggéré                                              |
|--------------|--------------------------------------------------------------|
| `column_1`   | Bloc menu "Footer — À propos" (Qui sommes-nous, Contact…)   |
| `column_2`   | Bloc menu "Footer — Services" (liste de services)            |
| `column_3`   | Bloc menu "Footer — Légal" (CGU, Mentions légales…)          |
| `social`     | Bloc HTML personnalisé avec icônes réseaux sociaux           |

### Créer les menus Footer dans Drupal

```
Administration → Structure → Menus → Ajouter un menu
```

Créez 3 menus distincts (ex: "Footer À propos", "Footer Services", "Footer Légal") et ajoutez-y vos liens.

### Configurer les props

Dans le panneau de droite de Canvas :

| Prop              | Valeur exemple                            |
|-------------------|-------------------------------------------|
| Copyright         | `© 2025 Mon Site. Tous droits réservés.`  |
| Couleur de fond   | `#1a1a2e`                                 |
| Couleur du texte  | `#e0e0e0`                                 |

## Résultat attendu

```
┌─────────────────────────────────────────────────────┐
│   À propos          Services          Légal          │
│   Qui sommes-nous   Service 1         CGU            │
│   Notre équipe      Service 2         Mentions       │
│   Contact           Service 3         Cookies        │
│ ─────────────────────────────────────────────────── │
│  [logo]  © 2025 Mon Site              [in] [tw] [fb] │
└─────────────────────────────────────────────────────┘
```

## Sauvegarder

Cliquez sur **Sauvegarder**. Le Footer est maintenant appliqué à toutes vos Canvas Pages.

```bash
drush cr
```
