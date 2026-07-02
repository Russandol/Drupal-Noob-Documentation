export default {
  text: 'Drupal Canvas',
  collapsed: true,
  items: [
    { text: 'Introduction', link: '/drupal-canvas/' },
    {
      text: '📚 Module 1 — Comprendre Canvas',
      collapsed: true,
      items: [
        { text: 'Canvas Page vs nœud classique', link: '/drupal-canvas/canvas-vs-node' },
        { text: 'L\'interface visuelle de Canvas', link: '/drupal-canvas/interface' },
        { text: 'Les types de composants Canvas', link: '/drupal-canvas/component-types' },
      ]
    },
    {
      text: '📚 Module 2 — Choisir et préparer son thème',
      collapsed: true,
      items: [
        { text: 'Choisir son thème', link: '/drupal-canvas/choose-theme' },
        {
          text: '🔵 Parcours A — Mercury (Tailwind)',
          collapsed: true,
          items: [
            { text: 'Créer son thème avec Mercury', link: '/drupal-canvas/mercury-theme-structure' },
            { text: 'Configurer les régions', link: '/drupal-canvas/mercury-theme-regions' },
            { text: 'Outils CSS et problème connu', link: '/drupal-canvas/mercury-theme-css' },
          ]
        },
        {
          text: '🟠 Parcours B — Bootstrap Forge',
          collapsed: true,
          items: [
            { text: 'Créer son thème avec Bootstrap Forge', link: '/drupal-canvas/bootstrap-forge-structure' },
            { text: 'Configurer les régions', link: '/drupal-canvas/bootstrap-forge-regions' },
            { text: 'CSS avec Bootstrap et Canvas Bootstrap', link: '/drupal-canvas/bootstrap-forge-css' },
          ]
        },
      ]
    },
    {
      text: '📚 Module 3 — Créer les composants SDC',
      collapsed: true,
      items: [
        { text: 'Anatomie d\'un composant SDC', link: '/drupal-canvas/sdc-anatomy' },
        { text: 'Créer un composant Hero', link: '/drupal-canvas/sdc-hero' },
        { text: 'Créer un composant Card', link: '/drupal-canvas/sdc-card' },
        { text: 'Créer un composant Grid', link: '/drupal-canvas/sdc-grid' },
      ]
    },
    {
      text: '📚 Module 4 — Header & Footer globaux',
      collapsed: true,
      items: [
        { text: 'Créer le composant Navigation', link: '/drupal-canvas/nav-component' },
        { text: 'Assembler le Header global', link: '/drupal-canvas/global-header' },
        { text: 'Assembler le Footer global', link: '/drupal-canvas/global-footer' },
      ]
    },
    {
      text: '📚 Module 5 — Construire les pages',
      collapsed: true,
      items: [
        { text: 'Page d\'accueil', link: '/drupal-canvas/page-home' },
        { text: 'Gabarit de page intérieure', link: '/drupal-canvas/page-interior' },
        { text: 'Page de contact', link: '/drupal-canvas/page-contact' },
      ]
    },
    {
      text: '📚 Module 6 — Pattern Components',
      collapsed: true,
      items: [
        { text: 'Créer un Pattern depuis l\'UI Canvas', link: '/drupal-canvas/patterns-create' },
        { text: 'Utiliser les Patterns sur plusieurs pages', link: '/drupal-canvas/patterns-use' },
      ]
    },
    {
      text: '📚 Module 7 — Relier Canvas aux contenus Drupal',
      collapsed: true,
      items: [
        { text: 'Content Templates dans Canvas', link: '/drupal-canvas/content-templates' },
        { text: 'Intégrer des Views (listes de contenus)', link: '/drupal-canvas/views-integration' },
      ]
    },
    {
      text: '📚 Module 8 — Finalisation & bonnes pratiques',
      collapsed: true,
      items: [
        { text: 'Responsive design', link: '/drupal-canvas/responsive' },
        { text: 'Performance', link: '/drupal-canvas/performance' },
        { text: 'Accessibilité', link: '/drupal-canvas/accessibility' },
      ]
    },
  ]
}
