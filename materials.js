/* =========================================================
   Teaching Materials — Filter & Reveal
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* Reveal material cards on scroll */
  const cards = document.querySelectorAll('.material-card');
  cards.forEach(card => card.classList.add('reveal'));

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  cards.forEach(card => revealObs.observe(card));

  /* Filter buttons */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sections = document.querySelectorAll('.material-section');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      sections.forEach(section => {
        if (filter === 'all') {
          section.style.display = 'block';
          section.style.opacity = '0';
          requestAnimationFrame(() => {
            section.style.transition = 'opacity 0.5s ease';
            section.style.opacity = '1';
          });
        } else {
          if (section.id === filter) {
            section.style.display = 'block';
            section.style.opacity = '0';
            requestAnimationFrame(() => {
              section.style.transition = 'opacity 0.5s ease';
              section.style.opacity = '1';
            });
            setTimeout(() => {
              section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          } else {
            section.style.display = 'none';
          }
        }
      });
    });
  });
});
