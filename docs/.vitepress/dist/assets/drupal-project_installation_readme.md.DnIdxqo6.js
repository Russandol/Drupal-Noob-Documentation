import{_ as i,c as n,o as a,ae as e}from"./chunks/framework.Cd-3tpCq.js";const o=JSON.parse('{"title":"📄 README","description":"","frontmatter":{},"headers":[],"relativePath":"drupal-project/installation/readme.md","filePath":"drupal-project/installation/readme.md"}'),l={name:"drupal-project/installation/readme.md"};function p(t,s,E,h,r,k){return a(),n("div",null,s[0]||(s[0]=[e(`<h1 id="📄-readme" tabindex="-1">📄 README <a class="header-anchor" href="#📄-readme" aria-label="Permalink to &quot;📄 README&quot;">​</a></h1><p>Le fichier <em>README.md</em> est l&#39;élément central de la communication technique d&#39;un projet. C&#39;est la porte d&#39;entrée principale qui doit permettre à n&#39;importe qui de comprendre le projet et de l&#39;utiliser.</p><p>L&#39;objectif est de répondre à une question toute simple : si un nouveau développeur intègre le projet, est-il capable de l&#39;installer et de l&#39;utiliser en moins de 15 minutes ?</p><p>Et bien entendu, un fichier <em>README.md</em> doit évoluer en même temps que l&#39;application. Il est donc important que ce fichier soit mis à jour régulièrement.</p><p>Un fichier <em>README.md</em> complet doit contenir :</p><ul><li>Les <strong>prérequis techniques</strong></li><li>La <strong>procédure d&#39;installation</strong></li><li>La <strong>configuration</strong> du projet</li><li>La <strong>structure</strong> du projet</li><li>Et les sections complémentaires comme la <strong>résolution des problèmes</strong> courants, les <strong>workflows</strong>, les <strong>tests</strong>, etc..</li></ul><p>Malheureusement, ce fichier est bien trop souvent négligé, peu mis à jour, voir parfois inexistant.</p><p>C&#39;est la raison pour laquelle je vous propose de le créer dès maintenant dans notre projet.</p><p>A la racine du projet, créez un fichier <em>README.md</em></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">touch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> README.md</span></span></code></pre></div><p>Et ajoutez le contenu suivant :</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    # Cinécritique</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Cinécritique est un site de notation et d&#39;avis de films.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ## 📝 Prérequis</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ### Environnement système</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - DDEV 1.25+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - Docker 27.4+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - Docker Compose 5.1+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ### Stack technique</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - PHP 8.4</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - mariaDB 11.8</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - Drupal 11</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ## ✅ Installation</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Les lignes de commande suivantes doivent être effectuées dans l&#39;interpréteur de commande Linux.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    🛠️ Vérifier si DDEV est installé : </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \`\`\`shell</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ddev --version</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \`\`\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    📁 Cloner le projet Git :</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \`\`\`shell</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    git clone [url-du-projet]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    cd [nom-du-projet]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \`\`\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    🐳 Démarrer l&#39;environnement DDEV :</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \`\`\`shell</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ddev start</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \`\`\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    🔨 Installer Drupal et ses dépendances</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \`\`\`shell</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ddev composer install</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \`\`\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    📋 Copier le fichier .env.exemple et le renommer en .env :</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \`\`\`shell</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    cp .env.example .env</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \`\`\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ⚙️ Générer un hash_salt avec la commande suivante et le copier dans le fichier \`.env\` :</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \`\`\`shell</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ddev drush eval &quot;var_dump(Drupal\\Component\\Utility\\Crypt::randomBytesBase64(55))&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \`\`\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    📝 Créer les fichiers &#39;settings.local.php&#39; et &#39;local.services.yml&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \`\`\`shell</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    cp web/sites/example.settings.local.php web/sites/default/settings.local.php</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    cp web/sites/default/default.services.yml web/sites/default/local.services.yml</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \`\`\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    🔨 Installer le site à partir des configurations</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \`\`\`shell</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ddev drush si --existing-config</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    📁 Créer le dossier utilisé par PHPUnit pour enregistrer les captures HTML générées lors des </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tests fonctionnels : </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \`\`\`shell</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    mkdir -p web/sites/simpletest/browser_output</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \`\`\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ## 🔧 Configuration</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ### Fichiers de configuration</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    * \`.env\` : Variables d&#39;environnement.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    * \`web/sites/default/settings.php\` : Configurations par défaut.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    * \`web/sites/default/settings/*.php\` : Fichiers de configurations custom.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    * \`web/sites/default/settings.ddev.php\` : Configurations DDEV.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    * \`web/sites/default/settings.local.php\` : Configurations locales.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ## 📁 Structure du projet</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \`\`\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      ├── .ddev/               # 🐳 Configuration DDEV</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      ├── config/              # ⚙️ Fichiers de configurations Drupal</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      ├── recipes/             # 📦 Recipes Drupal</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      ├── web/                 # 🌐 Racine web Drupal standard</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      │ ├── modules/           # Contient les modules contrib et custom</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      │ ├── sites/             # Contient les fichiers settings de notre site</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      │ └── themes/            # Contient les thèmes contrib et custom</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      ├── .env</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      ├── .env.example</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      ├── .gitignore</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      ├── composer.json</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      ├── composer.lock</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      ├── load.environment.php # Importe les variables d&#39;environnement dans Drupal</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      ├── phpcs.xml            # Fichier de configuration de CodeSniffer</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      ├── phpstan.neon         # Fichier de configuration de PHPStan</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      └── phpunit.xml          # Fichier de confugration de PHPUnit</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    \`\`\`</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">Versions Docker</p><p>J&#39;ai indiqué les versions minimales requises pour <strong>DDEV</strong>, <strong>Docker</strong> et <strong>Docker Compose</strong> que j&#39;ai actuellement. Vous pouvez les adapter à votre configuration.</p></div><p>Bien entendu, ce fichier sera mis à jour au fur et à mesure de la progression du projet.</p><div class="info custom-block"><p class="custom-block-title">Un dernier fichier pour la route !</p><p>Depuis le début de la formation, nous avons vu pas mal de commandes.</p><p>Il est temps de faire le point avec <a href="/drupal-project/installation/commands.html">le fichier COMMANDS.md</a>.</p></div>`,15)]))}const d=i(l,[["render",p]]);export{o as __pageData,d as default};
