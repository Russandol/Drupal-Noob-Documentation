export default {
  text: 'Un projet de A à Z',
  collapsed: true,
  items: [
    { text: 'Présentation du projet', link: '/drupal-project/' },
    { text: 'Création du projet', link: '/drupal-project/create-project' },
    {
      text: '📥 Installation de Drupal',
      collapsed: true,
      items: [
        { text: 'C\'est quoi DDEV ?', link: '/drupal-project/installation/ddev' },
        { text: 'Installer Drupal', link: '/drupal-project/installation/drupal' },
        { text: 'Initialisation de Drupal', link: '/drupal-project/installation/init' },
        { text: 'Architecture de Drupal', link: '/drupal-project/installation/architecture' },
        { text: 'Le fichier .gitignore', link: '/drupal-project/installation/gitignore' },
        { text: 'Notre premier module : Drush', link: '/drupal-project/installation/drush' },
        { text: 'Les fichiers settings', link: '/drupal-project/installation/settings_files' },
        { text: 'Les variables d\'environnement', link: '/drupal-project/installation/environment_variable' },
        { text: 'La configuration du site', link: '/drupal-project/installation/site_config' },
        { text: 'Ajouter PHPMyAdmin', link: '/drupal-project/installation/phpmyadmin' },
        { text: 'Le fichier README', link: '/drupal-project/installation/readme' },
        { text: 'Le fichier COMMANDS', link: '/drupal-project/installation/commands' },
        { text: 'Notre premier commit', link: '/drupal-project/installation/git_commit' }
      ]
    },
  ]
}