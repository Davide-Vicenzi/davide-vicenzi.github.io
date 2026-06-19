(function(){
  'use strict';

  function toArray(nodeList){
    var arr = [];
    for(var i=0; i<nodeList.length; i++){ arr.push(nodeList[i]); }
    return arr;
  }

  /* ============ THEME (dark / light) ============ */
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
  } catch(e){ /* il tema non è critico */ }

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
  } catch(e){ /* il menu mobile non è critico */ }

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

  /* ============ AVATAR NELLA NAV (appare quando la hero esce dal viewport) ============ */
  try {
    var heroSection = document.getElementById('home');
    var navAvatar = document.getElementById('nav-avatar');

    if(heroSection && navAvatar && 'IntersectionObserver' in window){
      var avatarObserver = new IntersectionObserver(function(entries){
        /* Quando la hero NON è più visibile, mostra l'avatar nella nav */
        var isHeroVisible = entries[0].isIntersecting;
        navAvatar.classList.toggle('is-visible', !isHeroVisible);
      }, { threshold: 0.1 });

      avatarObserver.observe(heroSection);
    }
  } catch(e){ /* l'avatar nella nav non è critico */ }

  /* ============ MODULO DI CONTATTO — FORMSPREE ============
     Invio silente via fetch: nessuna apertura di programmi di posta.
     Per attivarlo:
       1. Registrarsi su https://formspree.io
       2. Creare un form e copiare l'ID (es. xpwzabcd)
       3. Nell'HTML, impostare data-action="https://formspree.io/f/IL_TUO_ID"
  ============================================================ */
  try {
    var contactForm = document.getElementById('contact-form');
    var submitBtn = document.getElementById('form-submit-btn');
    var feedback = document.getElementById('form-feedback');

    function showFeedback(type, msg){
      if(!feedback){ return; }
      feedback.textContent = msg;
      feedback.className = 'form-feedback ' + type;
    }

    function clearFeedback(){
      if(!feedback){ return; }
      feedback.textContent = '';
      feedback.className = 'form-feedback';
    }

    if(contactForm){
      contactForm.addEventListener('submit', function(ev){
        ev.preventDefault();
        clearFeedback();

        /* Validazione nativa HTML5 */
        if(typeof contactForm.checkValidity === 'function' && !contactForm.checkValidity()){
          if(typeof contactForm.reportValidity === 'function'){ contactForm.reportValidity(); }
          return;
        }

        var endpoint = contactForm.getAttribute('data-action');

        /* Fallback: se Formspree non è ancora configurato, apre il client di posta */
        if(!endpoint || endpoint.indexOf('YOUR_FORM_ID') !== -1){
          var nome     = (document.getElementById('cf-nome')     || {}).value || '';
          var cognome  = (document.getElementById('cf-cognome')  || {}).value || '';
          var azienda  = (document.getElementById('cf-azienda')  || {}).value || '';
          var email    = (document.getElementById('cf-email')    || {}).value || '';
          var msg      = (document.getElementById('cf-messaggio')|| {}).value || '';

          var subject  = 'Richiesta di contatto da ' + (nome + ' ' + cognome).trim();
          var body     = [
            'Nome: ' + nome,
            'Cognome: ' + cognome,
            'Azienda: ' + (azienda || '—'),
            'Email per il ricontatto: ' + email,
            '',
            'Messaggio:',
            msg
          ].join('\n');

          window.location.href = 'mailto:davide.vicenzi.1994@gmail.com'
            + '?subject=' + encodeURIComponent(subject)
            + '&body='    + encodeURIComponent(body);
          return;
        }

        /* Invio via Formspree */
        if(submitBtn){ submitBtn.disabled = true; submitBtn.textContent = 'Invio in corso…'; }

        fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(contactForm)
        })
        .then(function(response){
          if(response.ok){
            showFeedback('success', 'Messaggio inviato. Ti risponderò al più presto, grazie!');
            contactForm.reset();
          } else {
            return response.json().then(function(data){
              var errMsg = (data && data.errors)
                ? data.errors.map(function(e){ return e.message; }).join(', ')
                : 'Errore nell\'invio. Riprova o scrivimi direttamente via email.';
              showFeedback('error', errMsg);
            });
          }
        })
        .catch(function(){
          showFeedback('error', 'Connessione non riuscita. Riprova o scrivimi direttamente via email.');
        })
        .finally(function(){
          if(submitBtn){
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Invia messaggio <svg class="icon icon-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
          }
        });

      });
    }
  } catch(e){ /* in caso di errore l'utente può sempre scrivere ai contatti diretti */ }

})();
