# Ajouter la double authentification

Double authentification avec google authenticator

j'ai trouvé un tuto : à tester
https://www.droptica.com/blog/what-two-factor-authentication-and-how-use-it-drupal/

Installer le module TFA (ce qui va aussi installer les modules Key et Encrypt)
```shell
composer require 'drupal/tfa:^1.12'
drush en tfa
```

Installer le module d'encryptage real_aes
```shell
composer require drupal/real_aes
drush en real_aes
```

Créer une clef pour l'encryptage.
Aller dans /admin/config/system/keys/add et cliquer sur "+ Add key"

Key name : TFA key
type settings
    Key type : chiffrement
    key size: 256
Profider settings
    Key provider : Environnement
    Environnement variable : DRUPAL_REAL_AES_KEY
    Base64-encoded : true

Il faut ajouter dans .env la variable DRUPAL_REAL_AES_KEY

Pour générer une clef : openssl rand -base64 32

Il faut ajouter un profile d'encryption
Aller dans /admin/config/system/encryption/profiles, un message d'erreur apparait et propose de cliquer sur "Add an encryption profile."

Libellé : TFA encryption
Encryption Method : Authenticated AES (Real AES)
Encryption Key : TFA key

Maintenant on peut configurer le module TFA
/admin/config/people/tfa

Enable TFA : true
Roles required to set up TFA : utilisateur authentifié
Allowed Validation plugins: TFA Time-based one-time password (TOTP)
Default Validation plugin : TFA Time-based one-time password (TOTP)
Encryption profile : TFA encryption

Il faut aller dans /admin/people/permissions#module-tfa
et accorder le droit "Set up TFA for account" pour les utilisateurs authentifiés.