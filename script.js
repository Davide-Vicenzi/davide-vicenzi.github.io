(function(){
  'use strict';

  /* Helper: converte una NodeList in array senza dipendere da NodeList.forEach */
  function toArray(nodeList){
    var arr = [];
    for(var i=0; i<nodeList.length; i++){ arr.push(nodeList[i]); }
    return arr;
  }

  /* ============ THEME (dark / light) ============
     Isolato in try/catch: un eventuale errore qui non deve mai
     impedire la visualizzazione del resto della pagina. */
  try {
    var root = document.documentElement;
    var themeToggle = document.getElementById('theme-toggle');
    var STORAGE_KEY = 'dv-theme';

    function applyTheme(theme){
      if(theme === 'dark'){
        root.setAttribute('data-theme', 'dark');
        themeToggle.setAttribute('aria-label', 'Attiva tema chiaro');
      } else {
        root.removeAttribute('data-theme');
        themeToggle.setAttribute('aria-label', 'Attiva tema scuro');
      }
    }

    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch(e){ stored = null; }

    if(stored){
      applyTheme(stored);
    } else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
      applyTheme('dark');
    }

    if(themeToggle){
      themeToggle.addEventListener('click', function(){
        var isDark = root.getAttribute('data-theme') === 'dark';
        var next = isDark ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem(STORAGE_KEY, next); } catch(e){ /* noop */ }
      });
    }
  } catch(e){ /* il tema non è critico: in caso di errore resta il default chiaro */ }

  /* ============ MOBILE NAV ============ */
  try {
    var navToggle = document.getElementById('nav-toggle');
    var mainNav = document.getElementById('main-nav');

    if(navToggle && mainNav){
      navToggle.addEventListener('click', function(){
        var isOpen = mainNav.classList.toggle('is-open');
        navToggle.classList.toggle('is-open', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      var navLinksForClose = toArray(mainNav.querySelectorAll('a'));
      for(var i=0; i<navLinksForClose.length; i++){
        navLinksForClose[i].addEventListener('click', function(){
          mainNav.classList.remove('is-open');
          navToggle.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      }
    }
  } catch(e){ /* il menu mobile non è critico per la lettura dei contenuti */ }

  /* ============ SCROLL-SPY ============ */
  try {
    var sections = toArray(document.querySelectorAll('main section[id]'));
    var navLinks = toArray(document.querySelectorAll('.main-nav a'));

    function setActiveLink(id){
      for(var i=0; i<navLinks.length; i++){
        var match = navLinks[i].getAttribute('href') === '#' + id;
        navLinks[i].classList.toggle('active', match);
      }
    }

    if('IntersectionObserver' in window && sections.length){
      var spyObserver = new IntersectionObserver(function(entries){
        for(var i=0; i<entries.length; i++){
          if(entries[i].isIntersecting){ setActiveLink(entries[i].target.id); }
        }
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

      for(var s=0; s<sections.length; s++){ spyObserver.observe(sections[s]); }
    }
  } catch(e){ /* lo scroll-spy è puramente decorativo */ }

  /* ============ MODULO DI CONTATTO ============
     Il sito è statico (nessun backend): all'invio componiamo una mail
     pre-compilata con i dati inseriti e apriamo il client di posta. */
  try {
    var contactForm = document.getElementById('contact-form');

    if(contactForm){
      contactForm.addEventListener('submit', function(ev){
        ev.preventDefault();

        if(typeof contactForm.checkValidity === 'function' && !contactForm.checkValidity()){
          if(typeof contactForm.reportValidity === 'function'){ contactForm.reportValidity(); }
          return;
        }

        function val(id){
          var el = document.getElementById(id);
          return el && el.value ? el.value.trim() : '';
        }

        var nome = val('cf-nome');
        var cognome = val('cf-cognome');
        var azienda = val('cf-azienda');
        var email = val('cf-email');
        var messaggio = val('cf-messaggio');

        var subject = 'Richiesta di contatto da ' + (nome + ' ' + cognome).trim();

        var bodyLines = [
          'Nome: ' + nome,
          'Cognome: ' + cognome,
          'Azienda: ' + (azienda || '—'),
          'Email per il ricontatto: ' + email,
          '',
          'Messaggio:',
          messaggio
        ];

        var mailto = 'mailto:davide.vicenzi.1994@gmail.com'
          + '?subject=' + encodeURIComponent(subject)
          + '&body=' + encodeURIComponent(bodyLines.join('\n'));

        window.location.href = mailto;
      });
    }
  } catch(e){ /* in caso di errore l'utente può sempre scrivere ai contatti diretti elencati */ }

})();
