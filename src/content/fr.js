// Copy en français. Règles : pas de tirets longs ni demi-cadratins, pas de verbes creux, des chiffres uniquement si l'app les a vraiment.
export default {
  lang: 'fr',
  locale: 'fr-FR',
  ogLocale: 'fr_FR',
  dir: 'ltr',
  tagline: 'Convertisseur de devises et calculatrice pour iPhone',

  ui: {
    skip: 'Aller au contenu',
    getApp: 'Obtenir l\'app gratuite',
    getAppShort: 'Obtenir l\'app',
    home: 'Accueil Divix',
    nav: { guides: 'Guides', faq: 'FAQ', support: 'Assistance' },
    sign: 'Change de devises',
    menu: 'Menu',
    langMenu: 'Langue',
    footer: {
      product: 'Divix',
      learn: 'Apprendre',
      legal: 'Mentions légales',
      links: { home: 'Accueil', guides: 'Guides', support: 'Assistance', privacy: 'Confidentialité', terms: 'Conditions' },
      appStore: 'Télécharger sur l\'App Store',
      notice:
        'Divix est une calculatrice qui affiche des taux de change interbancaires à titre informatif. Elle n\'échange pas d\'argent. Divix est publiée par Albea Systems et n\'est ni affiliée à, ni approuvée par, ni parrainée par Apple Inc., Frankfurter, CoinGecko ou une banque. Apple, iPhone et App Store sont des marques d\'Apple Inc.',
      rights: 'Albea Systems. Tous droits réservés.',
    },
    breadcrumbs: { home: 'Divix', guides: 'Guides' },
    updated: 'Mis à jour le',
    by: 'Par',
    related: 'Autres guides',
    readMore: 'Lire le guide',
    backToGuides: 'Tous les guides',
    ctaGuide: 'Vérifiez n\'importe quel prix en quelques secondes avec Divix',
  },

  seo: {
    imgAlt: 'Divix : convertisseur de devises avec calculatrice intégrée pour iPhone',
    home: {
      title: 'Divix : convertisseur de devises et calculatrice pour iPhone',
      description:
        'Convertisseur de devises gratuit pour iPhone avec calculatrice intégrée. 55 devises et 20 cryptomonnaies, favoris, taux en direct et hors ligne, graphiques jusqu\'à 5 ans.',
    },
    guides: {
      title: 'Guides de change pour voyageurs | Divix',
      description:
        'Des guides clairs sur le taux interbancaire, le paiement en monnaie locale et la conversion rapide des prix en voyage.',
    },
    privacy: { title: 'Politique de confidentialité | Divix', description: 'Ce que Divix collecte (très peu), le fonctionnement des publicités et du consentement, et comment nous contacter au sujet de vos données.' },
    terms: { title: 'Conditions d\'utilisation | Divix', description: 'Les conditions qui s\'appliquent à l\'utilisation de l\'app de conversion de devises Divix pour iPhone.' },
    support: { title: 'Assistance | Divix', description: 'Réponses sur les taux Divix, les favoris, l\'usage hors ligne, la suppression des publicités et la restauration des achats, et comment nous contacter.' },
  },

  home: {
    hero: {
      h1: 'Tous les prix, dans votre monnaie.',
      h1Lines: ['Tous les prix,', 'dans votre monnaie.'],
      sub: 'Divix est un convertisseur de devises avec une vraie calculatrice intégrée. 55 devises et 20 cryptomonnaies, gratuit sur iPhone.',
      boardTitle: 'Aujourd\'hui pour',
      boardNote: 'Taux interbancaires, variation sur 30 jours.',
      boardFallback: 'Taux enregistrés le {date}. Les taux en direct se chargent quand vous êtes en ligne.',
      phoneAlt:
        'L\'app Divix convertit 250 euros en dollars, inverse en dollars et euros, choisit Bitcoin, enregistre des favoris et ouvre le graphique d\'historique',
    },
    calc: {
      h2: 'Convertissez en calculant',
      p: 'Sous les deux cartes de devises se trouve une vraie calculatrice. Additionnez une note de restaurant, partagez-la, multipliez un prix par nuit par le nombre de nuits : le résultat dans votre monnaie se met à jour à chaque touche.',
      points: [
        { h: 'Quatre opérations', p: 'Plus, moins, fois et divisé, avec la conversion en direct.' },
        { h: 'Un geste pour inverser', p: 'Passez des dollars aux euros et inversement sans retaper le montant.' },
        { h: 'Pas de changement d\'app', p: 'La calculatrice et le taux partagent le même écran.' },
      ],
      shotAlt: 'Écran de conversion Divix : 250 euros convertis en 281,33 dollars américains, avec le clavier de la calculatrice en dessous',
      try: {
        h: 'Essayez avec les taux du jour',
        amount: 'Montant',
        from: 'De',
        to: 'Vers',
        swap: 'Inverser les devises',
        result: 'Résultat',
        source: 'Taux interbancaires de Frankfurter, {date}. Divix n\'ajoute aucune marge.',
        loading: 'Chargement des taux',
        error: 'Les taux ne sont pas disponibles pour le moment. Vérifiez votre connexion et réessayez.',
      },
    },
    markets: {
      h2: 'Favoris et marchés',
      p: 'Touchez l\'étoile d\'une devise pour la garder à portée. L\'onglet Marchés affiche un montant face à toutes les devises à la fois, avec les filtres Toutes, Favoris, Devises ou Crypto.',
      p2: 'Tapez 1 et lisez le taux. Tapez 100 et lisez le prix. La liste suit ce que vous saisissez.',
      marketsAlt: 'Onglet Marchés de Divix listant Bitcoin, l\'euro, la livre, le yen et d\'autres devises face à 1 dollar américain',
      favoritesAlt: 'Filtre Favoris de Divix montrant le dollar américain et Bitcoin marqués d\'une étoile',
    },
    crypto: {
      h2: 'Bitcoin à côté du dollar',
      p: 'Vingt cryptomonnaies partagent le sélecteur avec 55 devises classiques, dont Bitcoin, Ethereum, Solana et XRP. Convertissez des dollars en BTC comme vous convertissez des dollars en euros.',
      pickerAlt: 'Sélecteur de devises Divix avec le filtre Crypto affichant Bitcoin, Ethereum, Tether, BNB et Solana',
      btcAlt: 'Divix convertit 250 dollars américains en 0,003066 Bitcoin',
    },
    charts: {
      h2: 'Voyez d\'où vient un taux',
      p: 'Ouvrez l\'onglet Graphique pour un historique de 7 jours à 5 ans, avec le plus bas, le plus haut et la variation sur la période.',
      fresh: {
        h: 'Chaque taux indique sa fraîcheur',
        live: 'En direct : actualisé au cours des 4 dernières heures.',
        cached: 'En cache : enregistré lors d\'une actualisation précédente, vieux d\'un jour ou plus.',
        offline: 'Hors ligne : pas de connexion, vous voyez le dernier taux enregistré et son heure.',
      },
      alt: 'Graphique d\'historique sur 30 jours du dollar américain en euro dans Divix, avec le plus bas, le plus haut et la variation',
    },
    checkout: {
      h2: 'Pensée pour la file de la caisse',
      items: [
        { h: 'Fonctionne hors ligne', p: 'Les derniers taux sont enregistrés sur votre téléphone : un signal faible ne vous arrête pas.' },
        { h: 'Sans compte', p: 'Ouvrez l\'app et tapez. Ni e-mail, ni mot de passe.' },
        { h: 'Sans marge', p: 'Des taux interbancaires, le même chiffre que vous trouveriez en le cherchant en ligne.' },
        { h: 'Douze langues', p: 'Anglais, espagnol, français, italien, allemand, portugais, arabe, chinois, hindi, japonais, coréen et vietnamien.' },
      ],
    },
    pricing: {
      h2: 'Gratuite. Payez une fois pour retirer les publicités.',
      p: 'Toutes les fonctions sont gratuites. Un achat unique supprime les publicités pour de bon, sans abonnement. Vous pouvez aussi regarder une courte vidéo pour une heure sans publicité.',
    },
    faq: {
      h2: 'Les questions des voyageurs',
      items: [
        {
          q: 'Qu\'est-ce que Divix ?',
          a: 'Divix est un convertisseur de devises et une calculatrice gratuits pour iPhone. Vous saisissez un montant, choisissez deux devises et voyez aussitôt le résultat, avec une calculatrice sur le même écran.',
        },
        {
          q: 'Combien de devises Divix prend-il en charge ?',
          a: 'Divix prend en charge 55 devises classiques et 20 cryptomonnaies, dont USD, EUR, GBP, JPY, CHF, Bitcoin, Ethereum, Solana et XRP. Toutes apparaissent dans le même sélecteur, avec des filtres Devises et Crypto.',
        },
        {
          q: 'D\'où viennent les taux de change ?',
          a: 'Les taux de change proviennent de sources interbancaires publiques comme Frankfurter, avec un second fournisseur en secours. Les prix des cryptomonnaies viennent de CoinGecko. Chaque conversion indique quand le taux a été mis à jour pour la dernière fois.',
        },
        {
          q: 'Pourquoi le taux diffère-t-il de celui de ma banque ?',
          a: 'Divix affiche le taux interbancaire, le point médian entre prix d\'achat et prix de vente. Les banques, les réseaux de cartes et les bureaux de change ajoutent une marge ou des frais, donc le montant reçu est en général un peu plus bas. Utilisez Divix pour connaître le taux de référence, puis comparez-le à l\'offre.',
        },
        {
          q: 'Divix fonctionne-t-il sans internet ?',
          a: 'Oui. Les derniers taux sont enregistrés sur votre iPhone et Divix indique leur ancienneté : en direct, en cache ou hors ligne. À la reconnexion, les taux s\'actualisent.',
        },
        {
          q: 'Ai-je besoin d\'un compte ?',
          a: 'Non. Il n\'y a aucune inscription. Vos favoris et réglages restent sur votre appareil.',
        },
        {
          q: 'Divix est-il gratuit ?',
          a: 'Oui. Toutes les fonctions sont gratuites et la version gratuite affiche des publicités. Un achat intégré unique les supprime, et vous pouvez aussi regarder une vidéo pour une heure sans publicité. Il n\'y a pas d\'abonnement.',
        },
        {
          q: 'Sur quels appareils Divix fonctionne-t-il ?',
          a: 'Divix fonctionne sur iPhone avec iOS 17.6 ou version ultérieure. Il n\'existe pas encore de version Android.',
        },
      ],
    },
    guides: {
      h2: 'Guides pour dépenser à l\'étranger',
      p: 'De courtes explications claires sur le fonctionnement des taux de change et sur la façon de payer moins en voyage.',
    },
    final: {
      h2: 'Connaissez le prix avant de payer.',
      p: 'Gratuite sur l\'App Store pour iPhone.',
    },
  },

  guides: {
    ids: ['guide-mid-market', 'guide-local-currency', 'guide-travel'],
    h1: 'Guides de change pour voyageurs',
    intro: 'Trois guides courts sur le fonctionnement des taux de change, écrits pour que vous puissiez agir à un étal de marché ou à un terminal de paiement.',
  },

  guide: {
    'guide-mid-market': {
      title: 'Qu\'est-ce que le taux interbancaire ? Pourquoi votre banque diffère',
      description: 'Le taux interbancaire est le point médian entre prix d\'achat et prix de vente. Découvrez pourquoi les banques et les bureaux de change affichent moins, et comment vérifier la marge vous-même.',
      h1: 'Qu\'est-ce que le taux interbancaire ?',
      lead: 'Le taux interbancaire est le point médian entre le prix auquel les opérateurs achètent une devise et celui auquel ils la vendent. C\'est le chiffre de référence avant que quiconque ajoute une marge.',
      summary: 'Le taux de référence avant les marges, et comment mesurer la marge qu\'on vous propose.',
      sections: [
        {
          h: 'La réponse courte',
          p: [
            'Quand vous cherchez « dollars en euros » en ligne, le chiffre affiché est presque toujours un taux interbancaire. Il se situe à mi-chemin entre le prix d\'achat et le prix de vente sur le marché de gros des devises.',
            'C\'est une référence juste parce qu\'il ne contient ni frais ni marge. Ce n\'est pas non plus un prix que vous pouvez obtenir en général en tant que client.',
          ],
        },
        {
          h: 'Pourquoi vous l\'obtenez rarement',
          p: [
            'Les banques, les réseaux de cartes, les bureaux de change et les services de transfert gagnent de l\'argent en modifiant le taux, en facturant des frais, ou les deux. Un guichet qui annonce zéro commission peut quand même afficher un taux bien inférieur au taux interbancaire.',
            'L\'écart tend à être le plus grand là où les clients ont le moins d\'alternatives, comme les guichets d\'aéroport et les zones touristiques.',
          ],
        },
        {
          h: 'Comment mesurer la marge',
          p: ['Comparez le taux qu\'on vous propose au taux interbancaire du même jour. La marge est la différence, exprimée en part du taux interbancaire.'],
          list: [
            'Cherchez le taux interbancaire du jour pour la paire.',
            'Trouvez le taux qu\'on vous propose, ou divisez le montant que vous recevriez par le montant que vous donnez.',
            'Soustrayez le taux proposé du taux interbancaire, puis divisez par le taux interbancaire.',
          ],
          after: 'Exemple : si le taux interbancaire est de 1 euro = 1,10 dollar américain et qu\'un guichet propose 1,04, vous recevez environ 5,5 % de moins que la référence. Ces chiffres sont une illustration, pas une cotation en direct.',
        },
        {
          h: 'Que faire',
          list: [
            'Demandez le total que vous recevrez, pas seulement le taux, et comparez les totaux.',
            'Comparez tout frais fixe à la taille de l\'opération. Des frais fixes pèsent davantage sur un petit montant.',
            'Comparez deux ou trois options avant de vous engager, surtout pour des sommes plus importantes.',
          ],
        },
        {
          h: 'Où Divix intervient',
          p: ['Divix affiche le taux interbancaire avec une étiquette de fraîcheur, pour que vous voyiez à quelle distance de la référence se situe une offre. C\'est une calculatrice, pas un bureau de change, et elle n\'ajoute aucune marge.'],
        },
      ],
      faq: [
        { q: 'Le taux interbancaire est-il le même que le taux entre banques ?', a: 'Ils sont proches. Le taux entre banques est celui que les grandes banques utilisent entre elles. Les taux interbancaires publics sont un point médian publié qui l\'approxime.' },
        { q: 'Puis-je obtenir le taux interbancaire en tant que client ?', a: 'Rarement au chiffre exact. Certains fournisseurs s\'en approchent et le disent ouvertement. Mesurer la marge montre à quel point.' },
      ],
    },
    'guide-local-currency': {
      title: 'Payer en monnaie locale : éviter la conversion dynamique',
      description: 'Quand un terminal ou un distributeur à l\'étranger propose de vous débiter dans votre monnaie, la réponse est en général non. Voyez pourquoi et comment vérifier le prix.',
      h1: 'Payer en monnaie locale',
      lead: 'À l\'étranger, un terminal de paiement ou un distributeur peut demander si vous voulez payer dans votre monnaie ou dans la monnaie locale. Choisir la monnaie locale est en général la meilleure réponse.',
      summary: 'Pourquoi « payer dans votre monnaie » coûte souvent plus cher, et une vérification de dix secondes.',
      sections: [
        {
          h: 'Ce qu\'est la conversion dynamique',
          p: [
            'La conversion dynamique de devise, ou DCC, laisse le commerçant ou l\'exploitant du distributeur faire la conversion au moment du paiement. L\'écran affiche un total dans votre monnaie et vous demande d\'accepter.',
            'Elle semble pratique parce que vous voyez un montant familier. Cette commodité, c\'est ce que vous payez.',
          ],
        },
        {
          h: 'Pourquoi la monnaie locale est en général préférable',
          p: [
            'Avec la DCC, le taux de change est fixé par le prestataire derrière le terminal, et il comporte souvent une marge plus élevée que le taux que l\'émetteur de votre carte appliquerait. Si vous refusez, votre banque convertit le montant local avec son propre taux et d\'éventuels frais sur opération à l\'étranger.',
            'Les conditions des cartes diffèrent : lisez une fois les frais à l\'étranger de votre carte avant de partir. Ensuite, la règle est simple.',
          ],
        },
        {
          h: 'Une vérification de dix secondes',
          list: [
            'Lisez le prix en monnaie locale.',
            'Convertissez-le au taux interbancaire. Dans Divix, tapez le prix local et lisez votre monnaie.',
            'Comparez avec le total en monnaie d\'origine que propose le terminal. S\'il est nettement plus élevé, choisissez la monnaie locale.',
          ],
        },
        {
          h: 'Les bons réflexes',
          list: [
            'Choisissez la monnaie locale sur les terminaux de paiement et les distributeurs, à chaque fois.',
            'Si un caissier convertit pour vous, demandez à payer en monnaie locale.',
            'Gardez le ticket et vérifiez la monnaie qu\'il indique.',
          ],
        },
      ],
      faq: [
        { q: 'La conversion dynamique est-elle toujours plus chère ?', a: 'Pas dans tous les cas, mais souvent. La vérification de dix secondes vous indique ce qu\'il en est pour l\'opération en cours.' },
        { q: 'Cela s\'applique-t-il aux distributeurs ?', a: 'Oui. Les distributeurs à l\'étranger peuvent proposer le même choix entre monnaie d\'origine et monnaie locale. Choisir la monnaie locale est le réglage le plus sûr.' },
      ],
    },
    'guide-travel': {
      title: 'Comment convertir rapidement une devise en voyage',
      description: 'Des moyens pratiques de transformer des prix étrangers dans votre monnaie, à un étal, sur un menu ou à une caisse, avec ou sans connexion.',
      h1: 'Convertir les prix rapidement en voyage',
      lead: 'Vous n\'avez pas besoin de chiffres exacts pour décider. Il vous faut un repère fiable et une calculatrice à portée de main.',
      summary: 'Repères, favoris et taux hors ligne pour le moment de l\'achat.',
      sections: [
        {
          h: 'Avant de partir',
          list: [
            'Mettez en favori les devises que vous utiliserez pour les avoir à un geste.',
            'Ouvrez l\'app une fois avec une connexion pour que les taux soient enregistrés pour l\'usage hors ligne.',
            'Notez le taux de base de votre voyage, par exemple 1 dollar américain = 18 pesos mexicains.',
          ],
        },
        {
          h: 'Construisez un repère',
          p: ['Un repère est un taux que vous pouvez mettre à l\'échelle de tête. Si 1 dollar américain vaut environ 18 pesos, alors 100 pesos font un peu plus de 5 dollars, et 1 000 pesos un peu plus de 55.'],
          after: 'Pour les devises sans décimales, comme le yen japonais, prenez un montant rond comme repère. À 158 yens pour un dollar, 1 000 yens font environ 6,30 dollars. Ce sont des taux d\'exemple : vérifiez ceux du jour.',
        },
        {
          h: 'À l\'étal ou à la caisse',
          list: [
            'Tapez une fois le prix local et lisez le montant dans votre monnaie.',
            'Utilisez la calculatrice pour les quantités, comme quatre billets ou six nuits, afin que le total se convertisse en une étape.',
            'Inversez le sens quand vous négociez, pour énoncer votre prix en monnaie locale.',
          ],
        },
        {
          h: 'Quand le signal disparaît',
          p: ['Divix garde les derniers taux sur votre téléphone et les étiquette en direct, en cache ou hors ligne. Un taux vieux de quelques heures suffit pour la plupart des achats, et l\'étiquette vous dit quand ce n\'est pas le cas.'],
        },
      ],
      faq: [
        { q: 'Quelle précision faut-il pour faire ses achats ?', a: 'Pour les achats courants, un taux interbancaire du jour est assez précis pour décider. Votre carte ou le guichet appliquera sa propre marge en plus.' },
        { q: 'Puis-je convertir des cryptomonnaies de la même façon ?', a: 'Oui. Divix liste 20 cryptomonnaies à côté des devises classiques, donc Bitcoin en dollars fonctionne comme n\'importe quelle autre paire.' },
      ],
    },
  },

  legal: {
    updatedOn: 'Dernière mise à jour : 17 octobre 2026',
    privacy: {
      h1: 'Politique de confidentialité',
      lead: 'Divix n\'exige aucun compte et collecte très peu de données. Cette politique explique ce qu\'il advient des données quand vous utilisez l\'app iOS.',
      sections: [
        { h: 'Qui nous sommes', p: ['Divix est publiée par Albea Systems. Contact : albeasystems@gmail.com.'] },
        {
          h: 'Ce que nous ne collectons pas',
          p: ['Divix n\'a ni inscription ni compte utilisateur. Nous ne demandons ni ne conservons votre nom, votre adresse e-mail, votre numéro de téléphone, vos contacts, vos photos ou votre position.'],
        },
        {
          h: 'Ce qui reste sur votre appareil',
          p: ['Votre devise de base, vos favoris, l\'ordre de votre liste et les taux de change en cache sont stockés uniquement sur votre appareil. Supprimer l\'app les efface. Nous n\'en avons aucune copie.'],
        },
        {
          h: 'Taux de change',
          p: ['Pour afficher les taux, l\'app demande des données publiques à des fournisseurs de taux de change (par exemple Frankfurter et CoinGecko). Ces requêtes contiennent les devises interrogées et des données techniques comme votre adresse IP, que toute requête internet transporte. Elles ne contiennent aucune information qui vous identifie auprès de nous.'],
        },
        {
          h: 'Publicité et consentement',
          p: [
            'La version gratuite affiche des publicités. Elles sont diffusées via un service de médiation publicitaire et ses réseaux partenaires, qui peuvent inclure Google AdMob, Meta Audience Network et Unity Ads. Ces partenaires peuvent traiter des identifiants d\'appareil et des données d\'usage pour choisir et mesurer les publicités.',
            'Avant toute publicité personnalisée, l\'app demande votre consentement via la fenêtre App Tracking Transparency d\'Apple et, lorsque c\'est exigé, un formulaire de consentement pour l\'EEE, le Royaume-Uni et la Suisse. Si vous refusez, les publicités ne sont pas personnalisées là où la loi et le réseau le permettent. Vous pouvez modifier vos choix dans Réglages iOS, Confidentialité et sécurité, Suivi.',
            'Un achat intégré unique supprime les publicités. Regarder une vidéo avec récompense désactive les publicités pendant une heure.',
          ],
        },
        {
          h: 'Achats intégrés',
          p: ['Les achats sont gérés par Apple via l\'App Store. Nous ne voyons ni ne conservons jamais vos informations de paiement.'],
        },
        {
          h: 'Diagnostics',
          p: ['Si l\'app plante, Apple peut nous transmettre des rapports de plantage anonymes via App Store Connect, si vous l\'avez autorisé dans iOS. Ils ne contiennent aucune information financière.'],
        },
        { h: 'Enfants', p: ['Divix ne s\'adresse pas aux enfants de moins de 16 ans et nous ne collectons pas sciemment leurs données.'] },
        {
          h: 'Vos droits',
          p: ['Comme nous ne détenons aucune donnée personnelle vous concernant, il n\'y a en général rien à consulter ni à supprimer. Si vous pensez le contraire, écrivez-nous et nous répondrons dans un délai raisonnable. Lorsque la législation sur la protection des données s\'applique à vous, vous pouvez aussi contacter votre autorité locale.'],
        },
        { h: 'Modifications', p: ['Nous pouvons mettre à jour cette politique. La date en haut indique la dernière révision. Les changements importants seront reflétés dans une mise à jour de l\'app.'] },
        { h: 'Contact', p: ['albeasystems@gmail.com'] },
      ],
    },
    terms: {
      h1: 'Conditions d\'utilisation',
      lead: 'Ces conditions s\'appliquent lorsque vous téléchargez et utilisez l\'app Divix pour iPhone.',
      sections: [
        { h: 'Acceptation', p: ['En utilisant Divix, vous acceptez ces conditions. Si vous ne les acceptez pas, n\'utilisez pas l\'app.'] },
        {
          h: 'Ce qu\'est Divix',
          p: ['Divix est un convertisseur de devises et une calculatrice. Elle affiche des taux de change interbancaires à titre informatif. Elle n\'échange, ne détient, n\'envoie ni ne transfère d\'argent, et elle ne fournit aucun conseil financier, fiscal ou juridique.'],
        },
        {
          h: 'Licence et usage autorisé',
          p: ['Nous vous accordons une licence personnelle, non transférable et non exclusive pour utiliser l\'app à des fins privées, selon les conditions standard d\'Apple pour les applications sous licence. Vous ne pouvez pas copier, modifier, désassembler, vendre ou sous-licencier l\'app, ni retirer ses mentions.'],
        },
        {
          h: 'Taux et exactitude',
          p: ['Les taux proviennent de fournisseurs tiers et peuvent être retardés, arrondis ou indisponibles. Ils peuvent différer du taux proposé par votre banque, votre carte ou votre bureau de change, qui ajoutent des marges et des frais. Confirmez le montant final auprès de votre prestataire avant d\'agir. Vous utilisez ces données à vos propres risques.'],
        },
        {
          h: 'Publicités et achats',
          p: ['La version gratuite affiche des publicités. Un achat intégré facultatif les supprime. Les achats, les remboursements et les règles liées aux abonnements sont régis par les conditions d\'Apple.'],
        },
        {
          h: 'Propriété intellectuelle',
          p: ['L\'app, son design, ses textes, ses icônes et son code appartiennent à Albea Systems ou à ses concédants. Les noms et marques de tiers appartiennent à leurs propriétaires. Divix n\'est affiliée ni à Apple Inc. ni à aucune banque ou fournisseur de taux.'],
        },
        {
          h: 'Responsabilité',
          p: ['Dans la mesure permise par la loi, nous ne sommes pas responsables des pertes indirectes ou consécutives, ni des décisions financières prises sur la base des taux affichés dans l\'app.'],
        },
        { h: 'Modifications et disponibilité', p: ['Nous pouvons mettre à jour, suspendre ou arrêter l\'app, et nous pouvons mettre à jour ces conditions. Continuer à utiliser l\'app après une mise à jour vaut acceptation des nouvelles conditions.'] },
        { h: 'Droit applicable', p: ['Ces conditions sont régies par le droit espagnol, sans préjudice des droits impératifs dont vous bénéficiez en tant que consommateur là où vous vivez.'] },
        { h: 'Contact', p: ['albeasystems@gmail.com'] },
      ],
    },
    support: {
      h1: 'Assistance',
      lead: 'Les réponses aux questions que nous recevons le plus. Si la vôtre n\'y est pas, écrivez-nous et nous répondrons sous 48 heures.',
      items: [
        { q: 'Pourquoi le taux diffère-t-il de celui de ma banque ?', a: 'Divix affiche le taux interbancaire. Les banques et les bureaux de change ajoutent une marge ou des frais, donc ce que vous recevez est en général légèrement inférieur. Notre guide sur le taux interbancaire montre comment mesurer l\'écart.' },
        { q: 'Comment ajouter une devise à mes favoris ?', a: 'Touchez l\'étoile à côté d\'une devise dans le convertisseur ou dans la liste Marchés. Utilisez le filtre Favoris dans Marchés pour les voir ensemble.' },
        { q: 'Comment changer de devise ?', a: 'Touchez le code de la devise sur l\'une des cartes, choisissez-en une autre dans la liste et utilisez les filtres ou la recherche pour la trouver. Touchez le bouton d\'inversion pour renverser la paire.' },
        { q: 'Divix fonctionne-t-il hors ligne ?', a: 'Oui. Les derniers taux sont enregistrés sur votre téléphone. Une étiquette indique si vous voyez des données en direct, en cache ou hors ligne.' },
        { q: 'Comment supprimer les publicités ?', a: 'Ouvrez Réglages dans l\'app et choisissez Supprimer les publicités. C\'est un achat unique sans abonnement. Vous pouvez aussi regarder une vidéo depuis l\'écran d\'accueil pour une heure sans publicité.' },
        { q: 'J\'ai changé de téléphone. Comment restaurer mon achat ?', a: 'Ouvrez Réglages dans Divix sur le nouveau téléphone et touchez Restaurer les achats. Connectez-vous avec le même identifiant Apple qu\'avant.' },
        { q: 'Existe-t-il une version Android ?', a: 'Pas encore. Divix est disponible pour iPhone.' },
        { q: 'Un taux semble faux ou périmé.', a: 'Écrivez-nous avec la paire de devises, la valeur que vous voyez et celle que vous attendiez. Vérifiez d\'abord l\'étiquette de fraîcheur : les taux en cache ou hors ligne affichent la dernière valeur enregistrée.' },
      ],
      contactH: 'Besoin d\'aide ?',
      contactP: 'Envoyez-nous la paire de devises, votre version d\'iOS et ce que vous vous attendiez à voir.',
      contactCta: 'Écrire à l\'assistance',
    },
  },
}
