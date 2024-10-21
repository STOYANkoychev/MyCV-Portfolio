document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  const sectionLinks = document.querySelectorAll('.section-link');

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
      }
    });
  });

  // Зареждане на секция според URL хеша
  loadSectionFromHash();

  // Следи промени в хеша на URL и зарежда съответната секция
  window.addEventListener('hashchange', loadSectionFromHash);
});

function playVideo(videoId) {
  const video = document.getElementById(videoId);
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
