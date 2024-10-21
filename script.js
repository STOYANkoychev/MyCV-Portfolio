document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  const sectionLinks = document.querySelectorAll('.section-link');
  const hamburger = document.getElementById('hamburger');
  const sectionsContainer = document.getElementById('sections');

  const sections = {
    home: () => import('./Templates/home.js').then((module) => module.default(content)),
    education: () => import('./Templates/education.js').then((module) => module.default(content)),
    'professional-experience': () =>
      import('./Templates/professional-experience.js').then((module) => module.default(content)),
    skills: () => import('./Templates/skills.js').then((module) => module.default(content)),
    projects: () => import('./Templates/projects.js').then((module) => module.default(content)),
    contact: () => import('./Templates/contact.js').then((module) => module.default(content)),
  };

  function loadSectionFromHash() {
    const hash = window.location.hash.substring(1); // Премахва '#'
    if (sections[hash]) {
      sections[hash]();
    } else {
      sections.home(); // По подразбиране зареждаме "home"
    }
  }

  sectionLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const section = event.target.getAttribute('data-section');
      if (sections[section]) {
        sections[section]();
        window.location.hash = section; // Обновява URL с хеш за съответната секция

        // Скриваме секциите при клик върху линк в мобилен изглед
        sectionsContainer.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  });

  // Зареждане на секция според URL хеша
  loadSectionFromHash();

  // Следи промени в хеша на URL и зарежда съответната секция
  window.addEventListener('hashchange', loadSectionFromHash);

  // Проверка дали елементите съществуват преди да работим с тях
  if (hamburger && sectionsContainer) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      sectionsContainer.classList.toggle('active');
    });
  } else {
    console.error('Hamburger button or sections container not found.');
  }
});

function playVideo(videoId) {
  const video = document.getElementById(videoId);
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
