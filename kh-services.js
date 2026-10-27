/* ------------------------------------------------------------------
   kh-services.js — Kyle Hagemann Reiki, services page
   Builds the whole services page and mounts it inside the Wix page.
   Settings live in the Wix snippet (window.KH_SERVICES); nothing in
   this file needs editing for day-to-day changes.
   ------------------------------------------------------------------ */
(function () {
  'use strict';

  var CFG = window.KH_SERVICES || {};

  var BASE = (CFG.base || 'https://cdn.jsdelivr.net/gh/gilby202/kh-lotus@main/services/').replace(/\/?$/, '/');
  var PAGE = (CFG.pagePath || '').replace(/\/$/, '');
  var TOP = CFG.topOffset != null ? CFG.topOffset : 0;
  var EMAIL = CFG.email || 'kylehagemannreiki@gmail.com';
  var PHONE = CFG.phone || '516-503-2052';
  var COLLAPSE = CFG.collapseWixPage !== false;

  var SITE = 'https://www.kylehagemannreiki.com';
  var BOOK = assign({
    all: SITE + '/book-online',
    reiki: SITE + '/service-page/reiki-healing-session',
    yoga: SITE + '/service-page/private-yoga-session',
    cleanse: SITE + '/service-page/home-negative-energy-cleanse',
    cards: SITE + '/service-page/choice-of-tarot-or-oracle-read-w-chakra-balance',
    'class': SITE + '/service-page/reiki-levels-1-2-certification-class'
  }, CFG.book);

  var PACK_LINKS = CFG.packs || {};
  var PHOTOS = assign({
    heroLeft: BASE + 'img/yoga.jpg',
    heroMid: BASE + 'img/hero-elephant.jpg',
    heroRight: BASE + 'img/class.jpg',
    reiki: BASE + 'img/reiki.jpg',
    yoga: BASE + 'img/yoga.jpg',
    cleanse: '',
    tarot: BASE + 'img/tarot.jpg',
    'class': BASE + 'img/class.jpg',
    portrait: ''
  }, CFG.photos);

  var HUES = { crown: '#B026C4', eye: '#6C36D9', throat: '#1E9BCB', heart: '#4E9E28', solar: '#C9871A', sacral: '#DD4B18', root: '#C51234' };
  var TIERS = [{ n: 3, off: 10 }, { n: 5, off: 12 }, { n: 10, off: 15 }];

  /* ---------------- content ---------------- */

  var SERVICES = [
    {
      id: 'reiki', hue: 'heart', photo: 'reiki', fit: 'paper',
      name: 'Reiki Healing Session', from: 'from $60',
      tag: 'In person at home · Distance',
      title: 'Reiki Healing Session',
      desc: 'Gentle energy work to release what the body has been holding. Kyle can come to you, or send Reiki from a distance while you rest wherever you are.',
      aside: 'In-person availability depends on your area — ask and Kyle will confirm.',
      prices: [
        { dur: '30 minutes', amt: '$60', book: 'reiki' },
        { dur: '1 hour', amt: '$100', book: 'reiki' }
      ],
      packs: { base: 100, unit: 'sessions', note: 'Pack prices are based on the 1-hour session. Ask about 30-minute packs.' }
    },
    {
      id: 'yoga', hue: 'sacral', photo: 'yoga',
      name: 'Private Yoga Session', from: '$100',
      tag: 'Private class · In your home',
      title: 'Private Yoga Session',
      desc: 'A personalized, one-on-one yoga session tailored to your individual needs, goals, and experience level.',
      prices: [{ dur: '1 hour, private', amt: '$100', book: 'yoga' }],
      packs: { base: 100, unit: 'sessions' }
    },
    {
      id: 'cleanse', hue: 'solar', photo: 'cleanse', art: 'cleanse',
      note: 'Photo slot · sage smoke through a doorway',
      name: 'Home Negative Energy Cleanse', from: 'from $100',
      tag: 'In your home',
      title: 'Home Negative Energy Cleanse',
      desc: 'Create a more peaceful, harmonious living environment through a spiritual home-cleansing ritual designed to release stagnant or unwanted energy.',
      aside: 'Invite high-vibrational energy, restore balance, and cultivate a sense of lightness, comfort and positive energy throughout your home.',
      prices: [{ dur: '1 hour, every room', amt: 'From $100', book: 'cleanse' }],
      packs: { base: 100, unit: 'visits', note: 'Based on the $100 starting rate — larger homes are priced on request.' }
    },
    {
      id: 'cards', hue: 'throat', photo: 'tarot', fit: 'contain',
      name: 'Tarot or Oracle Read', from: '$100',
      tag: 'In person · Virtual',
      title: 'Tarot or Oracle Read with Chakra Balance',
      desc: "Your choice of deck, read for whatever you're sitting with right now — then a chakra balance to settle what the cards bring up. Bring a question, or come with nothing in particular.",
      prices: [{ dur: '45 minutes', amt: '$100', book: 'cards' }],
      packs: { base: 100, unit: 'readings' }
    },
    {
      id: 'class', hue: 'crown', photo: 'class',
      name: 'Reiki Levels 1 & 2 Class', from: 'contact for dates',
      tag: 'Small group · 3 hours',
      title: 'Reiki Levels 1 &amp; 2 Certification Class',
      desc: "Learn from a Reiki Master who has developed a unique, holistic approach to supporting the body's natural healing process. Deepen your understanding of Reiki, expand your healing practice, and strengthen your connection to energy work.",
      aside: 'Level I and Level II classes run monthly. Reiki Mastership programs are available on request.',
      prices: [{ dur: '3 hours, certification', amt: 'Contact for dates', book: 'class', label: 'See dates' }],
      ask: 'Ask about the next class'
    }
  ];

  var RESULTS = [
    ['heart', 'Reduced anxiety and improved mood'],
    ['sacral', 'Enhanced energy'],
    ['solar', 'Relief from chronic pain and illness'],
    ['eye', 'Higher self-esteem and improved self-worth'],
    ['crown', 'Reduced side effects from chemotherapy and radiation treatment']
  ];

  var RIBBON_A = [['Reiki', 'heart'], ['Yoga', 'sacral'], ['Clearing', 'solar'], ['Cards', 'throat'], ['Certification', 'crown']];
  var RIBBON_B = [['in your home', 'root'], ['in person', 'throat'], ['virtually', 'eye'], ['at any distance', 'heart']];

  /* ---------------- helpers ---------------- */

  function assign(base, extra) {
    if (extra) for (var k in extra) if (extra[k]) base[k] = extra[k];
    return base;
  }
  function money(n) {
    n = Math.round(n * 100) / 100;
    var whole = Math.abs(n - Math.round(n)) < 0.001;
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: whole ? 0 : 2 });
  }
  function mailto(subject) {
    return 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject);
  }
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function easeInOut(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function photoBox(svc, alt) {
    var src = PHOTOS[svc.photo];
    var fitClass = src && svc.fit === 'contain' ? ' contain'
      : src && svc.fit === 'paper' ? ' contain paper' : '';
    if (src) {
      return '<div class="fill' + fitClass + '"><img class="pic" src="' + src + '" alt="' + (alt || '') + '"></div>';
    }
    return '<div class="fill"><div class="ph" data-art="' + (svc.art || '') + '"></div></div>' +
      (svc.note ? '<p class="note-slot">' + svc.note + '</p>' : '');
  }

  function packHTML(svc) {
    if (!svc.packs) return '';
    var base = svc.packs.base, unit = svc.packs.unit || 'sessions';
    var cards = TIERS.map(function (t) {
      var total = Math.round(base * t.n * (1 - t.off / 100) * 100) / 100;
      var key = svc.id + '-' + t.n;
      var href = PACK_LINKS[key] || mailto('Pack of ' + t.n + ' — ' + svc.title.replace(/&amp;/g, '&'));
      var ext = PACK_LINKS[key] ? ' target="_blank" rel="noopener"' : '';
      return '<li>' +
        '<span class="n"><b>' + t.n + '</b><span>' + unit + '</span></span>' +
        '<span class="off">' + t.off + '% off</span>' +
        '<span class="tot">' + money(total) + '</span>' +
        '<span class="per">' + money(total / t.n) + ' each</span>' +
        '<a class="buy" href="' + href + '"' + ext + '>Buy pack</a>' +
        '</li>';
    }).join('');
    return '<div class="packs-in"><p class="label">Save with a pack</p><ul class="pack-row">' + cards + '</ul>' +
      (svc.packs.note ? '<p class="fine">' + svc.packs.note + '</p>' : '') + '</div>';
  }

  function serviceHTML(svc) {
    var prices = svc.prices.map(function (p) {
      return '<li><span class="dur">' + p.dur + '</span><span class="amt">' + p.amt + '</span>' +
        '<a class="buy" href="' + BOOK[p.book] + '" target="_blank" rel="noopener">' + (p.label || 'Book') + '</a></li>';
    }).join('');

    return '<article class="svc" id="khs-' + svc.id + '" data-hue="' + svc.hue + '" data-name="' +
      svc.name.replace(/&amp;/g, '&') + '" data-from="' + svc.from + '" style="--c:var(--' + svc.hue + ')">' +
      '<div class="shot-inline"><div class="reveal">' + photoBox(svc, svc.name) + '</div></div>' +
      '<p class="label tag">' + svc.tag + '</p>' +
      '<h3>' + svc.title + '</h3>' +
      '<p class="desc">' + svc.desc + '</p>' +
      (svc.aside ? '<p class="aside">' + svc.aside + '</p>' : '') +
      '<ul class="prices">' + prices + '</ul>' +
      packHTML(svc) +
      (svc.ask ? '<a class="pill" href="' + mailto(svc.title.replace(/&amp;/g, '&')) + '">' + svc.ask + ' <span class="arr" aria-hidden="true">→</span></a>' : '') +
      '</article>';
  }

  function ribbonHTML(words, cls) {
    var once = words.map(function (w) {
      return '<span class="w">' + w[0] + ' <i class="dot" style="--c:var(--' + w[1] + ')"></i></span>';
    }).join('');
    return '<div class="line ' + cls + '">' + once + once + '</div>';
  }

  /* ---------------- markup ---------------- */

  function pageHTML() {
    var heroArch = function (key, pos) {
      return '<div class="lift"><div class="arch"><div class="fill"><img class="pic" src="' +
        PHOTOS[key] + '" alt="" style="object-position:' + pos + '"></div></div></div>';
    };

    return '' +
      '<section class="hero" data-hue="heart">' +
      '<div class="hero-copy">' +
      '<p class="label">Services &amp; pricing</p>' +
      '<h1>Five ways to find your <em>peace</em></h1>' +
      '<p class="sub">Reiki, private yoga, home energy clearing, card readings and certification — in your home, in person, virtually, or from a distance.</p>' +
      '<div class="facts">' +
      '<div><span class="label">Sessions from</span><b>$60</b></div>' +
      '<div><span class="label">Packs save up to</span><b>15%</b></div>' +
      '<div><span class="label">Held</span><b>Home · Virtual · Distance</b></div>' +
      '</div></div>' +
      '<div class="trio" aria-hidden="true">' +
      heroArch('heroLeft', '50% 58%') + heroArch('heroMid', '46% 50%') + heroArch('heroRight', '52% 50%') +
      '</div></section>' +

      '<div class="ribbon" aria-hidden="true">' + ribbonHTML(RIBBON_A, 'a') + ribbonHTML(RIBBON_B, 'b') + '</div>' +

      '<section class="about" data-hue="heart"><div>' +
      '<p class="label">About the work</p>' +
      '<h2>Reiki is an ancient form of Japanese healing</h2>' +
      '<p>It is believed to reduce stress, increase energy, and provide a feeling of peace and calm for the patient during and after the healing session.</p>' +
      '<p>Sessions are one to one, and you stay fully clothed throughout. Kyle is a Reiki master and a 500-hour registered yoga instructor working across Long Island and, for distance work, anywhere.</p>' +
      '</div><div class="results-col"><p class="label">Typical results</p><ul class="results">' +
      RESULTS.map(function (r) { return '<li><i style="--c:var(--' + r[0] + ')"></i>' + r[1] + '</li>'; }).join('') +
      '</ul></div></section>' +

      '<section class="services" id="khs-services">' +
      '<div class="services-head"><p class="label">Services</p>' +
      '<h2>Pick the practice that fits the day</h2>' +
      '<p>Book a single session, or buy a pack and every session in it is discounted — 10% off three, 12% off five, 15% off ten.</p></div>' +
      '<div class="svc-grid"><div class="stage-col" aria-hidden="true"><div class="stage">' +
      '<div class="frame-wrap"><div class="glow"></div><div class="frame arch">' +
      SERVICES.map(function (s) {
        return '<div class="layer" style="--c:var(--' + s.hue + ')">' + photoBox(s) + '</div>';
      }).join('') +
      '</div></div>' +
      '<div class="stage-meta"><ul class="dots"></ul>' +
      '<p class="now"><span class="now-name">' + SERVICES[0].name + '</span><span class="label now-from">' + SERVICES[0].from + '</span></p>' +
      '</div></div></div>' +
      '<div class="svc-list">' + SERVICES.map(serviceHTML).join('') + '</div>' +
      '</div></section>' +

      '<section class="cta" id="khs-book" data-hue="heart">' +
      '<div class="arch">' + (PHOTOS.portrait
        ? '<div class="fill"><img class="pic" src="' + PHOTOS.portrait + '" alt="Kyle Hagemann"></div>'
        : '<div class="fill"><div class="ph" data-art="portrait"></div></div><p class="note-slot">Photo slot · portrait of Kyle</p>') +
      '</div><div>' +
      '<p class="label">Book</p><h2>Ready when <em>you</em> are</h2>' +
      '<p class="lede">Pick a time straight from the booking calendar, or email Kyle with what you\'d like and a few times that work for you. For anything in person, include your town so he can confirm availability.</p>' +
      '<div class="actions">' +
      '<a class="pill solid" href="' + BOOK.all + '">See availability <span class="arr" aria-hidden="true">→</span></a>' +
      '<a class="pill line" href="' + mailto('Booking request') + '">Email Kyle</a>' +
      '<a class="pill line" href="tel:' + PHONE.replace(/[^0-9+]/g, '') + '">Call ' + PHONE + '</a>' +
      '</div></div></section>';
  }

  /* ---------------- styles ---------------- */

  function css() {
    return '' +
      '@property --k { syntax: "<color>"; inherits: true; initial-value: #4E9E28; }' +
      '#khs{' +
      '--paper:#F6F7F4;--raise:#FFFFFF;--sunk:#ECEFEA;--ink:#101413;--ink-2:#3D4645;--muted:#66716F;' +
      '--rule:#10141322;--rule-soft:#10141312;--kmix:64%;' +
      '--crown:#B026C4;--eye:#6C36D9;--throat:#1E9BCB;--heart:#4E9E28;--solar:#C9871A;--sacral:#DD4B18;--root:#C51234;' +
      '--k:#4E9E28;--kt:color-mix(in oklab, var(--k) var(--kmix), var(--ink));' +
      '--display:"Newsreader","Iowan Old Style",Georgia,serif;--body:"Karla","Helvetica Neue",Arial,sans-serif;' +
      '--pad:clamp(1rem,5vw,5rem);--top:' + TOP + 'px;--ease:cubic-bezier(.16,1,.3,1);' +
      'transition:--k 1.1s ease;position:relative;z-index:1;' +
      'background:var(--paper);color:var(--ink);font-family:var(--body);font-weight:300;font-size:17px;line-height:1.7;' +
      '-webkit-font-smoothing:antialiased;overflow-x:clip;}' +
      '#khs *{box-sizing:border-box}' +
      '#khs img{display:block;max-width:100%}' +
      '#khs h1,#khs h2,#khs h3{font-family:var(--display);font-weight:300;margin:0;letter-spacing:-.015em;text-wrap:balance}' +
      '#khs p{margin:0}#khs a{color:inherit}' +
      '#khs :focus-visible{outline:2px solid var(--kt);outline-offset:3px;border-radius:2px}' +
      '#khs .label{font-size:.68rem;letter-spacing:.24em;text-transform:uppercase;font-weight:500;color:var(--muted)}' +
      '#khs section,#khs .ribbon{padding-inline:var(--pad)}' +
      '#khs .ribbon{padding-inline:0}' +

      /* photo slots */
      '#khs .fill{position:absolute;inset:-7% 0;will-change:transform}' +
      '#khs .fill .pic{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}' +
      '#khs .fill.contain{inset:0;background:#FAF6EA}' +
      '#khs .fill.contain .pic{object-fit:contain;padding:7% 9%}' +
      '#khs .fill.contain.paper{background:#FDFDFC}' +
      '#khs .fill.contain.paper .pic{padding:3% 5%}' +
      '#khs .ph{--lx:32%;--ly:16%;position:absolute;inset:0;background:' +
      'radial-gradient(75% 52% at var(--lx) var(--ly), #FFFFFF 0%, transparent 70%),' +
      'radial-gradient(90% 70% at 85% 108%, color-mix(in oklab, var(--c) 42%, #6E7A73) 0%, transparent 72%),' +
      'linear-gradient(170deg, color-mix(in oklab, var(--c) 12%, #FFFFFF) 0%, color-mix(in oklab, var(--c) 46%, #DDE4DC) 100%)}' +
      '#khs .ph::before{content:"";position:absolute;inset:0;pointer-events:none}' +
      '#khs .ph[data-art="cleanse"]::before{background:' +
      'radial-gradient(10% 34% at 44% 58%, rgba(255,255,255,.75), transparent 72%),' +
      'radial-gradient(8% 26% at 55% 36%, rgba(255,255,255,.6), transparent 72%),' +
      'radial-gradient(16% 20% at 47% 16%, rgba(255,255,255,.45), transparent 72%),' +
      'radial-gradient(3% 2.4% at 46% 86%, rgba(255,186,90,.95), transparent 80%),' +
      'radial-gradient(15% 9% at 46% 86%, rgba(255,170,80,.35), transparent 80%);filter:blur(5px);transform:skewX(-9deg) scale(1.08)}' +
      '#khs .ph[data-art="portrait"]::before{background:' +
      'radial-gradient(14% 11% at 50% 40%, rgba(255,255,255,.75) 0 95%, transparent 100%),' +
      'radial-gradient(46% 30% at 50% 100%, rgba(255,255,255,.6) 0 97%, transparent 100%)}' +
      '#khs .note-slot{position:absolute;left:0;right:0;bottom:0;z-index:2;padding:2.6rem 1rem 1.05rem;text-align:center;' +
      'font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;font-weight:500;line-height:1.5;color:var(--ink-2);' +
      'background:linear-gradient(transparent,rgba(255,255,255,.72))}' +
      '#khs .arch{position:relative;overflow:hidden;isolation:isolate;border-radius:999px 999px 6px 6px;background:var(--sunk)}' +

      /* hero */
      '#khs .hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:clamp(2.5rem,6vw,6rem);' +
      'align-items:center;padding-block:clamp(3rem,8vh,6rem) clamp(3.5rem,9vh,6.5rem)}' +
      '#khs .hero h1{font-size:clamp(3rem,7.2vw,6.4rem);line-height:.95;margin-top:1.4rem}' +
      '#khs .hero h1 em{font-style:italic;font-weight:300;color:var(--kt)}' +
      '#khs .hero .sub{margin-top:1.7rem;max-width:40ch;color:var(--ink-2);font-size:clamp(1rem,1.5vw,1.14rem)}' +
      '#khs .facts{display:flex;flex-wrap:wrap;gap:1.1rem 2.6rem;margin-top:2.6rem;padding-top:1.5rem;border-top:1px solid var(--rule-soft)}' +
      '#khs .facts b{display:block;margin-top:.25rem;font-family:var(--display);font-weight:400;font-size:1.45rem;line-height:1.2;color:var(--ink);font-variant-numeric:tabular-nums}' +
      '#khs .trio{display:grid;grid-template-columns:1fr 1.18fr .92fr;gap:clamp(.55rem,1.4vw,1.1rem);align-items:start}' +
      '#khs .trio .arch{aspect-ratio:3/5}' +
      '#khs .trio .lift:nth-child(1){margin-top:18%}#khs .trio .lift:nth-child(3){margin-top:40%}' +
      '@media (max-width:860px){#khs .hero{grid-template-columns:1fr;padding-block:2.5rem 3rem}#khs .trio{max-width:520px}}' +

      /* ribbon */
      '#khs .ribbon{overflow:hidden;overflow:clip;padding-block:clamp(1.8rem,5vh,3.4rem);border-block:1px solid var(--rule-soft)}' +
      '#khs .ribbon .line{display:flex;width:max-content;white-space:nowrap;will-change:transform;font-family:var(--display);' +
      'font-weight:200;font-size:clamp(2.6rem,8vw,6.6rem);line-height:1.12;letter-spacing:-.02em}' +
      '#khs .ribbon .line.b{font-style:italic;color:var(--muted);margin-top:.15rem}' +
      '#khs .ribbon .w{display:inline-flex;align-items:center;gap:.5em;padding-right:.5em}' +
      '#khs .ribbon .dot{display:inline-block;width:.16em;height:.16em;border-radius:50%;background:var(--c)}' +

      /* about */
      '#khs .about{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(2rem,6vw,5rem);padding-block:clamp(4rem,10vh,7rem)}' +
      '#khs .about h2{font-size:clamp(1.9rem,4.2vw,3rem);line-height:1.06;margin-top:1rem;max-width:20ch}' +
      '#khs .about p{color:var(--ink-2);margin-top:1.3rem;max-width:50ch}' +
      '#khs .results-col{align-self:center}#khs .results-col .label{margin-bottom:1.1rem}' +
      '#khs .results{list-style:none;margin:0;padding:0}' +
      '#khs .results li{display:flex;gap:1rem;padding:.95rem 0;border-bottom:1px solid var(--rule-soft);color:var(--ink-2);font-size:.98rem}' +
      '#khs .results li:first-child{border-top:1px solid var(--rule-soft)}' +
      '#khs .results i{flex:none;width:7px;height:7px;margin-top:.62rem;border-radius:50%;background:var(--c)}' +
      '@media (max-width:820px){#khs .about{grid-template-columns:1fr}}' +

      /* services */
      '#khs .services{padding-block:clamp(3rem,8vh,5rem) 1rem;border-top:1px solid var(--rule-soft)}' +
      '#khs .services-head{max-width:62ch;margin-bottom:clamp(1rem,4vh,3rem)}' +
      '#khs .services-head h2{font-size:clamp(2.1rem,4.6vw,3.5rem);line-height:1.04;margin-top:1rem}' +
      '#khs .services-head p{color:var(--ink-2);margin-top:1rem;max-width:54ch}' +
      '#khs .svc-grid{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1fr);gap:clamp(2rem,6vw,6rem)}' +
      '#khs .stage-col{position:relative}' +
      '#khs .stage{position:sticky;top:calc(var(--top) + 2vh);height:calc(100svh - var(--top) - 4vh);' +
      'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.5rem}' +
      '#khs .frame-wrap{position:relative;height:min(62svh,580px);aspect-ratio:4/5;max-width:100%}' +
      '#khs .glow{position:absolute;inset:-16%;z-index:0;pointer-events:none;border-radius:50%;' +
      'background:radial-gradient(closest-side, color-mix(in oklab, var(--k) 30%, transparent), transparent);filter:blur(34px);opacity:.45}' +
      '#khs .frame{position:absolute;inset:0;z-index:1;box-shadow:0 44px 90px -60px color-mix(in oklab, var(--k) 70%, #000)}' +
      '#khs .layer{position:absolute;inset:0;will-change:clip-path}' +
      '#khs .layer + .layer{clip-path:circle(0% at 50% 100%)}' +
      '#khs .stage-meta{position:relative;z-index:1;display:flex;align-items:center;gap:1.3rem;min-height:2rem}' +
      '#khs .dots{display:flex;align-items:center;gap:.5rem;list-style:none;margin:0;padding:0}' +
      '#khs .dots button{position:relative;display:block;width:9px;height:9px;padding:0;border:0;border-radius:9px;cursor:pointer;' +
      'background:var(--rule);transition:width .6s var(--ease),background .6s ease}' +
      '#khs .dots button::after{content:"";position:absolute;inset:-12px -4px}' +
      '#khs .dots button[aria-current="true"]{width:30px;background:var(--c)}' +
      '#khs .now{display:flex;align-items:baseline;gap:.8rem;transition:opacity .35s ease}' +
      '#khs .now.swap{opacity:0}' +
      '#khs .now-name{font-family:var(--display);font-style:italic;font-size:1.15rem;color:var(--ink)}' +
      '#khs .svc{--ct:color-mix(in oklab, var(--c) var(--kmix), var(--ink));min-height:84svh;display:flex;flex-direction:column;' +
      'justify-content:center;padding-block:4rem;scroll-margin-top:calc(var(--top) + 1rem);opacity:var(--o,1);transform:translate3d(0,var(--dy,0px),0)}' +
      '#khs .svc .tag{display:flex;align-items:center;gap:.75rem;color:var(--ct)}' +
      '#khs .svc .tag::before{content:"";width:28px;height:1px;background:var(--c)}' +
      '#khs .svc h3{font-size:clamp(2rem,4vw,3.3rem);line-height:1.04;margin-top:1.1rem}' +
      '#khs .svc .desc{color:var(--ink-2);margin-top:1.2rem;max-width:46ch}' +
      '#khs .svc .aside{margin-top:.8rem;font-size:.9rem;color:var(--muted);max-width:46ch}' +
      '#khs .prices{list-style:none;margin:1.6rem 0 0;padding:0;max-width:470px;border-top:1px solid var(--rule)}' +
      '#khs .prices li{display:grid;grid-template-columns:1fr auto auto;align-items:center;gap:1.2rem;padding:.8rem 0;border-bottom:1px solid var(--rule-soft)}' +
      '#khs .prices .dur{font-size:.95rem;color:var(--ink-2)}' +
      '#khs .prices .amt{font-family:var(--display);font-weight:400;font-size:1.6rem;line-height:1.1;color:var(--ink);font-variant-numeric:tabular-nums}' +
      '#khs .buy{text-decoration:none;white-space:nowrap;padding:.5rem .95rem;border:1px solid var(--rule);border-radius:999px;' +
      'font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;font-weight:500;color:var(--ink-2);' +
      'transition:background .3s ease,border-color .3s ease,color .3s ease}' +
      '#khs .buy:hover{background:var(--ct);border-color:var(--ct);color:var(--paper)}' +
      '#khs .packs-in{margin-top:1.9rem;max-width:470px}' +
      '#khs .packs-in .label{display:flex;align-items:center;gap:.8rem}' +
      '#khs .packs-in .label::after{content:"";flex:1;height:1px;background:var(--rule-soft)}' +
      '#khs .pack-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.6rem;list-style:none;margin:.95rem 0 0;padding:0}' +
      '#khs .pack-row li{display:flex;flex-direction:column;background:var(--raise);border:1px solid var(--rule-soft);border-radius:5px;padding:1rem .9rem 1.05rem}' +
      '#khs .pack-row .n{display:flex;align-items:baseline;gap:.35rem}' +
      '#khs .pack-row .n b{font-family:var(--display);font-weight:300;font-size:2rem;line-height:1;color:var(--ink)}' +
      '#khs .pack-row .n span{font-size:.72rem;color:var(--muted)}' +
      '#khs .pack-row .off{margin-top:.45rem;font-size:.6rem;letter-spacing:.16em;text-transform:uppercase;font-weight:500;color:var(--ct)}' +
      '#khs .pack-row .tot{margin-top:.75rem;font-family:var(--display);font-size:1.3rem;line-height:1;color:var(--ink);font-variant-numeric:tabular-nums}' +
      '#khs .pack-row .per{margin-top:.3rem;font-size:.78rem;color:var(--muted);font-variant-numeric:tabular-nums}' +
      '#khs .pack-row .buy{margin-top:.95rem;text-align:center;padding:.45rem .5rem;font-size:.56rem;letter-spacing:.16em}' +
      '#khs .packs-in .fine{margin-top:.85rem;font-size:.82rem;color:var(--muted)}' +
      '@media (max-width:520px){#khs .pack-row{grid-template-columns:1fr}' +
      '#khs .pack-row li{flex-direction:row;flex-wrap:wrap;align-items:center;gap:.2rem 1rem;padding:.8rem .9rem}' +
      '#khs .pack-row .n{flex:none}#khs .pack-row .off,#khs .pack-row .tot,#khs .pack-row .per{margin-top:0}' +
      '#khs .pack-row .tot{margin-left:auto}#khs .pack-row .buy{margin-top:0;flex:none}}' +
      '#khs .pill{display:inline-flex;align-items:center;gap:.8rem;align-self:flex-start;padding:.9rem 1.35rem;' +
      'border:1px solid var(--rule);border-radius:999px;font-size:.7rem;letter-spacing:.22em;text-transform:uppercase;' +
      'font-weight:500;text-decoration:none;color:var(--ink);transition:background .35s ease,border-color .35s ease,color .35s ease}' +
      '#khs .pill .arr{transition:transform .45s var(--ease)}#khs .pill:hover .arr{transform:translateX(4px)}' +
      '#khs .svc .pill{margin-top:1.8rem}' +
      '#khs .svc .pill:hover{background:var(--ct);border-color:var(--ct);color:var(--paper)}' +
      '#khs .pill.solid{background:var(--ink);border-color:var(--ink);color:var(--paper)}' +
      '#khs .pill.solid:hover{background:var(--kt);border-color:var(--kt)}' +
      '#khs .pill.line:hover{border-color:var(--kt);color:var(--kt)}' +
      '#khs .shot-inline{display:none}' +
      '@media (max-width:899px){#khs .svc-grid{grid-template-columns:minmax(0,1fr)}#khs .stage-col{display:none}' +
      '#khs .svc{min-height:0;padding-block:2.6rem 3.4rem;opacity:1;transform:none}' +
      '#khs .shot-inline{display:block;position:relative;width:min(100%,400px);aspect-ratio:4/5;margin-bottom:2.2rem;' +
      'border-radius:999px 999px 6px 6px;overflow:hidden;background:var(--sunk)}' +
      '#khs .shot-inline .reveal{position:absolute;inset:0;clip-path:circle(var(--r,130%) at 50% 100%)}}' +

      /* book */
      '#khs .cta{display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,1fr);gap:clamp(2rem,6vw,6rem);align-items:center;' +
      'padding-block:clamp(4.5rem,11vh,8rem);border-top:1px solid var(--rule-soft)}' +
      '#khs .cta .arch{width:100%;max-width:370px;aspect-ratio:4/5;justify-self:center}' +
      '#khs .cta h2{font-size:clamp(2.7rem,7vw,5.8rem);line-height:.97;margin-top:1rem}' +
      '#khs .cta h2 em{font-style:italic;color:var(--kt)}' +
      '#khs .cta .lede{color:var(--ink-2);margin-top:1.4rem;max-width:44ch}' +
      '#khs .actions{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:2.3rem}' +
      '@media (max-width:760px){#khs .cta{grid-template-columns:minmax(0,1fr)}#khs .cta .arch{max-width:250px;justify-self:start}}' +

      '@media (prefers-reduced-motion:reduce){#khs{transition:none}' +
      '#khs .svc-grid{grid-template-columns:minmax(0,1fr)}#khs .stage-col{display:none}' +
      '#khs .svc{min-height:0;opacity:1;transform:none}#khs .shot-inline{display:block;position:relative;' +
      'width:min(100%,400px);aspect-ratio:4/5;margin-bottom:2.2rem;border-radius:999px 999px 6px 6px;overflow:hidden;background:var(--sunk)}' +
      '#khs .shot-inline .reveal{position:absolute;inset:0}}';
  }

  /* ---------------- mount ---------------- */

  var root = null, styleEl = null, fontsEl = null, collapsed = [], teardown = [];

  function findHost() {
    if (CFG.mountSelector) {
      var custom = document.querySelector(CFG.mountSelector);
      if (custom) return custom;
    }
    return document.querySelector('#SITE_PAGES') || document.querySelector('#masterPage') || document.body;
  }

  function loadFonts() {
    if (document.getElementById('khs-fonts')) return;
    fontsEl = document.createElement('link');
    fontsEl.id = 'khs-fonts';
    fontsEl.rel = 'stylesheet';
    fontsEl.href = 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..500;1,6..72,200..400&family=Karla:wght@300;400;500;600&display=swap';
    document.head.appendChild(fontsEl);
  }

  function mount() {
    if (root) return;
    loadFonts();

    styleEl = document.createElement('style');
    styleEl.id = 'khs-style';
    styleEl.textContent = css();
    document.head.appendChild(styleEl);

    root = document.createElement('div');
    root.id = 'khs';
    root.innerHTML = pageHTML();

    var host = findHost();
    if (COLLAPSE && host !== document.body) {
      for (var i = 0; i < host.children.length; i++) {
        var c = host.children[i];
        collapsed.push([c, c.getAttribute('style') || '']);
        c.style.minHeight = '0';
        c.style.height = '0';
        c.style.padding = '0';
        c.style.margin = '0';
        c.style.overflow = 'hidden';
      }
    }
    host.appendChild(root);
    start();
  }

  function destroy() {
    if (!root) return;
    teardown.forEach(function (fn) { fn(); });
    teardown = [];
    collapsed.forEach(function (pair) {
      if (pair[1]) pair[0].setAttribute('style', pair[1]); else pair[0].removeAttribute('style');
    });
    collapsed = [];
    if (root.parentNode) root.parentNode.removeChild(root);
    if (styleEl && styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
    root = null; styleEl = null;
  }

  /* ---------------- behaviour ---------------- */

  function start() {
    var q = function (sel) { return root.querySelector(sel); };
    var all = function (sel) { return [].slice.call(root.querySelectorAll(sel)); };

    var hero = q('.hero');
    var arches = all('.trio .arch');
    var ribbon = q('.ribbon');
    var lines = all('.ribbon .line');
    var svcs = all('.svc');
    var layers = all('.stage .layer');
    var inlines = svcs.map(function (s) { return s.querySelector('.shot-inline'); });
    var portrait = q('.cta .arch');
    var zones = all('[data-hue]');
    var dotsEl = q('.dots');
    var now = q('.now'), nowName = q('.now-name'), nowFrom = q('.now-from');

    var mqStill = matchMedia('(prefers-reduced-motion: reduce)');
    var mqWide = matchMedia('(min-width: 900px)');
    var still = mqStill.matches, wide = mqWide.matches && !still;

    var dots = svcs.map(function (s, i) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.style.setProperty('--c', getComputedStyle(s).getPropertyValue('--c'));
      b.setAttribute('aria-label', 'Show ' + s.getAttribute('data-name'));
      b.setAttribute('aria-current', i === 0 ? 'true' : 'false');
      b.addEventListener('click', function () {
        var y = docTop(s) - TOP - 8;
        scrollTo({ top: y, behavior: still ? 'auto' : 'smooth' });
      });
      li.appendChild(b); dotsEl.appendChild(li);
      return b;
    });

    function docTop(el) { var t = 0; while (el) { t += el.offsetTop; el = el.offsetParent; } return t; }
    function box(el) { return { top: docTop(el), h: el.offsetHeight }; }

    var M = {};
    function measure() {
      M.vw = innerWidth; M.vh = innerHeight;
      M.hero = box(hero);
      M.ribbon = box(ribbon);
      M.lineW = lines.map(function (l) { return l.scrollWidth; });
      M.svcs = svcs.map(box);
      M.inlines = inlines.map(function (el) { return el.offsetParent ? box(el) : null; });
      M.portrait = box(portrait);
      M.zones = zones.map(function (z) { var b = box(z); b.hue = z.getAttribute('data-hue'); return b; });
    }

    var lastHue = '', lastActive = 0, SPEEDS = [0.10, 0.24, 0.04];

    function render(y) {
      var vh = M.vh, mid = y + vh / 2;

      var hue = M.zones.length ? M.zones[0].hue : 'heart';
      for (var z = 0; z < M.zones.length; z++) if (M.zones[z].top <= mid) hue = M.zones[z].hue;
      if (hue !== lastHue) { lastHue = hue; root.style.setProperty('--k', HUES[hue]); }

      if (still) return;

      var k = Math.min(Math.max(y - M.hero.top, 0), M.hero.h);
      arches.forEach(function (a, i) {
        a.style.transform = 'translate3d(0,' + (-k * SPEEDS[i]).toFixed(1) + 'px,0)';
        a.firstElementChild.style.transform = 'scale(' + (1.1 - 0.1 * clamp(k / vh)).toFixed(4) + ')';
      });

      var qy = clamp((y + vh - M.ribbon.top) / (vh + M.ribbon.h));
      lines.forEach(function (l, i) {
        var travel = Math.min(Math.max(0, M.lineW[i] - M.vw), M.vw * 0.55);
        l.style.transform = 'translate3d(' + (i % 2 ? -travel * (1 - qy) : -travel * qy).toFixed(1) + 'px,0,0)';
      });

      if (wide) {
        var active = 0;
        M.svcs.forEach(function (b, i) {
          var t = b.top - y;
          if (t < vh * 0.5) active = i;
          var d = (b.top + b.h / 2 - mid) / vh;
          svcs[i].style.setProperty('--o', (1 - Math.min(1, Math.abs(d) / 0.78) * 0.66).toFixed(3));
          svcs[i].style.setProperty('--dy', (Math.max(-1, Math.min(1, d)) * 40).toFixed(1) + 'px');
          if (i > 0) {
            var e = easeInOut(clamp((vh * 0.92 - t) / (vh * 0.64)));
            layers[i].style.clipPath = e >= 1 ? 'none' : 'circle(' + (e * 130).toFixed(2) + '% at 50% 100%)';
            layers[i].firstElementChild.style.transform =
              'translate3d(0,' + ((1 - e) * 7).toFixed(2) + '%,0) scale(' + (1.14 - 0.14 * e).toFixed(4) + ')';
          }
        });
        if (active !== lastActive) {
          lastActive = active;
          dots.forEach(function (b, j) { b.setAttribute('aria-current', j === active ? 'true' : 'false'); });
          now.classList.add('swap');
          setTimeout(function () {
            if (!root) return;
            nowName.textContent = svcs[lastActive].getAttribute('data-name');
            nowFrom.textContent = svcs[lastActive].getAttribute('data-from');
            now.classList.remove('swap');
          }, 260);
        }
      } else {
        M.inlines.forEach(function (b, i) {
          if (!b) return;
          var e = easeOut(clamp((vh * 1.02 - (b.top - y)) / (vh * 0.62)));
          inlines[i].style.setProperty('--r', (24 + e * 106).toFixed(2) + '%');
          inlines[i].querySelector('.fill').style.transform = 'scale(' + (1.12 - 0.12 * e).toFixed(4) + ')';
        });
      }

      var pp = clamp((vh - (M.portrait.top - y)) / (vh + M.portrait.h));
      portrait.firstElementChild.style.transform =
        'translate3d(0,' + ((0.5 - pp) * 9).toFixed(2) + '%,0) scale(1.06)';
    }

    function clearMotion() {
      svcs.forEach(function (s) { s.style.removeProperty('--o'); s.style.removeProperty('--dy'); });
      layers.forEach(function (l) { l.style.clipPath = ''; l.firstElementChild.style.transform = ''; });
      inlines.forEach(function (el) { el.style.removeProperty('--r'); el.querySelector('.fill').style.transform = ''; });
      arches.forEach(function (a) { a.style.transform = ''; a.firstElementChild.style.transform = ''; });
      lines.forEach(function (l) { l.style.transform = ''; });
      portrait.firstElementChild.style.transform = '';
    }

    var target = scrollY, current = scrollY, raf = 0;
    function frame() {
      if (!root) { raf = 0; return; }
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.4) current = target;
      render(current);
      raf = current !== target ? requestAnimationFrame(frame) : 0;
    }
    function onScroll() {
      target = scrollY;
      if (still) { render(target); return; }
      if (!raf) raf = requestAnimationFrame(frame);
    }
    function refresh() {
      still = mqStill.matches; wide = mqWide.matches && !still;
      clearMotion(); measure();
      current = target = scrollY;
      render(current);
    }

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', refresh);
    teardown.push(function () {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', refresh);
      if (raf) cancelAnimationFrame(raf);
    });

    if (mqStill.addEventListener) {
      mqStill.addEventListener('change', refresh);
      mqWide.addEventListener('change', refresh);
      teardown.push(function () {
        mqStill.removeEventListener('change', refresh);
        mqWide.removeEventListener('change', refresh);
      });
    }

    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(function () { if (root) { measure(); render(current); } });
      ro.observe(root);
      teardown.push(function () { ro.disconnect(); });
    }

    // images arrive late on a CDN — re-measure as each one lands
    all('img').forEach(function (img) {
      if (img.complete) return;
      img.addEventListener('load', function () { if (root) { measure(); render(current); } }, { once: true });
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { if (root) { measure(); render(current); } });
    }

    refresh();
    setTimeout(function () { if (root) refresh(); }, 600);
  }

  /* ---------------- routing (Wix is a single-page app) ---------------- */

  function onThisPage() {
    if (!PAGE) return true;
    return (location.pathname.replace(/\/$/, '') || '/') === (PAGE || '/');
  }

  function sync() {
    if (onThisPage()) mount(); else destroy();
  }

  var lastPath = location.pathname;
  setInterval(function () {
    if (location.pathname !== lastPath) { lastPath = location.pathname; setTimeout(sync, 80); }
  }, 400);
  addEventListener('popstate', function () { setTimeout(sync, 80); });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sync);
  } else {
    sync();
  }
})();
