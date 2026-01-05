document.addEventListener('DOMContentLoaded', () => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));




  const typingEl = $('.typing');
  if (typingEl) {
    const phrases = [
  "Frontend Developer",
  "React Developer",
  "Internship Completed @ Internee.pk",
  "UI / UX Enthusiast"
    ];
    let i = 0, j = 0, deleting = false;

    function type() {
      const word = phrases[i];
      if (!deleting) {
        typingEl.textContent = word.slice(0, j++);
        if (j > word.length) {
          deleting = true;
          setTimeout(type, 1200);
          return;
        }
      } else {
        typingEl.textContent = word.slice(0, j--);
        if (j < 0) {
          deleting = false;
          i = (i + 1) % phrases.length;
        }
      }
      setTimeout(type, deleting ? 60 : 120);
    }
    type();
  }


  const revealEls = $$('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
  }

  
  const skillBars = $$('.progress');
  skillBars.forEach(bar => {
    const span = bar.querySelector('span');
    const value = bar.dataset.value;
    span.style.width = '0';
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let width = 0;
          const animate = setInterval(() => {
            if (width >= value) clearInterval(animate);
            span.style.width = width + '%';
            width++;
          }, 12);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(bar);
  });


  const projectModal = $('#projectModal');
  const modalTitle = $('#modalTitle');
  const modalTech = $('#modalTech');
  const modalDesc = $('#modalDesc');
  const modalLive = $('#modalLive');
  const modalGit = $('#modalGit');

  document.addEventListener('click', e => {
    const card = e.target.closest('.project-card');
    if (card) {
      modalTitle.textContent = card.dataset.title;
      modalTech.textContent = card.dataset.tech;
      modalDesc.textContent = card.dataset.desc;
      modalLive.href = card.dataset.live;
      modalGit.href = card.dataset.github;
      projectModal.setAttribute('aria-hidden', 'false');
    }

    if (e.target.matches('.modal-close') || e.target === projectModal) {
      projectModal.setAttribute('aria-hidden', 'true');
    }
  });


  const lightbox = $('#lightbox');
  const lightboxImg = $('#lightboxImg');
  const certCards = $$('.certificate-card');

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      lightboxImg.src = card.dataset.img;
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  lightbox.addEventListener('click', e => {
    if (e.target.matches('.modal-close') || e.target === lightbox) {
      lightbox.setAttribute('aria-hidden', 'true');
    }
  });

 
  window.scrollToProjects = () => {
    const projectsSection = $('#projects');
    projectsSection.scrollIntoView({ behavior: 'smooth' });
  };
});
// Scroll Reveal (cinematic)
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.88;

  reveals.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();
