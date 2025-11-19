Ajouter un patch à Drupal

Ajouter le module
composer require cweagans/composer-patches

Ce qui va ajouter ce code dans composer.json

"config": {
    "allow-plugins": {
        "composer/installers": true,
        "cweagans/composer-patches": true,
        "dealerdirect/phpcodesniffer-composer-installer": true,
        "drupal/core-composer-scaffold": true,
        "drupal/core-recipe-unpack": true,
        "php-http/discovery": true,
        "php-tuf/composer-integration": true,
        "phpstan/extension-installer": true
    },
    "sort-packages": true
},

Ensuite dans la partie "extra" du composer vous pouvez rajouter le patch

"patches": {
    "drupal/bootstrap5": {
        "[3391813] Passing percentage units to the global abs() function is deprecated (https://www.drupal.org/project/bootstrap5/issues/3391813)": "https://www.drupal.org/files/issues/2024-04-24/passing_percentage_units_to_the_global_abs_function_is_deprecated-3391813-015.diff"
    }
}

garder le format :
 [numero de l'issue] courte description du problème (url de l'issue) : url du patch

Si plusieurs patch pour le même module : 

"patches": {
"drupal/mimemail": {
"Fix mimemail error on admin form": "https://www.drupal.org/files/issues/mime-mail-error-message-on-admin-form-with-webprorfiler-2719981-3.patch",
"patch 2": "https://www.drupal.org/files/issues/mime-mail-error-message-on-admin-form-with-webprorfiler-2719981-3qdqsdqsd.patch"
}
}

Si patch pour plusieurs modules : 

"patches": {
"drupal/mimemail": {
"Fix mimemail error on admin form": "https://www.drupal.org/files/issues/mime-mail-error-message-on-admin-form-with-webprorfiler-2719981-3.patch",
"patch 2": "https://www.drupal.org/files/issues/mime-mail-error-message-on-admin-form-with-webprorfiler-2719981-3qdqsdqsd.patch"
},
"drupal/monautremodule": {
"ma description du patch": "https://www.drupal.org/files/issues/mimhfhmin-form-with-webprorfiler-2719981-3.patch",
}
}

Si vous avez votre propre patch

"patches": {
"drupal/monmodule": {
"Patch custom stocké localement": "patchs/patch-custom-stocke-localement.patch"
}
}

enfin faire un composer install