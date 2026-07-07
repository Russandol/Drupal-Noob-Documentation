export default {
  text: 'Modules',
  collapsed: true,
  items: [
    { text: 'C\'est quoi un module ?', link: '/modules/' },
    {
      text: 'Les modules contrib les plus utilisés',
      collapsed: true,
      items: [
        { text: 'Drush', link: '/modules/contrib/drush' },
        { text: 'Redis', link: '/modules/contrib/redis' },
      ]
    },
  ]
}