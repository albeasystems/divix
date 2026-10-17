// English copy. House rules: no em dashes or en dashes, no filler verbs, numbers only if the app really has them.
export default {
  lang: 'en',
  locale: 'en-US',
  ogLocale: 'en_US',
  dir: 'ltr',
  tagline: 'Currency converter and calculator for iPhone',

  ui: {
    skip: 'Skip to content',
    getApp: 'Get the free app',
    getAppShort: 'Get the app',
    home: 'Divix home',
    nav: { guides: 'Guides', faq: 'FAQ', support: 'Support' },
    sign: 'Currency exchange',
    menu: 'Menu',
    langName: 'Español',
    langLabel: 'Leer en español',
    footer: {
      product: 'Divix',
      learn: 'Learn',
      legal: 'Legal',
      links: { home: 'Home', guides: 'Guides', support: 'Support', privacy: 'Privacy', terms: 'Terms' },
      appStore: 'Download on the App Store',
      notice:
        'Divix is a calculator that shows mid-market exchange rates for information. It does not exchange money. Divix is published by Albea Systems and is not affiliated with, endorsed by or sponsored by Apple Inc., Frankfurter, CoinGecko or any bank. Apple, iPhone and App Store are trademarks of Apple Inc.',
      rights: 'Albea Systems. All rights reserved.',
    },
    breadcrumbs: { home: 'Divix', guides: 'Guides' },
    updated: 'Updated',
    readMore: 'Read the guide',
    backToGuides: 'All guides',
    ctaGuide: 'Check any price in seconds with Divix',
  },

  seo: {
    home: {
      title: 'Divix: Currency Converter & Calculator for iPhone',
      description:
        'Free currency converter for iPhone with a built-in calculator. 55 currencies and 20 cryptocurrencies, favorites, live and offline rates, charts up to 5 years.',
    },
    guides: {
      title: 'Currency guides for travelers | Divix',
      description:
        'Plain-language guides on the mid-market rate, paying in local currency and converting prices fast when you travel.',
    },
    privacy: { title: 'Privacy Policy | Divix', description: 'What Divix collects (very little), how ads and consent work, and how to contact us about your data.' },
    terms: { title: 'Terms of Use | Divix', description: 'The terms that apply when you use the Divix currency converter app for iPhone.' },
    support: { title: 'Support | Divix', description: 'Answers about Divix rates, favorites, offline use, removing ads and restoring purchases, plus how to contact us.' },
  },

  home: {
    hero: {
      h1: 'Any price, in your money.',
      h1Lines: ['Any price,', 'in your money.'],
      sub: 'Divix is a currency converter with a real calculator built in. 55\u00a0currencies and 20\u00a0cryptocurrencies, free on iPhone.',
      boardTitle: 'Today for',
      boardNote: 'Mid-market rates, change over 30 days.',
      boardFallback: 'Saved rates from {date}. Live rates load when you are online.',
      phoneAlt:
        'The Divix app converting 250 euros to dollars, swapping to dollars and euros, choosing Bitcoin, saving favorites and opening the history chart',
    },
    calc: {
      h2: 'Convert while you calculate',
      p: 'Under the two currency cards sits a real calculator. Add up a restaurant bill, split it, multiply a nightly price by the number of nights, and the result in your currency updates with every key.',
      points: [
        { h: 'Four operations', p: 'Plus, minus, times and divide, with the conversion running live.' },
        { h: 'One tap to swap', p: 'Flip dollars to euros and back without retyping the amount.' },
        { h: 'No app switching', p: 'The calculator and the rate share one screen.' },
      ],
      shotAlt: 'Divix converter screen showing 250 euros converted to 281.33 US dollars with the calculator keypad below',
      try: {
        h: 'Try it with today\'s rates',
        amount: 'Amount',
        from: 'From',
        to: 'To',
        swap: 'Swap currencies',
        result: 'Result',
        source: 'Mid-market rates from Frankfurter, {date}. Divix adds no markup.',
        loading: 'Loading rates',
        error: 'Rates are not available right now. Check your connection and try again.',
      },
    },
    markets: {
      h2: 'Favorites and markets',
      p: 'Tap the star on any currency to keep it close. The Markets tab shows one amount against every currency at once, and filters by All, Favorites, Fiat or Crypto.',
      p2: 'Type 1 and read the rate. Type 100 and read the price. The list follows what you type.',
      marketsAlt: 'Divix Markets tab listing Bitcoin, euro, pound, yen and other currencies against 1 US dollar',
      favoritesAlt: 'Divix Favorites filter showing the US dollar and Bitcoin marked with a star',
    },
    crypto: {
      h2: 'Bitcoin next to the dollar',
      p: 'Twenty cryptocurrencies share the picker with 55 fiat currencies, including Bitcoin, Ethereum, Solana and XRP. Convert dollars to BTC the way you convert dollars to euros.',
      pickerAlt: 'Divix currency picker with the Crypto filter showing Bitcoin, Ethereum, Tether, BNB and Solana',
      btcAlt: 'Divix converting 250 US dollars to 0.003066 Bitcoin',
    },
    charts: {
      h2: 'See where a rate has been',
      p: 'Open the Chart tab for 7 days up to 5 years of history, with the low, the high and the change over the period.',
      fresh: {
        h: 'Every rate says how fresh it is',
        live: 'Live: refreshed in the last 4 hours.',
        cached: 'Cached: saved from an earlier refresh, up to a day old or more.',
        offline: 'Offline: no connection, so you see the last saved rate and its time.',
      },
      alt: 'Divix 30 day history chart for US dollar to euro with low, high and change',
    },
    checkout: {
      h2: 'Made for the checkout line',
      items: [
        { h: 'Works offline', p: 'The last rates are saved on your phone, so a weak signal does not stop you.' },
        { h: 'No account', p: 'Open the app and type. No email, no password.' },
        { h: 'No markup', p: 'Mid-market rates, the same number you would find searching online.' },
        { h: 'Nine languages', p: 'English, Spanish, German, French, Italian, Portuguese, Arabic, Hindi and Chinese.' },
      ],
    },
    pricing: {
      h2: 'Free. Pay once to remove ads.',
      p: 'Every feature is free. A one-time purchase removes ads for good, with no subscription. You can also watch one short video for an hour without ads.',
    },
    faq: {
      h2: 'Questions travelers ask',
      items: [
        {
          q: 'What is Divix?',
          a: 'Divix is a free currency converter and calculator for iPhone. You type an amount, pick two currencies and see the result at once, with a calculator on the same screen.',
        },
        {
          q: 'How many currencies does Divix support?',
          a: 'Divix supports 55 fiat currencies and 20 cryptocurrencies, including USD, EUR, GBP, JPY, CHF, Bitcoin, Ethereum, Solana and XRP. They all appear in the same picker, with Fiat and Crypto filters.',
        },
        {
          q: 'Where do the exchange rates come from?',
          a: 'Currency rates come from public mid-market sources such as Frankfurter, with a second provider as a fallback. Cryptocurrency prices come from CoinGecko. Each conversion shows when the rate was last updated.',
        },
        {
          q: 'Why is the rate different from my bank?',
          a: 'Divix shows the mid-market rate, the midpoint between buy and sell prices. Banks, card networks and exchange offices add a margin or a fee, so the amount you receive is usually a little lower. Use Divix to know the reference rate, then compare it with the offer.',
        },
        {
          q: 'Does Divix work without internet?',
          a: 'Yes. The last rates are saved on your iPhone and Divix shows their age: live, cached or offline. When you reconnect, rates refresh.',
        },
        {
          q: 'Do I need an account?',
          a: 'No. There is no sign-up. Your favorites and settings stay on your device.',
        },
        {
          q: 'Is Divix free?',
          a: 'Yes. All features are free and the free version shows ads. A one-time in-app purchase removes ads, and you can also watch one video for an hour without ads. There is no subscription.',
        },
        {
          q: 'Which devices does Divix run on?',
          a: 'Divix runs on iPhone with iOS 17.6 or later. There is no Android version yet.',
        },
      ],
    },
    guides: {
      h2: 'Guides for spending abroad',
      p: 'Short, plain explanations of how exchange rates work and how to pay less when you travel.',
    },
    final: {
      h2: 'Know the price before you pay.',
      p: 'Free on the App Store for iPhone.',
    },
  },

  guides: {
    ids: ['guide-mid-market', 'guide-local-currency', 'guide-travel'],
    h1: 'Currency guides for travelers',
    intro: 'Three short guides on how exchange rates work, written so you can act on them at a market stall or a card terminal.',
  },

  guide: {
    'guide-mid-market': {
      title: 'What is the mid-market rate? Why your bank differs',
      description: 'The mid-market rate is the midpoint between buy and sell prices. Learn why banks and exchange desks quote less and how to check the markup yourself.',
      h1: 'What is the mid-market rate?',
      lead: 'The mid-market rate is the midpoint between the price at which traders buy a currency and the price at which they sell it. It is the reference number before anyone adds a margin.',
      summary: 'The reference rate before margins, and how to measure the markup you are offered.',
      sections: [
        {
          h: 'The short answer',
          p: [
            'When you search "dollars to euros" online, the number you see is almost always a mid-market rate. It sits halfway between the buy price and the sell price on the wholesale currency market.',
            'It is a fair reference because it contains no fee and no margin. It is also not a price you can usually get as a customer.',
          ],
        },
        {
          h: 'Why you rarely get it',
          p: [
            'Banks, card networks, exchange offices and transfer services earn money by changing the rate, charging a fee, or both. A desk that advertises no commission may still quote a rate well below the mid-market one.',
            'The gap tends to be widest where customers have the fewest alternatives, such as airport exchange desks and tourist areas.',
          ],
        },
        {
          h: 'How to measure the markup',
          p: ['Compare the rate you are offered with the mid-market rate on the same day. The markup is the difference, as a share of the mid-market rate.'],
          list: [
            'Look up today\'s mid-market rate for the pair.',
            'Find the rate you are offered, or divide the amount you would receive by the amount you give.',
            'Subtract the offered rate from the mid-market rate, then divide by the mid-market rate.',
          ],
          after: 'Example: if the mid-market rate is 1 euro = 1.10 US dollars and a counter offers 1.04, you receive about 5.5 percent less than the reference. The numbers here are an illustration, not a live quote.',
        },
        {
          h: 'What to do about it',
          list: [
            'Ask for the total you will receive, not the rate alone, and compare totals.',
            'Check any fixed fee against the size of the transaction. A flat fee weighs more on a small amount.',
            'Compare two or three options before you commit, especially for larger sums.',
          ],
        },
        {
          h: 'Where Divix fits',
          p: ['Divix shows the mid-market rate with a freshness label, so you can see how far an offer sits from the reference. It is a calculator, not an exchange, and it adds no markup of its own.'],
        },
      ],
      faq: [
        { q: 'Is the mid-market rate the same as the interbank rate?', a: 'They are close. The interbank rate is what large banks use between themselves. Public mid-market rates are a published midpoint that approximates it.' },
        { q: 'Can I get the mid-market rate as a customer?', a: 'Rarely at the exact number. Some providers come close and say so openly. Measuring the markup shows how close.' },
      ],
    },
    'guide-local-currency': {
      title: 'Pay in local currency: avoid dynamic conversion',
      description: 'When a terminal or ATM abroad offers to charge you in your home currency, the answer is usually no. See why and how to check the price.',
      h1: 'Pay in local currency',
      lead: 'Abroad, a card terminal or an ATM may ask whether you want to pay in your home currency or in the local one. Choosing the local currency is usually the better answer.',
      summary: 'Why "pay in your own currency" often costs more, and a ten-second check.',
      sections: [
        {
          h: 'What dynamic currency conversion is',
          p: [
            'Dynamic currency conversion, or DCC, lets the merchant or the ATM operator do the conversion at the moment of payment. The screen shows a total in your home currency and asks you to accept.',
            'It looks convenient because you see a familiar amount. The convenience is what you pay for.',
          ],
        },
        {
          h: 'Why local currency is usually better',
          p: [
            'With DCC the exchange rate is set by the provider behind the terminal, and it often carries a larger margin than the rate your own card issuer would apply. If you decline, your bank converts the local amount using its own rate and any foreign transaction fee.',
            'Card terms differ, so read your card\'s foreign transaction fee once before you travel. Then the rule is simple.',
          ],
        },
        {
          h: 'A ten-second check',
          list: [
            'Read the price in local currency.',
            'Convert it at the mid-market rate. In Divix, type the local price and read your currency.',
            'Compare it with the home-currency total the terminal proposes. If it is clearly higher, choose local currency.',
          ],
        },
        {
          h: 'Habits that help',
          list: [
            'Choose the local currency on card terminals and ATMs, every time.',
            'If a cashier converts for you, ask to pay in the local currency instead.',
            'Keep the receipt and check which currency it shows.',
          ],
        },
      ],
      faq: [
        { q: 'Is dynamic currency conversion always more expensive?', a: 'Not in every case, but it often is. The ten-second check tells you for the transaction in front of you.' },
        { q: 'Does this apply to ATMs?', a: 'Yes. ATMs abroad can show the same choice between home and local currency. Choosing local currency is the safer default.' },
      ],
    },
    'guide-travel': {
      title: 'How to convert currency fast while traveling',
      description: 'Practical ways to turn foreign prices into your own money at a stall, a menu or a checkout, with and without a connection.',
      h1: 'Convert prices fast while you travel',
      lead: 'You do not need exact numbers to decide. You need a reliable anchor and a calculator within reach.',
      summary: 'Anchors, favorites and offline rates for the moment of purchase.',
      sections: [
        {
          h: 'Before you leave',
          list: [
            'Star the currencies you will use so they sit one tap away.',
            'Open the app once with a connection so rates are saved for offline use.',
            'Note the base rate for your trip, such as 1 US dollar = 18 Mexican pesos.',
          ],
        },
        {
          h: 'Build an anchor',
          p: ['An anchor is one rate you can scale in your head. If 1 US dollar is about 18 pesos, then 100 pesos is a little over 5 dollars, and 1,000 pesos is a little over 55.'],
          after: 'For currencies without decimals, such as the Japanese yen, anchor on a round amount. At 158 yen to the dollar, 1,000 yen is about 6.30 dollars. These are example rates, so check today\'s.',
        },
        {
          h: 'At the stall or the register',
          list: [
            'Type the local price once and read the amount in your money.',
            'Use the calculator for quantities, such as four tickets or six nights, so the total converts in one step.',
            'Swap the direction when you negotiate, to say your price in the local currency.',
          ],
        },
        {
          h: 'When the signal drops',
          p: ['Divix keeps the last rates on your phone and labels them live, cached or offline. A rate that is a few hours old is enough for most purchases, and the label tells you when it is not.'],
        },
      ],
      faq: [
        { q: 'How accurate does the rate need to be for shopping?', a: 'For everyday purchases, a mid-market rate from the same day is accurate enough to decide. Your card or the counter will apply its own margin on top.' },
        { q: 'Can I convert cryptocurrency the same way?', a: 'Yes. Divix lists 20 cryptocurrencies next to the fiat currencies, so Bitcoin to dollars works like any other pair.' },
      ],
    },
  },

  legal: {
    updatedOn: 'Last updated: October 17, 2026',
    privacy: {
      h1: 'Privacy Policy',
      lead: 'Divix needs no account and collects very little. This policy explains what happens to data when you use the iOS app.',
      sections: [
        { h: 'Who we are', p: ['Divix is published by Albea Systems. Contact: albeasystems@gmail.com.'] },
        {
          h: 'What we do not collect',
          p: ['Divix has no sign-up or user account. We do not ask for or store your name, email address, phone number, contacts, photos or location.'],
        },
        {
          h: 'What stays on your device',
          p: ['Your base currency, favorites, list order and cached exchange rates are stored on your device only. Deleting the app removes them. We have no copy.'],
        },
        {
          h: 'Exchange rates',
          p: ['To show rates, the app requests public data from exchange-rate providers (for example Frankfurter and CoinGecko). These requests contain the currencies being queried and technical data such as your IP address, which any internet request carries. They do not contain information that identifies you to us.'],
        },
        {
          h: 'Advertising and consent',
          p: [
            'The free version shows ads. Ads are delivered through an advertising mediation service and its ad network partners, which can include Google AdMob, Meta Audience Network and Unity Ads. These partners may process device identifiers and usage data to choose and measure ads.',
            'Before personalized advertising, the app asks for your consent through Apple\'s App Tracking Transparency prompt and, where required, a consent form for the EEA, UK and Switzerland. If you decline, ads are not personalized to you where the law and the network allow. You can change your choices in iOS Settings, Privacy and Security, Tracking.',
            'A one-time in-app purchase removes ads. Watching a rewarded video turns ads off for one hour.',
          ],
        },
        {
          h: 'In-app purchases',
          p: ['Purchases are handled by Apple through the App Store. We never see or store your payment details.'],
        },
        {
          h: 'Diagnostics',
          p: ['If the app crashes, Apple may share anonymous crash reports with us through App Store Connect, if you allowed that in iOS. They contain no financial information.'],
        },
        { h: 'Children', p: ['Divix is not directed at children under 16 and we do not knowingly collect their data.'] },
        {
          h: 'Your rights',
          p: ['Because we hold no personal data about you, there is usually nothing to access or delete. If you believe we do, write to us and we will respond within a reasonable time. Where data protection law applies to you, you may also contact your local authority.'],
        },
        { h: 'Changes', p: ['We may update this policy. The date at the top shows the latest revision. Significant changes will be reflected in an app update.'] },
        { h: 'Contact', p: ['albeasystems@gmail.com'] },
      ],
    },
    terms: {
      h1: 'Terms of Use',
      lead: 'These terms apply when you download and use the Divix app for iPhone.',
      sections: [
        { h: 'Acceptance', p: ['By using Divix you agree to these terms. If you do not agree, do not use the app.'] },
        {
          h: 'What Divix is',
          p: ['Divix is a currency converter and calculator. It shows mid-market exchange rates for information. It does not exchange, hold, send or transfer money, and it does not provide financial, tax or legal advice.'],
        },
        {
          h: 'Licence and permitted use',
          p: ['We grant you a personal, non-transferable, non-exclusive licence to use the app for private purposes, under Apple\'s standard licensed application terms. You may not copy, modify, reverse-engineer, sell or sublicense the app, or remove its notices.'],
        },
        {
          h: 'Rates and accuracy',
          p: ['Rates come from third-party providers and may be delayed, rounded or unavailable. They can differ from the rate offered by your bank, card or exchange desk, which add margins and fees. Confirm the final amount with your provider before you transact. Use the data at your own risk.'],
        },
        {
          h: 'Ads and purchases',
          p: ['The free version shows ads. An optional in-app purchase removes them. Purchases, refunds and subscriptions-related rules are governed by Apple\'s terms.'],
        },
        {
          h: 'Intellectual property',
          p: ['The app, its design, text, icons and code belong to Albea Systems or its licensors. Third-party names and marks belong to their owners. Divix is not affiliated with Apple Inc. or any bank or rate provider.'],
        },
        {
          h: 'Liability',
          p: ['To the extent permitted by law, we are not liable for indirect or consequential loss, or for financial decisions made on the basis of rates shown in the app.'],
        },
        { h: 'Changes and availability', p: ['We may update, suspend or discontinue the app, and we may update these terms. Continued use after an update means you accept the new terms.'] },
        { h: 'Governing law', p: ['These terms are governed by Spanish law, without affecting any mandatory consumer rights you have where you live.'] },
        { h: 'Contact', p: ['albeasystems@gmail.com'] },
      ],
    },
    support: {
      h1: 'Support',
      lead: 'Answers to the questions we receive most. If yours is not here, write to us and we will reply within 48 hours.',
      items: [
        { q: 'Why is the rate different from my bank?', a: 'Divix shows the mid-market rate. Banks and exchange desks add a margin or fee, so what you receive is usually slightly lower. Our guide on the mid-market rate shows how to measure the difference.' },
        { q: 'How do I add a currency to my favorites?', a: 'Tap the star next to a currency on the converter or in the Markets list. Use the Favorites filter in Markets to see them together.' },
        { q: 'How do I change a currency?', a: 'Tap the currency code on either card, pick another one from the list, and use the filters or search to find it. Tap the swap button to reverse the pair.' },
        { q: 'Does Divix work offline?', a: 'Yes. The last rates are saved on your phone. A label shows whether you are seeing live, cached or offline data.' },
        { q: 'How can I remove ads?', a: 'Open Settings in the app and choose Remove ads. It is a one-time purchase with no subscription. You can also watch a video from the home screen for one hour without ads.' },
        { q: 'I changed phones. How do I restore my purchase?', a: 'Open Settings in Divix on the new phone and tap Restore purchases. Sign in with the same Apple ID you used before.' },
        { q: 'Is there an Android version?', a: 'Not yet. Divix is available for iPhone.' },
        { q: 'A rate looks wrong or out of date.', a: 'Write to us with the currency pair, the value you see and the value you expected. Check the freshness label first: cached or offline rates show the last saved value.' },
      ],
      contactH: 'Still need help?',
      contactP: 'Send us the currency pair, your iOS version and what you expected to see.',
      contactCta: 'Email support',
    },
  },
}
