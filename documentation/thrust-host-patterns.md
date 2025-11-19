trust_host_patterns dans Drupal
trust_host_patterns est un paramètre de sécurité important dans Drupal qui protège votre site contre les attaques par Host Header Injection.
Qu'est-ce que c'est ?
C'est un tableau de patterns (expressions régulières) défini dans le fichier settings.php qui spécifie les noms de domaine autorisés pour accéder à votre site Drupal.
Pourquoi est-ce important ?
Sans cette configuration, un attaquant pourrait manipuler l'en-tête HTTP Host pour :
Générer des liens malveillants dans les emails
Empoisonner le cache
Effectuer des redirections non autorisées

Dans le fichier settings.php, décommenter la ligne suivante :
$settings['trust_host_patterns'] = [];

et ajouter le nom de domaine de votre future site.
$settings['trusted_host_patterns'] = [
'^mon-super-site\.com$',
];

Je vous conseille de rajouter aussi dans settings.local.php :
$settings['trusted_host_patterns'] = [
'^localhost$',
'127\.0\.0\.1',
'mon-super-site\.test',
];