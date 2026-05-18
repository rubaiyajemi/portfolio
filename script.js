/* =========================================================
   Rubaiya Akter — Portfolio Interactions
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- Current year in footer ----- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----- Scroll progress bar ----- */
  const progressBar = document.getElementById('scrollProgress');
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';

    if (scrollTop > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    if (scrollTop > 600) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  }, { passive: true });

  /* ----- Mobile nav toggle ----- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  /* Close menu on link click */
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  /* ----- Active section highlighting ----- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveNav = () => {
    const scrollPos = window.scrollY + 140;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  };
  window.addEventListener('scroll', setActiveNav, { passive: true });

  /* ----- Back to top click ----- */
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----- Reveal on scroll (IntersectionObserver) ----- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ----- Typed tagline ----- */
  const typedTarget = document.getElementById('typedText');
  const phrases = [
    'Shaping minds, one lesson at a time.',
    'Researcher in Applied Linguistics.',
    'Curriculum designer & ELT specialist.',
    'Aspiring university professor.'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const type = () => {
    if (!typedTarget) return;
    const current = phrases[phraseIndex];
    if (!isDeleting) {
      typedTarget.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, 2200);
        return;
      }
      setTimeout(type, 65);
    } else {
      typedTarget.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 30);
    }
  };
  setTimeout(type, 1000);

  /* ----- Stat counter animation ----- */
  const statNumbers = document.querySelectorAll('.stat-number');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const isDecimal = el.dataset.decimal === 'true';
        const duration = 1800;
        const start = performance.now();

        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const value = target * eased;
          el.textContent = isDecimal ? value.toFixed(2) : Math.floor(value);
          if (t < 1) requestAnimationFrame(tick);
          else el.textContent = isDecimal ? target.toFixed(2) : target;
        };
        requestAnimationFrame(tick);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  statNumbers.forEach(el => statObserver.observe(el));

  /* ----- Hero parallax (subtle) ----- */
  const shapes = document.querySelectorAll('.floating-shape');
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    shapes.forEach((shape, i) => {
      const intensity = (i + 1) * 12;
      shape.style.transform = `translate(${x * intensity}px, ${y * intensity}px)`;
    });
  });

  /* ----- Contact form ----- */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      );
      const mailto = `mailto:rubaiyaakter347@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

      formNote.textContent = 'Opening your email client…';
      window.location.href = mailto;

      setTimeout(() => {
        formNote.textContent = 'Thank you! Your message is ready to send.';
      }, 800);
    });
  }

  /* ----- Smooth scroll for in-page anchors ----- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});
