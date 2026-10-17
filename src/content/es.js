// Copy en español. Reglas: sin rayas largas ni medias, sin verbos de relleno, solo cifras que la app tiene de verdad.
export default {
  lang: 'es',
  locale: 'es-ES',
  ogLocale: 'es_ES',
  dir: 'ltr',
  tagline: 'Conversor de divisas y calculadora para iPhone',

  ui: {
    skip: 'Saltar al contenido',
    getApp: 'Consigue la app gratis',
    getAppShort: 'Consigue la app',
    home: 'Inicio de Divix',
    nav: { guides: 'Guías', faq: 'Preguntas', support: 'Soporte' },
    sign: 'Cambio de divisas',
    menu: 'Menú',
    langName: 'English',
    langLabel: 'Read in English',
    footer: {
      product: 'Divix',
      learn: 'Aprende',
      legal: 'Legal',
      links: { home: 'Inicio', guides: 'Guías', support: 'Soporte', privacy: 'Privacidad', terms: 'Términos' },
      appStore: 'Descárgala en el App Store',
      notice:
        'Divix es una calculadora que muestra tipos de cambio de mercado con fines informativos. No cambia dinero. Divix está publicada por Albea Systems y no está afiliada, respaldada ni patrocinada por Apple Inc., Frankfurter, CoinGecko ni ningún banco. Apple, iPhone y App Store son marcas de Apple Inc.',
      rights: 'Albea Systems. Todos los derechos reservados.',
    },
    breadcrumbs: { home: 'Divix', guides: 'Guías' },
    updated: 'Actualizado',
    readMore: 'Leer la guía',
    backToGuides: 'Todas las guías',
    ctaGuide: 'Comprueba cualquier precio en segundos con Divix',
  },

  seo: {
    home: {
      title: 'Divix: Conversor de divisas y calculadora para iPhone',
      description:
        'Conversor de divisas gratis para iPhone con calculadora integrada. 55 monedas y 20 criptomonedas, favoritos, tipos sin conexión y gráficos de hasta 5 años.',
    },
    guides: {
      title: 'Guías de divisas para viajeros | Divix',
      description:
        'Guías claras sobre el tipo de cambio medio, pagar en moneda local y convertir precios rápido cuando viajas.',
    },
    privacy: { title: 'Política de privacidad | Divix', description: 'Qué datos recoge Divix (muy pocos), cómo funcionan los anuncios y el consentimiento, y cómo contactarnos sobre tus datos.' },
    terms: { title: 'Términos de uso | Divix', description: 'Los términos que se aplican al usar la app conversor de divisas Divix para iPhone.' },
    support: { title: 'Soporte | Divix', description: 'Respuestas sobre tipos, favoritos, uso sin conexión, quitar anuncios y restaurar compras en Divix, y cómo contactarnos.' },
  },

  home: {
    hero: {
      h1: 'Cualquier precio, en tu dinero.',
      h1Lines: ['Cualquier precio,', 'en tu dinero.'],
      sub: 'Divix es un conversor de divisas con calculadora de verdad. 55\u00a0monedas y 20\u00a0criptomonedas, gratis en iPhone.',
      boardTitle: 'Hoy por',
      boardNote: 'Tipos de mercado, variación en 30 días.',
      boardFallback: 'Tipos guardados del {date}. Los tipos en vivo cargan cuando hay conexión.',
      phoneAlt:
        'La app Divix convirtiendo 250 euros a dólares, invirtiendo la conversión, eligiendo Bitcoin, guardando favoritos y abriendo el gráfico de evolución',
    },
    calc: {
      h2: 'Convierte mientras calculas',
      p: 'Bajo las dos tarjetas de moneda hay una calculadora de verdad. Suma la cuenta del restaurante, divídela, multiplica el precio por noche por el número de noches y el resultado en tu moneda se actualiza con cada tecla.',
      points: [
        { h: 'Cuatro operaciones', p: 'Suma, resta, multiplicación y división, con la conversión en vivo.' },
        { h: 'Un toque para invertir', p: 'Pasa de dólares a euros y vuelve sin reescribir el importe.' },
        { h: 'Sin cambiar de app', p: 'La calculadora y el tipo comparten pantalla.' },
      ],
      shotAlt: 'Pantalla de conversión de Divix con 250 euros convertidos a 281,33 dólares y el teclado de la calculadora debajo',
      try: {
        h: 'Pruébalo con los tipos de hoy',
        amount: 'Importe',
        from: 'De',
        to: 'A',
        swap: 'Invertir monedas',
        result: 'Resultado',
        source: 'Tipos de mercado de Frankfurter, {date}. Divix no añade ningún margen.',
        loading: 'Cargando tipos',
        error: 'Ahora mismo no hay tipos disponibles. Revisa tu conexión e inténtalo de nuevo.',
      },
    },
    markets: {
      h2: 'Favoritos y mercados',
      p: 'Toca la estrella de cualquier moneda para tenerla a mano. La pestaña Mercados muestra un importe frente a todas las monedas a la vez y filtra por Todas, Favoritos, Divisas o Cripto.',
      p2: 'Escribe 1 y lee el tipo. Escribe 100 y lee el precio. La lista sigue lo que escribes.',
      marketsAlt: 'Pestaña Mercados de Divix con Bitcoin, euro, libra, yen y otras monedas frente a 1 dólar',
      favoritesAlt: 'Filtro Favoritos de Divix con el dólar y Bitcoin marcados con estrella',
    },
    crypto: {
      h2: 'Bitcoin junto al dólar',
      p: 'Veinte criptomonedas comparten selector con 55 divisas, entre ellas Bitcoin, Ethereum, Solana y XRP. Convierte dólares a BTC igual que conviertes dólares a euros.',
      pickerAlt: 'Selector de moneda de Divix con el filtro Cripto mostrando Bitcoin, Ethereum, Tether, BNB y Solana',
      btcAlt: 'Divix convirtiendo 250 dólares a 0,003066 Bitcoin',
    },
    charts: {
      h2: 'Mira de dónde viene un tipo',
      p: 'Abre la pestaña Gráfico para ver de 7 días a 5 años de historia, con el mínimo, el máximo y la variación del periodo.',
      fresh: {
        h: 'Cada tipo dice lo reciente que es',
        live: 'En vivo: actualizado en las últimas 4 horas.',
        cached: 'Guardado: de una actualización anterior, de hasta un día o más.',
        offline: 'Sin conexión: ves el último tipo guardado y su hora.',
      },
      alt: 'Gráfico de 30 días de Divix para dólar a euro con mínimo, máximo y variación',
    },
    checkout: {
      h2: 'Hecha para la cola de la caja',
      items: [
        { h: 'Funciona sin conexión', p: 'Los últimos tipos se guardan en tu móvil, así que una señal débil no te frena.' },
        { h: 'Sin cuenta', p: 'Abre la app y escribe. Sin email ni contraseña.' },
        { h: 'Sin margen', p: 'Tipos de mercado, el mismo número que encontrarías buscando en internet.' },
        { h: 'Nueve idiomas', p: 'Inglés, español, alemán, francés, italiano, portugués, árabe, hindi y chino.' },
      ],
    },
    pricing: {
      h2: 'Gratis. Paga una vez para quitar anuncios.',
      p: 'Todas las funciones son gratis. Una compra única quita los anuncios para siempre, sin suscripción. También puedes ver un vídeo corto y no ver anuncios durante una hora.',
    },
    faq: {
      h2: 'Preguntas de viajeros',
      items: [
        {
          q: '¿Qué es Divix?',
          a: 'Divix es un conversor de divisas y calculadora gratis para iPhone. Escribes un importe, eliges dos monedas y ves el resultado al instante, con una calculadora en la misma pantalla.',
        },
        {
          q: '¿Cuántas monedas admite Divix?',
          a: 'Divix admite 55 divisas y 20 criptomonedas, entre ellas USD, EUR, GBP, JPY, CHF, Bitcoin, Ethereum, Solana y XRP. Todas aparecen en el mismo selector, con filtros de Divisas y Cripto.',
        },
        {
          q: '¿De dónde salen los tipos de cambio?',
          a: 'Los tipos de las divisas vienen de fuentes públicas de mercado como Frankfurter, con un segundo proveedor de respaldo. Los precios de criptomonedas vienen de CoinGecko. Cada conversión muestra cuándo se actualizó el tipo por última vez.',
        },
        {
          q: '¿Por qué el tipo es distinto al de mi banco?',
          a: 'Divix muestra el tipo de mercado, el punto medio entre compra y venta. Bancos, redes de tarjetas y casas de cambio añaden un margen o una comisión, así que lo que recibes suele ser algo menos. Usa Divix para conocer el tipo de referencia y compáralo con la oferta.',
        },
        {
          q: '¿Funciona Divix sin internet?',
          a: 'Sí. Los últimos tipos se guardan en tu iPhone y Divix muestra su antigüedad: en vivo, guardado o sin conexión. Al volver la conexión, los tipos se actualizan.',
        },
        {
          q: '¿Necesito una cuenta?',
          a: 'No. No hay registro. Tus favoritos y ajustes se quedan en tu dispositivo.',
        },
        {
          q: '¿Es gratis Divix?',
          a: 'Sí. Todas las funciones son gratis y la versión gratuita muestra anuncios. Una compra única dentro de la app los quita, y también puedes ver un vídeo para no ver anuncios durante una hora. No hay suscripción.',
        },
        {
          q: '¿En qué dispositivos funciona Divix?',
          a: 'Divix funciona en iPhone con iOS 17.6 o posterior. Todavía no hay versión para Android.',
        },
      ],
    },
    guides: {
      h2: 'Guías para gastar en el extranjero',
      p: 'Explicaciones cortas y claras de cómo funcionan los tipos de cambio y cómo pagar menos cuando viajas.',
    },
    final: {
      h2: 'Conoce el precio antes de pagar.',
      p: 'Gratis en el App Store para iPhone.',
    },
  },

  guides: {
    ids: ['guide-mid-market', 'guide-local-currency', 'guide-travel'],
    h1: 'Guías de divisas para viajeros',
    intro: 'Tres guías cortas sobre cómo funcionan los tipos de cambio, pensadas para aplicarlas en un puesto de mercado o en un datáfono.',
  },

  guide: {
    'guide-mid-market': {
      title: 'Qué es el tipo de cambio medio y por qué difiere',
      description: 'El tipo medio es el punto intermedio entre compra y venta. Descubre por qué bancos y casas de cambio ofrecen menos y cómo calcular tú mismo el margen.',
      h1: '¿Qué es el tipo de cambio medio?',
      lead: 'El tipo de cambio medio es el punto intermedio entre el precio al que los operadores compran una divisa y el precio al que la venden. Es el número de referencia antes de que nadie añada un margen.',
      summary: 'El tipo de referencia antes de márgenes, y cómo medir el margen que te ofrecen.',
      sections: [
        {
          h: 'La respuesta corta',
          p: [
            'Cuando buscas "dólares a euros" en internet, el número que ves casi siempre es un tipo medio. Está a medio camino entre el precio de compra y el de venta del mercado mayorista de divisas.',
            'Es una referencia justa porque no contiene comisión ni margen. Y tampoco es un precio que normalmente puedas conseguir como cliente.',
          ],
        },
        {
          h: 'Por qué casi nunca lo consigues',
          p: [
            'Bancos, redes de tarjetas, casas de cambio y servicios de transferencia ganan dinero cambiando el tipo, cobrando una comisión o ambas cosas. Un mostrador que anuncia "sin comisión" puede ofrecer un tipo bastante peor que el medio.',
            'La diferencia suele ser mayor donde el cliente tiene menos alternativas, como los mostradores de aeropuerto y las zonas turísticas.',
          ],
        },
        {
          h: 'Cómo medir el margen',
          p: ['Compara el tipo que te ofrecen con el tipo medio del mismo día. El margen es la diferencia, como porcentaje del tipo medio.'],
          list: [
            'Busca el tipo medio de hoy para el par de monedas.',
            'Averigua el tipo que te ofrecen, o divide lo que recibirías entre lo que entregas.',
            'Resta el tipo ofrecido al tipo medio y divide entre el tipo medio.',
          ],
          after: 'Ejemplo: si el tipo medio es 1 euro = 1,10 dólares y un mostrador ofrece 1,04, recibes un 5,5 por ciento menos que la referencia. Las cifras son una ilustración, no una cotización en vivo.',
        },
        {
          h: 'Qué hacer',
          list: [
            'Pregunta por el total que recibirás, no solo por el tipo, y compara totales.',
            'Mide cualquier comisión fija contra el importe de la operación. Una cuota fija pesa más en una cantidad pequeña.',
            'Compara dos o tres opciones antes de decidir, sobre todo si el importe es grande.',
          ],
        },
        {
          h: 'Dónde encaja Divix',
          p: ['Divix muestra el tipo medio con una etiqueta de frescura, para que veas a qué distancia de la referencia está una oferta. Es una calculadora, no una casa de cambio, y no añade ningún margen propio.'],
        },
      ],
      faq: [
        { q: '¿El tipo medio es lo mismo que el tipo interbancario?', a: 'Se parecen mucho. El tipo interbancario es el que usan los grandes bancos entre ellos. Los tipos medios públicos son un punto medio publicado que lo aproxima.' },
        { q: '¿Puedo conseguir el tipo medio como cliente?', a: 'Rara vez exactamente. Algunos proveedores se acercan y lo dicen abiertamente. Medir el margen te muestra cuánto.' },
      ],
    },
    'guide-local-currency': {
      title: 'Pagar en moneda local: evita la conversión dinámica',
      description: 'Cuando un datáfono o cajero en el extranjero te ofrece cobrarte en tu moneda, la respuesta suele ser no. Descubre por qué y cómo comprobar el precio.',
      h1: 'Paga en moneda local',
      lead: 'En el extranjero, un datáfono o un cajero puede preguntarte si quieres pagar en tu moneda o en la local. Elegir la moneda local suele ser la mejor respuesta.',
      summary: 'Por qué "pagar en tu moneda" suele costar más, y una comprobación de diez segundos.',
      sections: [
        {
          h: 'Qué es la conversión dinámica de divisas',
          p: [
            'La conversión dinámica de divisas, o DCC, deja que el comercio o el operador del cajero haga la conversión en el momento del pago. La pantalla muestra un total en tu moneda y te pide aceptar.',
            'Parece cómoda porque ves un importe conocido. Esa comodidad es lo que pagas.',
          ],
        },
        {
          h: 'Por qué la moneda local suele ser mejor',
          p: [
            'Con DCC, el tipo lo fija el proveedor que hay detrás del terminal y suele llevar un margen mayor que el tipo que aplicaría el emisor de tu tarjeta. Si lo rechazas, tu banco convierte el importe local con su propio tipo y su comisión por operaciones en el extranjero.',
            'Las condiciones de cada tarjeta varían, así que lee una vez la comisión de tu tarjeta antes de viajar. Después, la regla es simple.',
          ],
        },
        {
          h: 'Una comprobación de diez segundos',
          list: [
            'Lee el precio en moneda local.',
            'Conviértelo al tipo medio. En Divix, escribe el precio local y lee tu moneda.',
            'Compáralo con el total en tu moneda que propone el terminal. Si es claramente mayor, elige la moneda local.',
          ],
        },
        {
          h: 'Hábitos que ayudan',
          list: [
            'Elige la moneda local en datáfonos y cajeros, siempre.',
            'Si un cajero convierte por ti, pide pagar en la moneda local.',
            'Guarda el recibo y comprueba qué moneda muestra.',
          ],
        },
      ],
      faq: [
        { q: '¿La conversión dinámica siempre es más cara?', a: 'No en todos los casos, pero a menudo sí. La comprobación de diez segundos te lo dice para la operación que tienes delante.' },
        { q: '¿Se aplica también a los cajeros?', a: 'Sí. Los cajeros en el extranjero pueden mostrar la misma elección entre tu moneda y la local. Elegir la local es la opción más segura.' },
      ],
    },
    'guide-travel': {
      title: 'Cómo convertir divisas rápido cuando viajas',
      description: 'Formas prácticas de convertir precios extranjeros a tu dinero en un puesto, una carta o una caja, con y sin conexión.',
      h1: 'Convierte precios rápido cuando viajas',
      lead: 'No necesitas cifras exactas para decidir. Necesitas una referencia fiable y una calculadora a mano.',
      summary: 'Referencias, favoritos y tipos sin conexión para el momento de comprar.',
      sections: [
        {
          h: 'Antes de salir',
          list: [
            'Marca con estrella las monedas que vas a usar para tenerlas a un toque.',
            'Abre la app una vez con conexión para que los tipos queden guardados sin conexión.',
            'Apunta el tipo base del viaje, por ejemplo 1 dólar = 18 pesos mexicanos.',
          ],
        },
        {
          h: 'Crea una referencia',
          p: ['Una referencia es un tipo que puedes escalar de cabeza. Si 1 dólar son unos 18 pesos, 100 pesos son algo más de 5 dólares y 1.000 pesos, algo más de 55.'],
          after: 'Para monedas sin decimales, como el yen japonés, usa un importe redondo. A 158 yenes por dólar, 1.000 yenes son unos 6,30 dólares. Son tipos de ejemplo, así que comprueba los de hoy.',
        },
        {
          h: 'En el puesto o en la caja',
          list: [
            'Escribe el precio local una vez y lee el importe en tu dinero.',
            'Usa la calculadora para cantidades, como cuatro entradas o seis noches, y el total se convierte en un paso.',
            'Invierte la dirección cuando negocies, para decir tu precio en la moneda local.',
          ],
        },
        {
          h: 'Cuando se va la señal',
          p: ['Divix guarda los últimos tipos en tu móvil y los etiqueta como en vivo, guardados o sin conexión. Un tipo de hace unas horas basta para la mayoría de compras, y la etiqueta te avisa cuando no.'],
        },
      ],
      faq: [
        { q: '¿Qué precisión necesita el tipo para ir de compras?', a: 'Para compras del día a día, un tipo de mercado del mismo día es suficiente para decidir. Tu tarjeta o el mostrador aplicarán su propio margen encima.' },
        { q: '¿Puedo convertir criptomonedas igual?', a: 'Sí. Divix incluye 20 criptomonedas junto a las divisas, así que Bitcoin a dólares funciona como cualquier otro par.' },
      ],
    },
  },

  legal: {
    updatedOn: 'Última actualización: 17 de octubre de 2026',
    privacy: {
      h1: 'Política de privacidad',
      lead: 'Divix no necesita cuenta y recoge muy poco. Esta política explica qué ocurre con los datos cuando usas la app de iOS.',
      sections: [
        { h: 'Quiénes somos', p: ['Divix está publicada por Albea Systems. Contacto: albeasystems@gmail.com.'] },
        {
          h: 'Lo que no recogemos',
          p: ['Divix no tiene registro ni cuenta de usuario. No pedimos ni guardamos tu nombre, correo electrónico, teléfono, contactos, fotos ni ubicación.'],
        },
        {
          h: 'Lo que se queda en tu dispositivo',
          p: ['Tu moneda base, favoritos, orden de la lista y los tipos guardados se almacenan solo en tu dispositivo. Al borrar la app desaparecen. No tenemos copia.'],
        },
        {
          h: 'Tipos de cambio',
          p: ['Para mostrar tipos, la app solicita datos públicos a proveedores de tipos de cambio (por ejemplo Frankfurter y CoinGecko). Estas solicitudes contienen las monedas consultadas y datos técnicos como tu dirección IP, que toda petición a internet lleva. No contienen información que nos identifique a ti.'],
        },
        {
          h: 'Publicidad y consentimiento',
          p: [
            'La versión gratuita muestra anuncios. Los anuncios se sirven mediante un servicio de mediación publicitaria y sus redes publicitarias asociadas, que pueden incluir Google AdMob, Meta Audience Network y Unity Ads. Estos socios pueden tratar identificadores del dispositivo y datos de uso para elegir y medir anuncios.',
            'Antes de la publicidad personalizada, la app te pide consentimiento mediante la ventana de Transparencia de seguimiento de apps de Apple y, cuando corresponde, un formulario de consentimiento para el EEE, el Reino Unido y Suiza. Si lo rechazas, los anuncios no se personalizan en la medida en que la ley y la red lo permitan. Puedes cambiar tus elecciones en Ajustes de iOS, Privacidad y seguridad, Seguimiento.',
            'Una compra única dentro de la app quita los anuncios. Ver un vídeo con recompensa los desactiva durante una hora.',
          ],
        },
        {
          h: 'Compras dentro de la app',
          p: ['Las compras las gestiona Apple a través del App Store. Nunca vemos ni guardamos tus datos de pago.'],
        },
        {
          h: 'Diagnósticos',
          p: ['Si la app se cierra de forma inesperada, Apple puede compartirnos informes de fallos anónimos a través de App Store Connect, si lo permitiste en iOS. No contienen información financiera.'],
        },
        { h: 'Menores', p: ['Divix no está dirigida a menores de 16 años y no recogemos sus datos de forma consciente.'] },
        {
          h: 'Tus derechos',
          p: ['Como no guardamos datos personales tuyos, normalmente no hay nada que consultar ni borrar. Si crees que sí, escríbenos y responderemos en un plazo razonable. Cuando la normativa de protección de datos te sea aplicable, también puedes acudir a tu autoridad local.'],
        },
        { h: 'Cambios', p: ['Podemos actualizar esta política. La fecha de arriba indica la última revisión. Los cambios importantes se reflejarán en una actualización de la app.'] },
        { h: 'Contacto', p: ['albeasystems@gmail.com'] },
      ],
    },
    terms: {
      h1: 'Términos de uso',
      lead: 'Estos términos se aplican cuando descargas y usas la app Divix para iPhone.',
      sections: [
        { h: 'Aceptación', p: ['Al usar Divix aceptas estos términos. Si no estás de acuerdo, no uses la app.'] },
        {
          h: 'Qué es Divix',
          p: ['Divix es un conversor de divisas y calculadora. Muestra tipos de cambio de mercado con fines informativos. No cambia, custodia, envía ni transfiere dinero, y no ofrece asesoramiento financiero, fiscal ni jurídico.'],
        },
        {
          h: 'Licencia y uso permitido',
          p: ['Te concedemos una licencia personal, intransferible y no exclusiva para usar la app con fines privados, conforme a los términos estándar de aplicaciones con licencia de Apple. No puedes copiar, modificar, aplicar ingeniería inversa, vender ni sublicenciar la app, ni retirar sus avisos.'],
        },
        {
          h: 'Tipos y exactitud',
          p: ['Los tipos proceden de proveedores externos y pueden llegar con retraso, redondeados o no estar disponibles. Pueden diferir del tipo que ofrezca tu banco, tarjeta o casa de cambio, que aplican márgenes y comisiones. Confirma el importe final con tu proveedor antes de operar. Usas los datos bajo tu responsabilidad.'],
        },
        {
          h: 'Anuncios y compras',
          p: ['La versión gratuita muestra anuncios. Una compra opcional dentro de la app los quita. Las compras y los reembolsos se rigen por los términos de Apple.'],
        },
        {
          h: 'Propiedad intelectual',
          p: ['La app, su diseño, textos, iconos y código pertenecen a Albea Systems o a sus licenciantes. Los nombres y marcas de terceros pertenecen a sus titulares. Divix no está afiliada a Apple Inc. ni a ningún banco o proveedor de tipos.'],
        },
        {
          h: 'Responsabilidad',
          p: ['En la medida permitida por la ley, no respondemos de pérdidas indirectas o consecuentes, ni de decisiones financieras tomadas a partir de los tipos mostrados en la app.'],
        },
        { h: 'Cambios y disponibilidad', p: ['Podemos actualizar, suspender o retirar la app y actualizar estos términos. Seguir usándola tras una actualización implica aceptar los nuevos términos.'] },
        { h: 'Ley aplicable', p: ['Estos términos se rigen por la ley española, sin perjuicio de los derechos imperativos de consumidor que tengas en tu lugar de residencia.'] },
        { h: 'Contacto', p: ['albeasystems@gmail.com'] },
      ],
    },
    support: {
      h1: 'Soporte',
      lead: 'Respuestas a las preguntas que más recibimos. Si la tuya no está, escríbenos y respondemos en 48 horas.',
      items: [
        { q: '¿Por qué el tipo es distinto al de mi banco?', a: 'Divix muestra el tipo de mercado. Bancos y casas de cambio añaden un margen o comisión, así que lo que recibes suele ser algo menos. Nuestra guía sobre el tipo de cambio medio muestra cómo medir la diferencia.' },
        { q: '¿Cómo añado una moneda a favoritos?', a: 'Toca la estrella junto a una moneda en el conversor o en la lista de Mercados. Usa el filtro Favoritos en Mercados para verlas juntas.' },
        { q: '¿Cómo cambio una moneda?', a: 'Toca el código de moneda en cualquiera de las tarjetas, elige otra de la lista y usa los filtros o el buscador para encontrarla. Toca el botón de invertir para dar la vuelta al par.' },
        { q: '¿Funciona Divix sin conexión?', a: 'Sí. Los últimos tipos se guardan en tu móvil. Una etiqueta indica si ves datos en vivo, guardados o sin conexión.' },
        { q: '¿Cómo quito los anuncios?', a: 'Abre Ajustes en la app y elige Quitar anuncios. Es una compra única sin suscripción. También puedes ver un vídeo desde la pantalla principal para no ver anuncios durante una hora.' },
        { q: 'He cambiado de móvil. ¿Cómo restauro mi compra?', a: 'Abre Ajustes en Divix en el móvil nuevo y toca Restaurar compras. Inicia sesión con el mismo ID de Apple que usaste antes.' },
        { q: '¿Hay versión para Android?', a: 'Todavía no. Divix está disponible para iPhone.' },
        { q: 'Un tipo parece incorrecto o desactualizado.', a: 'Escríbenos con el par de monedas, el valor que ves y el que esperabas. Mira antes la etiqueta de frescura: los tipos guardados o sin conexión muestran el último valor guardado.' },
      ],
      contactH: '¿Sigues necesitando ayuda?',
      contactP: 'Envíanos el par de monedas, tu versión de iOS y lo que esperabas ver.',
      contactCta: 'Escribir a soporte',
    },
  },
}
