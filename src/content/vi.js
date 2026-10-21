// Nội dung tiếng Việt. Quy tắc: không dùng gạch ngang dài, không dùng động từ độn, chỉ ghi con số khi ứng dụng thật sự có.
export default {
  lang: 'vi',
  locale: 'vi-VN',
  ogLocale: 'vi_VN',
  dir: 'ltr',
  tagline: 'Công cụ đổi tiền tệ và máy tính cho iPhone',

  ui: {
    skip: 'Chuyển đến nội dung',
    getApp: 'Tải ứng dụng miễn phí',
    getAppShort: 'Tải ứng dụng',
    home: 'Trang chủ Divix',
    nav: { guides: 'Hướng dẫn', faq: 'Câu hỏi', support: 'Hỗ trợ' },
    sign: 'Đổi tiền tệ',
    menu: 'Menu',
    langMenu: 'Ngôn ngữ',
    footer: {
      product: 'Divix',
      learn: 'Tìm hiểu',
      legal: 'Pháp lý',
      links: { home: 'Trang chủ', guides: 'Hướng dẫn', support: 'Hỗ trợ', privacy: 'Quyền riêng tư', terms: 'Điều khoản' },
      appStore: 'Tải xuống trên App Store',
      notice:
        'Divix là một máy tính hiển thị tỷ giá trung bình của thị trường nhằm mục đích tham khảo. Divix không đổi tiền. Divix do Albea Systems phát hành và không liên kết với, không được chứng thực hay tài trợ bởi Apple Inc., Frankfurter, CoinGecko hay bất kỳ ngân hàng nào. Apple, iPhone và App Store là nhãn hiệu của Apple Inc.',
      rights: 'Albea Systems. Bảo lưu mọi quyền.',
    },
    breadcrumbs: { home: 'Divix', guides: 'Hướng dẫn' },
    updated: 'Cập nhật',
    by: 'Bởi',
    related: 'Thêm hướng dẫn',
    readMore: 'Đọc hướng dẫn',
    backToGuides: 'Tất cả hướng dẫn',
    ctaGuide: 'Kiểm tra bất kỳ mức giá nào trong vài giây với Divix',
  },

  seo: {
    imgAlt: 'Divix: công cụ đổi tiền tệ có máy tính tích hợp cho iPhone',
    home: {
      title: 'Divix: công cụ đổi tiền tệ và máy tính cho iPhone',
      description:
        'Công cụ đổi tiền tệ miễn phí cho iPhone với máy tính tích hợp. 55 loại tiền tệ và 20 loại tiền mã hóa, mục yêu thích, tỷ giá trực tiếp và ngoại tuyến, biểu đồ đến 5 năm.',
    },
    guides: {
      title: 'Hướng dẫn tiền tệ cho người đi du lịch | Divix',
      description:
        'Hướng dẫn dễ hiểu về tỷ giá trung bình thị trường, thanh toán bằng tiền địa phương và cách quy đổi giá nhanh khi đi du lịch.',
    },
    privacy: { title: 'Chính sách quyền riêng tư | Divix', description: 'Divix thu thập gì (rất ít), quảng cáo và sự đồng ý hoạt động ra sao, và cách liên hệ với chúng tôi về dữ liệu của bạn.' },
    terms: { title: 'Điều khoản sử dụng | Divix', description: 'Các điều khoản áp dụng khi bạn dùng ứng dụng đổi tiền tệ Divix cho iPhone.' },
    support: { title: 'Hỗ trợ | Divix', description: 'Giải đáp về tỷ giá Divix, mục yêu thích, dùng ngoại tuyến, gỡ quảng cáo và khôi phục giao dịch mua, cùng cách liên hệ.' },
  },

  home: {
    hero: {
      h1: 'Mọi mức giá, bằng tiền của bạn.',
      h1Lines: ['Mọi mức giá,', 'bằng tiền của bạn.'],
      sub: 'Divix là công cụ đổi tiền tệ có máy tính thực thụ tích hợp. 55 loại tiền tệ và 20 loại tiền mã hóa, miễn phí trên iPhone.',
      boardTitle: 'Hôm nay cho',
      boardNote: 'Tỷ giá trung bình thị trường, biến động trong 30 ngày.',
      boardFallback: 'Tỷ giá đã lưu ngày {date}. Tỷ giá trực tiếp sẽ tải khi bạn có mạng.',
      phoneAlt:
        'Ứng dụng Divix quy đổi 250 euro sang đô la, đổi chiều sang đô la và euro, chọn Bitcoin, lưu mục yêu thích và mở biểu đồ lịch sử',
    },
    calc: {
      h2: 'Vừa tính vừa quy đổi',
      p: 'Bên dưới hai thẻ tiền tệ là một máy tính thực thụ. Cộng hóa đơn nhà hàng, chia đôi, nhân giá một đêm với số đêm, và kết quả bằng tiền của bạn cập nhật sau mỗi lần bấm phím.',
      points: [
        { h: 'Bốn phép tính', p: 'Cộng, trừ, nhân, chia, với việc quy đổi chạy trực tiếp.' },
        { h: 'Một chạm để đổi chiều', p: 'Chuyển từ đô la sang euro và ngược lại mà không phải nhập lại số tiền.' },
        { h: 'Không cần đổi ứng dụng', p: 'Máy tính và tỷ giá nằm chung một màn hình.' },
      ],
      shotAlt: 'Màn hình quy đổi của Divix hiển thị 250 euro đổi thành 281,33 đô la Mỹ với bàn phím máy tính bên dưới',
      try: {
        h: 'Thử với tỷ giá hôm nay',
        amount: 'Số tiền',
        from: 'Từ',
        to: 'Sang',
        swap: 'Đổi chiều tiền tệ',
        result: 'Kết quả',
        source: 'Tỷ giá trung bình thị trường từ Frankfurter, {date}. Divix không cộng thêm phí chênh lệch.',
        loading: 'Đang tải tỷ giá',
        error: 'Hiện không có tỷ giá. Hãy kiểm tra kết nối và thử lại.',
      },
    },
    markets: {
      h2: 'Mục yêu thích và thị trường',
      p: 'Chạm vào ngôi sao của bất kỳ loại tiền nào để giữ nó trong tầm tay. Tab Thị trường hiển thị một số tiền so với mọi loại tiền cùng lúc, và lọc theo Tất cả, Yêu thích, Tiền pháp định hoặc Tiền mã hóa.',
      p2: 'Nhập 1 và đọc tỷ giá. Nhập 100 và đọc mức giá. Danh sách đi theo những gì bạn nhập.',
      marketsAlt: 'Tab Thị trường của Divix liệt kê Bitcoin, euro, bảng Anh, yên và các loại tiền khác so với 1 đô la Mỹ',
      favoritesAlt: 'Bộ lọc Yêu thích của Divix hiển thị đô la Mỹ và Bitcoin được đánh dấu sao',
    },
    crypto: {
      h2: 'Bitcoin bên cạnh đô la',
      p: 'Hai mươi loại tiền mã hóa dùng chung bộ chọn với 55 loại tiền pháp định, gồm Bitcoin, Ethereum, Solana và XRP. Đổi đô la sang BTC giống như đổi đô la sang euro.',
      pickerAlt: 'Bộ chọn tiền tệ của Divix với bộ lọc Tiền mã hóa hiển thị Bitcoin, Ethereum, Tether, BNB và Solana',
      btcAlt: 'Divix quy đổi 250 đô la Mỹ sang 0,003066 Bitcoin',
    },
    charts: {
      h2: 'Xem tỷ giá đã đi qua đâu',
      p: 'Mở tab Biểu đồ để xem lịch sử từ 7 ngày đến 5 năm, kèm mức thấp nhất, cao nhất và biến động trong kỳ.',
      fresh: {
        h: 'Mỗi tỷ giá đều cho biết độ mới',
        live: 'Trực tiếp: đã làm mới trong 4 giờ qua.',
        cached: 'Đã lưu đệm: lưu từ lần làm mới trước, có thể đã một ngày hoặc hơn.',
        offline: 'Ngoại tuyến: không có kết nối, nên bạn thấy tỷ giá đã lưu gần nhất và thời điểm của nó.',
      },
      alt: 'Biểu đồ lịch sử 30 ngày của Divix từ đô la Mỹ sang euro với mức thấp nhất, cao nhất và biến động',
    },
    checkout: {
      h2: 'Thiết kế cho hàng chờ ở quầy thanh toán',
      items: [
        { h: 'Dùng được ngoại tuyến', p: 'Các tỷ giá gần nhất được lưu trên điện thoại, nên sóng yếu cũng không cản bạn.' },
        { h: 'Không cần tài khoản', p: 'Mở ứng dụng và nhập. Không email, không mật khẩu.' },
        { h: 'Không phí chênh lệch', p: 'Tỷ giá trung bình thị trường, đúng con số bạn thấy khi tìm trên mạng.' },
        { h: 'Mười hai ngôn ngữ', p: 'Tiếng Anh, Tây Ban Nha, Pháp, Ý, Đức, Bồ Đào Nha, Ả Rập, Trung, Hindi, Nhật, Hàn và Việt.' },
      ],
    },
    pricing: {
      h2: 'Miễn phí. Trả một lần để gỡ quảng cáo.',
      p: 'Mọi tính năng đều miễn phí. Một lần mua duy nhất gỡ quảng cáo vĩnh viễn, không đăng ký định kỳ. Bạn cũng có thể xem một video ngắn để có một giờ không quảng cáo.',
    },
    faq: {
      h2: 'Những câu hỏi du khách hay đặt ra',
      items: [
        {
          q: 'Divix là gì?',
          a: 'Divix là công cụ đổi tiền tệ và máy tính miễn phí cho iPhone. Bạn nhập số tiền, chọn hai loại tiền và thấy kết quả ngay, với máy tính ngay trên cùng màn hình.',
        },
        {
          q: 'Divix hỗ trợ bao nhiêu loại tiền tệ?',
          a: 'Divix hỗ trợ 55 loại tiền pháp định và 20 loại tiền mã hóa, gồm USD, EUR, GBP, JPY, CHF, Bitcoin, Ethereum, Solana và XRP. Tất cả xuất hiện trong cùng một bộ chọn, với các bộ lọc Tiền pháp định và Tiền mã hóa.',
        },
        {
          q: 'Tỷ giá lấy từ đâu?',
          a: 'Tỷ giá tiền tệ lấy từ các nguồn tỷ giá trung bình thị trường công khai như Frankfurter, cùng một nhà cung cấp thứ hai làm dự phòng. Giá tiền mã hóa lấy từ CoinGecko. Mỗi lần quy đổi đều cho biết tỷ giá được cập nhật lần cuối khi nào.',
        },
        {
          q: 'Vì sao tỷ giá khác với ngân hàng của tôi?',
          a: 'Divix hiển thị tỷ giá trung bình thị trường, điểm giữa của giá mua và giá bán. Ngân hàng, mạng lưới thẻ và điểm đổi tiền cộng thêm biên độ hoặc phí, nên số tiền bạn nhận thường thấp hơn một chút. Hãy dùng Divix để biết tỷ giá tham chiếu, rồi so với mức được chào.',
        },
        {
          q: 'Divix có dùng được khi không có internet không?',
          a: 'Có. Các tỷ giá gần nhất được lưu trên iPhone và Divix cho biết độ cũ của chúng: trực tiếp, đã lưu đệm hoặc ngoại tuyến. Khi bạn có mạng lại, tỷ giá sẽ được làm mới.',
        },
        {
          q: 'Tôi có cần tài khoản không?',
          a: 'Không. Không có đăng ký. Mục yêu thích và cài đặt của bạn ở lại trên thiết bị.',
        },
        {
          q: 'Divix có miễn phí không?',
          a: 'Có. Mọi tính năng đều miễn phí và bản miễn phí hiển thị quảng cáo. Một lần mua trong ứng dụng sẽ gỡ chúng, và bạn cũng có thể xem một video để có một giờ không quảng cáo. Không có đăng ký định kỳ.',
        },
        {
          q: 'Divix chạy trên những thiết bị nào?',
          a: 'Divix chạy trên iPhone với iOS 17.6 trở lên. Hiện chưa có bản Android.',
        },
      ],
    },
    guides: {
      h2: 'Hướng dẫn chi tiêu ở nước ngoài',
      p: 'Những giải thích ngắn gọn, dễ hiểu về cách tỷ giá hoạt động và cách trả ít hơn khi đi du lịch.',
    },
    final: {
      h2: 'Biết giá trước khi trả tiền.',
      p: 'Miễn phí trên App Store cho iPhone.',
    },
  },

  guides: {
    ids: ['guide-mid-market', 'guide-local-currency', 'guide-travel'],
    h1: 'Hướng dẫn tiền tệ cho người đi du lịch',
    intro: 'Ba hướng dẫn ngắn về cách tỷ giá hoạt động, viết để bạn có thể áp dụng ngay ở một quầy chợ hay một máy quẹt thẻ.',
  },

  guide: {
    'guide-mid-market': {
      title: 'Tỷ giá trung bình thị trường là gì? Vì sao ngân hàng của bạn khác',
      description: 'Tỷ giá trung bình thị trường là điểm giữa của giá mua và giá bán. Tìm hiểu vì sao ngân hàng và điểm đổi tiền chào mức thấp hơn và cách tự kiểm tra phần chênh lệch.',
      h1: 'Tỷ giá trung bình thị trường là gì?',
      lead: 'Tỷ giá trung bình thị trường là điểm giữa của mức giá các nhà giao dịch mua một loại tiền và mức giá họ bán nó. Đó là con số tham chiếu trước khi có ai cộng thêm biên độ.',
      summary: 'Tỷ giá tham chiếu trước khi cộng biên độ, và cách đo phần chênh lệch bạn được chào.',
      sections: [
        {
          h: 'Câu trả lời ngắn',
          p: [
            'Khi bạn tìm "đô la sang euro" trên mạng, con số bạn thấy hầu như luôn là tỷ giá trung bình thị trường. Nó nằm giữa giá mua và giá bán trên thị trường tiền tệ bán buôn.',
            'Đó là một mốc tham chiếu công bằng vì không chứa phí hay biên độ. Nhưng đó cũng không phải mức giá bạn thường có được khi là khách hàng.',
          ],
        },
        {
          h: 'Vì sao hiếm khi bạn có được nó',
          p: [
            'Ngân hàng, mạng lưới thẻ, điểm đổi tiền và dịch vụ chuyển tiền kiếm tiền bằng cách thay đổi tỷ giá, thu phí, hoặc cả hai. Một quầy quảng cáo không hoa hồng vẫn có thể chào tỷ giá thấp hơn nhiều so với tỷ giá trung bình thị trường.',
            'Khoảng chênh thường lớn nhất ở nơi khách hàng có ít lựa chọn nhất, như quầy đổi tiền ở sân bay và các khu du lịch.',
          ],
        },
        {
          h: 'Cách đo phần chênh lệch',
          p: ['So tỷ giá bạn được chào với tỷ giá trung bình thị trường cùng ngày. Phần chênh lệch là hiệu số, tính theo tỷ lệ so với tỷ giá trung bình thị trường.'],
          list: [
            'Tra tỷ giá trung bình thị trường hôm nay của cặp tiền.',
            'Tìm tỷ giá bạn được chào, hoặc lấy số tiền bạn sẽ nhận chia cho số tiền bạn đưa.',
            'Lấy tỷ giá trung bình thị trường trừ đi tỷ giá được chào, rồi chia cho tỷ giá trung bình thị trường.',
          ],
          after: 'Ví dụ: nếu tỷ giá trung bình thị trường là 1 euro = 1,10 đô la Mỹ và một quầy chào 1,04, bạn nhận ít hơn mốc tham chiếu khoảng 5,5 phần trăm. Các con số ở đây chỉ để minh họa, không phải báo giá trực tiếp.',
        },
        {
          h: 'Nên làm gì',
          list: [
            'Hỏi tổng số tiền bạn sẽ nhận, không chỉ tỷ giá, và so các tổng số với nhau.',
            'Đối chiếu mọi khoản phí cố định với quy mô giao dịch. Phí cố định nặng hơn với số tiền nhỏ.',
            'So hai hoặc ba lựa chọn trước khi quyết định, nhất là với số tiền lớn.',
          ],
        },
        {
          h: 'Divix đóng vai trò gì',
          p: ['Divix hiển thị tỷ giá trung bình thị trường kèm nhãn độ mới, để bạn thấy một mức chào lệch bao xa so với mốc tham chiếu. Divix là máy tính, không phải điểm đổi tiền, và không tự cộng thêm biên độ.'],
        },
      ],
      faq: [
        { q: 'Tỷ giá trung bình thị trường có giống tỷ giá liên ngân hàng không?', a: 'Hai loại gần nhau. Tỷ giá liên ngân hàng là mức các ngân hàng lớn dùng với nhau. Tỷ giá trung bình thị trường công khai là điểm giữa được công bố để xấp xỉ nó.' },
        { q: 'Tôi có thể nhận tỷ giá trung bình thị trường khi là khách hàng không?', a: 'Hiếm khi đúng con số đó. Một số nhà cung cấp tiến gần và nói rõ điều ấy. Đo phần chênh lệch sẽ cho thấy gần đến mức nào.' },
      ],
    },
    'guide-local-currency': {
      title: 'Thanh toán bằng tiền địa phương: tránh quy đổi động',
      description: 'Khi máy quẹt thẻ hoặc cây ATM ở nước ngoài đề nghị tính tiền theo đồng tiền nước bạn, câu trả lời thường là không. Tìm hiểu lý do và cách kiểm tra giá.',
      h1: 'Thanh toán bằng tiền địa phương',
      lead: 'Ở nước ngoài, máy quẹt thẻ hoặc cây ATM có thể hỏi bạn muốn trả bằng tiền nước mình hay tiền địa phương. Chọn tiền địa phương thường là câu trả lời tốt hơn.',
      summary: 'Vì sao "trả bằng tiền của bạn" thường đắt hơn, và cách kiểm tra trong mười giây.',
      sections: [
        {
          h: 'Quy đổi tiền tệ động là gì',
          p: [
            'Quy đổi tiền tệ động, hay DCC, cho phép người bán hoặc đơn vị vận hành ATM thực hiện việc quy đổi ngay lúc thanh toán. Màn hình hiển thị tổng số tiền bằng đồng tiền nước bạn và yêu cầu bạn chấp nhận.',
            'Trông có vẻ tiện vì bạn thấy một số tiền quen thuộc. Sự tiện lợi đó chính là thứ bạn phải trả giá.',
          ],
        },
        {
          h: 'Vì sao tiền địa phương thường tốt hơn',
          p: [
            'Với DCC, tỷ giá do nhà cung cấp phía sau máy quẹt thẻ ấn định, và thường chứa biên độ lớn hơn tỷ giá mà ngân hàng phát hành thẻ của bạn áp dụng. Nếu bạn từ chối, ngân hàng quy đổi số tiền địa phương bằng tỷ giá riêng của họ cùng phí giao dịch nước ngoài nếu có.',
            'Điều khoản thẻ khác nhau, nên hãy đọc một lần phí giao dịch nước ngoài của thẻ trước khi đi. Sau đó quy tắc rất đơn giản.',
          ],
        },
        {
          h: 'Kiểm tra trong mười giây',
          list: [
            'Đọc giá bằng tiền địa phương.',
            'Quy đổi theo tỷ giá trung bình thị trường. Trong Divix, nhập giá địa phương và đọc số tiền của bạn.',
            'So với tổng bằng tiền nước bạn mà máy đề xuất. Nếu cao hơn rõ rệt, hãy chọn tiền địa phương.',
          ],
        },
        {
          h: 'Thói quen hữu ích',
          list: [
            'Chọn tiền địa phương trên máy quẹt thẻ và ATM, lần nào cũng vậy.',
            'Nếu nhân viên thu ngân quy đổi giúp bạn, hãy yêu cầu trả bằng tiền địa phương.',
            'Giữ biên lai và xem nó ghi đồng tiền nào.',
          ],
        },
      ],
      faq: [
        { q: 'Quy đổi tiền tệ động có luôn đắt hơn không?', a: 'Không phải lúc nào, nhưng thường là vậy. Cách kiểm tra mười giây cho bạn biết với giao dịch đang diễn ra trước mắt.' },
        { q: 'Điều này có áp dụng cho ATM không?', a: 'Có. ATM ở nước ngoài cũng có thể hiện cùng lựa chọn giữa tiền nước bạn và tiền địa phương. Chọn tiền địa phương là mặc định an toàn hơn.' },
      ],
    },
    'guide-travel': {
      title: 'Cách quy đổi tiền tệ nhanh khi đi du lịch',
      description: 'Những cách thiết thực để biến giá nước ngoài thành tiền của bạn ở quầy hàng, thực đơn hay quầy thanh toán, khi có và không có kết nối.',
      h1: 'Quy đổi giá nhanh khi đi du lịch',
      lead: 'Bạn không cần con số chính xác để quyết định. Bạn cần một mốc tham chiếu đáng tin và một chiếc máy tính trong tầm tay.',
      summary: 'Mốc tham chiếu, mục yêu thích và tỷ giá ngoại tuyến cho khoảnh khắc mua hàng.',
      sections: [
        {
          h: 'Trước khi đi',
          list: [
            'Gắn sao cho những loại tiền bạn sẽ dùng để chúng chỉ cách một chạm.',
            'Mở ứng dụng một lần khi có mạng để tỷ giá được lưu cho dùng ngoại tuyến.',
            'Ghi lại tỷ giá cơ sở cho chuyến đi, chẳng hạn 1 đô la Mỹ = 18 peso Mexico.',
          ],
        },
        {
          h: 'Tạo một mốc tham chiếu',
          p: ['Mốc tham chiếu là một tỷ giá bạn có thể nhẩm theo tỷ lệ trong đầu. Nếu 1 đô la Mỹ khoảng 18 peso, thì 100 peso hơn 5 đô la một chút, và 1.000 peso hơn 55 đô la một chút.'],
          after: 'Với các loại tiền không có số lẻ, như yên Nhật, hãy lấy một số tròn làm mốc. Ở mức 158 yên đổi 1 đô la, 1.000 yên khoảng 6,30 đô la. Đây là tỷ giá ví dụ, nên hãy kiểm tra tỷ giá hôm nay.',
        },
        {
          h: 'Ở quầy hàng hay quầy thanh toán',
          list: [
            'Nhập giá địa phương một lần và đọc số tiền bằng tiền của bạn.',
            'Dùng máy tính cho số lượng, như bốn vé hay sáu đêm, để tổng được quy đổi trong một bước.',
            'Đổi chiều khi mặc cả, để nói giá của bạn bằng tiền địa phương.',
          ],
        },
        {
          h: 'Khi mất sóng',
          p: ['Divix lưu các tỷ giá gần nhất trên điện thoại và gắn nhãn trực tiếp, đã lưu đệm hoặc ngoại tuyến. Một tỷ giá cũ vài giờ là đủ cho hầu hết giao dịch mua, và nhãn sẽ báo khi nào không đủ.'],
        },
      ],
      faq: [
        { q: 'Tỷ giá cần chính xác đến mức nào khi mua sắm?', a: 'Với các giao dịch hằng ngày, tỷ giá trung bình thị trường trong cùng ngày là đủ chính xác để quyết định. Thẻ hoặc quầy của bạn sẽ cộng thêm biên độ riêng lên trên.' },
        { q: 'Tôi có thể quy đổi tiền mã hóa theo cách tương tự không?', a: 'Có. Divix liệt kê 20 loại tiền mã hóa bên cạnh tiền pháp định, nên từ Bitcoin sang đô la hoạt động như mọi cặp tiền khác.' },
      ],
    },
  },

  legal: {
    updatedOn: 'Cập nhật lần cuối: 17 tháng 10 năm 2026',
    privacy: {
      h1: 'Chính sách quyền riêng tư',
      lead: 'Divix không cần tài khoản và thu thập rất ít. Chính sách này giải thích điều gì xảy ra với dữ liệu khi bạn dùng ứng dụng iOS.',
      sections: [
        { h: 'Chúng tôi là ai', p: ['Divix do Albea Systems phát hành. Liên hệ: albeasystems@gmail.com.'] },
        {
          h: 'Những gì chúng tôi không thu thập',
          p: ['Divix không có đăng ký hay tài khoản người dùng. Chúng tôi không yêu cầu hay lưu tên, địa chỉ email, số điện thoại, danh bạ, ảnh hoặc vị trí của bạn.'],
        },
        {
          h: 'Những gì ở lại trên thiết bị của bạn',
          p: ['Tiền tệ cơ sở, mục yêu thích, thứ tự danh sách và tỷ giá đã lưu đệm chỉ được lưu trên thiết bị của bạn. Xóa ứng dụng sẽ xóa chúng. Chúng tôi không giữ bản sao.'],
        },
        {
          h: 'Tỷ giá',
          p: ['Để hiển thị tỷ giá, ứng dụng yêu cầu dữ liệu công khai từ các nhà cung cấp tỷ giá (ví dụ Frankfurter và CoinGecko). Các yêu cầu này chứa những loại tiền được truy vấn và dữ liệu kỹ thuật như địa chỉ IP của bạn, thứ mà mọi yêu cầu internet đều mang theo. Chúng không chứa thông tin giúp chúng tôi nhận diện bạn.'],
        },
        {
          h: 'Quảng cáo và sự đồng ý',
          p: [
            'Bản miễn phí hiển thị quảng cáo. Quảng cáo được phân phối qua một dịch vụ trung gian quảng cáo và các mạng đối tác của nó, có thể gồm Google AdMob, Meta Audience Network và Unity Ads. Các đối tác này có thể xử lý mã định danh thiết bị và dữ liệu sử dụng để chọn và đo lường quảng cáo.',
            'Trước khi hiển thị quảng cáo cá nhân hóa, ứng dụng xin sự đồng ý của bạn qua hộp thoại Minh bạch theo dõi ứng dụng của Apple và, khi cần, một biểu mẫu đồng ý dành cho EEA, Vương quốc Anh và Thụy Sĩ. Nếu bạn từ chối, quảng cáo không được cá nhân hóa cho bạn ở nơi luật pháp và mạng quảng cáo cho phép. Bạn có thể đổi lựa chọn trong Cài đặt iOS, Quyền riêng tư và bảo mật, Theo dõi.',
            'Một lần mua trong ứng dụng sẽ gỡ quảng cáo. Xem một video có thưởng sẽ tắt quảng cáo trong một giờ.',
          ],
        },
        {
          h: 'Giao dịch mua trong ứng dụng',
          p: ['Các giao dịch mua do Apple xử lý qua App Store. Chúng tôi không bao giờ thấy hay lưu thông tin thanh toán của bạn.'],
        },
        {
          h: 'Chẩn đoán',
          p: ['Nếu ứng dụng gặp sự cố, Apple có thể chia sẻ với chúng tôi báo cáo sự cố ẩn danh qua App Store Connect, nếu bạn đã cho phép trong iOS. Chúng không chứa thông tin tài chính.'],
        },
        { h: 'Trẻ em', p: ['Divix không nhắm đến trẻ em dưới 16 tuổi và chúng tôi không cố ý thu thập dữ liệu của các em.'] },
        {
          h: 'Quyền của bạn',
          p: ['Vì chúng tôi không giữ dữ liệu cá nhân nào về bạn, thường không có gì để truy cập hay xóa. Nếu bạn cho rằng chúng tôi có, hãy viết thư cho chúng tôi và chúng tôi sẽ trả lời trong thời gian hợp lý. Nếu luật bảo vệ dữ liệu áp dụng với bạn, bạn cũng có thể liên hệ cơ quan có thẩm quyền tại địa phương.'],
        },
        { h: 'Thay đổi', p: ['Chúng tôi có thể cập nhật chính sách này. Ngày ở đầu trang cho biết bản sửa đổi mới nhất. Những thay đổi quan trọng sẽ được phản ánh trong một bản cập nhật ứng dụng.'] },
        { h: 'Liên hệ', p: ['albeasystems@gmail.com'] },
      ],
    },
    terms: {
      h1: 'Điều khoản sử dụng',
      lead: 'Các điều khoản này áp dụng khi bạn tải xuống và sử dụng ứng dụng Divix cho iPhone.',
      sections: [
        { h: 'Chấp nhận', p: ['Khi sử dụng Divix, bạn đồng ý với các điều khoản này. Nếu không đồng ý, đừng dùng ứng dụng.'] },
        {
          h: 'Divix là gì',
          p: ['Divix là công cụ đổi tiền tệ và máy tính. Nó hiển thị tỷ giá trung bình thị trường nhằm mục đích tham khảo. Nó không đổi, giữ, gửi hay chuyển tiền, và không cung cấp tư vấn tài chính, thuế hay pháp lý.'],
        },
        {
          h: 'Giấy phép và việc sử dụng được phép',
          p: ['Chúng tôi cấp cho bạn giấy phép cá nhân, không thể chuyển nhượng, không độc quyền để dùng ứng dụng cho mục đích riêng, theo điều khoản chuẩn của Apple dành cho ứng dụng được cấp phép. Bạn không được sao chép, sửa đổi, dịch ngược, bán hay cấp phép lại ứng dụng, hoặc xóa các thông báo của nó.'],
        },
        {
          h: 'Tỷ giá và độ chính xác',
          p: ['Tỷ giá đến từ các nhà cung cấp bên thứ ba và có thể bị trễ, làm tròn hoặc không có sẵn. Chúng có thể khác với tỷ giá do ngân hàng, thẻ hoặc điểm đổi tiền của bạn chào, những nơi cộng thêm biên độ và phí. Hãy xác nhận số tiền cuối cùng với nhà cung cấp của bạn trước khi giao dịch. Bạn tự chịu rủi ro khi sử dụng dữ liệu.'],
        },
        {
          h: 'Quảng cáo và giao dịch mua',
          p: ['Bản miễn phí hiển thị quảng cáo. Một giao dịch mua tùy chọn trong ứng dụng sẽ gỡ chúng. Giao dịch mua, hoàn tiền và các quy tắc liên quan đến đăng ký định kỳ do điều khoản của Apple điều chỉnh.'],
        },
        {
          h: 'Sở hữu trí tuệ',
          p: ['Ứng dụng, thiết kế, văn bản, biểu tượng và mã của nó thuộc về Albea Systems hoặc các bên cấp phép. Tên và nhãn hiệu của bên thứ ba thuộc về chủ sở hữu của chúng. Divix không liên kết với Apple Inc. hay bất kỳ ngân hàng hoặc nhà cung cấp tỷ giá nào.'],
        },
        {
          h: 'Trách nhiệm',
          p: ['Trong phạm vi pháp luật cho phép, chúng tôi không chịu trách nhiệm về tổn thất gián tiếp hay hệ quả, hoặc về các quyết định tài chính dựa trên tỷ giá hiển thị trong ứng dụng.'],
        },
        { h: 'Thay đổi và tính sẵn có', p: ['Chúng tôi có thể cập nhật, tạm ngừng hoặc ngừng cung cấp ứng dụng, và có thể cập nhật các điều khoản này. Việc tiếp tục sử dụng sau khi cập nhật nghĩa là bạn chấp nhận điều khoản mới.'] },
        { h: 'Luật áp dụng', p: ['Các điều khoản này chịu sự điều chỉnh của luật Tây Ban Nha, không ảnh hưởng đến các quyền bắt buộc của người tiêu dùng mà bạn có tại nơi bạn sinh sống.'] },
        { h: 'Liên hệ', p: ['albeasystems@gmail.com'] },
      ],
    },
    support: {
      h1: 'Hỗ trợ',
      lead: 'Giải đáp cho những câu hỏi chúng tôi nhận được nhiều nhất. Nếu câu hỏi của bạn không có ở đây, hãy viết thư cho chúng tôi và chúng tôi sẽ trả lời trong 48 giờ.',
      items: [
        { q: 'Vì sao tỷ giá khác với ngân hàng của tôi?', a: 'Divix hiển thị tỷ giá trung bình thị trường. Ngân hàng và điểm đổi tiền cộng thêm biên độ hoặc phí, nên số bạn nhận thường thấp hơn một chút. Hướng dẫn về tỷ giá trung bình thị trường của chúng tôi chỉ cách đo phần chênh lệch.' },
        { q: 'Làm sao thêm một loại tiền vào mục yêu thích?', a: 'Chạm vào ngôi sao bên cạnh một loại tiền trong màn hình quy đổi hoặc danh sách Thị trường. Dùng bộ lọc Yêu thích trong Thị trường để xem chúng cùng nhau.' },
        { q: 'Làm sao đổi một loại tiền?', a: 'Chạm vào mã tiền tệ trên một trong hai thẻ, chọn loại khác từ danh sách, và dùng bộ lọc hoặc tìm kiếm để tìm. Chạm nút đổi chiều để đảo cặp tiền.' },
        { q: 'Divix có dùng được ngoại tuyến không?', a: 'Có. Các tỷ giá gần nhất được lưu trên điện thoại. Một nhãn cho biết bạn đang xem dữ liệu trực tiếp, đã lưu đệm hay ngoại tuyến.' },
        { q: 'Làm sao gỡ quảng cáo?', a: 'Mở Cài đặt trong ứng dụng và chọn Gỡ quảng cáo. Đó là một lần mua duy nhất, không đăng ký định kỳ. Bạn cũng có thể xem một video từ màn hình chính để có một giờ không quảng cáo.' },
        { q: 'Tôi đổi điện thoại. Làm sao khôi phục giao dịch mua?', a: 'Mở Cài đặt trong Divix trên điện thoại mới và chạm Khôi phục giao dịch mua. Đăng nhập bằng cùng ID Apple đã dùng trước đây.' },
        { q: 'Có bản Android không?', a: 'Chưa có. Divix dành cho iPhone.' },
        { q: 'Một tỷ giá có vẻ sai hoặc đã cũ.', a: 'Hãy viết cho chúng tôi cặp tiền, giá trị bạn thấy và giá trị bạn mong đợi. Trước hết hãy xem nhãn độ mới: tỷ giá đã lưu đệm hoặc ngoại tuyến hiển thị giá trị đã lưu gần nhất.' },
      ],
      contactH: 'Vẫn cần trợ giúp?',
      contactP: 'Hãy gửi cho chúng tôi cặp tiền, phiên bản iOS của bạn và điều bạn mong đợi thấy.',
      contactCta: 'Gửi email cho bộ phận hỗ trợ',
    },
  },
}
