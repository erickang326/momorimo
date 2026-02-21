/* ============================================================
   MOMORIMO — Main JavaScript (v3.2)
   GSAP 3.x + ScrollTrigger
   Hybrid: HTML animations + Detail page images
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== SCROLL PROGRESS BAR ===== */
(function () {
  var bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', function () {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (h > 0) bar.style.width = (window.scrollY / h * 100) + '%';
  });
})();

/* ===== HEADER SCROLL STATE ===== */
(function () {
  var header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });
})();

/* ===== MOBILE MENU ===== */
(function () {
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ===== PRELOADER ===== */
window.addEventListener('load', function () {
  var preloader = document.querySelector('.preloader');
  var symbol = document.querySelector('.preloader-symbol');
  var logo = document.querySelector('.preloader-logo');
  var line = document.querySelector('.preloader-line');

  if (!preloader) { initHero(); return; }

  if (prefersReducedMotion) {
    preloader.style.display = 'none';
    initHero();
    return;
  }

  if (symbol) gsap.to(symbol, { opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out' });
  gsap.to(logo, { opacity: 1, duration: 0.8, delay: 0.5, ease: 'power2.out' });

  setTimeout(function () { line.classList.add('animate'); }, 800);

  gsap.to(preloader, {
    opacity: 0,
    duration: 0.6,
    delay: 2.4,
    ease: 'power2.inOut',
    onComplete: function () {
      preloader.style.display = 'none';
      initHero();
    }
  });
});

/* ===== HERO ANIMATION SEQUENCE ===== */
function initHero() {
  var krText1 = '\uC624\uB79C\uC2DC\uAC04 \uB450\uD53C\uC640 \uBAA8\uBC1C \uCF00\uC5B4\uB97C \uC704\uD574';
  var krText2 = '\uACE0\uBBFC\uACFC \uC5F0\uAD6C\uB85C \uAE30\uC220\uB825\uC744 \uC644\uC131\uD55C, \uBAA8\uBAA8\uB9AC\uBAA8';

  if (prefersReducedMotion) {
    showHeroInstant(krText1, krText2);
    return;
  }

  var tl = gsap.timeline();

  tl.to('#hero-logo', { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, 0.3);
  tl.to('#hero-sub', { opacity: 1, duration: 0.6 }, 1.0);
  tl.to('#hero-divider', { width: 200, duration: 0.8, ease: 'power2.inOut' }, 1.5);

  populateKrText('hero-kr', krText1);
  populateKrText('hero-kr2', krText2);

  tl.to('#hero-kr span', { opacity: 1, y: 0, duration: 0.3, stagger: 0.04 }, 2.0);
  tl.to('#hero-kr2 span', { opacity: 1, y: 0, duration: 0.3, stagger: 0.04 }, 2.6);
  tl.to('#hero-bottle', { opacity: 1, y: 0, duration: 1, ease: 'back.out(1.2)' }, 3.0);
  tl.to('#hero-stats', { opacity: 1, duration: 0.6 }, 3.5);
  tl.to('#hero-usps', { opacity: 1, duration: 0.6 }, 4.0);
  tl.to('#scroll-down', { opacity: 1, duration: 0.6 }, 4.4);
}

function showHeroInstant(t1, t2) {
  gsap.set('#hero-logo', { opacity: 1, scale: 1 });
  gsap.set('#hero-sub', { opacity: 1 });
  gsap.set('#hero-divider', { width: 200 });
  document.getElementById('hero-kr').textContent = t1;
  document.getElementById('hero-kr2').textContent = t2;
  gsap.set('#hero-bottle', { opacity: 1, y: 0 });
  gsap.set('#hero-stats', { opacity: 1 });
  gsap.set('#hero-usps', { opacity: 1 });
  gsap.set('#scroll-down', { opacity: 1 });
}

function populateKrText(id, text) {
  var el = document.getElementById(id);
  if (!el) return;
  text.split('').forEach(function (char) {
    var span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    el.appendChild(span);
  });
}

/* ===== DETAIL IMAGE SECTIONS — fadeIn on scroll ===== */
gsap.utils.toArray('.detail-img-sec').forEach(function (sec) {
  gsap.fromTo(sec, { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: sec, start: 'top 85%' }
  });
});

/* ===== SEC 3: BRAND STORY ===== */
gsap.to('.story-title', {
  opacity: 1, y: 0, duration: 1, ease: 'power2.out',
  scrollTrigger: { trigger: '.story-sec', start: 'top 75%' }
});

gsap.to('.story-body', {
  opacity: 1, duration: 0.8, delay: 0.3,
  scrollTrigger: { trigger: '.story-sec', start: 'top 75%' }
});

gsap.utils.toArray('.naming-card').forEach(function (card, i) {
  gsap.to(card, {
    opacity: 1, y: 0, duration: 0.8, delay: 0.2 + i * 0.2,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.naming-cards', start: 'top 80%' }
  });
});

gsap.to('.story-motto', {
  opacity: 1, duration: 0.8,
  scrollTrigger: { trigger: '.story-motto', start: 'top 85%' }
});

gsap.to('.story-motto-sub', {
  opacity: 1, duration: 0.8, delay: 0.2,
  scrollTrigger: { trigger: '.story-motto', start: 'top 85%' }
});

/* ===== SEC 7: pH GAUGE ===== */
(function () {
  var done = false;
  ScrollTrigger.create({
    trigger: '.ph-sec',
    start: 'top 70%',
    onEnter: function () {
      if (done || prefersReducedMotion) return;
      done = true;

      gsap.to('#ph-fill', { width: '39.3%', duration: 1.5, ease: 'power2.out' });
      gsap.to('#ph-marker', {
        opacity: 1, duration: 0.4, delay: 1.2,
        ease: 'back.out(2)'
      });
    }
  });
})();

/* ===== SEC 8: NUMBERS ===== */
(function () {
  gsap.utils.toArray('.number-item').forEach(function (item, i) {
    gsap.to(item, {
      opacity: 1, y: 0, duration: 0.8, delay: i * 0.15,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.numbers-grid', start: 'top 80%' }
    });
  });

  var countersDone = false;
  ScrollTrigger.create({
    trigger: '.numbers-grid',
    start: 'top 80%',
    onEnter: function () {
      if (countersDone || prefersReducedMotion) return;
      countersDone = true;

      var counters = [
        { id: 'num-96a', target: 96 },
        { id: 'num-96b', target: 96 },
        { id: 'num-1000', target: 1000, format: true },
        { id: 'num-6', target: 6 }
      ];

      counters.forEach(function (c) {
        var el = document.getElementById(c.id);
        if (!el) return;
        var obj = { val: 0 };
        gsap.to(obj, {
          val: c.target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: function () {
            var v = Math.round(obj.val);
            el.textContent = c.format ? v.toLocaleString() : v;
          }
        });
      });
    }
  });
})();

/* ===== SEC 9: HOW TO USE ===== */
gsap.utils.toArray('.howto-step').forEach(function (step, i) {
  gsap.to(step, {
    opacity: 1, y: 0, duration: 0.8, delay: i * 0.2,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.howto-steps', start: 'top 80%' }
  });
});

/* ===== SEC 11: PURCHASE CTA ===== */
gsap.to('.purchase-bottle', {
  opacity: 1, scale: 1, duration: 1, ease: 'power2.out',
  scrollTrigger: { trigger: '.purchase-sec', start: 'top 75%' }
});

/* ===== STICKY CTA ===== */
(function () {
  var cta = document.getElementById('sticky-cta');
  var hero = document.getElementById('hero');
  var purchase = document.getElementById('purchase');
  if (!cta || !hero || !purchase) return;

  ScrollTrigger.create({
    trigger: hero,
    start: 'bottom top',
    endTrigger: purchase,
    end: 'top bottom',
    onEnter: function () { cta.classList.add('visible'); },
    onLeave: function () { cta.classList.remove('visible'); },
    onEnterBack: function () { cta.classList.add('visible'); },
    onLeaveBack: function () { cta.classList.remove('visible'); }
  });
})();
