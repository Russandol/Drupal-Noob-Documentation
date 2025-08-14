import sidebar from "./sidebar";

export default {
  title: 'Drupal Noob Documentation',
  description: 'Construire un projet Drupal réutilisable à partir de zéro.',
  srcDir: './book',
  themeConfig: {
    nav: [
      { text: 'Accueil', link: '/' },
    ],
    sidebar: sidebar,
    outline: {
      label: 'Sur cette page',
      level: 'deep'
    },
    docFooter: {
      prev: 'Page précédente',
      next: 'Page suivante'
    }
  }
}