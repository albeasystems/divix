// Textos em português. Regras: sem travessões, sem verbos de enchimento, números só se a app os tiver mesmo.
export default {
  lang: 'pt',
  locale: 'pt-PT',
  ogLocale: 'pt_PT',
  dir: 'ltr',
  tagline: 'Conversor de moedas e calculadora para iPhone',

  ui: {
    skip: 'Saltar para o conteúdo',
    getApp: 'Obter a app grátis',
    getAppShort: 'Obter a app',
    home: 'Página inicial do Divix',
    nav: { guides: 'Guias', faq: 'Perguntas', support: 'Suporte' },
    sign: 'Câmbio de moedas',
    menu: 'Menu',
    langMenu: 'Idioma',
    footer: {
      product: 'Divix',
      learn: 'Aprender',
      legal: 'Legal',
      links: { home: 'Início', guides: 'Guias', support: 'Suporte', privacy: 'Privacidade', terms: 'Termos' },
      appStore: 'Transferir na App Store',
      notice:
        'O Divix é uma calculadora que mostra taxas de câmbio médias de mercado para fins informativos. Não troca dinheiro. O Divix é publicado pela Albea Systems e não é afiliado, aprovado nem patrocinado pela Apple Inc., Frankfurter, CoinGecko ou por qualquer banco. Apple, iPhone e App Store são marcas da Apple Inc.',
      rights: 'Albea Systems. Todos os direitos reservados.',
    },
    breadcrumbs: { home: 'Divix', guides: 'Guias' },
    updated: 'Atualizado em',
    by: 'Por',
    related: 'Mais guias',
    readMore: 'Ler o guia',
    backToGuides: 'Todos os guias',
    ctaGuide: 'Confirme qualquer preço em segundos com o Divix',
  },

  seo: {
    imgAlt: 'Divix: conversor de moedas com calculadora integrada para iPhone',
    home: {
      title: 'Divix: conversor de moedas e calculadora para iPhone',
      description:
        'Conversor de moedas grátis para iPhone com calculadora integrada. 55 moedas e 20 criptomoedas, favoritos, taxas em direto e offline, gráficos até 5 anos.',
    },
    guides: {
      title: 'Guias de câmbio para viajantes | Divix',
      description:
        'Guias claros sobre a taxa média de mercado, pagar na moeda local e converter preços depressa quando viaja.',
    },
    privacy: { title: 'Política de privacidade | Divix', description: 'O que o Divix recolhe (muito pouco), como funcionam os anúncios e o consentimento, e como nos contactar sobre os seus dados.' },
    terms: { title: 'Termos de utilização | Divix', description: 'Os termos que se aplicam ao utilizar a app conversora de moedas Divix para iPhone.' },
    support: { title: 'Suporte | Divix', description: 'Respostas sobre as taxas do Divix, favoritos, uso offline, remover anúncios e restaurar compras, e como nos contactar.' },
  },

  home: {
    hero: {
      h1: 'Qualquer preço, na sua moeda.',
      h1Lines: ['Qualquer preço,', 'na sua moeda.'],
      sub: 'O Divix é um conversor de moedas com uma calculadora a sério integrada. 55 moedas e 20 criptomoedas, grátis no iPhone.',
      boardTitle: 'Hoje para',
      boardNote: 'Taxas médias de mercado, variação em 30 dias.',
      boardFallback: 'Taxas guardadas de {date}. As taxas em direto carregam quando estiver online.',
      phoneAlt:
        'A app Divix a converter 250 euros em dólares, a trocar para dólares e euros, a escolher Bitcoin, a guardar favoritos e a abrir o gráfico do histórico',
    },
    calc: {
      h2: 'Converta enquanto calcula',
      p: 'Por baixo dos dois cartões de moeda está uma calculadora a sério. Some a conta de um restaurante, divida-a, multiplique o preço por noite pelo número de noites, e o resultado na sua moeda atualiza-se a cada tecla.',
      points: [
        { h: 'Quatro operações', p: 'Mais, menos, vezes e dividir, com a conversão a correr em direto.' },
        { h: 'Um toque para trocar', p: 'Passe de dólares para euros e vice-versa sem voltar a escrever o valor.' },
        { h: 'Sem mudar de app', p: 'A calculadora e a taxa partilham o mesmo ecrã.' },
      ],
      shotAlt: 'Ecrã de conversão do Divix com 250 euros convertidos em 281,33 dólares americanos e o teclado da calculadora por baixo',
      try: {
        h: 'Experimente com as taxas de hoje',
        amount: 'Valor',
        from: 'De',
        to: 'Para',
        swap: 'Trocar moedas',
        result: 'Resultado',
        source: 'Taxas médias de mercado do Frankfurter, {date}. O Divix não acrescenta margem.',
        loading: 'A carregar taxas',
        error: 'As taxas não estão disponíveis neste momento. Verifique a ligação e tente novamente.',
      },
    },
    markets: {
      h2: 'Favoritos e mercados',
      p: 'Toque na estrela de qualquer moeda para a ter à mão. O separador Mercados mostra um valor face a todas as moedas ao mesmo tempo e filtra por Todas, Favoritos, Moedas ou Cripto.',
      p2: 'Escreva 1 e leia a taxa. Escreva 100 e leia o preço. A lista acompanha o que escreve.',
      marketsAlt: 'Separador Mercados do Divix com Bitcoin, euro, libra, iene e outras moedas face a 1 dólar americano',
      favoritesAlt: 'Filtro Favoritos do Divix com o dólar americano e o Bitcoin marcados com uma estrela',
    },
    crypto: {
      h2: 'Bitcoin ao lado do dólar',
      p: 'Vinte criptomoedas partilham o seletor com 55 moedas tradicionais, incluindo Bitcoin, Ethereum, Solana e XRP. Converta dólares em BTC como converte dólares em euros.',
      pickerAlt: 'Seletor de moedas do Divix com o filtro Cripto a mostrar Bitcoin, Ethereum, Tether, BNB e Solana',
      btcAlt: 'O Divix a converter 250 dólares americanos em 0,003066 Bitcoin',
    },
    charts: {
      h2: 'Veja de onde vem uma taxa',
      p: 'Abra o separador Gráfico para ver um histórico de 7 dias a 5 anos, com o mínimo, o máximo e a variação no período.',
      fresh: {
        h: 'Cada taxa diz quão recente é',
        live: 'Em direto: atualizada nas últimas 4 horas.',
        cached: 'Em cache: guardada numa atualização anterior, com um dia ou mais.',
        offline: 'Offline: sem ligação, por isso vê a última taxa guardada e a sua hora.',
      },
      alt: 'Gráfico de 30 dias do Divix de dólar americano para euro, com mínimo, máximo e variação',
    },
    checkout: {
      h2: 'Feito para a fila da caixa',
      items: [
        { h: 'Funciona offline', p: 'As últimas taxas ficam guardadas no telemóvel, por isso um sinal fraco não o trava.' },
        { h: 'Sem conta', p: 'Abra a app e escreva. Sem email, sem palavra-passe.' },
        { h: 'Sem margem', p: 'Taxas médias de mercado, o mesmo número que encontraria a pesquisar online.' },
        { h: 'Doze idiomas', p: 'Inglês, espanhol, francês, italiano, alemão, português, árabe, chinês, hindi, japonês, coreano e vietnamita.' },
      ],
    },
    pricing: {
      h2: 'Grátis. Pague uma vez para remover os anúncios.',
      p: 'Todas as funcionalidades são grátis. Uma compra única remove os anúncios para sempre, sem subscrição. Também pode ver um vídeo curto para ter uma hora sem anúncios.',
    },
    faq: {
      h2: 'Perguntas que os viajantes fazem',
      items: [
        {
          q: 'O que é o Divix?',
          a: 'O Divix é um conversor de moedas e calculadora grátis para iPhone. Escreve um valor, escolhe duas moedas e vê logo o resultado, com uma calculadora no mesmo ecrã.',
        },
        {
          q: 'Quantas moedas suporta o Divix?',
          a: 'O Divix suporta 55 moedas tradicionais e 20 criptomoedas, incluindo USD, EUR, GBP, JPY, CHF, Bitcoin, Ethereum, Solana e XRP. Aparecem todas no mesmo seletor, com filtros Moedas e Cripto.',
        },
        {
          q: 'De onde vêm as taxas de câmbio?',
          a: 'As taxas das moedas vêm de fontes públicas de taxa média, como o Frankfurter, com um segundo fornecedor de reserva. Os preços das criptomoedas vêm do CoinGecko. Cada conversão mostra quando a taxa foi atualizada pela última vez.',
        },
        {
          q: 'Porque é que a taxa é diferente da do meu banco?',
          a: 'O Divix mostra a taxa média de mercado, o ponto intermédio entre os preços de compra e de venda. Bancos, redes de cartões e casas de câmbio acrescentam uma margem ou comissão, por isso o valor que recebe costuma ser um pouco inferior. Use o Divix para conhecer a taxa de referência e depois compare-a com a oferta.',
        },
        {
          q: 'O Divix funciona sem internet?',
          a: 'Sim. As últimas taxas ficam guardadas no seu iPhone e o Divix mostra a sua idade: em direto, em cache ou offline. Quando voltar a ligar, as taxas atualizam-se.',
        },
        {
          q: 'Preciso de uma conta?',
          a: 'Não. Não há registo. Os seus favoritos e definições ficam no seu dispositivo.',
        },
        {
          q: 'O Divix é grátis?',
          a: 'Sim. Todas as funcionalidades são grátis e a versão grátis mostra anúncios. Uma compra integrada única remove-os, e também pode ver um vídeo para ter uma hora sem anúncios. Não há subscrição.',
        },
        {
          q: 'Em que dispositivos funciona o Divix?',
          a: 'O Divix funciona em iPhone com iOS 17.6 ou posterior. Ainda não existe versão Android.',
        },
      ],
    },
    guides: {
      h2: 'Guias para gastar no estrangeiro',
      p: 'Explicações curtas e claras sobre como funcionam as taxas de câmbio e como pagar menos quando viaja.',
    },
    final: {
      h2: 'Saiba o preço antes de pagar.',
      p: 'Grátis na App Store para iPhone.',
    },
  },

  guides: {
    ids: ['guide-mid-market', 'guide-local-currency', 'guide-travel'],
    h1: 'Guias de câmbio para viajantes',
    intro: 'Três guias curtos sobre como funcionam as taxas de câmbio, escritos para poder agir numa banca de mercado ou num terminal de cartões.',
  },

  guide: {
    'guide-mid-market': {
      title: 'O que é a taxa média de mercado? Porque é que o seu banco difere',
      description: 'A taxa média de mercado é o ponto intermédio entre os preços de compra e de venda. Saiba porque é que bancos e casas de câmbio oferecem menos e como verificar a margem por si.',
      h1: 'O que é a taxa média de mercado?',
      lead: 'A taxa média de mercado é o ponto intermédio entre o preço a que os operadores compram uma moeda e o preço a que a vendem. É o número de referência antes de alguém acrescentar uma margem.',
      summary: 'A taxa de referência antes das margens e como medir a margem que lhe oferecem.',
      sections: [
        {
          h: 'A resposta curta',
          p: [
            'Quando pesquisa "dólares para euros" online, o número que vê é quase sempre uma taxa média de mercado. Fica a meio caminho entre o preço de compra e o preço de venda no mercado grossista de moedas.',
            'É uma referência justa porque não contém comissão nem margem. Também não é um preço que normalmente consiga obter como cliente.',
          ],
        },
        {
          h: 'Porque raramente a obtém',
          p: [
            'Bancos, redes de cartões, casas de câmbio e serviços de transferência ganham dinheiro alterando a taxa, cobrando uma comissão, ou ambos. Um balcão que anuncia zero comissões pode ainda assim oferecer uma taxa bem abaixo da taxa média de mercado.',
            'A diferença tende a ser maior onde os clientes têm menos alternativas, como nos balcões de aeroporto e nas zonas turísticas.',
          ],
        },
        {
          h: 'Como medir a margem',
          p: ['Compare a taxa que lhe oferecem com a taxa média de mercado do mesmo dia. A margem é a diferença, como parte da taxa média de mercado.'],
          list: [
            'Procure a taxa média de mercado de hoje para o par.',
            'Encontre a taxa que lhe oferecem, ou divida o valor que receberia pelo valor que entrega.',
            'Subtraia a taxa oferecida da taxa média de mercado e divida pela taxa média de mercado.',
          ],
          after: 'Exemplo: se a taxa média de mercado for 1 euro = 1,10 dólares americanos e um balcão oferecer 1,04, recebe cerca de 5,5 por cento menos do que a referência. Os números aqui são uma ilustração, não uma cotação em direto.',
        },
        {
          h: 'O que fazer',
          list: [
            'Peça o total que vai receber, não apenas a taxa, e compare totais.',
            'Confronte qualquer comissão fixa com o tamanho da operação. Uma comissão fixa pesa mais num valor pequeno.',
            'Compare duas ou três opções antes de se decidir, sobretudo em valores maiores.',
          ],
        },
        {
          h: 'Onde o Divix entra',
          p: ['O Divix mostra a taxa média de mercado com uma etiqueta de atualidade, para ver a que distância da referência está uma oferta. É uma calculadora, não uma casa de câmbio, e não acrescenta margem própria.'],
        },
      ],
      faq: [
        { q: 'A taxa média de mercado é igual à taxa interbancária?', a: 'São próximas. A taxa interbancária é a que os grandes bancos usam entre si. As taxas médias de mercado públicas são um ponto intermédio publicado que a aproxima.' },
        { q: 'Posso obter a taxa média de mercado como cliente?', a: 'Raramente ao número exato. Alguns fornecedores aproximam-se e dizem-no abertamente. Medir a margem mostra quanto.' },
      ],
    },
    'guide-local-currency': {
      title: 'Pagar na moeda local: evitar a conversão dinâmica',
      description: 'Quando um terminal ou caixa automático no estrangeiro se oferece para o cobrar na sua moeda, a resposta é normalmente não. Veja porquê e como verificar o preço.',
      h1: 'Pagar na moeda local',
      lead: 'No estrangeiro, um terminal de cartões ou uma caixa automática pode perguntar se quer pagar na sua moeda ou na moeda local. Escolher a moeda local costuma ser a melhor resposta.',
      summary: 'Porque é que "pagar na sua moeda" custa muitas vezes mais, e uma verificação de dez segundos.',
      sections: [
        {
          h: 'O que é a conversão dinâmica de moeda',
          p: [
            'A conversão dinâmica de moeda, ou DCC, deixa o comerciante ou o operador da caixa automática fazer a conversão no momento do pagamento. O ecrã mostra um total na sua moeda e pede-lhe que aceite.',
            'Parece conveniente porque vê um valor familiar. A conveniência é aquilo que paga.',
          ],
        },
        {
          h: 'Porque é que a moeda local costuma ser melhor',
          p: [
            'Com a DCC, a taxa de câmbio é definida pelo fornecedor por trás do terminal e muitas vezes tem uma margem maior do que a taxa que o emissor do seu cartão aplicaria. Se recusar, o seu banco converte o valor local com a sua própria taxa e eventuais comissões por operação no estrangeiro.',
            'As condições dos cartões variam, por isso leia uma vez a comissão por operações no estrangeiro do seu cartão antes de viajar. Depois a regra é simples.',
          ],
        },
        {
          h: 'Uma verificação de dez segundos',
          list: [
            'Leia o preço na moeda local.',
            'Converta-o à taxa média de mercado. No Divix, escreva o preço local e leia a sua moeda.',
            'Compare com o total na moeda de origem que o terminal propõe. Se for claramente mais alto, escolha a moeda local.',
          ],
        },
        {
          h: 'Hábitos que ajudam',
          list: [
            'Escolha a moeda local em terminais de cartões e caixas automáticas, sempre.',
            'Se um funcionário converter por si, peça para pagar na moeda local.',
            'Guarde o talão e verifique que moeda mostra.',
          ],
        },
      ],
      faq: [
        { q: 'A conversão dinâmica de moeda é sempre mais cara?', a: 'Nem sempre, mas muitas vezes. A verificação de dez segundos diz-lhe como é na operação que tem à frente.' },
        { q: 'Isto aplica-se às caixas automáticas?', a: 'Sim. As caixas automáticas no estrangeiro podem mostrar a mesma escolha entre moeda de origem e local. Escolher a moeda local é a opção mais segura.' },
      ],
    },
    'guide-travel': {
      title: 'Como converter moeda depressa em viagem',
      description: 'Formas práticas de transformar preços estrangeiros no seu dinheiro numa banca, num menu ou numa caixa, com e sem ligação.',
      h1: 'Converta preços depressa em viagem',
      lead: 'Não precisa de números exatos para decidir. Precisa de uma âncora fiável e de uma calculadora à mão.',
      summary: 'Âncoras, favoritos e taxas offline para o momento da compra.',
      sections: [
        {
          h: 'Antes de partir',
          list: [
            'Marque com estrela as moedas que vai usar para as ter a um toque.',
            'Abra a app uma vez com ligação para que as taxas fiquem guardadas para uso offline.',
            'Anote a taxa base da sua viagem, por exemplo 1 dólar americano = 18 pesos mexicanos.',
          ],
        },
        {
          h: 'Crie uma âncora',
          p: ['Uma âncora é uma taxa que consegue escalar de cabeça. Se 1 dólar americano valer cerca de 18 pesos, então 100 pesos são pouco mais de 5 dólares e 1.000 pesos pouco mais de 55.'],
          after: 'Para moedas sem decimais, como o iene japonês, use um valor redondo como âncora. A 158 ienes por dólar, 1.000 ienes são cerca de 6,30 dólares. São taxas de exemplo, por isso confirme as de hoje.',
        },
        {
          h: 'Na banca ou na caixa',
          list: [
            'Escreva o preço local uma vez e leia o valor no seu dinheiro.',
            'Use a calculadora para quantidades, como quatro bilhetes ou seis noites, para que o total se converta num só passo.',
            'Troque o sentido quando negociar, para dizer o seu preço na moeda local.',
          ],
        },
        {
          h: 'Quando o sinal cai',
          p: ['O Divix guarda as últimas taxas no telemóvel e etiqueta-as como em direto, em cache ou offline. Uma taxa com algumas horas chega para a maioria das compras, e a etiqueta diz-lhe quando não chega.'],
        },
      ],
      faq: [
        { q: 'Que precisão deve ter a taxa para fazer compras?', a: 'Para compras do dia a dia, uma taxa média de mercado do mesmo dia é suficientemente precisa para decidir. O seu cartão ou o balcão aplicará a sua própria margem por cima.' },
        { q: 'Posso converter criptomoedas da mesma forma?', a: 'Sim. O Divix lista 20 criptomoedas ao lado das moedas tradicionais, por isso Bitcoin para dólares funciona como qualquer outro par.' },
      ],
    },
  },

  legal: {
    updatedOn: 'Última atualização: 17 de outubro de 2026',
    privacy: {
      h1: 'Política de privacidade',
      lead: 'O Divix não precisa de conta e recolhe muito pouco. Esta política explica o que acontece aos dados quando usa a app iOS.',
      sections: [
        { h: 'Quem somos', p: ['O Divix é publicado pela Albea Systems. Contacto: albeasystems@gmail.com.'] },
        {
          h: 'O que não recolhemos',
          p: ['O Divix não tem registo nem conta de utilizador. Não pedimos nem guardamos o seu nome, endereço de email, número de telefone, contactos, fotografias ou localização.'],
        },
        {
          h: 'O que fica no seu dispositivo',
          p: ['A sua moeda base, favoritos, ordem da lista e taxas de câmbio em cache ficam guardados apenas no seu dispositivo. Eliminar a app remove-os. Não temos cópia.'],
        },
        {
          h: 'Taxas de câmbio',
          p: ['Para mostrar taxas, a app pede dados públicos a fornecedores de taxas de câmbio (por exemplo, Frankfurter e CoinGecko). Estes pedidos contêm as moedas consultadas e dados técnicos como o seu endereço IP, que qualquer pedido de internet transporta. Não contêm informação que o identifique perante nós.'],
        },
        {
          h: 'Publicidade e consentimento',
          p: [
            'A versão grátis mostra anúncios. Os anúncios são entregues através de um serviço de mediação publicitária e das suas redes parceiras, que podem incluir Google AdMob, Meta Audience Network e Unity Ads. Estes parceiros podem tratar identificadores do dispositivo e dados de utilização para escolher e medir anúncios.',
            'Antes de publicidade personalizada, a app pede o seu consentimento através do pedido App Tracking Transparency da Apple e, onde exigido, de um formulário de consentimento para o EEE, o Reino Unido e a Suíça. Se recusar, os anúncios não são personalizados para si onde a lei e a rede o permitam. Pode alterar as suas escolhas em Definições do iOS, Privacidade e Segurança, Rastreamento.',
            'Uma compra integrada única remove os anúncios. Ver um vídeo com recompensa desativa os anúncios durante uma hora.',
          ],
        },
        {
          h: 'Compras integradas',
          p: ['As compras são tratadas pela Apple através da App Store. Nunca vemos nem guardamos os seus dados de pagamento.'],
        },
        {
          h: 'Diagnósticos',
          p: ['Se a app falhar, a Apple pode partilhar connosco relatórios de falhas anónimos através do App Store Connect, se o tiver permitido no iOS. Não contêm informação financeira.'],
        },
        { h: 'Crianças', p: ['O Divix não se destina a crianças com menos de 16 anos e não recolhemos conscientemente os seus dados.'] },
        {
          h: 'Os seus direitos',
          p: ['Como não guardamos dados pessoais sobre si, normalmente não há nada a aceder ou eliminar. Se acredita que temos, escreva-nos e responderemos num prazo razoável. Onde a lei de proteção de dados se aplique a si, também pode contactar a autoridade local.'],
        },
        { h: 'Alterações', p: ['Podemos atualizar esta política. A data no topo mostra a revisão mais recente. As alterações significativas serão refletidas numa atualização da app.'] },
        { h: 'Contacto', p: ['albeasystems@gmail.com'] },
      ],
    },
    terms: {
      h1: 'Termos de utilização',
      lead: 'Estes termos aplicam-se quando transfere e usa a app Divix para iPhone.',
      sections: [
        { h: 'Aceitação', p: ['Ao usar o Divix, aceita estes termos. Se não concordar, não use a app.'] },
        {
          h: 'O que é o Divix',
          p: ['O Divix é um conversor de moedas e calculadora. Mostra taxas de câmbio médias de mercado para fins informativos. Não troca, detém, envia nem transfere dinheiro e não presta aconselhamento financeiro, fiscal ou jurídico.'],
        },
        {
          h: 'Licença e uso permitido',
          p: ['Concedemos-lhe uma licença pessoal, intransmissível e não exclusiva para usar a app para fins privados, ao abrigo dos termos padrão da Apple para aplicações licenciadas. Não pode copiar, modificar, fazer engenharia inversa, vender ou sublicenciar a app, nem remover os seus avisos.'],
        },
        {
          h: 'Taxas e exatidão',
          p: ['As taxas vêm de fornecedores terceiros e podem estar atrasadas, arredondadas ou indisponíveis. Podem diferir da taxa oferecida pelo seu banco, cartão ou casa de câmbio, que acrescentam margens e comissões. Confirme o valor final com o seu fornecedor antes de realizar a operação. Usa os dados por sua conta e risco.'],
        },
        {
          h: 'Anúncios e compras',
          p: ['A versão grátis mostra anúncios. Uma compra integrada opcional remove-os. Compras, reembolsos e regras relacionadas com subscrições regem-se pelos termos da Apple.'],
        },
        {
          h: 'Propriedade intelectual',
          p: ['A app, o seu design, textos, ícones e código pertencem à Albea Systems ou aos seus licenciadores. Nomes e marcas de terceiros pertencem aos seus titulares. O Divix não é afiliado à Apple Inc. nem a qualquer banco ou fornecedor de taxas.'],
        },
        {
          h: 'Responsabilidade',
          p: ['Na medida permitida por lei, não somos responsáveis por perdas indiretas ou consequenciais, nem por decisões financeiras tomadas com base nas taxas mostradas na app.'],
        },
        { h: 'Alterações e disponibilidade', p: ['Podemos atualizar, suspender ou descontinuar a app e podemos atualizar estes termos. Continuar a usá-la após uma atualização significa que aceita os novos termos.'] },
        { h: 'Lei aplicável', p: ['Estes termos regem-se pela lei espanhola, sem afetar os direitos obrigatórios de consumidor de que beneficie onde vive.'] },
        { h: 'Contacto', p: ['albeasystems@gmail.com'] },
      ],
    },
    support: {
      h1: 'Suporte',
      lead: 'Respostas às perguntas que mais recebemos. Se a sua não estiver aqui, escreva-nos e responderemos em 48 horas.',
      items: [
        { q: 'Porque é que a taxa é diferente da do meu banco?', a: 'O Divix mostra a taxa média de mercado. Bancos e casas de câmbio acrescentam uma margem ou comissão, por isso o que recebe costuma ser ligeiramente inferior. O nosso guia sobre a taxa média de mercado mostra como medir a diferença.' },
        { q: 'Como adiciono uma moeda aos favoritos?', a: 'Toque na estrela junto a uma moeda no conversor ou na lista Mercados. Use o filtro Favoritos em Mercados para as ver juntas.' },
        { q: 'Como mudo uma moeda?', a: 'Toque no código da moeda em qualquer cartão, escolha outra na lista e use os filtros ou a pesquisa para a encontrar. Toque no botão de troca para inverter o par.' },
        { q: 'O Divix funciona offline?', a: 'Sim. As últimas taxas ficam guardadas no telemóvel. Uma etiqueta mostra se está a ver dados em direto, em cache ou offline.' },
        { q: 'Como posso remover os anúncios?', a: 'Abra as Definições na app e escolha Remover anúncios. É uma compra única sem subscrição. Também pode ver um vídeo no ecrã inicial para ter uma hora sem anúncios.' },
        { q: 'Mudei de telemóvel. Como restauro a minha compra?', a: 'Abra as Definições do Divix no novo telemóvel e toque em Restaurar compras. Inicie sessão com o mesmo ID Apple que usou antes.' },
        { q: 'Existe uma versão Android?', a: 'Ainda não. O Divix está disponível para iPhone.' },
        { q: 'Uma taxa parece errada ou desatualizada.', a: 'Escreva-nos com o par de moedas, o valor que vê e o valor que esperava. Verifique primeiro a etiqueta de atualidade: as taxas em cache ou offline mostram o último valor guardado.' },
      ],
      contactH: 'Ainda precisa de ajuda?',
      contactP: 'Envie-nos o par de moedas, a sua versão do iOS e o que esperava ver.',
      contactCta: 'Enviar email ao suporte',
    },
  },
}
