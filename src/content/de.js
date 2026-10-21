// Texte auf Deutsch. Regeln: keine Gedankenstriche, keine Füllverben, Zahlen nur, wenn die App sie wirklich hat.
export default {
  lang: 'de',
  locale: 'de-DE',
  ogLocale: 'de_DE',
  dir: 'ltr',
  tagline: 'Währungsrechner und Taschenrechner für das iPhone',

  ui: {
    skip: 'Zum Inhalt springen',
    getApp: 'Kostenlose App laden',
    getAppShort: 'App laden',
    home: 'Divix Startseite',
    nav: { guides: 'Ratgeber', faq: 'FAQ', support: 'Support' },
    sign: 'Geldwechsel',
    menu: 'Menü',
    langMenu: 'Sprache',
    footer: {
      product: 'Divix',
      learn: 'Lernen',
      legal: 'Rechtliches',
      links: { home: 'Startseite', guides: 'Ratgeber', support: 'Support', privacy: 'Datenschutz', terms: 'Nutzungsbedingungen' },
      appStore: 'Laden im App Store',
      notice:
        'Divix ist ein Rechner, der Mittelkurse zu Informationszwecken anzeigt. Divix tauscht kein Geld. Divix wird von Albea Systems veröffentlicht und steht in keiner Verbindung zu Apple Inc., Frankfurter, CoinGecko oder einer Bank und wird von diesen weder unterstützt noch gesponsert. Apple, iPhone und App Store sind Marken von Apple Inc.',
      rights: 'Albea Systems. Alle Rechte vorbehalten.',
    },
    breadcrumbs: { home: 'Divix', guides: 'Ratgeber' },
    updated: 'Aktualisiert am',
    by: 'Von',
    related: 'Weitere Ratgeber',
    readMore: 'Ratgeber lesen',
    backToGuides: 'Alle Ratgeber',
    ctaGuide: 'Prüfe jeden Preis in Sekunden mit Divix',
  },

  seo: {
    imgAlt: 'Divix: Währungsrechner mit integriertem Taschenrechner für das iPhone',
    home: {
      title: 'Divix: Währungsrechner und Taschenrechner für das iPhone',
      description:
        'Kostenloser Währungsrechner für das iPhone mit integriertem Taschenrechner. 55 Währungen und 20 Kryptowährungen, Favoriten, Live- und Offline-Kurse, Diagramme bis zu 5 Jahren.',
    },
    guides: {
      title: 'Währungsratgeber für Reisende | Divix',
      description:
        'Verständliche Ratgeber zum Mittelkurs, zum Bezahlen in Landeswährung und zum schnellen Umrechnen von Preisen auf Reisen.',
    },
    privacy: { title: 'Datenschutzerklärung | Divix', description: 'Was Divix erfasst (sehr wenig), wie Werbung und Einwilligung funktionieren und wie du uns zu deinen Daten erreichst.' },
    terms: { title: 'Nutzungsbedingungen | Divix', description: 'Die Bedingungen, die für die Nutzung der Währungsrechner-App Divix für das iPhone gelten.' },
    support: { title: 'Support | Divix', description: 'Antworten zu Divix-Kursen, Favoriten, Offline-Nutzung, Werbung entfernen und Käufe wiederherstellen sowie zum Kontakt.' },
  },

  home: {
    hero: {
      h1: 'Jeder Preis in deiner Währung.',
      h1Lines: ['Jeder Preis', 'in deiner Währung.'],
      sub: 'Divix ist ein Währungsrechner mit einem echten Taschenrechner. 55 Währungen und 20 Kryptowährungen, kostenlos auf dem iPhone.',
      boardTitle: 'Heute für',
      boardNote: 'Mittelkurse, Veränderung über 30 Tage.',
      boardFallback: 'Gespeicherte Kurse vom {date}. Live-Kurse laden, sobald du online bist.',
      phoneAlt:
        'Die Divix-App rechnet 250 Euro in Dollar um, tauscht auf Dollar und Euro, wählt Bitcoin, speichert Favoriten und öffnet das Verlaufsdiagramm',
    },
    calc: {
      h2: 'Umrechnen, während du rechnest',
      p: 'Unter den beiden Währungskarten sitzt ein echter Taschenrechner. Addiere eine Restaurantrechnung, teile sie, multipliziere einen Nachtpreis mit der Zahl der Nächte, und das Ergebnis in deiner Währung aktualisiert sich bei jeder Taste.',
      points: [
        { h: 'Vier Rechenarten', p: 'Plus, minus, mal und geteilt, mit laufender Umrechnung.' },
        { h: 'Ein Tipp zum Tauschen', p: 'Wechsle von Dollar zu Euro und zurück, ohne den Betrag neu einzugeben.' },
        { h: 'Kein App-Wechsel', p: 'Taschenrechner und Kurs teilen sich einen Bildschirm.' },
      ],
      shotAlt: 'Divix-Umrechnungsbildschirm: 250 Euro umgerechnet in 281,33 US-Dollar, darunter die Taschenrechner-Tastatur',
      try: {
        h: 'Probiere es mit den heutigen Kursen',
        amount: 'Betrag',
        from: 'Von',
        to: 'Nach',
        swap: 'Währungen tauschen',
        result: 'Ergebnis',
        source: 'Mittelkurse von Frankfurter, {date}. Divix schlägt nichts auf.',
        loading: 'Kurse werden geladen',
        error: 'Die Kurse sind gerade nicht verfügbar. Prüfe deine Verbindung und versuche es erneut.',
      },
    },
    markets: {
      h2: 'Favoriten und Märkte',
      p: 'Tippe auf den Stern einer Währung, um sie griffbereit zu halten. Der Tab Märkte zeigt einen Betrag gegenüber allen Währungen auf einmal und filtert nach Alle, Favoriten, Fiat oder Krypto.',
      p2: 'Gib 1 ein und lies den Kurs. Gib 100 ein und lies den Preis. Die Liste folgt deiner Eingabe.',
      marketsAlt: 'Divix-Tab Märkte mit Bitcoin, Euro, Pfund, Yen und weiteren Währungen gegenüber 1 US-Dollar',
      favoritesAlt: 'Divix-Filter Favoriten mit dem US-Dollar und Bitcoin, die mit einem Stern markiert sind',
    },
    crypto: {
      h2: 'Bitcoin neben dem Dollar',
      p: 'Zwanzig Kryptowährungen teilen sich die Auswahl mit 55 Fiat-Währungen, darunter Bitcoin, Ethereum, Solana und XRP. Rechne Dollar in BTC um, wie du Dollar in Euro umrechnest.',
      pickerAlt: 'Divix-Währungsauswahl mit dem Filter Krypto, der Bitcoin, Ethereum, Tether, BNB und Solana zeigt',
      btcAlt: 'Divix rechnet 250 US-Dollar in 0,003066 Bitcoin um',
    },
    charts: {
      h2: 'Sieh, woher ein Kurs kommt',
      p: 'Öffne den Tab Diagramm für einen Verlauf von 7 Tagen bis 5 Jahren, mit Tief, Hoch und Veränderung im Zeitraum.',
      fresh: {
        h: 'Jeder Kurs sagt, wie frisch er ist',
        live: 'Live: in den letzten 4 Stunden aktualisiert.',
        cached: 'Zwischengespeichert: bei einer früheren Aktualisierung gesichert, einen Tag alt oder älter.',
        offline: 'Offline: keine Verbindung, du siehst den zuletzt gespeicherten Kurs und seine Uhrzeit.',
      },
      alt: 'Divix-Diagramm über 30 Tage für US-Dollar zu Euro mit Tief, Hoch und Veränderung',
    },
    checkout: {
      h2: 'Gemacht für die Warteschlange an der Kasse',
      items: [
        { h: 'Funktioniert offline', p: 'Die letzten Kurse sind auf deinem Handy gespeichert, ein schwaches Signal hält dich nicht auf.' },
        { h: 'Kein Konto', p: 'App öffnen und eintippen. Keine E-Mail, kein Passwort.' },
        { h: 'Kein Aufschlag', p: 'Mittelkurse, dieselbe Zahl, die du bei einer Online-Suche findest.' },
        { h: 'Zwölf Sprachen', p: 'Englisch, Spanisch, Französisch, Italienisch, Deutsch, Portugiesisch, Arabisch, Chinesisch, Hindi, Japanisch, Koreanisch und Vietnamesisch.' },
      ],
    },
    pricing: {
      h2: 'Kostenlos. Einmal zahlen, um Werbung zu entfernen.',
      p: 'Alle Funktionen sind kostenlos. Ein einmaliger Kauf entfernt die Werbung dauerhaft, ohne Abo. Du kannst auch ein kurzes Video ansehen und eine Stunde lang werbefrei nutzen.',
    },
    faq: {
      h2: 'Fragen, die Reisende stellen',
      items: [
        {
          q: 'Was ist Divix?',
          a: 'Divix ist ein kostenloser Währungsrechner und Taschenrechner für das iPhone. Du gibst einen Betrag ein, wählst zwei Währungen und siehst sofort das Ergebnis, mit einem Taschenrechner auf demselben Bildschirm.',
        },
        {
          q: 'Wie viele Währungen unterstützt Divix?',
          a: 'Divix unterstützt 55 Fiat-Währungen und 20 Kryptowährungen, darunter USD, EUR, GBP, JPY, CHF, Bitcoin, Ethereum, Solana und XRP. Alle erscheinen in derselben Auswahl, mit den Filtern Fiat und Krypto.',
        },
        {
          q: 'Woher stammen die Wechselkurse?',
          a: 'Die Währungskurse stammen aus öffentlichen Mittelkurs-Quellen wie Frankfurter, mit einem zweiten Anbieter als Reserve. Die Preise der Kryptowährungen kommen von CoinGecko. Jede Umrechnung zeigt, wann der Kurs zuletzt aktualisiert wurde.',
        },
        {
          q: 'Warum weicht der Kurs von dem meiner Bank ab?',
          a: 'Divix zeigt den Mittelkurs, den Mittelpunkt zwischen An- und Verkaufspreis. Banken, Kartenanbieter und Wechselstuben schlagen eine Marge oder Gebühr auf, daher ist der Betrag, den du erhältst, meist etwas niedriger. Nutze Divix, um den Referenzkurs zu kennen, und vergleiche ihn dann mit dem Angebot.',
        },
        {
          q: 'Funktioniert Divix ohne Internet?',
          a: 'Ja. Die letzten Kurse sind auf deinem iPhone gespeichert und Divix zeigt ihr Alter: live, zwischengespeichert oder offline. Sobald du wieder verbunden bist, werden die Kurse aktualisiert.',
        },
        {
          q: 'Brauche ich ein Konto?',
          a: 'Nein. Es gibt keine Registrierung. Deine Favoriten und Einstellungen bleiben auf deinem Gerät.',
        },
        {
          q: 'Ist Divix kostenlos?',
          a: 'Ja. Alle Funktionen sind kostenlos und die kostenlose Version zeigt Werbung. Ein einmaliger In-App-Kauf entfernt sie, und du kannst auch ein Video ansehen und eine Stunde lang werbefrei nutzen. Es gibt kein Abo.',
        },
        {
          q: 'Auf welchen Geräten läuft Divix?',
          a: 'Divix läuft auf dem iPhone mit iOS 17.6 oder neuer. Eine Android-Version gibt es noch nicht.',
        },
      ],
    },
    guides: {
      h2: 'Ratgeber fürs Bezahlen im Ausland',
      p: 'Kurze, verständliche Erklärungen, wie Wechselkurse funktionieren und wie du auf Reisen weniger zahlst.',
    },
    final: {
      h2: 'Kenne den Preis, bevor du zahlst.',
      p: 'Kostenlos im App Store für das iPhone.',
    },
  },

  guides: {
    ids: ['guide-mid-market', 'guide-local-currency', 'guide-travel'],
    h1: 'Währungsratgeber für Reisende',
    intro: 'Drei kurze Ratgeber dazu, wie Wechselkurse funktionieren, geschrieben, damit du sie am Marktstand oder am Kartenterminal anwenden kannst.',
  },

  guide: {
    'guide-mid-market': {
      title: 'Was ist der Mittelkurs? Warum deine Bank abweicht',
      description: 'Der Mittelkurs ist der Mittelpunkt zwischen An- und Verkaufspreis. Erfahre, warum Banken und Wechselstuben weniger bieten und wie du den Aufschlag selbst prüfst.',
      h1: 'Was ist der Mittelkurs?',
      lead: 'Der Mittelkurs ist der Mittelpunkt zwischen dem Preis, zu dem Händler eine Währung kaufen, und dem Preis, zu dem sie sie verkaufen. Er ist die Referenzzahl, bevor jemand eine Marge aufschlägt.',
      summary: 'Der Referenzkurs vor den Margen und wie du den Aufschlag misst, der dir angeboten wird.',
      sections: [
        {
          h: 'Die kurze Antwort',
          p: [
            'Wenn du online nach "Dollar in Euro" suchst, ist die angezeigte Zahl fast immer ein Mittelkurs. Er liegt auf halbem Weg zwischen Kaufpreis und Verkaufspreis am Großhandelsmarkt für Währungen.',
            'Er ist eine faire Referenz, weil er keine Gebühr und keine Marge enthält. Er ist aber auch kein Preis, den du als Kunde in der Regel bekommst.',
          ],
        },
        {
          h: 'Warum du ihn selten bekommst',
          p: [
            'Banken, Kartenanbieter, Wechselstuben und Überweisungsdienste verdienen, indem sie den Kurs verändern, eine Gebühr erheben oder beides. Ein Schalter, der keine Provision bewirbt, kann trotzdem einen Kurs weit unter dem Mittelkurs anbieten.',
            'Die Lücke ist meist dort am größten, wo Kunden die wenigsten Alternativen haben, etwa an Wechselschaltern am Flughafen und in Touristengebieten.',
          ],
        },
        {
          h: 'So misst du den Aufschlag',
          p: ['Vergleiche den angebotenen Kurs mit dem Mittelkurs desselben Tages. Der Aufschlag ist die Differenz als Anteil am Mittelkurs.'],
          list: [
            'Suche den heutigen Mittelkurs für das Währungspaar.',
            'Finde den angebotenen Kurs oder teile den Betrag, den du erhalten würdest, durch den Betrag, den du gibst.',
            'Ziehe den angebotenen Kurs vom Mittelkurs ab und teile dann durch den Mittelkurs.',
          ],
          after: 'Beispiel: Liegt der Mittelkurs bei 1 Euro = 1,10 US-Dollar und ein Schalter bietet 1,04, erhältst du etwa 5,5 Prozent weniger als die Referenz. Die Zahlen hier sind ein Beispiel, kein Live-Kurs.',
        },
        {
          h: 'Was du tun kannst',
          list: [
            'Frage nach dem Gesamtbetrag, den du erhältst, nicht nur nach dem Kurs, und vergleiche die Gesamtbeträge.',
            'Prüfe jede feste Gebühr im Verhältnis zur Größe der Transaktion. Eine Pauschale wiegt bei kleinen Beträgen schwerer.',
            'Vergleiche zwei oder drei Angebote, bevor du dich entscheidest, besonders bei größeren Summen.',
          ],
        },
        {
          h: 'Wo Divix hilft',
          p: ['Divix zeigt den Mittelkurs mit einem Frische-Etikett, damit du siehst, wie weit ein Angebot von der Referenz entfernt ist. Es ist ein Rechner, keine Wechselstube, und schlägt selbst nichts auf.'],
        },
      ],
      faq: [
        { q: 'Ist der Mittelkurs dasselbe wie der Interbankenkurs?', a: 'Sie liegen nah beieinander. Der Interbankenkurs ist der, den große Banken untereinander verwenden. Öffentliche Mittelkurse sind ein veröffentlichter Mittelpunkt, der ihn annähert.' },
        { q: 'Kann ich als Kunde den Mittelkurs bekommen?', a: 'Selten genau zu dieser Zahl. Manche Anbieter kommen nahe heran und sagen das offen. Den Aufschlag zu messen zeigt, wie nah.' },
      ],
    },
    'guide-local-currency': {
      title: 'In Landeswährung zahlen: dynamische Umrechnung vermeiden',
      description: 'Wenn ein Terminal oder Geldautomat im Ausland anbietet, dich in deiner Heimatwährung zu belasten, lautet die Antwort meist nein. So erkennst du warum und wie du den Preis prüfst.',
      h1: 'In Landeswährung zahlen',
      lead: 'Im Ausland fragt dich ein Kartenterminal oder ein Geldautomat vielleicht, ob du in deiner Heimatwährung oder in der Landeswährung zahlen willst. Die Landeswährung ist meist die bessere Wahl.',
      summary: 'Warum "in der eigenen Währung zahlen" oft mehr kostet, und ein Zehn-Sekunden-Check.',
      sections: [
        {
          h: 'Was dynamische Währungsumrechnung ist',
          p: [
            'Bei der dynamischen Währungsumrechnung, kurz DCC, rechnet der Händler oder der Betreiber des Geldautomaten im Moment der Zahlung um. Der Bildschirm zeigt einen Gesamtbetrag in deiner Heimatwährung und bittet um Zustimmung.',
            'Das wirkt bequem, weil du einen vertrauten Betrag siehst. Die Bequemlichkeit ist das, was du bezahlst.',
          ],
        },
        {
          h: 'Warum die Landeswährung meist besser ist',
          p: [
            'Bei DCC legt der Anbieter hinter dem Terminal den Wechselkurs fest, und er enthält oft eine größere Marge als der Kurs, den der Herausgeber deiner Karte anwenden würde. Lehnst du ab, rechnet deine Bank den Betrag in Landeswährung mit ihrem eigenen Kurs und eventuellen Auslandseinsatzgebühren um.',
            'Die Kartenbedingungen unterscheiden sich, lies deshalb vor der Reise einmal die Auslandseinsatzgebühr deiner Karte. Dann ist die Regel einfach.',
          ],
        },
        {
          h: 'Ein Zehn-Sekunden-Check',
          list: [
            'Lies den Preis in Landeswährung ab.',
            'Rechne ihn zum Mittelkurs um. Gib in Divix den Preis in Landeswährung ein und lies deine Währung ab.',
            'Vergleiche ihn mit dem Betrag in Heimatwährung, den das Terminal vorschlägt. Ist er deutlich höher, wähle die Landeswährung.',
          ],
        },
        {
          h: 'Gewohnheiten, die helfen',
          list: [
            'Wähle an Kartenterminals und Geldautomaten jedes Mal die Landeswährung.',
            'Wenn ein Kassierer für dich umrechnet, bitte darum, in Landeswährung zu zahlen.',
            'Bewahre den Beleg auf und prüfe, welche Währung er zeigt.',
          ],
        },
      ],
      faq: [
        { q: 'Ist dynamische Währungsumrechnung immer teurer?', a: 'Nicht in jedem Fall, aber oft. Der Zehn-Sekunden-Check sagt dir, wie es bei der Zahlung vor dir aussieht.' },
        { q: 'Gilt das auch für Geldautomaten?', a: 'Ja. Geldautomaten im Ausland können dieselbe Wahl zwischen Heimat- und Landeswährung zeigen. Die Landeswährung ist die sicherere Voreinstellung.' },
      ],
    },
    'guide-travel': {
      title: 'So rechnest du Währungen auf Reisen schnell um',
      description: 'Praktische Wege, ausländische Preise an Marktständen, auf Speisekarten oder an der Kasse in dein Geld umzurechnen, mit und ohne Verbindung.',
      h1: 'Preise auf Reisen schnell umrechnen',
      lead: 'Zum Entscheiden brauchst du keine exakten Zahlen. Du brauchst einen verlässlichen Anker und einen Taschenrechner in Reichweite.',
      summary: 'Anker, Favoriten und Offline-Kurse für den Moment des Kaufs.',
      sections: [
        {
          h: 'Vor der Abreise',
          list: [
            'Markiere die Währungen, die du brauchst, mit einem Stern, damit sie einen Tipp entfernt sind.',
            'Öffne die App einmal mit Verbindung, damit die Kurse für die Offline-Nutzung gespeichert sind.',
            'Notiere den Basiskurs für deine Reise, zum Beispiel 1 US-Dollar = 18 mexikanische Pesos.',
          ],
        },
        {
          h: 'Baue dir einen Anker',
          p: ['Ein Anker ist ein Kurs, den du im Kopf skalieren kannst. Wenn 1 US-Dollar etwa 18 Pesos entspricht, sind 100 Pesos etwas über 5 Dollar und 1.000 Pesos etwas über 55.'],
          after: 'Bei Währungen ohne Dezimalstellen, etwa dem japanischen Yen, nimm einen runden Betrag als Anker. Bei 158 Yen pro Dollar sind 1.000 Yen rund 6,30 Dollar. Das sind Beispielkurse, prüfe also die heutigen.',
        },
        {
          h: 'Am Stand oder an der Kasse',
          list: [
            'Gib den Preis in Landeswährung einmal ein und lies den Betrag in deinem Geld ab.',
            'Nutze den Taschenrechner für Mengen, etwa vier Tickets oder sechs Nächte, damit der Gesamtbetrag in einem Schritt umgerechnet wird.',
            'Tausche die Richtung, wenn du verhandelst, um deinen Preis in der Landeswährung zu nennen.',
          ],
        },
        {
          h: 'Wenn das Signal wegbricht',
          p: ['Divix behält die letzten Kurse auf deinem Handy und kennzeichnet sie als live, zwischengespeichert oder offline. Ein Kurs, der ein paar Stunden alt ist, reicht für die meisten Einkäufe, und das Etikett sagt dir, wann nicht.'],
        },
      ],
      faq: [
        { q: 'Wie genau muss der Kurs beim Einkaufen sein?', a: 'Für alltägliche Einkäufe ist ein Mittelkurs vom selben Tag genau genug zum Entscheiden. Deine Karte oder der Schalter schlägt zusätzlich ihre eigene Marge auf.' },
        { q: 'Kann ich Kryptowährungen genauso umrechnen?', a: 'Ja. Divix listet 20 Kryptowährungen neben den Fiat-Währungen, daher funktioniert Bitcoin zu Dollar wie jedes andere Paar.' },
      ],
    },
  },

  legal: {
    updatedOn: 'Zuletzt aktualisiert: 17. Oktober 2026',
    privacy: {
      h1: 'Datenschutzerklärung',
      lead: 'Divix braucht kein Konto und erfasst sehr wenig. Diese Erklärung beschreibt, was mit Daten geschieht, wenn du die iOS-App nutzt.',
      sections: [
        { h: 'Wer wir sind', p: ['Divix wird von Albea Systems veröffentlicht. Kontakt: albeasystems@gmail.com.'] },
        {
          h: 'Was wir nicht erfassen',
          p: ['Divix hat keine Registrierung und kein Benutzerkonto. Wir fragen weder nach deinem Namen, deiner E-Mail-Adresse, Telefonnummer, deinen Kontakten, Fotos oder deinem Standort noch speichern wir sie.'],
        },
        {
          h: 'Was auf deinem Gerät bleibt',
          p: ['Deine Basiswährung, Favoriten, Listenreihenfolge und zwischengespeicherten Wechselkurse werden nur auf deinem Gerät gespeichert. Das Löschen der App entfernt sie. Wir haben keine Kopie.'],
        },
        {
          h: 'Wechselkurse',
          p: ['Um Kurse anzuzeigen, ruft die App öffentliche Daten von Wechselkursanbietern ab (zum Beispiel Frankfurter und CoinGecko). Diese Anfragen enthalten die abgefragten Währungen und technische Daten wie deine IP-Adresse, die jede Internetanfrage mitführt. Sie enthalten keine Informationen, die dich uns gegenüber identifizieren.'],
        },
        {
          h: 'Werbung und Einwilligung',
          p: [
            'Die kostenlose Version zeigt Werbung. Die Werbung wird über einen Werbe-Mediationsdienst und dessen Werbenetzwerk-Partner ausgeliefert, zu denen Google AdMob, Meta Audience Network und Unity Ads gehören können. Diese Partner können Gerätekennungen und Nutzungsdaten verarbeiten, um Werbung auszuwählen und zu messen.',
            'Vor personalisierter Werbung fragt die App über die App-Tracking-Transparenz-Abfrage von Apple und, wo erforderlich, über ein Einwilligungsformular für den EWR, das Vereinigte Königreich und die Schweiz nach deiner Einwilligung. Lehnst du ab, wird Werbung dort nicht personalisiert, wo Gesetz und Netzwerk es erlauben. Du kannst deine Auswahl in den iOS-Einstellungen unter Datenschutz & Sicherheit, Tracking ändern.',
            'Ein einmaliger In-App-Kauf entfernt die Werbung. Das Ansehen eines Prämienvideos schaltet die Werbung für eine Stunde ab.',
          ],
        },
        {
          h: 'In-App-Käufe',
          p: ['Käufe werden von Apple über den App Store abgewickelt. Wir sehen oder speichern nie deine Zahlungsdaten.'],
        },
        {
          h: 'Diagnose',
          p: ['Wenn die App abstürzt, kann Apple uns über App Store Connect anonyme Absturzberichte weitergeben, sofern du das in iOS erlaubt hast. Sie enthalten keine Finanzdaten.'],
        },
        { h: 'Kinder', p: ['Divix richtet sich nicht an Kinder unter 16 Jahren und wir erfassen wissentlich keine Daten von ihnen.'] },
        {
          h: 'Deine Rechte',
          p: ['Da wir keine personenbezogenen Daten über dich speichern, gibt es in der Regel nichts einzusehen oder zu löschen. Wenn du glaubst, dass wir doch welche haben, schreibe uns und wir antworten in angemessener Zeit. Wo Datenschutzrecht für dich gilt, kannst du dich auch an deine örtliche Aufsichtsbehörde wenden.'],
        },
        { h: 'Änderungen', p: ['Wir können diese Erklärung aktualisieren. Das Datum oben zeigt die jüngste Fassung. Wesentliche Änderungen spiegeln sich in einem App-Update wider.'] },
        { h: 'Kontakt', p: ['albeasystems@gmail.com'] },
      ],
    },
    terms: {
      h1: 'Nutzungsbedingungen',
      lead: 'Diese Bedingungen gelten, wenn du die Divix-App für das iPhone lädst und nutzt.',
      sections: [
        { h: 'Zustimmung', p: ['Mit der Nutzung von Divix stimmst du diesen Bedingungen zu. Wenn du nicht zustimmst, nutze die App nicht.'] },
        {
          h: 'Was Divix ist',
          p: ['Divix ist ein Währungsrechner und Taschenrechner. Er zeigt Mittelkurse zu Informationszwecken an. Er tauscht, verwahrt, sendet oder überweist kein Geld und bietet keine Finanz-, Steuer- oder Rechtsberatung.'],
        },
        {
          h: 'Lizenz und erlaubte Nutzung',
          p: ['Wir gewähren dir eine persönliche, nicht übertragbare, nicht ausschließliche Lizenz zur Nutzung der App für private Zwecke, gemäß den Standardbedingungen von Apple für lizenzierte Apps. Du darfst die App nicht kopieren, verändern, zurückentwickeln, verkaufen oder unterlizenzieren und ihre Hinweise nicht entfernen.'],
        },
        {
          h: 'Kurse und Genauigkeit',
          p: ['Die Kurse stammen von Drittanbietern und können verzögert, gerundet oder nicht verfügbar sein. Sie können vom Kurs abweichen, den deine Bank, Karte oder Wechselstube anbietet, die Margen und Gebühren aufschlagen. Bestätige den Endbetrag bei deinem Anbieter, bevor du handelst. Du nutzt die Daten auf eigenes Risiko.'],
        },
        {
          h: 'Werbung und Käufe',
          p: ['Die kostenlose Version zeigt Werbung. Ein optionaler In-App-Kauf entfernt sie. Käufe, Rückerstattungen und abobezogene Regeln unterliegen den Bedingungen von Apple.'],
        },
        {
          h: 'Geistiges Eigentum',
          p: ['Die App, ihr Design, ihre Texte, Symbole und ihr Code gehören Albea Systems oder deren Lizenzgebern. Namen und Marken Dritter gehören ihren Inhabern. Divix steht in keiner Verbindung zu Apple Inc. oder einer Bank oder einem Kursanbieter.'],
        },
        {
          h: 'Haftung',
          p: ['Soweit gesetzlich zulässig, haften wir nicht für indirekte oder Folgeschäden und nicht für Finanzentscheidungen, die auf Grundlage der in der App gezeigten Kurse getroffen werden.'],
        },
        { h: 'Änderungen und Verfügbarkeit', p: ['Wir können die App aktualisieren, aussetzen oder einstellen und wir können diese Bedingungen aktualisieren. Wer die App nach einer Aktualisierung weiter nutzt, akzeptiert die neuen Bedingungen.'] },
        { h: 'Anwendbares Recht', p: ['Diese Bedingungen unterliegen spanischem Recht, ohne dass zwingende Verbraucherrechte berührt werden, die du an deinem Wohnort hast.'] },
        { h: 'Kontakt', p: ['albeasystems@gmail.com'] },
      ],
    },
    support: {
      h1: 'Support',
      lead: 'Antworten auf die Fragen, die wir am häufigsten erhalten. Wenn deine nicht dabei ist, schreibe uns, wir antworten innerhalb von 48 Stunden.',
      items: [
        { q: 'Warum weicht der Kurs von dem meiner Bank ab?', a: 'Divix zeigt den Mittelkurs. Banken und Wechselstuben schlagen eine Marge oder Gebühr auf, daher ist das, was du erhältst, meist etwas niedriger. Unser Ratgeber zum Mittelkurs zeigt, wie du den Unterschied misst.' },
        { q: 'Wie füge ich eine Währung zu meinen Favoriten hinzu?', a: 'Tippe im Umrechner oder in der Liste Märkte auf den Stern neben einer Währung. Nutze den Filter Favoriten in Märkte, um sie gemeinsam zu sehen.' },
        { q: 'Wie ändere ich eine Währung?', a: 'Tippe auf den Währungscode einer der Karten, wähle in der Liste eine andere und finde sie mit Filtern oder der Suche. Tippe auf die Tauschtaste, um das Paar umzukehren.' },
        { q: 'Funktioniert Divix offline?', a: 'Ja. Die letzten Kurse sind auf deinem Handy gespeichert. Ein Etikett zeigt, ob du Live-, zwischengespeicherte oder Offline-Daten siehst.' },
        { q: 'Wie entferne ich die Werbung?', a: 'Öffne die Einstellungen in der App und wähle Werbung entfernen. Es ist ein einmaliger Kauf ohne Abo. Du kannst auch auf dem Startbildschirm ein Video ansehen und eine Stunde lang werbefrei nutzen.' },
        { q: 'Ich habe das Handy gewechselt. Wie stelle ich meinen Kauf wieder her?', a: 'Öffne die Einstellungen in Divix auf dem neuen Handy und tippe auf Käufe wiederherstellen. Melde dich mit derselben Apple-ID an wie zuvor.' },
        { q: 'Gibt es eine Android-Version?', a: 'Noch nicht. Divix ist für das iPhone verfügbar.' },
        { q: 'Ein Kurs sieht falsch oder veraltet aus.', a: 'Schreibe uns mit dem Währungspaar, dem Wert, den du siehst, und dem Wert, den du erwartet hast. Prüfe zuerst das Frische-Etikett: Zwischengespeicherte oder Offline-Kurse zeigen den zuletzt gespeicherten Wert.' },
      ],
      contactH: 'Brauchst du noch Hilfe?',
      contactP: 'Sende uns das Währungspaar, deine iOS-Version und was du erwartet hast.',
      contactCta: 'Support per E-Mail',
    },
  },
}
