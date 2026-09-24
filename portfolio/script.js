// ==========================================
// PROJECTS DATA - РЕАЛІСТИЧНІ ПРОЄКТИ ПОРТФОЛІО
// ==========================================

const PROJECTS = [
  {
    id: 1,
    title: "ZERNO & PECH — Спешелті кав'ярня та пекарня",
    description: "Атмосферний Landing Page для ремісничої пекарні та кав'ярні у Києві з онлайн-меню, кошиком та бронюванням столиків.",
    category: "ecommerce",
    tags: ["JavaScript", "Interactive Menu", "Shopping Cart", "Google Maps Reviews"],
    image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1200&q=80",
    fullDescription: "Комерційний проєкт під ключ для мережі спешелті-кав'ярень у центрі Києва (вул. Велика Васильківська). Включає фільтрацію меню за категоріями, динамічний кошик самовивозу з підрахунком суми, форму онлайн-бронювання столиків та блок реальних відгуків з Google Maps (4.9 ★).",
    demoUrl: "projects/coffee-shop/index.html",
    codeUrl: ""
  },
  {
    id: 2,
    title: "APEX Detailing Lab — Преміальний детейлінг-центр",
    description: "Конверсійний преміум-сайт для студії автодетейлінгу та оклейки PPF з інтерактивним слайдером «До/Після» та калькулятором вартості.",
    category: "webapp",
    tags: ["Dark Luxe UI", "Before/After Slider", "Price Calculator", "Mobile First"],
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80",
    fullDescription: "Преміальний сайт для сертифікованого центру захисту авто STEK/SunTek у Києві. Створено інтерактивний слайдер порівняння полірування кузова «До/Після», багатопараметричний калькулятор розрахунку вартості за типом кузова та послугами зі знижкою 10%, каталог кейсів (Porsche 911, BMW X7, AMG GT) та швидку форму запису.",
    demoUrl: "projects/detailing/index.html",
    codeUrl: ""
  },
  {
    id: 3,
    title: "DOMA Architecture — Студія дизайну інтер'єрів",
    description: "Елегантний сайт-портфоліо для архітектурного бюро та преміального ремонту з інтерактивним квізом розрахунку кошторису.",
    category: "landing",
    tags: ["Editorial Design", "Interactive Quiz", "Cost Estimator", "Responsive"],
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80",
    fullDescription: "Сайт у стилі архітектурного глянцю AD / Elle Decoration для студії дизайну на Печерську (Київ). Містить фільтровану галерею реалізованих об'єктів (ЖК Tetris Hall, Пентхауси, Резиденція Kozyn), прозорі пакети послуг (від 950 до 2900 ₴/м²), покроковий квіз розрахунку кошторису ремонту за площею та стилем, а також презентацію команди архітекторів.",
    demoUrl: "projects/interior-design/index.html",
    codeUrl: ""
  }
];

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
  });

  // Close menu on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileToggle.innerHTML = '☰';
    });
  });
}

// ==========================================
// THEME TOGGLE (Перемикання теми)
// ==========================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Завантаження збереженої теми
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==========================================
// PORTFOLIO FILTERING (Фільтрація проєктів)
// ==========================================

const projectsGrid = document.getElementById('projectsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');

// Рендер проєктів
function renderProjects(filter = 'all') {
  if (!projectsGrid) return;

  projectsGrid.innerHTML = '';

  const filteredProjects = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(project => project.category === filter);

  if (filteredProjects.length === 0) {
    projectsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: var(--text-secondary); padding: 40px 0;">Проєкти не знайдені</p>';
    return;
  }

  filteredProjects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
      <div class="project-image">
        ${project.image
          ? `<img src="${project.image}" alt="${project.title}">`
          : `<span style="font-size: 3rem;">🌐</span>`
        }
      </div>
      <div class="project-info">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        <div style="margin-top: 16px; display: flex; gap: 8px;">
          <a href="${project.demoUrl}" target="_blank" class="btn btn-primary btn-sm" style="font-size: 13px; padding: 8px 16px; border-radius: 50px;" onclick="event.stopPropagation();">
            Відкрити сайт ↗
          </a>
        </div>
      </div>
    `;

    projectCard.addEventListener('click', () => openProjectModal(project));
    projectsGrid.appendChild(projectCard);
  });
}

// Фільтри
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    renderProjects(filter);
  });
});

// Ініціалізація
renderProjects();

// ==========================================
// PROJECT MODAL (Модальне вікно проєкту)
// ==========================================

const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openProjectModal(project) {
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <h2 class="modal-project-title" style="margin-bottom: 16px;">${project.title}</h2>
    <p class="modal-project-description" style="margin-bottom: 24px;">${project.fullDescription}</p>

    <!-- Interactive Preview -->
    <div class="project-preview-box">
      <div class="preview-toolbar">
        <span class="preview-label"><i class="fa-solid fa-eye"></i> Інтерактивний перегляд сайту</span>
        <div class="preview-actions">
          <button class="preview-btn" id="reloadIframe" title="Перезавантажити"><i class="fa-solid fa-rotate-right"></i></button>
          <a href="${project.demoUrl}" target="_blank" class="preview-btn" title="Відкрити в новій вкладці"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      </div>
      <div class="iframe-wrapper">
        <iframe
          src="${project.demoUrl}"
          id="projectIframe"
          frameborder="0"
          scrolling="yes"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms"
        ></iframe>
      </div>
    </div>

    <div class="modal-project-details">
      <div class="modal-detail-item">
        <strong>Категорія:</strong>
        <span>${getCategoryName(project.category)}</span>
      </div>
      <div class="modal-detail-item">
        <strong>Технології:</strong>
        <span>${project.tags.join(', ')}</span>
      </div>
    </div>
  `;

  // Reload iframe button
  const reloadBtn = document.getElementById('reloadIframe');
  const iframe = document.getElementById('projectIframe');
  if (reloadBtn && iframe) {
    reloadBtn.addEventListener('click', () => {
      iframe.src = iframe.src;
    });
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

if (modalClose) modalClose.addEventListener('click', closeProjectModal);
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });
}

// Закриття по Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
    closeProjectModal();
  }
});

// Допоміжна функція для категорії
function getCategoryName(category) {
  const categories = {
    landing: 'Лендінг / Промо',
    webapp: 'Веб-сервіс & Калькулятор',
    ecommerce: 'Інтернет-магазин & Меню',
    corporate: 'Корпоративний сайт'
  };
  return categories[category] || category;
}
