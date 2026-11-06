import { motion } from 'framer-motion'

const img = (name) => `${import.meta.env.BASE_URL}img/${name}.jpg`

// Staggered entrance for slide content
function Rise({ delay = 0, children, className, style, as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      style={style}
      initial={{ opacity: 0, y: 34 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.25 + delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  )
}

function KenBurns({ src, className = '', position = 'center' }) {
  return (
    <motion.div
      className={`kb ${className}`}
      style={{ backgroundImage: `url(${src})`, backgroundPosition: position }}
      initial={{ scale: 1.12 }}
      animate={{ scale: 1 }}
      transition={{ duration: 9, ease: 'easeOut' }}
    />
  )
}

function Tag({ children, delay = 0 }) {
  return (
    <Rise delay={delay} className="tag">
      <span className="tag-line" />
      {children}
    </Rise>
  )
}

function Num({ n }) {
  return <div className="slide-num">{String(n).padStart(2, '0')}</div>
}

/* ---------------------------------------------------------------- */

function Title() {
  return (
    <div className="slide s-title">
      <div className="s-title-img">
        <KenBurns src={img('hero')} position="center 30%" />
        <div className="fade-left" />
      </div>
      <div className="s-title-text">
        <Tag>Стародавній Рим · Доповідь</Tag>
        <Rise delay={0.1} as="h1" className="mega">
          Калі<em>гула</em>
        </Rise>
        <Rise delay={0.22} className="s-title-sub">
          Гай Юлій Цезар Август Германік
        </Rise>
        <Rise delay={0.34} className="year-pill">
          <span>12</span>
          <i />
          <span>41 рр. н. е.</span>
        </Rise>
      </div>
      <Rise delay={0.6} className="s-title-latin">GAIVS · CAESAR · AVGVSTVS · GERMANICVS</Rise>
    </div>
  )
}

function Intro() {
  return (
    <div className="slide s-intro light">
      <Num n={2} />
      <div className="s-intro-left">
        <Tag>Вступ</Tag>
        <Rise delay={0.1} as="h2" className="h2">
          Ім'я, що стало <em>символом</em> безконтрольної влади
        </Rise>
        <Rise delay={0.2} className="body">
          Ім'я Калігули зазвичай асоціюється з жорстокістю, безумством і дивакуватими вчинками.
          Він правив лише чотири роки, але закарбувався в історії назавжди.
        </Rise>
        <Rise delay={0.3} className="callout">
          Найцікавіше: спочатку римляни зовсім <b>не вважали</b> його майбутнім тираном.
        </Rise>
      </div>
      <div className="s-intro-right">
        <Rise delay={0.15} className="arch">
          <KenBurns src={img('louvre')} position="center 25%" />
        </Rise>
        <Rise delay={0.45} className="stat-bubble">
          <b>4</b>
          <span>роки при владі</span>
        </Rise>
      </div>
    </div>
  )
}

function Childhood() {
  return (
    <div className="slide s-child">
      <Num n={3} />
      <div className="s-child-head">
        <Tag>Дитинство та походження</Tag>
        <Rise delay={0.1} as="h2" className="h2">
          Народжений у <em>родині героїв</em>
        </Rise>
        <Rise delay={0.2} className="body">
          Калігула народився у <b>12 році н. е.</b> у родині впливової римської аристократії.
          Справжнє ім'я — Гай Юлій Цезар Германік.
        </Rise>
      </div>
      <div className="family">
        <Rise delay={0.3} className="fam-card">
          <div className="fam-img" style={{ backgroundImage: `url(${img('germanicus')})` }} />
          <div className="fam-body">
            <small>Батько</small>
            <h3>Германік</h3>
            <p>Відомий полководець, якого надзвичайно поважали римські солдати.</p>
          </div>
        </Rise>
        <Rise delay={0.42} className="fam-card no-img">
          <div className="fam-glyph">♛</div>
          <div className="fam-body">
            <small>Мати</small>
            <h3>Агріппіна Старша</h3>
            <p>Онука першого імператора Риму — Октавіана Августа.</p>
          </div>
        </Rise>
        <Rise delay={0.54} className="fam-card">
          <div className="fam-img" style={{ backgroundImage: `url(${img('caliga')})` }} />
          <div className="fam-body">
            <small>Прізвисько</small>
            <h3>Калігула</h3>
            <p>«Маленький чобіток» — так легіонери прозвали хлопчика, що носив крихітну кальгу.</p>
          </div>
        </Rise>
      </div>
      <Rise delay={0.7} className="child-note">
        <b>Далеко не безтурботне дитинство:</b> у 7 років Гай втратив батька, а мати й старші брати
        загинули через переслідування Тиберія. Сам він вижив при дворі імператора на Капрі.
      </Rise>
    </div>
  )
}

function Rise37() {
  const deeds = [
    ['↩', 'Повернув із заслання частину політичних вигнанців'],
    ['✕', 'Скасував деякі непопулярні податки'],
    ['⚔', 'Організовував гладіаторські бої та видовища'],
    ['⚱', 'Урочисто перепоховав останки матері та братів'],
  ]
  return (
    <div className="slide s-power light">
      <Num n={4} />
      <div className="s-power-left">
        <Tag>Прихід до влади</Tag>
        <div className="year-row">
          <Rise delay={0.08} className="huge-year">
            37<span>р.</span>
          </Rise>
          <Rise delay={0.3} className="coin">
            <img src={img('coin')} alt="Сестерцій Калігули" />
          </Rise>
        </div>
        <Rise delay={0.18} className="body">
          Після смерті Тиберія <b>24-річний</b> Калігула стає імператором. Рим зустрічає його з
          величезною радістю — всі пам'ятали Германіка й сподівалися, що син продовжить його справу.
        </Rise>
      </div>
      <div className="s-power-right">
        <Rise delay={0.2} className="mini-label">Перші кроки — надії справджуються</Rise>
        <div className="deeds">
          {deeds.map(([icon, t], i) => (
            <Rise key={t} delay={0.3 + i * 0.1} className="deed">
              <span className="deed-icon">{icon}</span>
              <p>{t}</p>
            </Rise>
          ))}
        </div>
        <Rise delay={0.75} className="callout red turn-note">
          <b>Перелом:</b> через кілька місяців — тяжка хвороба. Після одужання поведінка імператора
          стала значно жорсткішою.
        </Rise>
      </div>
    </div>
  )
}

function Senate() {
  return (
    <div className="slide s-senate">
      <Num n={5} />
      <KenBurns src={img('senate')} className="dim2" />
      <div className="s-senate-overlay" />
      <div className="s-senate-content">
        <Tag>Правління та конфлікт із сенатом</Tag>
        <Rise delay={0.1} as="h2" className="h2">
          Влада без <em>меж</em>
        </Rise>
        <Rise delay={0.2} className="body">
          Рим формально зберігав республіканські установи, але фактично головні рішення залежали
          від імператора.
        </Rise>
        <div className="glass-list">
          {[
            'Змушував знать бігти поруч із його колісницею',
            'Публічно принижував сенаторів',
            'Вимагав особливої пошани до себе',
            'Бажав божественних почестей ще за життя',
            'За рік витратив усю скарбницю Тиберія',
            'Нові податки, суди та конфіскації майна',
          ].map((t, i) => (
            <Rise key={t} delay={0.3 + i * 0.1} className="glass-item">
              <i>{i + 1}</i>
              {t}
            </Rise>
          ))}
        </div>
      </div>
      <Rise delay={0.8} className="img-caption">Ч. Маккарі. «Цицерон викриває Катиліну», 1889</Rise>
    </div>
  )
}

function Bridge() {
  return (
    <div className="slide s-bridge">
      <Num n={6} />
      <KenBurns src={img('baiae')} className="dim" />
      <div className="s-bridge-overlay" />
      <div className="s-bridge-content">
        <Tag>39 рік · Неаполітанська затока</Tag>
        <Rise delay={0.1} as="h2" className="h2 big">
          Міст із <em>кораблів</em>
        </Rise>
        <Rise delay={0.2} className="body narrow">
          Між Байями та Путеолі сотні торговельних кораблів поставили у два ряди, закріпили та
          засипали землею, утворивши дорогу. Два дні імператор урочисто перетинав його верхи на коні
          та на колісниці в розкішному вбранні.
        </Rise>
        <div className="stats">
          {[
            ['≈5,5', 'км завдовжки'],
            ['100+', 'торговельних кораблів'],
            ['2', 'дні урочистостей'],
          ].map(([n, l], i) => (
            <Rise key={l} delay={0.35 + i * 0.12} className="stat">
              <b>{n}</b>
              <span>{l}</span>
            </Rise>
          ))}
        </div>
        <Rise delay={0.75} className="xerxes">
          <span>Паралель</span> Наслідування перського царя Ксеркса, що звів міст через Геллеспонт
        </Rise>
      </div>
      <Rise delay={0.9} className="img-caption">У. Тернер. «Затока Байї, з Аполлоном і Сивілою», 1823</Rise>
    </div>
  )
}

function Horse() {
  return (
    <div className="slide s-horse light">
      <Num n={7} />
      <div className="s-horse-img">
        <Rise delay={0.1} className="framed">
          <img src={img('incitatus')} alt="Калігула та Інцитат" />
        </Rise>
        <Rise delay={0.5} className="sticker">Кінь-консул?</Rise>
      </div>
      <div className="s-horse-text">
        <Tag>Найвідоміша історія</Tag>
        <Rise delay={0.1} as="h2" className="h2">
          Кінь <em>Інцитат</em>
        </Rise>
        <Rise delay={0.2} className="body">
          Імператор облаштував для улюбленого коня розкішну стайню, забезпечив прислугою, годував
          дорогими ласощами та нібито запрошував до нього гостей на бенкети.
        </Rise>
        <Rise delay={0.3} className="callout red">
          За переказами, Калігула хотів зробити Інцитата <b>консулом</b> — однією з найвищих посад у
          Римі!
        </Rise>
        <div className="two-col">
          <Rise delay={0.42} className="mini">
            <h4>Факт</h4>
            <p>Достовірних підтверджень, що кінь отримав посаду, немає.</p>
          </Rise>
          <Rise delay={0.52} className="mini">
            <h4>Версія</h4>
            <p>Навмисне знущання: навіть кінь не менш важливий за сенаторів.</p>
          </Rise>
        </div>
      </div>
    </div>
  )
}

function Death() {
  return (
    <div className="slide s-death">
      <Num n={8} />
      <div className="s-death-img">
        <KenBurns src={img('death')} />
        <div className="fade-right" />
      </div>
      <div className="s-death-text">
        <Tag>Загибель Калігули</Tag>
        <Rise delay={0.1} className="date-block">
          <b>24</b>
          <div>
            <span>січня</span>
            <span>41 року</span>
          </div>
        </Rise>
        <Rise delay={0.22} className="body">
          Невдоволення переросло у змову. Імператора вбили учасники <b>преторіанської гвардії</b> —
          його особистої охорони.
        </Rise>
        <Rise delay={0.34} className="person">
          <small>Головний організатор</small>
          <h4>Трибун Кассій Херея</h4>
        </Rise>
        <Rise delay={0.44} className="note light-note">
          Разом із Калігулою загинули його дружина Цезонія та маленька донька.
        </Rise>
        <Rise delay={0.54} className="after-note">
          Сенат обговорював відновлення республіки, але преторіанці проголосили імператором
          <b> Клавдія</b> — дядька Калігули.
        </Rise>
      </div>
    </div>
  )
}

function Conclusion() {
  return (
    <div className="slide s-concl">
      <Num n={9} />
      <KenBurns src={img('forum')} className="dim3" />
      <div className="s-concl-overlay" />
      <div className="s-concl-content">
        <Tag>Висновок</Tag>
        <Rise delay={0.1} className="body big-body">
          Історія Калігули — не просто розповідь про дивакуватого імператора. Це приклад того,
          наскільки <b>небезпечною</b> може бути влада, не обмежена політичними інституціями.
        </Rise>
        <Rise delay={0.25} className="body">
          Більшість відомостей про нього походить від античних авторів, які нерідко були налаштовані
          проти нього.
        </Rise>
        <Rise delay={0.45} as="h2" className="final-q">
          Божевільний тиран — <em>чи жертва</em> пропаганди своїх ворогів?
        </Rise>
      </div>
    </div>
  )
}

function Sources() {
  return (
    <div className="slide s-sources light">
      <div className="s-sources-left">
        <Tag>Література</Tag>
        <ul className="refs">
          {[
            ['Балух В. О., Коцур В. П.', 'Історія стародавнього Риму. Чернівці, 2005.'],
            ['Берд М.', 'Історія Давнього Риму. Book Chef, 2020.'],
            ['Светоній', 'Життя дванадцяти цезарів — біографія Калігули.'],
            ['Кассій Діон', 'Римська історія, книга 59.'],
          ].map(([a, b], i) => (
            <Rise key={a} delay={0.1 + i * 0.1} as="li">
              <b>{a}</b> {b}
            </Rise>
          ))}
        </ul>
        <Rise delay={0.6} className="credits">
          Зображення: Wikimedia Commons (суспільне надбання / CC). Ny Carlsberg Glyptotek, Лувр,
          Getty Museum, MET, Tate Britain.
        </Rise>
      </div>
      <div className="s-sources-right">
        <Rise delay={0.2} as="h2" className="thanks">
          Дякую <em>за увагу!</em>
        </Rise>
        <Rise delay={0.35} className="spqr">S·P·Q·R</Rise>
      </div>
    </div>
  )
}

export const slides = [Title, Intro, Childhood, Rise37, Senate, Bridge, Horse, Death, Conclusion, Sources]

export const slideTitles = [
  'Титул',
  'Вступ',
  'Походження',
  'Прихід до влади',
  'Сенат і скарбниця',
  'Міст',
  'Інцитат',
  'Загибель',
  'Висновок',
  'Література',
]
