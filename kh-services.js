/* ------------------------------------------------------------------
   kh-services.js — Kyle Hagemann Reiki, services page
   Builds the whole services page and mounts it inside the Wix page.
   Settings live in the Wix snippet (window.KH_SERVICES); nothing in
   this file needs editing for day-to-day changes.
   ------------------------------------------------------------------ */
(function () {
  'use strict';

  var CFG = window.KH_SERVICES || {};

  var PAGE = (CFG.pagePath || '').replace(/\/$/, '');
  var TOP = CFG.topOffset != null ? CFG.topOffset : 0;
  var EMAIL = CFG.email || 'kylehagemannreiki@gmail.com';
  var PHONE = CFG.phone || '516-503-2052';
  var COLLAPSE = CFG.collapseWixPage !== false;

  var SITE = 'https://www.kylehagemannreiki.com';
  var BOOK = assign({
    all: SITE + '/book-online1',
    reiki: SITE + '/service-page/reiki-healing-session',
    pet: SITE + '/service-page/pet-reiki',
    yoga: SITE + '/service-page/private-yoga-session',
    cleanse: SITE + '/service-page/home-negative-energy-cleanse',
    cards: SITE + '/service-page/choice-of-tarot-or-oracle-read-w-chakra-balance',
    'class': SITE + '/service-page/reiki-levels-1-2-certification-class'
  }, CFG.book);

  // Plan "Buy plan" buttons open that plan's Wix checkout. A different link
  // can be pasted into the snippet under KH_SERVICES.plans[planId].
  var PLAN_LINKS = CFG.plans || {};
  function planURL(p) {
    return SITE + '/pricing-plans/plan-customization?planId=' + p.wix[0] + '&pricingVariantId=' + p.wix[1];
  }

  function wix(file, size) {
    return 'https://static.wixstatic.com/media/' + file + '/v1/fit/w_' + size + ',h_' + size +
      ',al_c,q_85,enc_auto/' + file;
  }
  var PHOTOS = assign({
    reiki: wix('a929ae_70a2b973ce144de384425845a2b0f08b~mv2.jpg', 1400),
    pet: wix('a929ae_570ae51ccde64d53805ec57a7538701f~mv2.jpg', 1600),
    yoga: wix('a929ae_63ec2528afa045ee8a5517a5f1d0ff3a~mv2.jpg', 1400),
    cleanse: wix('a929ae_b42ecc6086254fd78fde11f92e5f8446~mv2.jpg', 1400),
    cards: wix('a929ae_c86b23392776466b97389f83a265f8d9~mv2.jpg', 1400),
    'class': wix('a929ae_2b139f7c042648c78627656fa2634df2~mv2.png', 1600),
    portrait: wix('a929ae_b42ab168be764f73bea04329e20a4d6b~mv2.jpg', 1800)
  }, CFG.photos);

  // Shape of each photo (width ÷ height). Frames start at this shape and
  // re-measure from the real image once it loads, so a swapped photo fits.
  var RATIOS = { reiki: 1, pet: 2752 / 1536, yoga: 1, cleanse: 1, cards: 1, 'class': 2, portrait: 2002 / 3000 };

  var HUES = { crown: '#B026C4', eye: '#6C36D9', throat: '#1E9BCB', heart: '#4E9E28', solar: '#C9871A', sacral: '#DD4B18', root: '#C51234' };

  /* ---------------- content ---------------- */

  var SERVICES = [
    {
      id: 'reiki', hue: 'heart',
      name: 'Reiki Healing Session', from: 'from $60',
      title: 'Reiki Healing Session',
      desc: ['Reiki is a holistic energy healing practice designed to promote relaxation, support emotional well-being, and encourage balance within the body and mind. Each session can be personalized to your needs, with options including incense, singing bowls, shamanic-inspired healing techniques, and tuning forks.'],
      aside: 'In-person availability depends on your area — ask and Kyle will confirm.',
      prices: [{ dur: '30 min', amt: '$60' }, { dur: '1 hr', amt: '$100' }],
      plans: [
        { id: 'monthly-reiki-membership', name: 'Monthly Reiki Membership', price: 350, per: 'month', sessions: 4,
          wix: ['e52f829f-ea78-4c53-a18f-bb5f59439646', '9a9e09eb-e910-424a-b25f-b6cd96cf2bbb'],
          desc: '4 one hour Reiki sessions per month scheduled on a weekly basis.' },
        { id: '4-session-reiki-package', name: '4 Session Reiki Package', price: 200, sessions: 4,
          wix: ['9aa52891-9e3f-4c07-b166-7f1db467bc29', '43c1f068-14b4-42e2-8cf9-99a9cda3801b'],
          desc: 'Four 30 minute reiki sessions offered at a promotional discounted rate' }
      ]
    },
    {
      id: 'pet', hue: 'root',
      name: 'Pet Reiki', from: '$80',
      title: 'Pet Reiki',
      desc: ['Some Reiki R&amp;R for your furry companion!', 'Help soothe your furry companion’s anxiety, pain and depression!'],
      prices: [{ dur: '45 min', amt: '$80' }],
      plans: [
        { id: 'pet-reiki-package', name: 'Pet Reiki Package', price: 300, sessions: 4,
          wix: ['0bfea6e4-831f-4c1e-a695-94b0fbc271d9', 'f7052dbc-9f6d-430e-90d1-0a735d7912df'],
          desc: '4 Reiki Sessions designed specifically for your pet’s well-being. Help soothe your furry companion’s anxiety, pain and depression!' }
      ]
    },
    {
      id: 'yoga', hue: 'sacral',
      name: 'Private Yoga Session', from: '$100',
      title: 'Private Yoga Session',
      desc: ['A personalized, one-on-one yoga session tailored to your individual needs, goals, and experience level.'],
      prices: [{ dur: '1 hr', amt: '$100' }],
      plans: [
        { id: 'private-yoga-session-monthly-plan', name: 'Monthly Private Yoga Session Membership', price: 350, per: 'month', sessions: 4,
          wix: ['b2b4fcd3-74bf-4764-a187-f0c281c9ce33', '7a1c76da-ece1-4e6c-bea6-6c8f09adb415'],
          desc: 'Comes with 1 day per week for one month total 4 sessions for one hour each.' },
        { id: 'yoga-beginner-lessons-3-pack', name: 'Yoga Beginner Lessons 3 Pack', price: 270, sessions: 3,
          wix: ['de945b88-8b65-40c4-a927-f9c3e217dc02', '4930656b-c96a-4d55-864b-0fde536fc0d7'],
          desc: '3 one hour private classes designed to teach the foundations of Yoga to a beginner student.' }
      ]
    },
    {
      id: 'cleanse', hue: 'solar',
      name: 'Home Negative Energy Cleanse', from: 'Starts at $100',
      title: 'Home Negative Energy Cleanse',
      desc: ['Create a more peaceful, harmonious living environment through a spiritual home-cleansing ritual designed to release stagnant or unwanted energy. Invite high-vibrational energy, restore balance, and cultivate a sense of lightness, comfort, and positive energy throughout your home.'],
      aside: 'Larger homes are priced on request.',
      prices: [{ dur: '1 hr', amt: 'Starts at $100' }],
      plans: [
        { id: 'monthly-house-clense', name: 'Monthly House Cleanse', price: 85, per: 'month', sessions: 1,
          wix: ['0ee0adfb-2b65-421c-81e4-0b2dcad6ae2d', 'a92df74b-438e-4f2a-9469-fd015ea8d1ae'],
          desc: '1 session a month for one hour for home Cleansing' }
      ]
    },
    {
      id: 'cards', hue: 'throat',
      name: 'Tarot or Oracle Read', from: '$100',
      title: 'Choice of Tarot or Oracle Read w/ Chakra Balance',
      desc: ['Explore the wisdom of the Tarot or receive spiritual guidance from the Archangels through an Oracle Card reading. Gain meaningful insight, clarity, and perspective on life’s questions and challenges. Complete your session with a chakra-balancing experience designed to promote harmony, restore energetic balance, and leave you feeling refreshed, centered, and spiritually renewed.', 'Tarot or Angel Oracle Reading w/ chakra balance'],
      prices: [{ dur: '45 min', amt: '$100' }]
    },
    {
      id: 'class', hue: 'crown',
      name: 'Reiki Levels 1 &amp; 2 Class', from: 'Contact for Price',
      title: 'Reiki Levels 1 &amp; 2 Certification Class',
      desc: ['Learn from a Reiki Master who has developed a unique, holistic approach to supporting the body’s natural healing process. Reiki Level I and Level II classes are offered monthly, with Reiki Mastership programs available upon request. Deepen your understanding of Reiki, expand your healing practice, and strengthen your connection to energy work.'],
      prices: [{ dur: '3 hr', amt: 'Contact for Price' }]
    }
  ];

  var RIBBON = [['Reiki', 'heart'], ['Pets', 'root'], ['Yoga', 'sacral'], ['Clearing', 'solar'], ['Cards', 'throat'], ['Certification', 'crown']];

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
  function plain(s) { return s.replace(/&amp;/g, '&'); }
  function mailto(subject) {
    return 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject);
  }
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function easeInOut(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function fillHTML(key, alt) {
    return '<div class="fill"><img class="pic" src="' + PHOTOS[key] + '" alt="' + (alt || '') + '"></div>';
  }

  function plansHTML(svc) {
    if (!svc.plans || !svc.plans.length) return '';
    var cards = svc.plans.map(function (p) {
      var href = PLAN_LINKS[p.id] || planURL(p);
      return '<li>' +
        '<div class="p-head"><b class="p-name">' + p.name + '</b>' +
        '<span class="p-price">' + money(p.price) + (p.per ? '<small>/' + p.per + '</small>' : '') + '</span></div>' +
        '<p class="p-desc">' + p.desc + '</p>' +
        '<div class="p-foot"><span class="per">' + money(p.price / p.sessions) + ' each</span>' +
        '<a class="buy" href="' + href + '" target="_blank" rel="noopener">Buy plan</a></div>' +
        '</li>';
    }).join('');
    return '<div class="plans-in"><p class="label">Packages &amp; memberships</p><ul class="plan-list">' + cards + '</ul></div>';
  }

  function serviceHTML(svc) {
    var prices = svc.prices.map(function (p) {
      return '<li><span class="dur">' + p.dur + '</span><span class="amt">' + p.amt + '</span>' +
        '<a class="buy" href="' + BOOK[svc.id] + '" target="_blank" rel="noopener">Book Now</a></li>';
    }).join('');

    return '<article class="svc" id="khs-' + svc.id + '" data-hue="' + svc.hue + '" data-name="' +
      plain(svc.name) + '" data-from="' + svc.from + '" data-ar="' + RATIOS[svc.id] +
      '" style="--c:var(--' + svc.hue + ');--ar:' + RATIOS[svc.id] + '">' +
      '<div class="shot-inline shape"><div class="reveal">' + fillHTML(svc.id, plain(svc.title)) + '</div></div>' +
      '<h3>' + svc.title + '</h3>' +
      svc.desc.map(function (d) { return '<p class="desc">' + d + '</p>'; }).join('') +
      (svc.aside ? '<p class="aside">' + svc.aside + '</p>' : '') +
      '<ul class="prices">' + prices + '</ul>' +
      plansHTML(svc) +
      '</article>';
  }

  function ribbonHTML(words) {
    var once = words.map(function (w) {
      return '<span class="w">' + w[0] + ' <i class="dot" style="--c:var(--' + w[1] + ')"></i></span>';
    }).join('');
    return '<div class="line">' + once + once + '</div>';
  }

  /* ---------------- markup ---------------- */

  function pageHTML() {
    var heroShape = function (key) {
      return '<div class="lift"><div class="shape" style="--ar:' + RATIOS[key] + '">' + fillHTML(key) + '</div></div>';
    };

    return '' +
      '<section class="hero" data-hue="heart">' +
      '<div class="hero-copy">' +
      '<p class="label">Services &amp; pricing</p>' +
      '<h1>Find your <em>peace</em></h1>' +
      '<p class="sub">Reiki, pet Reiki, private yoga, home energy clearing, card readings and certification.</p>' +
      '</div>' +
      '<div class="trio" aria-hidden="true">' + heroShape('yoga') + heroShape('reiki') + heroShape('pet') + '</div>' +
      '</section>' +

      '<div class="ribbon" aria-hidden="true">' + ribbonHTML(RIBBON) + '</div>' +

      '<section class="about" data-hue="heart">' +
      '<p class="label">About the work</p>' +
      '<h2>Reiki is an ancient form of Japanese healing</h2>' +
      '<p>It is believed to reduce stress, increase energy, and provide a feeling of peace and calm for the patient during and after the healing session.</p>' +
      '<p>Kyle is a Reiki Master &amp; 500 RYT Yoga Instructor.</p>' +
      '</section>' +

      '<section class="services" id="khs-services">' +
      '<div class="services-head"><p class="label">Services</p>' +
      '<h2>Pick the practice that fits the day</h2>' +
      '<p>Book a single session, or choose one of Kyle’s packages and memberships.</p></div>' +
      '<div class="svc-grid"><div class="stage-col" aria-hidden="true"><div class="stage">' +
      '<div class="frame-wrap"><div class="glow"></div><div class="frame">' +
      SERVICES.map(function (s) {
        return '<div class="layer" style="--c:var(--' + s.hue + ')">' + fillHTML(s.id) + '</div>';
      }).join('') +
      '</div></div>' +
      '<div class="stage-meta"><ul class="dots"></ul>' +
      '<p class="now"><span class="now-name">' + SERVICES[0].name + '</span><span class="label now-from">' + SERVICES[0].from + '</span></p>' +
      '</div></div></div>' +
      '<div class="svc-list">' + SERVICES.map(serviceHTML).join('') + '</div>' +
      '</div></section>' +

      '<section class="cta" id="khs-book" data-hue="heart">' +
      '<div class="shape portrait" style="--ar:' + RATIOS.portrait + '">' + fillHTML('portrait', 'Kyle Hagemann') + '</div>' +
      '<div>' +
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
      '--pad:clamp(1rem,5vw,5rem);--top:' + TOP + 'px;--ease:cubic-bezier(.16,1,.3,1);--radius:6px;' +
      'transition:--k 1.1s ease;position:relative;z-index:1;' +
      'background:var(--paper);color:var(--ink);font-family:var(--body);font-weight:300;font-size:17px;line-height:1.7;' +
      '-webkit-font-smoothing:antialiased;overflow-x:clip;}' +
      '#khs *{box-sizing:border-box}' +
      '#khs img{display:block;max-width:100%}' +
      '#khs h1,#khs h2,#khs h3{font-family:var(--display);font-weight:300;margin:0;letter-spacing:-.015em;text-wrap:balance}' +
      '#khs p{margin:0}#khs a{color:inherit}' +
      '#khs :focus-visible{outline:2px solid var(--kt);outline-offset:3px;border-radius:2px}' +
      '#khs .label{font-size:.68rem;letter-spacing:.24em;text-transform:uppercase;font-weight:500;color:var(--muted)}' +
      '#khs section{padding-inline:var(--pad)}' +

      /* photo frames: rounded rectangles shaped to each photo */
      '#khs .shape{position:relative;overflow:hidden;isolation:isolate;border-radius:var(--radius);aspect-ratio:var(--ar,1);background:var(--sunk)}' +
      '#khs .fill{position:absolute;inset:-5% 0;will-change:transform}' +
      '#khs .fill .pic{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}' +

      /* hero */
      '#khs .hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:clamp(2.5rem,6vw,6rem);' +
      'align-items:center;padding-block:clamp(3rem,8vh,6rem) clamp(3.5rem,9vh,6.5rem)}' +
      '#khs .hero h1{font-size:clamp(3rem,7.2vw,6.4rem);line-height:.95;margin-top:1.4rem}' +
      '#khs .hero h1 em{font-style:italic;font-weight:300;color:var(--kt)}' +
      '#khs .hero .sub{margin-top:1.7rem;max-width:40ch;color:var(--ink-2);font-size:clamp(1rem,1.5vw,1.14rem)}' +
      '#khs .trio{display:grid;grid-template-columns:1fr 1.15fr;gap:clamp(.55rem,1.4vw,1.1rem);align-items:start}' +
      '#khs .trio .lift:nth-child(1){margin-top:16%}' +
      '#khs .trio .lift:nth-child(3){grid-column:1 / -1;width:84%;justify-self:end}' +
      '@media (max-width:860px){#khs .hero{grid-template-columns:1fr;padding-block:2.5rem 3rem}#khs .trio{max-width:520px}}' +

      /* ribbon */
      '#khs .ribbon{overflow:hidden;overflow:clip;padding-block:clamp(1.8rem,5vh,3.4rem);border-block:1px solid var(--rule-soft)}' +
      '#khs .ribbon .line{display:flex;width:max-content;white-space:nowrap;will-change:transform;font-family:var(--display);' +
      'font-weight:200;font-size:clamp(2.6rem,8vw,6.6rem);line-height:1.12;letter-spacing:-.02em}' +
      '#khs .ribbon .w{display:inline-flex;align-items:center;gap:.5em;padding-right:.5em}' +
      '#khs .ribbon .dot{display:inline-block;width:.16em;height:.16em;border-radius:50%;background:var(--c)}' +

      /* about */
      '#khs .about{padding-block:clamp(4rem,10vh,7rem)}' +
      '#khs .about h2{font-size:clamp(1.9rem,4.2vw,3rem);line-height:1.06;margin-top:1rem;max-width:20ch}' +
      '#khs .about p:not(.label){color:var(--ink-2);margin-top:1.3rem;max-width:50ch}' +

      /* services */
      '#khs .services{padding-block:clamp(3rem,8vh,5rem) 1rem;border-top:1px solid var(--rule-soft)}' +
      '#khs .services-head{max-width:62ch;margin-bottom:clamp(1rem,4vh,3rem)}' +
      '#khs .services-head h2{font-size:clamp(2.1rem,4.6vw,3.5rem);line-height:1.04;margin-top:1rem}' +
      '#khs .services-head p:not(.label){color:var(--ink-2);margin-top:1rem;max-width:54ch}' +
      '#khs .svc-grid{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1fr);gap:clamp(2rem,6vw,6rem)}' +
      '#khs .stage-col{position:relative}' +
      '#khs .stage{position:sticky;top:calc(var(--top) + 2vh);height:calc(100svh - var(--top) - 4vh);' +
      'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.5rem}' +
      '#khs .frame-wrap{position:relative;width:min(100%,460px);aspect-ratio:1;max-width:100%}' +
      '#khs .glow{position:absolute;inset:-16%;z-index:0;pointer-events:none;border-radius:50%;' +
      'background:radial-gradient(closest-side, color-mix(in oklab, var(--k) 30%, transparent), transparent);filter:blur(34px);opacity:.45}' +
      '#khs .frame{position:absolute;inset:0;z-index:1;overflow:hidden;isolation:isolate;border-radius:var(--radius);background:var(--sunk);' +
      'box-shadow:0 44px 90px -60px color-mix(in oklab, var(--k) 70%, #000)}' +
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
      '#khs .now-name{font-family:var(--display);font-style:italic;font-size:1.15rem;color:var(--ink);white-space:nowrap}' +
      '#khs .svc{--ct:color-mix(in oklab, var(--c) var(--kmix), var(--ink));min-height:84svh;display:flex;flex-direction:column;' +
      'justify-content:center;padding-block:4rem;scroll-margin-top:calc(var(--top) + 1rem);opacity:var(--o,1);transform:translate3d(0,var(--dy,0px),0)}' +
      '#khs .svc h3{font-size:clamp(2rem,4vw,3.3rem);line-height:1.04;position:relative;padding-top:1.3rem}' +
      '#khs .svc h3::before{content:"";position:absolute;left:0;top:0;width:28px;height:2px;background:var(--c)}' +
      '#khs .svc .desc{color:var(--ink-2);margin-top:1.2rem;max-width:46ch}' +
      '#khs .svc .desc + .desc{margin-top:.8rem}' +
      '#khs .svc .aside{margin-top:.8rem;font-size:.9rem;color:var(--muted);max-width:46ch}' +
      '#khs .prices{list-style:none;margin:1.6rem 0 0;padding:0;max-width:500px;border-top:1px solid var(--rule)}' +
      '#khs .prices li{display:grid;grid-template-columns:1fr auto auto;align-items:center;gap:1.2rem;padding:.8rem 0;border-bottom:1px solid var(--rule-soft)}' +
      '#khs .prices .dur{font-size:.95rem;color:var(--ink-2)}' +
      '#khs .prices .amt{font-family:var(--display);font-weight:400;font-size:1.6rem;line-height:1.1;color:var(--ink);font-variant-numeric:tabular-nums;text-align:right}' +
      '#khs .buy{text-decoration:none;white-space:nowrap;padding:.5rem .95rem;border:1px solid var(--rule);border-radius:999px;' +
      'font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;font-weight:500;color:var(--ink-2);' +
      'transition:background .3s ease,border-color .3s ease,color .3s ease}' +
      '#khs .buy:hover{background:var(--ct);border-color:var(--ct);color:var(--paper)}' +

      /* plans */
      '#khs .plans-in{margin-top:1.9rem;max-width:500px}' +
      '#khs .plans-in .label{display:flex;align-items:center;gap:.8rem}' +
      '#khs .plans-in .label::after{content:"";flex:1;height:1px;background:var(--rule-soft)}' +
      '#khs .plan-list{display:grid;gap:.6rem;list-style:none;margin:.95rem 0 0;padding:0}' +
      '#khs .plan-list li{background:var(--raise);border:1px solid var(--rule-soft);border-left:2px solid var(--c);border-radius:var(--radius);padding:1rem 1.1rem 1.05rem}' +
      '#khs .p-head{display:flex;align-items:baseline;justify-content:space-between;gap:1rem}' +
      '#khs .p-name{font-family:var(--display);font-weight:400;font-size:1.18rem;line-height:1.2;color:var(--ink)}' +
      '#khs .p-price{flex:none;font-family:var(--display);font-size:1.35rem;line-height:1;color:var(--ink);font-variant-numeric:tabular-nums}' +
      '#khs .p-price small{font-family:var(--body);font-size:.72rem;color:var(--muted);margin-left:.15rem}' +
      '#khs .p-desc{margin-top:.45rem;font-size:.9rem;line-height:1.55;color:var(--ink-2)}' +
      '#khs .p-foot{display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-top:.85rem}' +
      '#khs .p-foot .per{font-size:.62rem;letter-spacing:.16em;text-transform:uppercase;font-weight:500;color:var(--ct);font-variant-numeric:tabular-nums}' +
      '#khs .p-foot .buy{padding:.45rem .85rem;font-size:.56rem;letter-spacing:.16em}' +

      '#khs .pill{display:inline-flex;align-items:center;gap:.8rem;align-self:flex-start;padding:.9rem 1.35rem;' +
      'border:1px solid var(--rule);border-radius:999px;font-size:.7rem;letter-spacing:.22em;text-transform:uppercase;' +
      'font-weight:500;text-decoration:none;color:var(--ink);transition:background .35s ease,border-color .35s ease,color .35s ease}' +
      '#khs .pill .arr{transition:transform .45s var(--ease)}#khs .pill:hover .arr{transform:translateX(4px)}' +
      '#khs .pill.solid{background:var(--ink);border-color:var(--ink);color:var(--paper)}' +
      '#khs .pill.solid:hover{background:var(--kt);border-color:var(--kt)}' +
      '#khs .pill.line:hover{border-color:var(--kt);color:var(--kt)}' +
      '#khs .shot-inline{display:none}' +
      '@media (max-width:899px){#khs .svc-grid{grid-template-columns:minmax(0,1fr)}#khs .stage-col{display:none}' +
      '#khs .svc{min-height:0;padding-block:2.6rem 3.4rem;opacity:1;transform:none}' +
      '#khs .shot-inline{display:block;width:100%;max-width:520px;margin-bottom:2.2rem}' +
      '#khs .shot-inline .reveal{position:absolute;inset:0;clip-path:circle(var(--r,130%) at 50% 100%)}}' +
      '@media (max-width:420px){#khs .prices li{gap:.8rem}#khs .prices .amt{font-size:1.35rem}}' +

      /* book */
      '#khs .cta{display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,1fr);gap:clamp(2rem,6vw,6rem);align-items:center;' +
      'padding-block:clamp(4.5rem,11vh,8rem);border-top:1px solid var(--rule-soft)}' +
      '#khs .cta .portrait{width:100%;max-width:340px;justify-self:center}' +
      '#khs .cta h2{font-size:clamp(2.7rem,7vw,5.8rem);line-height:.97;margin-top:1rem}' +
      '#khs .cta h2 em{font-style:italic;color:var(--kt)}' +
      '#khs .cta .lede{color:var(--ink-2);margin-top:1.4rem;max-width:44ch}' +
      '#khs .actions{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:2.3rem}' +
      '@media (max-width:760px){#khs .cta{grid-template-columns:minmax(0,1fr)}#khs .cta .portrait{max-width:260px;justify-self:start}}' +

      '@media (prefers-reduced-motion:reduce){#khs{transition:none}' +
      '#khs .svc-grid{grid-template-columns:minmax(0,1fr)}#khs .stage-col{display:none}' +
      '#khs .svc{min-height:0;opacity:1;transform:none}#khs .shot-inline{display:block;' +
      'width:100%;max-width:520px;margin-bottom:2.2rem}' +
      '#khs .shot-inline .reveal{position:absolute;inset:0}}';
  }

  /* ---------------- mount ---------------- */

  var root = null, styleEl = null, hideEl = null, fontsEl = null, hostObserver = null, teardown = [];

  function findHost() {
    if (CFG.mountSelector) {
      var custom = document.querySelector(CFG.mountSelector);
      if (custom) return custom;
    }
    // #PAGES_CONTAINER sits outside the subtree Wix re-renders on navigation,
    // so the page survives hydration; the others are fallbacks.
    return document.querySelector('#PAGES_CONTAINER') ||
      document.querySelector('#SITE_PAGES') ||
      document.querySelector('#masterPage') ||
      document.body;
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

    // Hide whatever Wix itself puts on this page. A stylesheet rather than
    // inline styles, so it still holds after Wix re-renders its own content.
    if (COLLAPSE && host.id) {
      hideEl = document.createElement('style');
      hideEl.id = 'khs-hide';
      hideEl.textContent = '#' + host.id + ' > *:not(#khs){display:none !important}';
      document.head.appendChild(hideEl);
    }

    host.appendChild(root);

    // Wix can wipe its containers on hydration — put the page back if it goes.
    if ('MutationObserver' in window) {
      hostObserver = new MutationObserver(function () {
        if (root && !host.contains(root) && onThisPage()) host.appendChild(root);
      });
      hostObserver.observe(host, { childList: true });
    }

    start();
  }

  function destroy() {
    if (!root) return;
    teardown.forEach(function (fn) { fn(); });
    teardown = [];
    if (hostObserver) { hostObserver.disconnect(); hostObserver = null; }
    if (root.parentNode) root.parentNode.removeChild(root);
    if (styleEl && styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
    if (hideEl && hideEl.parentNode) hideEl.parentNode.removeChild(hideEl);
    root = null; styleEl = null; hideEl = null;
  }

  /* ---------------- behaviour ---------------- */

  function start() {
    var q = function (sel) { return root.querySelector(sel); };
    var all = function (sel) { return [].slice.call(root.querySelectorAll(sel)); };

    var hero = q('.hero');
    var shapes = all('.trio .shape');
    var ribbon = q('.ribbon');
    var lines = all('.ribbon .line');
    var svcs = all('.svc');
    var stage = q('.stage');
    var frameWrap = q('.frame-wrap');
    var layers = all('.stage .layer');
    var inlines = svcs.map(function (s) { return s.querySelector('.shot-inline'); });
    var portrait = q('.cta .portrait');
    var zones = all('[data-hue]');
    var dotsEl = q('.dots');
    var now = q('.now'), nowName = q('.now-name'), nowFrom = q('.now-from');
    var ratios = svcs.map(function (s) { return parseFloat(s.getAttribute('data-ar')) || 1; });

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

    // Frames follow the real shape of whatever photo loads into them.
    function syncRatio(img) {
      var r = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 0;
      if (!r) return;
      var shape = img.closest('.shape');
      if (shape) shape.style.setProperty('--ar', r.toFixed(4));
      var layer = img.closest('.layer');
      if (layer) ratios[layers.indexOf(layer)] = r;
    }

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
      M.stageW = stage.clientWidth;
      M.stageH = Math.min(M.vh * 0.62, 580);
    }

    // Size the sticky frame for a given photo shape: as large as fits the column.
    function sizeFrame(r) {
      var w = Math.min(M.stageW, M.stageH * r), h = w / r;
      frameWrap.style.width = w.toFixed(1) + 'px';
      frameWrap.style.height = h.toFixed(1) + 'px';
      frameWrap.style.aspectRatio = 'auto';
    }

    var lastHue = '', lastActive = 0, SPEEDS = [0.10, 0.24, 0.05];

    function render(y) {
      var vh = M.vh, mid = y + vh / 2;

      var hue = M.zones.length ? M.zones[0].hue : 'heart';
      for (var z = 0; z < M.zones.length; z++) if (M.zones[z].top <= mid) hue = M.zones[z].hue;
      if (hue !== lastHue) { lastHue = hue; root.style.setProperty('--k', HUES[hue]); }

      if (still) return;

      var k = Math.min(Math.max(y - M.hero.top, 0), M.hero.h);
      shapes.forEach(function (a, i) {
        a.style.transform = 'translate3d(0,' + (-k * SPEEDS[i]).toFixed(1) + 'px,0)';
        a.firstElementChild.style.transform = 'scale(' + (1.1 - 0.1 * clamp(k / vh)).toFixed(4) + ')';
      });

      var qy = clamp((y + vh - M.ribbon.top) / (vh + M.ribbon.h));
      lines.forEach(function (l, i) {
        var travel = Math.min(Math.max(0, M.lineW[i] - M.vw), M.vw * 0.55);
        l.style.transform = 'translate3d(' + (-travel * qy).toFixed(1) + 'px,0,0)';
      });

      if (wide) {
        var active = 0, r = ratios[0];
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
            // the frame morphs toward this photo's shape as it opens
            r += (ratios[i] - r) * e;
          }
        });
        sizeFrame(r);
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
        'translate3d(0,' + ((0.5 - pp) * 7).toFixed(2) + '%,0) scale(1.04)';
    }

    function clearMotion() {
      svcs.forEach(function (s) { s.style.removeProperty('--o'); s.style.removeProperty('--dy'); });
      layers.forEach(function (l) { l.style.clipPath = ''; l.firstElementChild.style.transform = ''; });
      inlines.forEach(function (el) { el.style.removeProperty('--r'); el.querySelector('.fill').style.transform = ''; });
      shapes.forEach(function (a) { a.style.transform = ''; a.firstElementChild.style.transform = ''; });
      lines.forEach(function (l) { l.style.transform = ''; });
      portrait.firstElementChild.style.transform = '';
      frameWrap.style.width = ''; frameWrap.style.height = ''; frameWrap.style.aspectRatio = '';
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

    // images arrive late on a CDN — fit each frame and re-measure as they land
    all('img').forEach(function (img) {
      if (img.complete) { syncRatio(img); return; }
      img.addEventListener('load', function () {
        if (!root) return;
        syncRatio(img); measure(); render(current);
      }, { once: true });
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
    if (!onThisPage()) { destroy(); return; }
    // if Wix threw the page away wholesale, rebuild it
    if (root && !document.body.contains(root)) destroy();
    mount();
  }

  var lastPath = location.pathname;
  setInterval(function () {
    if (location.pathname !== lastPath) { lastPath = location.pathname; setTimeout(sync, 80); return; }
    if (onThisPage() && root && !document.body.contains(root)) sync();
  }, 400);
  addEventListener('popstate', function () { setTimeout(sync, 80); });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sync);
  } else {
    sync();
  }
  addEventListener('load', function () { setTimeout(sync, 300); });
})();
