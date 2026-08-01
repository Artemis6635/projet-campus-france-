// Liste des composants à charger, dans l'ordre d'affichage
const COMPONENTS = [
  'header',
  'hero',
  'services',
  'destinations',
  'process',
  'testimonials',
  'contact',
  'footer',
];

async function loadComponent(name) {
  const target = document.querySelector(`[data-component="${name}"]`);
  const response = await fetch(`components/${name}.html`);
  target.innerHTML = await response.text();
}

async function loadComponents() {
  await Promise.all(COMPONENTS.map(loadComponent));
}

function initBurgerMenu() {
  const burger = document.getElementById('burger');
  const navList = document.querySelector('.nav ul');

  burger.addEventListener('click', () => {
    navList.classList.toggle('open');
  });
}

function initTestimonialSlider() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonials.forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    currentTestimonial = index;
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'), 10);
      showTestimonial(index);
    });
  });

  // Auto-play toutes les 6 secondes
  setInterval(() => {
    const nextIndex = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(nextIndex);
  }, 6000);
}

function initForms() {
  document.getElementById('hero-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Merci ! Nous vous recontacterons rapidement pour votre projet.');
  });

  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Votre message a bien été envoyé. Notre équipe vous répondra très vite.');
  });
}

function initNavDemarrerButton() {
  const btnNav = document.getElementById('btn-nav-demarrer');
  if (btnNav) {
    btnNav.addEventListener('click', () => {
      document.getElementById('hero-form').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

async function init() {
  await loadComponents();
  initBurgerMenu();
  initTestimonialSlider();
  initForms();
  initNavDemarrerButton();
}

init();
