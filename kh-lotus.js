/*!
 * kh-lotus.js — The Lotus Turns
 * A self-contained scroll experience for one page of a Wix site.
 *
 * Install: host this file, then inject two <script> tags into ONE Wix page
 * (Dashboard → Settings → Custom Code → Body – end → Choose specific pages).
 * All configuration happens in window.KH_LOTUS before this file loads.
 *
 * Everything it creates is prefixed khl- and lives in one container, so it
 * cannot collide with Wix's own markup. It removes itself on page change.
 */
(function () {
  'use strict';

  if (window.__KH_LOTUS_LOADED__) return;
  window.__KH_LOTUS_LOADED__ = true;

  /* ------------------------------------------------------------------ *
   * 1. CONFIG — override any of these in window.KH_LOTUS
   * ------------------------------------------------------------------ */
  var D = {
    logo: '',                  // URL of the monogram PNG (transparent bg). Blank = no logo plate.
    pagePath: '',              // e.g. '/seven-centers'. Blank = mount on any page this script loads on.
    topOffset: 0,              // px — height of the Wix header to keep clear. 0 if the header is hidden.
    mountSelector: '',         // where to insert the content. Blank = document.body (see note below).
    collapseWixPage: true,     // shrink the blank Wix page container so there is no gap
    fixWixHeader: true,        // pin the Wix header so site nav stays visible down the whole page
    hideWixFooter: true,       // hide the Wix footer — this page ends with its own contact block
    order: 'crown-first',      // 'crown-first' (matches the logo) or 'root-first' (traditional ascent)
    sound: true,               // per-chakra tones
    name: 'Kyle Hagemann',
    credential: 'Reiki Master · 500-hour RYT · Seaford, New York',
    shopUrl: '/shop',
    bookUrl: '/contact',
    phone: '516 503 2052',
    email: 'kylehagemannreiki@gmail.com',
    place: 'Seaford, NY 11783',
    panelHeight: 230,          // vh per chakra — lower = faster journey
    fonts: true                // load Newsreader / Karla / Noto Sans Devanagari from Google Fonts
  };
  var CFG = D;
  if (window.KH_LOTUS) for (var kk in window.KH_LOTUS) if (window.KH_LOTUS.hasOwnProperty(kk)) CFG[kk] = window.KH_LOTUS[kk];

  /* ------------------------------------------------------------------ *
   * 2. CONTENT
   * ------------------------------------------------------------------ */
  var CROWN_FIRST = [
    { key:'sahasrara', sans:'Sahasrara', en:'Crown', bija:'ॐ', rom:'Om', petals:1000, draw:56,
      element:'Consciousness', hz:963, c:'#B026C4',
      body:'The center of open awareness, where the sense of a separate self thins out. It is touched first and lightly — the point is not to work here but to arrive here, so everything below has somewhere to release toward.' },
    { key:'ajna', sans:'Ajna', en:'Third Eye', bija:'ॐ', rom:'Om', petals:2, draw:2,
      element:'Light', hz:852, c:'#6C36D9',
      body:'Perception and inward seeing. Its two petals stand for the pair of channels that meet here — the point where opposites stop being opposites. People often report this one as pressure, then as a settling behind the eyes.' },
    { key:'vishuddha', sans:'Vishuddha', en:'Throat', bija:'हं', rom:'Ham', petals:16, draw:16,
      element:'Ether', hz:741, c:'#35B7E8',
      body:'Voice, truth, and what has gone unsaid. This is where held tension is most physically obvious — a tight jaw, a shallow breath. Work here is slow, and it usually asks for the most time.' },
    { key:'anahata', sans:'Anahata', en:'Heart', bija:'यं', rom:'Yam', petals:12, draw:12,
      element:'Air', hz:639, c:'#63BE2E',
      body:'The hinge of the sequence — three centers above, three below. Its name means unstruck, as in a sound that needs nothing to strike it. Compassion sits here, for others and, harder, for oneself.' },
    { key:'manipura', sans:'Manipura', en:'Solar Plexus', bija:'रं', rom:'Ram', petals:10, draw:10,
      element:'Fire', hz:528, c:'#E8A020',
      body:'Will, digestion, the capacity to act. Fire is the element and heat is often the sensation — a warmth under the ribs that spreads. This is the center people describe as feeling like their own again.' },
    { key:'svadhisthana', sans:'Svadhisthana', en:'Sacral', bija:'वं', rom:'Vam', petals:6, draw:6,
      element:'Water', hz:417, c:'#E8531F',
      body:'Creativity, appetite, and the fluid part of a life — the willingness to move rather than brace. Water is the element, and the attention here is closer to floating than pressing.' },
    { key:'muladhara', sans:'Muladhara', en:'Root', bija:'लं', rom:'Lam', petals:4, draw:4,
      element:'Earth', hz:396, c:'#D8143C',
      body:'Ground, safety, and the body’s weight on the table. The session ends here on purpose. Whatever moved higher up needs somewhere to land, and this is the floor it lands on. Most people sleep well that night.' }
  ];

  var CH = CFG.order === 'root-first' ? CROWN_FIRST.slice().reverse() : CROWN_FIRST;
  var DESCENDING = CFG.order !== 'root-first';

  var COPY = {
    heroLead: 'Find Your',
    heroAccent: 'Peace',
    heroSub: DESCENDING
      ? 'A session moves the attention down through seven centers of the body — the seven that run down the length of the mark. Scroll, and the lotus turns with you.'
      : 'A session moves the attention up through seven centers of the body — the seven that run the length of the mark. Scroll, and the lotus turns with you.',
    cue: DESCENDING ? 'Scroll to descend' : 'Scroll to rise',
    introTitle: 'Seven centers, one line down the body',
    introA: 'In the yogic tradition the chakras are energy centers along the spine, each with a seat in the body, an element, a seed sound, a petal count, and a color. Reiki works along that same line — hands resting lightly at each center in turn, letting held tension move.',
    introB: 'Below, one lotus carries the whole sequence. Its petals recount themselves as you scroll — a thousand at the crown, four at the root — and it turns faster the faster you move.' + (CFG.sound ? ' Tap it at any point to hear that center’s tone.' : ''),
    outTitle: 'Begin when you’re ready',
    outBody: 'Sessions run in person in Seaford and at any distance. The shop carries stones, oils, and gift cards for the practice at home.'
  };

  /* ------------------------------------------------------------------ *
   * 3. STYLE
   * ------------------------------------------------------------------ */
  var CSS = [
    '#khl{--paper:#F5F7F5;--raise:#FFF;--ink:#101413;--ink2:#3D4645;--muted:#717C7A;',
      '--rule:#1014131F;--soft:#10141310;--k:' + CH[0].c + ';--kw:' + CH[0].c + '14;',
      '--disp:"Newsreader","Iowan Old Style",Georgia,serif;',
      '--body:"Karla","Helvetica Neue",Arial,sans-serif;',
      '--deva:"Noto Sans Devanagari","Karla",sans-serif;',
      '--pad:clamp(1.25rem,5vw,5rem);--spine:clamp(52px,6vw,84px);',
      'position:relative;z-index:5;background:transparent;color:var(--ink);',
      'font-family:var(--body);font-weight:300;font-size:16px;line-height:1.7;',
      'padding-right:var(--spine)}',
    /* opaque ground behind everything — the lotus canvas sits between this and the content */
    '#khl-bg{position:fixed;inset:0;z-index:0;background:#F5F7F5;pointer-events:none}',
    '@media (prefers-color-scheme:dark){#khl-bg{background:#080B0A}}',
    '@media (prefers-color-scheme:dark){#khl{--paper:#080B0A;--raise:#121716;--ink:#EDF1EF;--ink2:#BAC4C1;--muted:#8A9693;--rule:#EDF1EF24;--soft:#EDF1EF12}}',
    '#khl *,#khl *::before,#khl *::after{box-sizing:border-box}',
    '#khl h1,#khl h2,#khl h3{font-family:var(--disp);font-weight:300;margin:0;text-wrap:balance;letter-spacing:-.012em}',
    '#khl p{margin:0 0 1.1rem}',
    '#khl a{color:inherit}',
    '#khl .lb{font-size:.67rem;letter-spacing:.26em;text-transform:uppercase;color:var(--muted);font-weight:500;margin:0}',
    '#khl :focus-visible,.khl-fx :focus-visible{outline:2px solid var(--k);outline-offset:3px;border-radius:2px}',
    '#khl section{padding:clamp(5rem,12vh,9rem) var(--pad)}',
    '#khl .wide{max-width:1080px}',

    /* fixed stage */
    '#khl-canvas{position:fixed;inset:0;width:100%;height:100%;z-index:1;pointer-events:none;opacity:0;transition:opacity .8s ease}',
    '#khl-canvas.on{opacity:1}',
    '#khl-seed{position:fixed;top:0;left:0;z-index:2;pointer-events:none;font-family:"Noto Sans Devanagari","Karla",sans-serif;line-height:1;transform:translate(-50%,-50%);will-change:transform,opacity;opacity:0}',
    '#khl-tap{position:fixed;z-index:3;border:0;background:none;cursor:pointer;padding:0;border-radius:50%;transform:translate(-50%,-50%);opacity:0;pointer-events:none}',
    '#khl-tap.on{pointer-events:auto}',
    '#khl-tap .r{position:absolute;inset:0;border-radius:50%;border:1px solid currentColor;opacity:.25}',
    '#khl-tap .h{position:absolute;left:50%;bottom:-2.1rem;transform:translateX(-50%);white-space:nowrap;font:500 .6rem/1 "Karla",Arial,sans-serif;letter-spacing:.24em;text-transform:uppercase;opacity:0;transition:opacity .35s}',
    '#khl-tap:hover .h,#khl-tap:focus-visible .h{opacity:.75}',

    /* spine */
    '#khl-spine{position:fixed;top:0;right:0;bottom:0;width:clamp(52px,6vw,84px);z-index:40;display:flex;flex-direction:column;align-items:center;justify-content:center;border-left:1px solid #10141310;background:rgba(245,247,245,.7);backdrop-filter:blur(8px);transition:opacity .6s ease,transform .6s ease}',
    '#khl-spine.away{opacity:0;transform:translateX(100%);pointer-events:none}',
    '@media (prefers-color-scheme:dark){#khl-spine{background:rgba(8,11,10,.7);border-left-color:#EDF1EF12}}',
    '#khl-spine .th{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:1px;height:392px;background:#1014131F}',
    '@media (prefers-color-scheme:dark){#khl-spine .th{background:#EDF1EF24}}',
    '#khl-comet{position:absolute;top:50%;left:50%;width:5px;height:5px;margin:-2.5px 0 0 -2.5px;border-radius:50%;will-change:transform;opacity:0;transition:opacity .5s}',
    '#khl-comet.on{opacity:1}',
    '#khl-spine button{position:relative;width:44px;height:56px;border:0;background:none;padding:0;cursor:pointer;display:grid;place-items:center}',
    '#khl-spine button svg{width:28px;height:28px;overflow:visible;transition:transform .5s cubic-bezier(.16,1,.3,1)}',
    '#khl-spine .core{transition:fill-opacity .4s}',
    '#khl-spine .pet{transition:opacity .4s}',
    '#khl-spine .tip{position:absolute;right:calc(100% + 10px);top:50%;transform:translateY(-50%) translateX(6px);white-space:nowrap;font:500 .6rem/1.6 "Karla",Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#101413;background:#FFF;border:1px solid #1014131F;padding:.26rem .55rem;border-radius:2px;opacity:0;pointer-events:none;transition:opacity .3s,transform .3s}',
    '@media (prefers-color-scheme:dark){#khl-spine .tip{color:#EDF1EF;background:#121716;border-color:#EDF1EF24}}',
    '#khl-spine button:hover .tip,#khl-spine button:focus-visible .tip{opacity:1;transform:translateY(-50%) translateX(0)}',
    '@media (max-width:760px){#khl-spine button{width:32px;height:40px}#khl-spine .th{height:280px}#khl-spine .tip{display:none}}',

    /* hero */
    '#khl-hero{min-height:100svh;display:grid;align-items:center;grid-template-columns:1.15fr .85fr;gap:clamp(2rem,6vw,5rem);padding-top:calc(6rem + var(--khl-top,0px));padding-bottom:4rem;position:relative}',
    '#khl-hero h1{font-size:clamp(2.8rem,7.4vw,6rem);line-height:.98}',
    '#khl-hero h1 em{font-style:italic;color:var(--k);transition:color .8s ease}',
    '#khl-hero .sub{color:var(--ink2);max-width:38ch;margin-top:1.6rem;font-size:clamp(1rem,1.6vw,1.12rem)}',
    '#khl-plate{justify-self:center;background:#FFF;border:1px solid var(--soft);padding:clamp(1.4rem,3vw,2.4rem);border-radius:3px;box-shadow:0 24px 60px -34px #10141359;will-change:transform}',
    '#khl-plate img{display:block;width:auto;max-height:min(56vh,500px);max-width:clamp(120px,15vw,196px)}',
    '@media (max-width:860px){#khl-hero{grid-template-columns:1fr;justify-items:start;gap:2.6rem}#khl-plate{justify-self:start;order:-1}#khl-plate img{max-height:280px;max-width:112px}}',
    '#khl .cue{position:absolute;bottom:2rem;left:var(--pad);display:flex;align-items:center;gap:.8rem;font-size:.64rem;letter-spacing:.28em;text-transform:uppercase;color:var(--muted)}',
    '#khl .cue i{display:block;width:44px;height:1px;background:currentColor;transform-origin:left;animation:khl-draw 2.8s ease-in-out infinite}',
    '@keyframes khl-draw{0%,100%{transform:scaleX(.3);opacity:.4}50%{transform:scaleX(1);opacity:1}}',

    /* intro */
    '#khl-intro{border-top:1px solid var(--soft)}',
    '#khl-intro .col{max-width:60ch}',
    '#khl-intro h2{font-size:clamp(1.7rem,3.6vw,2.6rem);margin-bottom:1.3rem}',
    '#khl-intro p{color:var(--ink2)}',
    '#khl .orient{margin-top:2.3rem;padding:1.05rem 1.25rem;border-left:2px solid var(--k);background:var(--kw);font-size:.92rem;color:var(--ink2);max-width:58ch;transition:border-color .8s,background .8s}',
    '#khl .orient p{margin:0}',

    /* panels */
    '#khl .panel{height:' + (CFG.panelHeight|0) + 'vh;padding:0;position:relative}',
    '#khl .pin{position:sticky;top:0;height:100svh;display:grid;align-content:center;padding:0 var(--pad)}',
    '#khl .txt{max-width:44ch;will-change:transform,opacity}',
    '#khl .num{font-family:var(--disp);font-size:.88rem;color:var(--c);display:flex;align-items:center;gap:.7rem;margin-bottom:1.1rem}',
    '#khl .num::after{content:"";flex:1;height:1px;background:var(--c);opacity:.3;max-width:110px}',
    '#khl .txt h2{font-size:clamp(2rem,5vw,3.4rem);line-height:1.04}',
    '#khl .txt h2 .en{display:block;font-family:var(--body);font-weight:400;font-size:.78rem;letter-spacing:.26em;text-transform:uppercase;color:var(--c);margin-bottom:.75rem}',
    '#khl .txt .bd{color:var(--ink2);margin-top:1.2rem}',
    '#khl .facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(104px,1fr));gap:1.1rem;margin-top:2rem;padding-top:1.3rem;border-top:1px solid var(--soft)}',
    '#khl .facts span{display:block;font-size:.62rem;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-bottom:.28rem}',
    '#khl .facts b{font-family:var(--disp);font-weight:400;font-size:1.12rem;color:var(--ink);font-variant-numeric:tabular-nums}',
    '#khl .tone{margin-top:1.9rem;display:inline-flex;align-items:center;gap:.7rem;font:inherit;font-size:.66rem;letter-spacing:.22em;text-transform:uppercase;background:none;border:1px solid var(--c);color:var(--c);padding:.58rem 1.05rem;border-radius:2px;cursor:pointer;transition:background .3s,color .3s}',
    '#khl .tone:hover{background:var(--c);color:var(--paper)}',
    '#khl .wv{display:flex;align-items:flex-end;gap:2px;height:11px}',
    '#khl .wv i{display:block;width:2px;height:3px;background:currentColor}',
    '#khl .tone.play .wv i{animation:khl-sing .9s ease-in-out infinite}',
    '#khl .tone.play .wv i:nth-child(2){animation-delay:.12s}',
    '#khl .tone.play .wv i:nth-child(3){animation-delay:.24s}',
    '#khl .tone.play .wv i:nth-child(4){animation-delay:.36s}',
    '@keyframes khl-sing{0%,100%{height:3px}50%{height:11px}}',
    '@media (max-width:860px){#khl .pin{align-content:end;padding-bottom:7vh}#khl .txt{max-width:100%;background:rgba(245,247,245,.82);backdrop-filter:blur(4px);padding:1rem;margin:0 -1rem;border-radius:3px}}',
    '@media (max-width:860px) and (prefers-color-scheme:dark){#khl .txt{background:rgba(8,11,10,.82)}}',

    /* outro */
    '#khl-out{position:relative;z-index:10;background:var(--paper);border-top:1px solid var(--soft)}',
    '#khl-out h2{font-size:clamp(2.2rem,6vw,4rem);line-height:1.02;max-width:16ch}',
    '#khl-out h2 em{font-style:italic;color:var(--k);transition:color .8s ease}',
    '#khl-out .bd{color:var(--ink2);max-width:50ch;margin-top:1.4rem}',
    '#khl .actions{display:flex;flex-wrap:wrap;gap:.9rem;margin-top:2.4rem}',
    '#khl .btn{display:inline-block;text-decoration:none;font-size:.68rem;letter-spacing:.22em;text-transform:uppercase;padding:.85rem 1.6rem;border-radius:2px;border:1px solid var(--k);color:var(--k);transition:background .3s,color .3s}',
    '#khl .btn:hover{background:var(--k);color:var(--paper)}',
    '#khl .btn.solid{background:var(--k);color:var(--paper)}',
    '#khl .btn.solid:hover{filter:brightness(1.12)}',
    '#khl .details{display:flex;flex-wrap:wrap;gap:.8rem 2.6rem;margin-top:2.6rem;font-size:.78rem;letter-spacing:.16em;text-transform:uppercase;color:var(--ink2)}',
    '#khl .details a{text-decoration:none;border-bottom:1px solid var(--rule);padding-bottom:2px;transition:color .3s,border-color .3s}',
    '#khl .details a:hover{color:var(--k);border-color:var(--k)}',
    '#khl .fine{margin-top:3rem;font-size:.65rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted)}',

    '#khl .rv{opacity:0;transform:translateY(22px);transition:opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1)}',
    '#khl .rv.in{opacity:1;transform:none}',

    '@media (prefers-reduced-motion:reduce){',
      '#khl .rv{opacity:1;transform:none}',
      '#khl-hero{min-height:auto}',
      '#khl .panel{height:auto}',
      '#khl .pin{position:static;height:auto;padding:4rem var(--pad)}',
      '#khl .txt{opacity:1!important;transform:none!important;filter:none!important}',
      '#khl-canvas,#khl-seed,#khl-tap{display:none}',
    '}'
  ].join('\n');

  /* IMPORTANT: content is appended to <body>, NOT into Wix's page container.
     A Wix site is a React app rooted at #SITE_CONTAINER, and anything injected
     inside that tree is destroyed the moment React re-renders — the page flashes,
     then goes blank. Body-level siblings sit outside React's tree and survive.
     The collapse rules then close the gap the emptied Wix page leaves behind. */
  var WIX_PAGES = '#SITE_PAGES,#PAGES_CONTAINER,[data-testid="pages-container"]';

  function wixCollapseCss(){
    var css = WIX_PAGES + '{min-height:0!important;height:0!important;overflow:hidden!important}' +
              '#SITE_CONTAINER{min-height:0!important}';
    if(CFG.hideWixFooter) css += '#SITE_FOOTER{display:none!important}';
    if(CFG.fixWixHeader)  css += '#SITE_HEADER{position:fixed!important;top:0!important;left:0!important;right:0!important;z-index:9500!important}';
    return css;
  }

  /* Measured height of the Wix header, so the hero clears it. */
  function headerHeight(){
    var h = document.querySelector('#SITE_HEADER');
    return h ? Math.round(h.getBoundingClientRect().height) : 0;
  }

  function findHost(){
    if(CFG.mountSelector){
      var pick = document.querySelector(CFG.mountSelector);
      if(pick) return pick;
    }
    return document.body;
  }

  /* ------------------------------------------------------------------ *
   * 4. MOUNT / UNMOUNT
   * ------------------------------------------------------------------ */
  var mounted = false, teardown = [];
  function on(t, ev, fn, opt){ t.addEventListener(ev, fn, opt); teardown.push(function(){ t.removeEventListener(ev, fn, opt); }); }

  function pageMatches(){
    if(!CFG.pagePath) return true;
    var want = String(CFG.pagePath).replace(/\/+$/,'').toLowerCase();
    var have = location.pathname.replace(/\/+$/,'').toLowerCase();
    return want === have;
  }

  function unmount(){
    if(!mounted) return;
    mounted = false;
    teardown.forEach(function(f){ try{ f(); }catch(e){} });
    teardown = [];
    ['khl','khl-bg','khl-canvas','khl-seed','khl-tap','khl-spine','khl-style','khl-collapse'].forEach(function(id){
      var el = document.getElementById(id);
      if(el && el.parentNode) el.parentNode.removeChild(el);
    });
  }

  function el(tag, attrs, html){
    var n = document.createElement(tag);
    if(attrs) for(var a in attrs) if(attrs.hasOwnProperty(a)) n.setAttribute(a, attrs[a]);
    if(html != null) n.innerHTML = html;
    return n;
  }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }

  function mount(){
    if(mounted || !pageMatches()) return;
    mounted = true;

    /* fonts */
    if(CFG.fonts && !document.getElementById('khl-fonts')){
      var f = el('link',{id:'khl-fonts',rel:'stylesheet',href:'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..500;1,6..72,300&family=Karla:wght@300;400;500;600&family=Noto+Sans+Devanagari:wght@400;500&display=swap'});
      document.head.appendChild(f);
    }

    var st = el('style',{id:'khl-style'}); st.textContent = CSS; document.head.appendChild(st);
    if(CFG.collapseWixPage){
      var sc = el('style',{id:'khl-collapse'}); sc.textContent = wixCollapseCss(); document.head.appendChild(sc);
    }

    /* ---- stage ---- */
    var bg = el('div',{id:'khl-bg','aria-hidden':'true'});
    document.body.appendChild(bg);
    var cv = el('canvas',{id:'khl-canvas','aria-hidden':'true'});
    var seed = el('div',{id:'khl-seed','aria-hidden':'true'});
    var tap = el('button',{id:'khl-tap',type:'button','aria-label':'Sound the current center’s tone'},
      '<span class="r"></span><span class="h">Tap to sound</span>');
    document.body.appendChild(cv); document.body.appendChild(seed);
    if(CFG.sound) document.body.appendChild(tap);

    var spine = el('div',{id:'khl-spine','aria-label':'Chakra navigation'},'<div class="th"></div><div id="khl-comet"></div>');
    document.body.appendChild(spine);
    var comet = spine.querySelector('#khl-comet');

    /* ---- content ---- */
    var root = el('div',{id:'khl'});
    var html = '';

    html += '<section id="khl-hero"><div>' +
      '<p class="lb rv">' + esc(CFG.credential) + '</p>' +
      '<h1 class="rv">' + esc(COPY.heroLead) + '<br><em>' + esc(COPY.heroAccent) + '</em></h1>' +
      '<p class="sub rv">' + esc(COPY.heroSub) + '</p></div>' +
      /* if the logo URL is missing or wrong, drop the plate rather than showing a broken image */
      (CFG.logo && CFG.logo.indexOf('YOUR-FILE') === -1
        ? '<div id="khl-plate" class="rv"><img src="' + esc(CFG.logo) + '" alt="' + esc(CFG.name) + ' monogram with the seven chakra symbols running down its center" onerror="var p=document.getElementById(\'khl-plate\'); if(p) p.style.display=\'none\';"></div>'
        : '<div></div>') +
      '<div class="cue"><i></i>' + esc(COPY.cue) + '</div></section>';

    html += '<section id="khl-intro"><div class="col">' +
      '<p class="lb rv">The Practice</p>' +
      '<h2 class="rv">' + esc(COPY.introTitle) + '</h2>' +
      '<p class="rv">' + esc(COPY.introA) + '</p>' +
      '<p class="rv">' + esc(COPY.introB) + '</p>' +
      '<div class="orient rv"><p><strong>On direction.</strong> ' +
        (DESCENDING
          ? 'The mark reads crown at the top, root at the bottom, so scrolling down travels the same way — from open awareness back into the body and the ground.'
          : 'This page runs the traditional ascent — root first, rising to the crown.') +
      '</p></div></div></section>';

    CH.forEach(function(ch,i){
      html += '<section class="panel" id="khl-' + ch.key + '" style="--c:' + ch.c + '"><div class="pin"><div class="txt">' +
        '<p class="num">' + String(i+1).padStart(2,'0') + ' of 07</p>' +
        '<h2><span class="en">' + esc(ch.en) + '</span>' + esc(ch.sans) + '</h2>' +
        '<p class="bd">' + esc(ch.body) + '</p>' +
        '<div class="facts">' +
          '<div><span>Element</span><b>' + esc(ch.element) + '</b></div>' +
          '<div><span>Petals</span><b>' + ch.petals.toLocaleString() + '</b></div>' +
          '<div><span>Seed</span><b style="font-family:var(--deva)">' + ch.bija + ' <small style="font-family:var(--disp);font-size:.78rem;color:var(--muted)">' + ch.rom + '</small></b></div>' +
        '</div>' +
        (CFG.sound ? '<button class="tone" type="button" data-hz="' + ch.hz + '"><span class="wv"><i></i><i></i><i></i><i></i></span>Hear ' + ch.hz + ' Hz</button>' : '') +
      '</div></div></section>';
    });

    html += '<section id="khl-out"><div class="wide">' +
      '<h2 class="rv">Begin when you’re <em>ready</em></h2>' +
      '<p class="bd rv">' + esc(COPY.outBody) + '</p>' +
      '<div class="actions rv">' +
        '<a class="btn solid" href="' + esc(CFG.bookUrl) + '">Book a session</a>' +
        '<a class="btn" href="' + esc(CFG.shopUrl) + '">Visit the shop</a>' +
      '</div>' +
      '<div class="details rv">' +
        '<a href="tel:' + esc(String(CFG.phone).replace(/\D/g,'')) + '">' + esc(CFG.phone) + '</a>' +
        '<a href="mailto:' + esc(CFG.email) + '">' + esc(CFG.email) + '</a>' +
        '<span>' + esc(CFG.place) + '</span>' +
      '</div>' +
      '<p class="fine">Complementary practice, not medical care</p>' +
    '</div></section>';

    root.innerHTML = html;
    findHost().appendChild(root);

    /* clear the Wix header: use the configured offset, else measure the real one */
    function syncTop(){
      var off = CFG.topOffset || (CFG.fixWixHeader ? headerHeight() : 0);
      root.style.setProperty('--khl-top', off + 'px');
    }
    syncTop();
    on(window, 'resize', syncTop);
    setTimeout(syncTop, 600);   // Wix reflows its header after fonts/images land

    var panels = CH.map(function(c){ return document.getElementById('khl-' + c.key); });
    var texts  = panels.map(function(p){ return p.querySelector('.txt'); });
    var plate  = document.getElementById('khl-plate');

    /* ---- spine nodes ---- */
    var NS = 'http://www.w3.org/2000/svg';
    CH.forEach(function(ch){
      var b = el('button',{type:'button','aria-label':ch.en + ' — ' + ch.sans},
        '<span class="tip">' + esc(ch.en) + '</span>' +
        '<svg viewBox="0 0 100 100" aria-hidden="true"><circle class="core" cx="50" cy="50" r="10" fill="' + ch.c + '" fill-opacity=".16" stroke="' + ch.c + '" stroke-width="2.5"/></svg>');
      var sv = b.querySelector('svg'), n = Math.min(ch.draw, 28);
      for(var i=0;i<n;i++){
        var a = (i/n)*Math.PI*2 - Math.PI/2;
        var l = document.createElementNS(NS,'line');
        l.setAttribute('x1',(50+Math.cos(a)*18).toFixed(2)); l.setAttribute('y1',(50+Math.sin(a)*18).toFixed(2));
        l.setAttribute('x2',(50+Math.cos(a)*30).toFixed(2)); l.setAttribute('y2',(50+Math.sin(a)*30).toFixed(2));
        l.setAttribute('stroke',ch.c); l.setAttribute('stroke-width', n>18?'1':'1.6');
        l.setAttribute('stroke-linecap','round'); l.setAttribute('class','pet');
        l.style.opacity = 0; sv.appendChild(l);
      }
      on(b,'click',function(){
        var t = document.getElementById('khl-' + ch.key);
        if(t) t.scrollIntoView({behavior: reduced ? 'auto' : 'smooth', block:'start'});
      });
      spine.appendChild(b);
    });
    var nodes = [].slice.call(spine.querySelectorAll('button'));

    /* ---- reveals ---- */
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){
          var sibs = [].slice.call(e.target.parentNode.children).filter(function(n){ return n.classList.contains('rv'); });
          e.target.style.transitionDelay = (Math.max(0,sibs.indexOf(e.target))*0.07)+'s';
          e.target.classList.add('in'); io.unobserve(e.target);
        }
      });
    },{threshold:0.2, rootMargin:'0px 0px -6% 0px'});
    root.querySelectorAll('.rv').forEach(function(n){ io.observe(n); });
    teardown.push(function(){ io.disconnect(); });

    /* ---- audio ---- */
    var actx=null, cur=null;
    function stopTone(){
      if(!cur) return; var c=cur; cur=null;
      try{
        c.gain.gain.cancelScheduledValues(actx.currentTime);
        c.gain.gain.setValueAtTime(c.gain.gain.value, actx.currentTime);
        c.gain.gain.linearRampToValueAtTime(0.0001, actx.currentTime+0.5);
        c.osc.stop(actx.currentTime+0.55);
      }catch(e){}
      if(c.btn) c.btn.classList.remove('play');
    }
    function playTone(hz, btn){
      if(!CFG.sound) return true;
      if(!actx){ var AC = window.AudioContext||window.webkitAudioContext; if(!AC) return false; actx = new AC(); }
      if(actx.state==='suspended') actx.resume();
      var same = cur && cur.hz===hz && cur.btn===btn;
      stopTone(); if(same) return true;
      var osc=actx.createOscillator(), gain=actx.createGain(), lp=actx.createBiquadFilter();
      osc.type='sine'; osc.frequency.value=hz;
      lp.type='lowpass'; lp.frequency.value=1800;
      gain.gain.setValueAtTime(0.0001, actx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.13, actx.currentTime+1.1);
      gain.gain.setValueAtTime(0.13, actx.currentTime+4.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime+6.5);
      osc.connect(lp); lp.connect(gain); gain.connect(actx.destination);
      osc.start(); osc.stop(actx.currentTime+6.6);
      cur = {osc:osc, gain:gain, btn:btn, hz:hz};
      if(btn) btn.classList.add('play');
      osc.onended = function(){ if(cur && cur.osc===osc) cur=null; if(btn) btn.classList.remove('play'); };
      return true;
    }
    root.querySelectorAll('.tone').forEach(function(b){
      on(b,'click',function(){ if(!playTone(parseFloat(b.dataset.hz), b)) b.textContent = 'Audio unavailable'; });
    });
    on(document,'visibilitychange',function(){ if(document.hidden) stopTone(); });
    teardown.push(stopTone);
    teardown.push(function(){ if(actx && actx.close) try{ actx.close(); }catch(e){} });

    var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced) return;

    /* ---- animation ---- */
    var ctx = cv.getContext('2d');
    var W=0,H=0,dpr=1,cx=0,cy=0,R=0;
    function resize(){
      W=innerWidth; H=innerHeight; dpr=Math.min(devicePixelRatio||1,2);
      cv.width=W*dpr; cv.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
      var narrow = W < 861;
      cx = narrow ? W*0.5 : W*0.66;
      cy = narrow ? H*0.26 : H*0.5;
      R  = narrow ? Math.min(W,H)*0.26 : Math.min(W*0.42, H*0.40);
      tap.style.width = tap.style.height = (R*1.1)+'px';
    }
    on(window,'resize',resize); resize();

    function hx(h){ return [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]; }
    var RGB = CH.map(function(c){ return hx(c.c); });
    function lerp(a,b,t){ return a+(b-a)*t; }
    function clamp(v,a,b){ return v<a?a:(v>b?b:v); }
    function ease(t){ return t*t*(3-2*t); }
    function rgba(c,a){ return 'rgba('+Math.round(c[0])+','+Math.round(c[1])+','+Math.round(c[2])+','+a+')'; }

    function petal(a,r0,r1,half){
      var c0=Math.cos(a), s0=Math.sin(a), rm=(r0+r1)*0.55, aL=a-half, aR=a+half;
      ctx.moveTo(cx+c0*r0, cy+s0*r0);
      ctx.quadraticCurveTo(cx+Math.cos(aL)*rm, cy+Math.sin(aL)*rm, cx+c0*r1, cy+s0*r1);
      ctx.quadraticCurveTo(cx+Math.cos(aR)*rm, cy+Math.sin(aR)*rm, cx+c0*r0, cy+s0*r0);
    }

    var motes=[];
    for(var mi=0;mi<64;mi++) motes.push({a:Math.random()*6.2832, rad:Math.random(), y:Math.random(), sp:Math.random()*0.14+0.04, sz:Math.random()*1.6+0.5});

    var S = { col:RGB[0].slice(), n:CH[0].draw, spin:0, spin2:0, boost:0, live:0, energy:0 };
    var lastY = scrollY, vel = 0, ripples = [], activeIdx = 0, lastActive = -1, raf = 0;
    var thread = spine.querySelector('.th');

    function journey(){
      var mid = innerHeight*0.5, idx=-1, p=0;
      for(var i=0;i<panels.length;i++){
        var r = panels[i].getBoundingClientRect();
        if(r.top<=mid && r.bottom>=mid){ idx=i; p=clamp((mid-r.top)/r.height,0,1); break; }
      }
      if(idx===-1){
        var f=panels[0].getBoundingClientRect();
        if(f.top>mid) return {idx:-1,p:0,before:true,after:false};
        return {idx:CH.length-1,p:1,before:false,after:true};
      }
      return {idx:idx,p:p,before:false,after:false};
    }

    function frame(){
      if(!mounted) return;
      var y = scrollY, dv = y-lastY; lastY = y;
      vel += (Math.abs(dv)-vel)*0.16;
      var dir = dv>=0?1:-1;

      var J = journey(), inJ = !J.before && !J.after;
      var i0 = J.idx<0?0:J.idx, i1 = Math.min(i0+1, CH.length-1);
      var blend = J.idx<0?0:ease(clamp((J.p-0.55)/0.45,0,1));
      var tc = [lerp(RGB[i0][0],RGB[i1][0],blend), lerp(RGB[i0][1],RGB[i1][1],blend), lerp(RGB[i0][2],RGB[i1][2],blend)];
      var tn = lerp(CH[i0].draw, CH[i1].draw, blend);

      for(var k=0;k<3;k++) S.col[k] += (tc[k]-S.col[k])*0.08;
      S.n += (tn-S.n)*0.06;
      S.boost += (Math.min(vel,90)/90 - S.boost)*0.09;
      S.live += ((inJ?1:0)-S.live)*0.07;
      var breath = J.idx<0?0:Math.sin(J.p*Math.PI);
      S.energy += ((0.55+breath*0.45)-S.energy)*0.06;
      S.spin  += (0.0011 + S.boost*0.010)*dir;
      S.spin2 -= (0.0007 + S.boost*0.006)*dir;

      var col = S.col, L = S.live;
      cv.classList.toggle('on', L>0.02);
      var css = 'rgb('+Math.round(col[0])+','+Math.round(col[1])+','+Math.round(col[2])+')';
      root.style.setProperty('--k', css);
      root.style.setProperty('--kw','rgba('+Math.round(col[0])+','+Math.round(col[1])+','+Math.round(col[2])+',0.08)');
      comet.style.background = css; comet.style.boxShadow = '0 0 12px 3px '+css;
      tap.style.color = css;

      ctx.clearRect(0,0,W,H);
      if(L>0.01){
        var Rr = R*(0.80 + S.energy*0.26)*(1 + S.boost*0.05);
        var g = ctx.createRadialGradient(cx,cy,0,cx,cy,Rr*1.45);
        g.addColorStop(0, rgba(col,0.16*L)); g.addColorStop(0.45, rgba(col,0.06*L)); g.addColorStop(1, rgba(col,0));
        ctx.fillStyle=g; ctx.fillRect(cx-Rr*1.5, cy-Rr*1.5, Rr*3, Rr*3);

        for(var m=0;m<motes.length;m++){
          var mo=motes[m];
          mo.y -= mo.sp*0.0024*(1+S.boost*3);
          if(mo.y<0) mo.y=1;
          var mr = Rr*(0.28+mo.rad*1.05), ma = mo.a + S.spin*0.4;
          ctx.beginPath();
          ctx.arc(cx+Math.cos(ma)*mr*0.55, cy - Rr*1.2 + mo.y*Rr*2.4, mo.sz, 0, 6.2832);
          ctx.fillStyle = rgba(col, 0.30*L*(1-Math.abs(mo.y-0.5)*1.5));
          ctx.fill();
        }

        var n = Math.max(2, S.n), full = Math.floor(n), frac = n-full, half = Math.PI/n*0.86, thin = n>20;
        for(var q=0;q<=full;q++){
          var al = q===full ? frac : 1;
          if(al<0.02) continue;
          ctx.beginPath(); petal((q/n)*6.2832 + S.spin - Math.PI/2, Rr*0.30, Rr*0.98, half);
          ctx.fillStyle = rgba(col, 0.055*al*L); ctx.fill();
          ctx.strokeStyle = rgba(col, (thin?0.32:0.46)*al*L); ctx.lineWidth = thin?0.8:1.3; ctx.stroke();
        }
        for(var q2=0;q2<8;q2++){
          ctx.beginPath(); petal((q2/8)*6.2832 + S.spin2 - Math.PI/2, Rr*0.10, Rr*0.44, Math.PI/8*0.8);
          ctx.fillStyle = rgba(col,0.07*L); ctx.fill();
          ctx.strokeStyle = rgba(col,0.34*L); ctx.lineWidth=1; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(cx,cy,Rr*0.115,0,6.2832);
        ctx.fillStyle = rgba(col,0.13*L); ctx.fill();
        ctx.strokeStyle = rgba(col,0.6*L); ctx.lineWidth=1.2; ctx.stroke();

        for(var rp=ripples.length-1;rp>=0;rp--){
          var r2=ripples[rp]; r2.r += Rr*0.016; r2.a *= 0.975;
          ctx.beginPath(); ctx.arc(cx,cy,r2.r,0,6.2832);
          ctx.strokeStyle = rgba(col, r2.a*L); ctx.lineWidth=1; ctx.stroke();
          if(r2.a<0.01) ripples.splice(rp,1);
        }

        seed.textContent = (blend>0.5?CH[i1]:CH[i0]).bija;
        seed.style.opacity = (L*(0.55+S.energy*0.45)).toFixed(3);
        seed.style.color = css;
        seed.style.fontSize = (Rr*0.30).toFixed(1)+'px';
        seed.style.transform = 'translate(-50%,-50%) translate('+cx.toFixed(1)+'px,'+cy.toFixed(1)+'px) scale('+(0.9+S.energy*0.12).toFixed(3)+')';
        seed.style.textShadow = '0 0 '+(Rr*0.16).toFixed(0)+'px '+rgba(col,0.35*L);
        tap.style.left = cx+'px'; tap.style.top = cy+'px';
        tap.style.opacity = (L*0.9).toFixed(2);
        tap.classList.toggle('on', L>0.5);
      } else {
        seed.style.opacity = 0; tap.style.opacity = 0; tap.classList.remove('on');
      }

      for(var ti=0;ti<texts.length;ti++){
        var pr = panels[ti].getBoundingClientRect();
        var pp = pr.height>0 ? (innerHeight*0.5 - pr.top)/pr.height : -1;
        var vis, ty;
        if(pp<0 || pp>1){ vis=0; ty = pp<0?34:-34; }
        else {
          var inn = ease(clamp(pp/0.22,0,1)), out = ease(clamp((pp-0.76)/0.24,0,1));
          vis = inn*(1-out); ty = (1-inn)*34 - out*34;
        }
        texts[ti].style.opacity = vis.toFixed(3);
        texts[ti].style.transform = 'translateY('+ty.toFixed(1)+'px)';
        texts[ti].style.filter = vis<0.98 ? 'blur('+((1-vis)*3).toFixed(2)+'px)' : 'none';
      }

      if(plate && y < innerHeight*1.2){
        plate.style.transform = 'translateY('+(y*-0.07).toFixed(1)+'px) rotate('+(y*0.004).toFixed(3)+'deg)';
      }

      var act = J.before ? -1 : (J.after ? CH.length-1 : J.idx);
      if(act !== lastActive){
        lastActive = act; activeIdx = Math.max(0, act);
        nodes.forEach(function(nd,ix){
          var isOn = ix===act;
          nd.setAttribute('aria-current', isOn?'true':'false');
          nd.querySelector('.core').setAttribute('fill-opacity', isOn?'.85':'.16');
          nd.querySelectorAll('.pet').forEach(function(pt){ pt.style.opacity = isOn?'.85':'0'; });
          nd.querySelector('svg').style.transform = isOn?'scale(1.45)':'scale(1)';
        });
      }
      var jt = J.before ? 0 : (J.after ? 1 : (J.idx + J.p)/CH.length);
      comet.style.transform = 'translateY('+((jt-0.5)*thread.offsetHeight).toFixed(1)+'px)';
      comet.classList.toggle('on', inJ);
      spine.classList.toggle('away', J.after);

      raf = requestAnimationFrame(frame);
    }

    on(tap,'click',function(){ ripples.push({r:R*0.12, a:0.45}); playTone(CH[activeIdx].hz, null); });
    teardown.push(function(){ if(raf) cancelAnimationFrame(raf); });
    raf = requestAnimationFrame(frame);
  }

  /* ------------------------------------------------------------------ *
   * 5. BOOT — Wix is a single-page app, so watch for route changes
   * ------------------------------------------------------------------ */
  function sync(){ pageMatches() ? mount() : unmount(); }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sync);
  else sync();

  window.addEventListener('popstate', function(){ setTimeout(sync, 60); });
  var _push = history.pushState;
  history.pushState = function(){ var r = _push.apply(this, arguments); setTimeout(sync, 60); return r; };

  window.KH_LOTUS_API = { mount: mount, unmount: unmount, config: CFG };
})();
