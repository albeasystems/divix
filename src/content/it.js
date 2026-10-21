// Testi in italiano. Regole: niente trattini lunghi o medi, niente verbi riempitivi, cifre solo se l'app le ha davvero.
export default {
  lang: 'it',
  locale: 'it-IT',
  ogLocale: 'it_IT',
  dir: 'ltr',
  tagline: 'Convertitore di valute e calcolatrice per iPhone',

  ui: {
    skip: 'Vai al contenuto',
    getApp: 'Scarica l\'app gratuita',
    getAppShort: 'Scarica l\'app',
    home: 'Home di Divix',
    nav: { guides: 'Guide', faq: 'FAQ', support: 'Assistenza' },
    sign: 'Cambio valute',
    menu: 'Menu',
    langMenu: 'Lingua',
    footer: {
      product: 'Divix',
      learn: 'Approfondisci',
      legal: 'Note legali',
      links: { home: 'Home', guides: 'Guide', support: 'Assistenza', privacy: 'Privacy', terms: 'Termini' },
      appStore: 'Scarica dall\'App Store',
      notice:
        'Divix è una calcolatrice che mostra i tassi di cambio medi di mercato a scopo informativo. Non cambia denaro. Divix è pubblicata da Albea Systems e non è affiliata a, approvata da o sponsorizzata da Apple Inc., Frankfurter, CoinGecko o alcuna banca. Apple, iPhone e App Store sono marchi di Apple Inc.',
      rights: 'Albea Systems. Tutti i diritti riservati.',
    },
    breadcrumbs: { home: 'Divix', guides: 'Guide' },
    updated: 'Aggiornato il',
    by: 'Di',
    related: 'Altre guide',
    readMore: 'Leggi la guida',
    backToGuides: 'Tutte le guide',
    ctaGuide: 'Controlla qualsiasi prezzo in pochi secondi con Divix',
  },

  seo: {
    imgAlt: 'Divix: convertitore di valute con calcolatrice integrata per iPhone',
    home: {
      title: 'Divix: convertitore di valute e calcolatrice per iPhone',
      description:
        'Convertitore di valute gratuito per iPhone con calcolatrice integrata. 55 valute e 20 criptovalute, preferiti, tassi live e offline, grafici fino a 5 anni.',
    },
    guides: {
      title: 'Guide sul cambio valute per chi viaggia | Divix',
      description:
        'Guide chiare sul tasso medio di mercato, sul pagare in valuta locale e sul convertire in fretta i prezzi quando viaggi.',
    },
    privacy: { title: 'Informativa sulla privacy | Divix', description: 'Cosa raccoglie Divix (molto poco), come funzionano pubblicità e consenso e come contattarci per i tuoi dati.' },
    terms: { title: 'Termini di utilizzo | Divix', description: 'I termini che si applicano quando usi l\'app di conversione valute Divix per iPhone.' },
    support: { title: 'Assistenza | Divix', description: 'Risposte su tassi, preferiti, uso offline, rimozione della pubblicità e ripristino degli acquisti in Divix, e come contattarci.' },
  },

  home: {
    hero: {
      h1: 'Ogni prezzo, nella tua valuta.',
      h1Lines: ['Ogni prezzo,', 'nella tua valuta.'],
      sub: 'Divix è un convertitore di valute con una vera calcolatrice integrata. 55 valute e 20 criptovalute, gratis su iPhone.',
      boardTitle: 'Oggi per',
      boardNote: 'Tassi medi di mercato, variazione in 30 giorni.',
      boardFallback: 'Tassi salvati del {date}. I tassi live si caricano quando sei online.',
      phoneAlt:
        'L\'app Divix converte 250 euro in dollari, inverte in dollari ed euro, sceglie Bitcoin, salva i preferiti e apre il grafico dello storico',
    },
    calc: {
      h2: 'Converti mentre calcoli',
      p: 'Sotto le due schede delle valute c\'è una vera calcolatrice. Somma il conto di un ristorante, dividilo, moltiplica il prezzo a notte per il numero di notti, e il risultato nella tua valuta si aggiorna a ogni tasto.',
      points: [
        { h: 'Quattro operazioni', p: 'Più, meno, per e diviso, con la conversione che procede in diretta.' },
        { h: 'Un tocco per invertire', p: 'Passa da dollari a euro e viceversa senza riscrivere l\'importo.' },
        { h: 'Niente cambio di app', p: 'La calcolatrice e il tasso condividono la stessa schermata.' },
      ],
      shotAlt: 'Schermata di conversione di Divix con 250 euro convertiti in 281,33 dollari statunitensi e il tastierino della calcolatrice sotto',
      try: {
        h: 'Prova con i tassi di oggi',
        amount: 'Importo',
        from: 'Da',
        to: 'A',
        swap: 'Inverti le valute',
        result: 'Risultato',
        source: 'Tassi medi di mercato da Frankfurter, {date}. Divix non aggiunge alcun ricarico.',
        loading: 'Caricamento dei tassi',
        error: 'I tassi non sono disponibili al momento. Controlla la connessione e riprova.',
      },
    },
    markets: {
      h2: 'Preferiti e mercati',
      p: 'Tocca la stella su una valuta per tenerla a portata di mano. La scheda Mercati mostra un importo rispetto a tutte le valute insieme, con i filtri Tutte, Preferiti, Valute o Cripto.',
      p2: 'Scrivi 1 e leggi il tasso. Scrivi 100 e leggi il prezzo. L\'elenco segue ciò che digiti.',
      marketsAlt: 'Scheda Mercati di Divix con Bitcoin, euro, sterlina, yen e altre valute rispetto a 1 dollaro statunitense',
      favoritesAlt: 'Filtro Preferiti di Divix con il dollaro statunitense e Bitcoin contrassegnati da una stella',
    },
    crypto: {
      h2: 'Bitcoin accanto al dollaro',
      p: 'Venti criptovalute condividono il selettore con 55 valute tradizionali, tra cui Bitcoin, Ethereum, Solana e XRP. Converti dollari in BTC come converti dollari in euro.',
      pickerAlt: 'Selettore valute di Divix con il filtro Cripto che mostra Bitcoin, Ethereum, Tether, BNB e Solana',
      btcAlt: 'Divix converte 250 dollari statunitensi in 0,003066 Bitcoin',
    },
    charts: {
      h2: 'Guarda da dove viene un tasso',
      p: 'Apri la scheda Grafico per uno storico da 7 giorni fino a 5 anni, con minimo, massimo e variazione nel periodo.',
      fresh: {
        h: 'Ogni tasso dice quanto è fresco',
        live: 'Live: aggiornato nelle ultime 4 ore.',
        cached: 'In cache: salvato da un aggiornamento precedente, vecchio anche di un giorno o più.',
        offline: 'Offline: nessuna connessione, quindi vedi l\'ultimo tasso salvato e la sua ora.',
      },
      alt: 'Grafico dello storico a 30 giorni di Divix da dollaro statunitense a euro, con minimo, massimo e variazione',
    },
    checkout: {
      h2: 'Pensata per la coda alla cassa',
      items: [
        { h: 'Funziona offline', p: 'Gli ultimi tassi sono salvati sul telefono, quindi un segnale debole non ti ferma.' },
        { h: 'Nessun account', p: 'Apri l\'app e scrivi. Niente email, niente password.' },
        { h: 'Nessun ricarico', p: 'Tassi medi di mercato, lo stesso numero che troveresti cercando online.' },
        { h: 'Dodici lingue', p: 'Inglese, spagnolo, francese, italiano, tedesco, portoghese, arabo, cinese, hindi, giapponese, coreano e vietnamita.' },
      ],
    },
    pricing: {
      h2: 'Gratis. Paghi una volta per togliere la pubblicità.',
      p: 'Ogni funzione è gratuita. Un acquisto una tantum rimuove la pubblicità per sempre, senza abbonamento. Puoi anche guardare un breve video per un\'ora senza pubblicità.',
    },
    faq: {
      h2: 'Le domande di chi viaggia',
      items: [
        {
          q: 'Che cos\'è Divix?',
          a: 'Divix è un convertitore di valute e una calcolatrice gratuiti per iPhone. Scrivi un importo, scegli due valute e vedi subito il risultato, con una calcolatrice nella stessa schermata.',
        },
        {
          q: 'Quante valute supporta Divix?',
          a: 'Divix supporta 55 valute tradizionali e 20 criptovalute, tra cui USD, EUR, GBP, JPY, CHF, Bitcoin, Ethereum, Solana e XRP. Compaiono tutte nello stesso selettore, con i filtri Valute e Cripto.',
        },
        {
          q: 'Da dove vengono i tassi di cambio?',
          a: 'I tassi delle valute provengono da fonti pubbliche di tasso medio come Frankfurter, con un secondo fornitore di riserva. I prezzi delle criptovalute provengono da CoinGecko. Ogni conversione mostra quando il tasso è stato aggiornato l\'ultima volta.',
        },
        {
          q: 'Perché il tasso è diverso da quello della mia banca?',
          a: 'Divix mostra il tasso medio di mercato, il punto intermedio tra prezzo di acquisto e di vendita. Banche, circuiti di carte e uffici di cambio aggiungono un margine o una commissione, quindi l\'importo che ricevi è di solito un po\' più basso. Usa Divix per conoscere il tasso di riferimento, poi confrontalo con l\'offerta.',
        },
        {
          q: 'Divix funziona senza internet?',
          a: 'Sì. Gli ultimi tassi sono salvati sul tuo iPhone e Divix ne mostra l\'età: live, in cache o offline. Quando ti riconnetti, i tassi si aggiornano.',
        },
        {
          q: 'Serve un account?',
          a: 'No. Non c\'è alcuna registrazione. I tuoi preferiti e le impostazioni restano sul tuo dispositivo.',
        },
        {
          q: 'Divix è gratis?',
          a: 'Sì. Tutte le funzioni sono gratuite e la versione gratuita mostra pubblicità. Un acquisto in-app una tantum la rimuove e puoi anche guardare un video per un\'ora senza pubblicità. Non c\'è alcun abbonamento.',
        },
        {
          q: 'Su quali dispositivi funziona Divix?',
          a: 'Divix funziona su iPhone con iOS 17.6 o successivo. Non esiste ancora una versione per Android.',
        },
      ],
    },
    guides: {
      h2: 'Guide per spendere all\'estero',
      p: 'Spiegazioni brevi e chiare su come funzionano i tassi di cambio e su come pagare meno quando viaggi.',
    },
    final: {
      h2: 'Conosci il prezzo prima di pagare.',
      p: 'Gratis sull\'App Store per iPhone.',
    },
  },

  guides: {
    ids: ['guide-mid-market', 'guide-local-currency', 'guide-travel'],
    h1: 'Guide sul cambio valute per chi viaggia',
    intro: 'Tre guide brevi su come funzionano i tassi di cambio, scritte per poterle usare a una bancarella o a un terminale per carte.',
  },

  guide: {
    'guide-mid-market': {
      title: 'Che cos\'è il tasso medio di mercato? Perché la tua banca è diversa',
      description: 'Il tasso medio di mercato è il punto intermedio tra prezzo di acquisto e di vendita. Scopri perché banche e uffici di cambio applicano di meno e come verificare tu stesso il ricarico.',
      h1: 'Che cos\'è il tasso medio di mercato?',
      lead: 'Il tasso medio di mercato è il punto intermedio tra il prezzo a cui gli operatori comprano una valuta e quello a cui la vendono. È il numero di riferimento prima che qualcuno aggiunga un margine.',
      summary: 'Il tasso di riferimento prima dei margini, e come misurare il ricarico che ti viene proposto.',
      sections: [
        {
          h: 'La risposta breve',
          p: [
            'Quando cerchi "dollari in euro" online, il numero che vedi è quasi sempre un tasso medio di mercato. Si trova a metà strada tra il prezzo di acquisto e quello di vendita sul mercato all\'ingrosso delle valute.',
            'È un riferimento equo perché non contiene commissioni né margini. Non è però un prezzo che di solito puoi ottenere da cliente.',
          ],
        },
        {
          h: 'Perché raramente lo ottieni',
          p: [
            'Banche, circuiti di carte, uffici di cambio e servizi di trasferimento guadagnano modificando il tasso, applicando una commissione, o entrambe le cose. Uno sportello che pubblicizza zero commissioni può comunque proporre un tasso ben inferiore a quello medio di mercato.',
            'Il divario tende a essere maggiore dove i clienti hanno meno alternative, come gli sportelli degli aeroporti e le zone turistiche.',
          ],
        },
        {
          h: 'Come misurare il ricarico',
          p: ['Confronta il tasso che ti propongono con il tasso medio di mercato dello stesso giorno. Il ricarico è la differenza, come quota del tasso medio di mercato.'],
          list: [
            'Cerca il tasso medio di mercato di oggi per la coppia.',
            'Trova il tasso che ti propongono, oppure dividi l\'importo che riceveresti per l\'importo che dai.',
            'Sottrai il tasso proposto dal tasso medio di mercato, poi dividi per il tasso medio di mercato.',
          ],
          after: 'Esempio: se il tasso medio di mercato è 1 euro = 1,10 dollari statunitensi e uno sportello propone 1,04, ricevi circa il 5,5 per cento in meno rispetto al riferimento. I numeri qui sono un\'illustrazione, non una quotazione in tempo reale.',
        },
        {
          h: 'Cosa fare',
          list: [
            'Chiedi il totale che riceverai, non solo il tasso, e confronta i totali.',
            'Confronta ogni commissione fissa con l\'entità dell\'operazione. Una commissione fissa pesa di più su un importo piccolo.',
            'Confronta due o tre opzioni prima di decidere, soprattutto per somme più grandi.',
          ],
        },
        {
          h: 'Dove si inserisce Divix',
          p: ['Divix mostra il tasso medio di mercato con un\'etichetta di freschezza, così puoi vedere quanto un\'offerta si discosta dal riferimento. È una calcolatrice, non un ufficio di cambio, e non aggiunge alcun ricarico.'],
        },
      ],
      faq: [
        { q: 'Il tasso medio di mercato è uguale al tasso interbancario?', a: 'Sono vicini. Il tasso interbancario è quello che le grandi banche usano tra loro. I tassi medi di mercato pubblici sono un punto intermedio pubblicato che lo approssima.' },
        { q: 'Posso ottenere il tasso medio di mercato da cliente?', a: 'Raramente al numero esatto. Alcuni fornitori si avvicinano e lo dichiarano apertamente. Misurare il ricarico mostra quanto.' },
      ],
    },
    'guide-local-currency': {
      title: 'Pagare in valuta locale: evitare la conversione dinamica',
      description: 'Quando un terminale o un bancomat all\'estero propone di addebitarti nella tua valuta, la risposta di solito è no. Scopri perché e come verificare il prezzo.',
      h1: 'Pagare in valuta locale',
      lead: 'All\'estero, un terminale per carte o un bancomat può chiederti se vuoi pagare nella tua valuta o in quella locale. Scegliere la valuta locale di solito è la risposta migliore.',
      summary: 'Perché "paga nella tua valuta" spesso costa di più, e un controllo di dieci secondi.',
      sections: [
        {
          h: 'Che cos\'è la conversione dinamica di valuta',
          p: [
            'La conversione dinamica di valuta, o DCC, permette all\'esercente o al gestore del bancomat di fare la conversione al momento del pagamento. Lo schermo mostra un totale nella tua valuta e ti chiede di accettare.',
            'Sembra comoda perché vedi un importo familiare. La comodità è ciò che paghi.',
          ],
        },
        {
          h: 'Perché di solito la valuta locale è meglio',
          p: [
            'Con la DCC il tasso di cambio è fissato dal fornitore dietro il terminale e spesso contiene un margine più alto del tasso che applicherebbe l\'emittente della tua carta. Se rifiuti, la tua banca converte l\'importo locale con il proprio tasso ed eventuali commissioni per operazioni all\'estero.',
            'Le condizioni delle carte variano, quindi leggi una volta la commissione per operazioni all\'estero della tua carta prima di partire. Poi la regola è semplice.',
          ],
        },
        {
          h: 'Un controllo di dieci secondi',
          list: [
            'Leggi il prezzo in valuta locale.',
            'Convertilo al tasso medio di mercato. In Divix, scrivi il prezzo locale e leggi la tua valuta.',
            'Confrontalo con il totale nella tua valuta che propone il terminale. Se è nettamente più alto, scegli la valuta locale.',
          ],
        },
        {
          h: 'Abitudini che aiutano',
          list: [
            'Scegli la valuta locale su terminali per carte e bancomat, ogni volta.',
            'Se un cassiere converte per te, chiedi di pagare in valuta locale.',
            'Conserva lo scontrino e controlla quale valuta riporta.',
          ],
        },
      ],
      faq: [
        { q: 'La conversione dinamica di valuta è sempre più cara?', a: 'Non in ogni caso, ma spesso sì. Il controllo di dieci secondi ti dice com\'è per l\'operazione che hai davanti.' },
        { q: 'Vale anche per i bancomat?', a: 'Sì. I bancomat all\'estero possono mostrare la stessa scelta tra valuta di origine e locale. Scegliere la valuta locale è l\'impostazione più sicura.' },
      ],
    },
    'guide-travel': {
      title: 'Come convertire le valute in fretta quando viaggi',
      description: 'Modi pratici per trasformare i prezzi esteri nella tua valuta davanti a una bancarella, a un menu o a una cassa, con e senza connessione.',
      h1: 'Convertire i prezzi in fretta mentre viaggi',
      lead: 'Non servono numeri esatti per decidere. Servono un punto di riferimento affidabile e una calcolatrice a portata di mano.',
      summary: 'Riferimenti, preferiti e tassi offline per il momento dell\'acquisto.',
      sections: [
        {
          h: 'Prima di partire',
          list: [
            'Metti la stella alle valute che userai, così sono a un tocco.',
            'Apri l\'app una volta con una connessione, così i tassi vengono salvati per l\'uso offline.',
            'Annota il tasso base del tuo viaggio, ad esempio 1 dollaro statunitense = 18 pesos messicani.',
          ],
        },
        {
          h: 'Costruisci un riferimento',
          p: ['Un riferimento è un tasso che puoi scalare a mente. Se 1 dollaro statunitense vale circa 18 pesos, allora 100 pesos sono poco più di 5 dollari e 1.000 pesos poco più di 55.'],
          after: 'Per le valute senza decimali, come lo yen giapponese, usa come riferimento un importo tondo. A 158 yen per dollaro, 1.000 yen sono circa 6,30 dollari. Sono tassi di esempio, quindi controlla quelli di oggi.',
        },
        {
          h: 'Alla bancarella o alla cassa',
          list: [
            'Scrivi una volta il prezzo locale e leggi l\'importo nella tua valuta.',
            'Usa la calcolatrice per le quantità, come quattro biglietti o sei notti, così il totale si converte in un passaggio.',
            'Inverti la direzione quando contratti, per dire il tuo prezzo nella valuta locale.',
          ],
        },
        {
          h: 'Quando cade il segnale',
          p: ['Divix tiene gli ultimi tassi sul telefono e li etichetta come live, in cache o offline. Un tasso vecchio di qualche ora basta per la maggior parte degli acquisti, e l\'etichetta ti dice quando non è così.'],
        },
      ],
      faq: [
        { q: 'Quanto deve essere preciso il tasso per fare acquisti?', a: 'Per gli acquisti di tutti i giorni, un tasso medio di mercato dello stesso giorno è abbastanza preciso per decidere. La tua carta o lo sportello applicheranno il proprio margine in aggiunta.' },
        { q: 'Posso convertire le criptovalute allo stesso modo?', a: 'Sì. Divix elenca 20 criptovalute accanto alle valute tradizionali, quindi da Bitcoin a dollari funziona come qualsiasi altra coppia.' },
      ],
    },
  },

  legal: {
    updatedOn: 'Ultimo aggiornamento: 17 ottobre 2026',
    privacy: {
      h1: 'Informativa sulla privacy',
      lead: 'Divix non richiede un account e raccoglie pochissimo. Questa informativa spiega cosa succede ai dati quando usi l\'app iOS.',
      sections: [
        { h: 'Chi siamo', p: ['Divix è pubblicata da Albea Systems. Contatto: albeasystems@gmail.com.'] },
        {
          h: 'Cosa non raccogliamo',
          p: ['Divix non ha registrazione né account utente. Non chiediamo né conserviamo il tuo nome, indirizzo email, numero di telefono, contatti, foto o posizione.'],
        },
        {
          h: 'Cosa resta sul tuo dispositivo',
          p: ['La tua valuta base, i preferiti, l\'ordine dell\'elenco e i tassi di cambio in cache sono archiviati solo sul tuo dispositivo. Eliminare l\'app li rimuove. Non ne abbiamo alcuna copia.'],
        },
        {
          h: 'Tassi di cambio',
          p: ['Per mostrare i tassi, l\'app richiede dati pubblici a fornitori di tassi di cambio (ad esempio Frankfurter e CoinGecko). Queste richieste contengono le valute interrogate e dati tecnici come il tuo indirizzo IP, che ogni richiesta internet trasporta. Non contengono informazioni che ti identifichino presso di noi.'],
        },
        {
          h: 'Pubblicità e consenso',
          p: [
            'La versione gratuita mostra pubblicità. Gli annunci sono distribuiti tramite un servizio di mediazione pubblicitaria e le sue reti partner, che possono includere Google AdMob, Meta Audience Network e Unity Ads. Questi partner possono trattare identificatori del dispositivo e dati di utilizzo per scegliere e misurare gli annunci.',
            'Prima della pubblicità personalizzata, l\'app chiede il tuo consenso tramite la richiesta App Tracking Transparency di Apple e, dove richiesto, un modulo di consenso per SEE, Regno Unito e Svizzera. Se rifiuti, gli annunci non sono personalizzati dove la legge e la rete lo consentono. Puoi cambiare le tue scelte in Impostazioni iOS, Privacy e sicurezza, Tracciamento.',
            'Un acquisto in-app una tantum rimuove la pubblicità. Guardare un video con ricompensa disattiva la pubblicità per un\'ora.',
          ],
        },
        {
          h: 'Acquisti in-app',
          p: ['Gli acquisti sono gestiti da Apple tramite l\'App Store. Non vediamo né conserviamo mai i tuoi dati di pagamento.'],
        },
        {
          h: 'Diagnostica',
          p: ['Se l\'app si arresta in modo anomalo, Apple può condividere con noi segnalazioni anonime di arresto tramite App Store Connect, se lo hai consentito in iOS. Non contengono informazioni finanziarie.'],
        },
        { h: 'Minori', p: ['Divix non è rivolta ai minori di 16 anni e non raccogliamo consapevolmente i loro dati.'] },
        {
          h: 'I tuoi diritti',
          p: ['Poiché non conserviamo dati personali che ti riguardano, di solito non c\'è nulla da consultare o cancellare. Se ritieni il contrario, scrivici e risponderemo entro un tempo ragionevole. Dove si applica la normativa sulla protezione dei dati, puoi anche rivolgerti alla tua autorità locale.'],
        },
        { h: 'Modifiche', p: ['Potremmo aggiornare questa informativa. La data in alto indica l\'ultima revisione. Le modifiche significative saranno riflesse in un aggiornamento dell\'app.'] },
        { h: 'Contatto', p: ['albeasystems@gmail.com'] },
      ],
    },
    terms: {
      h1: 'Termini di utilizzo',
      lead: 'Questi termini si applicano quando scarichi e usi l\'app Divix per iPhone.',
      sections: [
        { h: 'Accettazione', p: ['Usando Divix accetti questi termini. Se non li accetti, non usare l\'app.'] },
        {
          h: 'Cos\'è Divix',
          p: ['Divix è un convertitore di valute e una calcolatrice. Mostra tassi di cambio medi di mercato a scopo informativo. Non cambia, detiene, invia né trasferisce denaro e non fornisce consulenza finanziaria, fiscale o legale.'],
        },
        {
          h: 'Licenza e uso consentito',
          p: ['Ti concediamo una licenza personale, non trasferibile e non esclusiva per usare l\'app per scopi privati, secondo i termini standard di Apple per le applicazioni in licenza. Non puoi copiare, modificare, decompilare, vendere o concedere in sublicenza l\'app, né rimuoverne gli avvisi.'],
        },
        {
          h: 'Tassi e accuratezza',
          p: ['I tassi provengono da fornitori terzi e possono essere in ritardo, arrotondati o non disponibili. Possono differire dal tasso offerto dalla tua banca, dalla tua carta o dal tuo ufficio di cambio, che aggiungono margini e commissioni. Conferma l\'importo finale con il tuo fornitore prima di operare. Usi i dati a tuo rischio.'],
        },
        {
          h: 'Pubblicità e acquisti',
          p: ['La versione gratuita mostra pubblicità. Un acquisto in-app facoltativo la rimuove. Acquisti, rimborsi e regole relative agli abbonamenti sono disciplinati dai termini di Apple.'],
        },
        {
          h: 'Proprietà intellettuale',
          p: ['L\'app, il suo design, i testi, le icone e il codice appartengono ad Albea Systems o ai suoi licenzianti. Nomi e marchi di terzi appartengono ai rispettivi proprietari. Divix non è affiliata ad Apple Inc. né ad alcuna banca o fornitore di tassi.'],
        },
        {
          h: 'Responsabilità',
          p: ['Nella misura consentita dalla legge, non siamo responsabili di perdite indirette o consequenziali, né di decisioni finanziarie prese sulla base dei tassi mostrati nell\'app.'],
        },
        { h: 'Modifiche e disponibilità', p: ['Possiamo aggiornare, sospendere o interrompere l\'app e possiamo aggiornare questi termini. Continuare a usarla dopo un aggiornamento significa accettare i nuovi termini.'] },
        { h: 'Legge applicabile', p: ['Questi termini sono regolati dalla legge spagnola, senza pregiudizio per i diritti inderogabili dei consumatori di cui godi dove vivi.'] },
        { h: 'Contatto', p: ['albeasystems@gmail.com'] },
      ],
    },
    support: {
      h1: 'Assistenza',
      lead: 'Le risposte alle domande che riceviamo più spesso. Se la tua non c\'è, scrivici e risponderemo entro 48 ore.',
      items: [
        { q: 'Perché il tasso è diverso da quello della mia banca?', a: 'Divix mostra il tasso medio di mercato. Banche e uffici di cambio aggiungono un margine o una commissione, quindi ciò che ricevi è di solito un po\' più basso. La nostra guida sul tasso medio di mercato mostra come misurare la differenza.' },
        { q: 'Come aggiungo una valuta ai preferiti?', a: 'Tocca la stella accanto a una valuta nel convertitore o nell\'elenco Mercati. Usa il filtro Preferiti in Mercati per vederle insieme.' },
        { q: 'Come cambio una valuta?', a: 'Tocca il codice della valuta su una delle schede, scegline un\'altra dall\'elenco e usa i filtri o la ricerca per trovarla. Tocca il pulsante di inversione per invertire la coppia.' },
        { q: 'Divix funziona offline?', a: 'Sì. Gli ultimi tassi sono salvati sul telefono. Un\'etichetta indica se stai vedendo dati live, in cache o offline.' },
        { q: 'Come rimuovo la pubblicità?', a: 'Apri Impostazioni nell\'app e scegli Rimuovi pubblicità. È un acquisto una tantum senza abbonamento. Puoi anche guardare un video dalla schermata principale per un\'ora senza pubblicità.' },
        { q: 'Ho cambiato telefono. Come ripristino il mio acquisto?', a: 'Apri Impostazioni in Divix sul nuovo telefono e tocca Ripristina acquisti. Accedi con lo stesso ID Apple usato prima.' },
        { q: 'Esiste una versione per Android?', a: 'Non ancora. Divix è disponibile per iPhone.' },
        { q: 'Un tasso sembra sbagliato o non aggiornato.', a: 'Scrivici con la coppia di valute, il valore che vedi e quello che ti aspettavi. Controlla prima l\'etichetta di freschezza: i tassi in cache o offline mostrano l\'ultimo valore salvato.' },
      ],
      contactH: 'Hai ancora bisogno di aiuto?',
      contactP: 'Inviaci la coppia di valute, la tua versione di iOS e ciò che ti aspettavi di vedere.',
      contactCta: 'Scrivi all\'assistenza',
    },
  },
}
