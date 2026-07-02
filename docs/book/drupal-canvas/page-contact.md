# Étape 5.3 — Page de contact

## Objectif

Créer une **page de contact** avec un formulaire fonctionnel, les informations de contact et une carte. Nous utiliserons le module **Webform** de Drupal pour le formulaire.

## Prérequis : installer Webform

```bash
composer require drupal/webform
drush en webform webform_ui
drush cr
```

## Créer le formulaire de contact dans Drupal

### Étape 1 — Créer le Webform

```
Administration → Structure → Webforms → Ajouter un Webform
```

- **Titre** : `Formulaire de contact`
- **Machine name** : `contact`

### Étape 2 — Ajouter les champs

Depuis l'onglet **Construire**, ajoutez :

| Champ         | Type               | Obligatoire |
|---------------|--------------------|-------------|
| `name`        | Texte              | Oui         |
| `email`       | Email              | Oui         |
| `subject`     | Texte              | Non         |
| `message`     | Textarea           | Oui         |
| `submit`      | Bouton "Envoyer"   | —           |

### Étape 3 — Configurer les emails

Dans l'onglet **Emails / Handlers** :
- Ajoutez un handler **Email** pour recevoir les soumissions
- Configurez l'adresse de destination

## Créer un composant Contact Info (optionnel)

Pour afficher les informations de contact à côté du formulaire :

```
mon_theme/components/contact-info/
├── contact-info.component.yml
├── contact-info.twig
└── contact-info.css
```

### `contact-info.component.yml`

```yaml
name: Contact Info
description: "Bloc d'informations de contact : adresse, téléphone, email."
status: experimental

props:
  type: object
  properties:
    title:
      type: string
      title: Titre
      default: 'Contactez-nous'
    address:
      type: string
      title: Adresse
    phone:
      type: string
      title: Téléphone
    email:
      type: string
      title: Email
    hours:
      type: string
      title: Horaires
```

### `contact-info.twig`

```twig
<div {{ attributes.addClass('contact-info') }}>
  <h2 class="contact-info__title">{{ title }}</h2>

  <ul class="contact-info__list">
    {% if address %}
      <li class="contact-info__item">
        <span class="contact-info__icon" aria-hidden="true">📍</span>
        <span>{{ address }}</span>
      </li>
    {% endif %}
    {% if phone %}
      <li class="contact-info__item">
        <span class="contact-info__icon" aria-hidden="true">📞</span>
        <a href="tel:{{ phone | replace({' ': ''}) }}">{{ phone }}</a>
      </li>
    {% endif %}
    {% if email %}
      <li class="contact-info__item">
        <span class="contact-info__icon" aria-hidden="true">✉️</span>
        <a href="mailto:{{ email }}">{{ email }}</a>
      </li>
    {% endif %}
    {% if hours %}
      <li class="contact-info__item">
        <span class="contact-info__icon" aria-hidden="true">🕐</span>
        <span>{{ hours }}</span>
      </li>
    {% endif %}
  </ul>
</div>
```

### `contact-info.css`

```css
.contact-info {
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.contact-info__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 1.5rem;
}

.contact-info__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-info__item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  font-size: 0.95rem;
  color: #374151;
  line-height: 1.5;
}

.contact-info__icon {
  flex-shrink: 0;
  font-size: 1.1rem;
}

.contact-info__item a {
  color: #0053a5;
  text-decoration: none;
}

.contact-info__item a:hover {
  text-decoration: underline;
}
```

## Assembler la page de contact dans Canvas

### Créer la page

```
Administration → Contenu → Pages → Ajouter une page
```
Titre : `Contact`

### Structure de la page

**Section 1 — Page Header**

Composant **Page Header** :
- Titre : `Contactez-nous`
- Sous-titre : `Nous répondons sous 24h`
+ Slot Breadcrumb → Bloc Breadcrumb

**Section 2 — Formulaire + Infos**

Composant **Grid** (2 colonnes) :

*Colonne gauche — Le formulaire :*
1. Dans le panneau gauche de Canvas, allez dans l'onglet **Blocs**
2. Recherchez le bloc **Webform** associé à votre formulaire "contact"
3. Glissez-le dans la colonne gauche

*Colonne droite — Les infos :*
- Composant **Contact Info** :
  - Adresse : `12 rue de la Paix, 75001 Paris`
  - Téléphone : `01 23 45 67 89`
  - Email : `contact@monsite.fr`
  - Horaires : `Lun–Ven : 9h–18h`

## Résultat attendu

```
┌─────────────────────────────────────────────────────┐
│  Accueil > Contact                                  │
│  CONTACTEZ-NOUS                                     │
│  Nous répondons sous 24h                            │
├─────────────────────────┬───────────────────────────┤
│                         │  📍 12 rue de la Paix…   │
│  Nom : [__________]     │  📞 01 23 45 67 89       │
│  Email : [__________]   │  ✉️  contact@monsite.fr   │
│  Sujet : [__________]   │  🕐 Lun-Ven : 9h-18h     │
│  Message :              │                           │
│  [________________]     │                           │
│  [________________]     │                           │
│                         │                           │
│  [ Envoyer ]            │                           │
└─────────────────────────┴───────────────────────────┘
```

::: tip Confirmation de soumission
Dans la configuration du Webform (onglet **Paramètres → Confirmation**), personnalisez le message affiché après soumission. Vous pouvez aussi rediriger vers une page de remerciement.
:::
