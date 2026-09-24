// Mobile Portfolio Script

// Projects Data
const MOBILE_PROJECTS = [
  {
    id: 1,
    title: "ZERNO & PECH — Кав'ярня",
    description: "Інтерактивний сайт для кав'ярні з онлайн-меню, кошиком та бронюванням столиків.",
    category: "ecommerce",
    tags: ["JavaScript", "Menu", "Cart"],
    image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=800&q=80",
    fullDescription: "Комерційний сайт для мережі спешелті-кав'ярень у центрі Києва. Фільтрація меню, динамічний кошик, форма бронювання столиків та блок відгуків з Google Maps.",
    demoUrl: "projects/coffee-shop/index.html"
  },
  {
    id: 2,
    title: "APEX Detailing — Детейлінг",
    description: "Преміум-сайт для студії автодетейлінгу з калькулятором вартості та слайдером До/Після.",
    category: "webapp",
    tags: ["Calculator", "Slider", "Dark UI"],
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80",
    fullDescription: "Преміальний сайт для сертифікованого центру захисту авто у Києві. Інтерактивний слайдер порівняння, калькулятор розрахунку вартості, галерея кейсів.",
    demoUrl: "projects/detailing/index.html"
  },
  {
    id: 3,
    title: "DOMA Architecture — Дизайн",
    description: "Елегантний сайт для архітектурного бюро з квізом розрахунку кошторису ремонту.",
    category: "landing",
    tags: ["Quiz", "Gallery", "Editorial"],
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80",
    fullDescription: "Сайт у стилі архітектурного глянцю для студії дизайну. Фільтрована галерея проєктів, прозорі пакети послуг, покроковий квіз розрахунку кошторису.",
    demoUrl: "projects/interior-design/index.html"
  }
];

// Mobile Menu
const menuBtn = document.getElementById('menuBtn');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const menuLinks = document.querySelectorAll('.menu-link');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
});

menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href');
    mobileMenu.classList.remove('active');

    setTimeout(() => {
      document.querySelector(target).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 300);
  });
});

// Render Projects
const projectsList = document.getElementById('projectsList');

function renderProjects() {
  projectsList.innerHTML = MOBILE_PROJECTS.map(project => `
    <div class="project-card" data-id="${project.id}">
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}">
        <span class="project-badge">${getCategoryName(project.category)}</span>
      </div>
      <div class="project-content">
        <h4 class="project-title">${project.title}</h4>
        <p class="project-desc">${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  // Add click handlers
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const projectId = parseInt(card.dataset.id);
      const project = MOBILE_PROJECTS.find(p => p.id === projectId);
      openProjectModal(project);
    });
  });
}

function getCategoryName(cat) {
  const names = {
    landing: 'Лендінг',
    webapp: 'Веб-сервіс',
    ecommerce: 'Магазин'
  };
  return names[cat] || cat;
}

// Project Modal
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalContent = document.getElementById('modalContent');

function openProjectModal(project) {
  modalContent.innerHTML = `
    <h3 class="modal-title">${project.title}</h3>
    <p class="modal-description">${project.fullDescription}</p>

    <div class="modal-preview">
      <iframe
        src="${project.demoUrl}"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
      ></iframe>
    </div>

    <div class="modal-details">
      <div class="detail-row">
        <strong>Категорія:</strong>
        <span>${getCategoryName(project.category)}</span>
      </div>
      <div class="detail-row">
        <strong>Технології:</strong>
        <span>${project.tags.join(', ')}</span>
      </div>
    </div>

    <a href="${project.demoUrl}" target="_blank" class="modal-btn">
      Відкрити повну версію ↗
    </a>
  `;

  projectModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  projectModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeProjectModal);

// Close modal on backdrop click
projectModal.addEventListener('click', (e) => {
  if (e.target === projectModal) {
    closeProjectModal();
  }
});

// Init
renderProjects();

// Smooth scroll for CTA
document.querySelector('.cta-btn').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#projects').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});
