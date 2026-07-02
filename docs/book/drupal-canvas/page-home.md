# Étape 5.1 — Construire la page d'accueil

## Objectif

Assembler la **page d'accueil** du site en combinant les composants créés dans les modules précédents. Cette page est typiquement la première canvas page que vous construisez, et la plus représentative du potentiel de Canvas.

## Structure cible

```
PAGE D'ACCUEIL
│
├── Section 1 — Hero (pleine largeur)
│     Titre + sous-titre + image de fond + bouton CTA
│
├── Section 2 — Services (3 colonnes)
│     Grid avec 3 Cards (icône + titre + description)
│
├── Section 3 — À propos (2 colonnes)
│     Image à gauche + texte à droite
│
└── Section 4 — CTA (bande d'appel à l'action)
      Texte centré + bouton
```

## Créer la Canvas Page d'accueil

### Étape 1 — Créer la page

```
Administration → Contenu → Pages → Ajouter une page
```

Renseignez :
- **Titre** : `Accueil`
- **URL** : `/` (ou configurez dans `Administration → Configuration → Alias d'URL`)

Cliquez sur **Modifier dans Canvas** pour ouvrir l'éditeur.

### Étape 2 — Section Hero

1. Cliquez sur **+** pour ajouter une section
2. Choisissez **Pleine largeur** (pas de container)
3. Glissez le composant **Hero** dans la section
4. Configurez dans le panneau de droite :

| Prop              | Valeur                                         |
|-------------------|------------------------------------------------|
| Titre principal   | `Bienvenue sur Mon Site`                       |
| Sous-titre        | `Nous créons des expériences web exceptionnelles` |
| Texte du bouton   | `Découvrir nos services`                       |
| URL du bouton     | `/services`                                    |
| Image de fond     | `/sites/default/files/hero-bg.jpg`             |
| Opacité overlay   | `50`                                           |

### Étape 3 — Section Services

1. Ajoutez une nouvelle **section** sous le Hero
2. Glissez le composant **Grid** dans la section
3. Configurez le Grid :
   - **Titre de section** : `Nos Services`
   - **Sous-titre** : `Ce que nous faisons pour vous`
   - **Nombre de colonnes** : `3`
   - **Espacement** : `large`
   - **Centrer le contenu** : `Oui`
4. Dans le slot **Éléments de la grille**, ajoutez 3 composants **Card** :

**Card 1 :**
| Prop       | Valeur                           |
|------------|----------------------------------|
| Icône      | `🎨`                             |
| Titre      | `Design créatif`                 |
| Texte      | `Des interfaces modernes et intuitives adaptées à votre marque.` |
| Texte lien | `En savoir plus`                 |
| URL lien   | `/services/design`               |

**Card 2 :**
| Prop       | Valeur                           |
|------------|----------------------------------|
| Icône      | `⚡`                             |
| Titre      | `Performance`                    |
| Texte      | `Des sites rapides, optimisés et prêts pour le SEO.` |
| Texte lien | `En savoir plus`                 |
| URL lien   | `/services/performance`          |

**Card 3 :**
| Prop       | Valeur                           |
|------------|----------------------------------|
| Icône      | `🔒`                             |
| Titre      | `Sécurité`                       |
| Texte      | `Votre site protégé contre les menaces modernes.` |
| Texte lien | `En savoir plus`                 |
| URL lien   | `/services/securite`             |

### Étape 4 — Section À propos

Pour une section 2 colonnes (image + texte), créez un composant SDC dédié ou utilisez directement un composant **Grid** (2 colonnes) :

1. Ajoutez une nouvelle section
2. Placez un **Grid** (2 colonnes, espacement large)
3. Colonne gauche → composant **Image** (ou bloc image)
4. Colonne droite → composant **Texte riche** (titre + paragraphes + bouton)

::: tip Composant Image
Si vous ne disposez pas encore d'un composant Image SDC, vous pouvez utiliser un **bloc HTML personnalisé** dans Canvas pour insérer une image via une balise `<img>`.
:::

### Étape 5 — Section CTA

Créez un composant SDC simple `cta-banner` ou utilisez le composant **Hero** avec une hauteur réduite :

| Prop              | Valeur                     |
|-------------------|----------------------------|
| Titre principal   | `Prêt à démarrer ?`        |
| Sous-titre        | `Contactez-nous aujourd'hui` |
| Texte du bouton   | `Nous contacter`           |
| URL du bouton     | `/contact`                 |
| Image de fond     | (laisser vide)             |

## Sauvegarder et publier

1. Cliquez sur **Sauvegarder** pour enregistrer le brouillon
2. Cliquez sur **Publier** pour rendre la page visible

## Résultat final

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│        BIENVENUE SUR MON SITE                       │
│    Expériences web exceptionnelles                  │
│    [ Découvrir nos services ]                       │
│                                                     │
├─────────────────────────────────────────────────────┤
│                  NOS SERVICES                       │
│   Ce que nous faisons pour vous                     │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ 🎨       │  │ ⚡        │  │ 🔒       │          │
│  │ Design   │  │Perf.     │  │Sécurité  │          │
│  └──────────┘  └──────────┘  └──────────┘          │
│                                                     │
├──────────────────────┬──────────────────────────────┤
│                      │  À PROPOS DE NOUS            │
│   [IMAGE]            │  Texte de présentation…      │
│                      │  [ En savoir plus ]          │
├─────────────────────────────────────────────────────┤
│             PRÊT À DÉMARRER ?                       │
│         [ Nous contacter ]                          │
└─────────────────────────────────────────────────────┘
```
