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

async function submitForm(form, successMessage) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalLabel = submitBtn ? submitBtn.textContent : null;
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';
  }

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      alert(successMessage);
      form.reset();
    } else {
      alert("Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous contacter directement.");
    }
  } catch (err) {
    alert("Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous contacter directement.");
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  }
}

function initForms() {
  const heroForm = document.getElementById('hero-form');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitForm(heroForm, 'Merci ! Nous vous recontacterons rapidement pour votre projet.');
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitForm(contactForm, 'Votre message a bien été envoyé. Notre équipe vous répondra très vite.');
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

const btnEcoles = document.getElementById('btn-tab-ecoles');
    const btnLogements = document.getElementById('btn-tab-logements');
    if (btnEcoles && btnLogements) {
      btnEcoles.addEventListener('click', () => {
        btnEcoles.classList.add('active');
        btnLogements.classList.remove('active');
      });
      btnLogements.addEventListener('click', () => {
        btnLogements.classList.add('active');
        btnEcoles.classList.remove('active');
      });
    }
