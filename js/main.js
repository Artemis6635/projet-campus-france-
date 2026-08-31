async function loadComponents() {
  const targets = document.querySelectorAll('[data-component]');
  await Promise.all(
    Array.from(targets).map(async (target) => {
      const response = await fetch(`components/${target.dataset.component}.html`);
      target.innerHTML = await response.text();
    })
  );
}

function initBurgerMenu() {
  const burger = document.getElementById('burger');
  const navList = document.querySelector('.nav ul');

  burger.addEventListener('click', () => {
    navList.classList.toggle('open');
  });
}

function initForms() {
  const heroForm = document.getElementById('hero-form');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Merci ! Nous vous recontacterons rapidement pour votre projet.');
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Votre message a bien été envoyé. Notre équipe vous répondra très vite.');
    });
  }
}

function initNavDemarrerButton() {
  const btnNav = document.getElementById('btn-nav-demarrer');
  if (btnNav) {
    btnNav.addEventListener('click', () => {
      const heroForm = document.getElementById('hero-form');
      if (heroForm) {
        heroForm.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = 'index.html#hero-form';
      }
    });
  }
}

function scrollToHashTarget() {
  if (!location.hash) return;
  const target = document.getElementById(location.hash.slice(1));
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

function initActiveNavLink() {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach((link) => {
    const linkPage = link.getAttribute('href').split('#')[0];
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}

async function init() {
  await loadComponents();
  initBurgerMenu();
  initForms();
  initNavDemarrerButton();
  initActiveNavLink();
  scrollToHashTarget();
}

init();
