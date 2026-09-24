// DOMA Architecture - Interactive Script

// Project Category Filtering
const filterTags = document.querySelectorAll('.filter-tag');
const projectCards = document.querySelectorAll('.project-card');

filterTags.forEach(tag => {
  tag.addEventListener('click', () => {
    filterTags.forEach(t => t.classList.remove('active'));
    tag.classList.add('active');

    const filter = tag.dataset.filter;

    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Quiz Calculator
let currentStep = 1;
const totalSteps = 3;

const q1 = document.getElementById('q1');
const q2 = document.getElementById('q2');
const q3 = document.getElementById('q3');
const quizResult = document.getElementById('quizResult');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const areaSlider = document.getElementById('areaSlider');
const areaValue = document.getElementById('areaValue');
const resultAmount = document.getElementById('resultAmount');

if (areaSlider && areaValue) {
  areaSlider.addEventListener('input', (e) => {
    areaValue.textContent = e.target.value;
  });
}

function showStep(step) {
  [q1, q2, q3, quizResult].forEach(el => {
    if (el) el.style.display = 'none';
  });

  if (step === 1) {
    q1.style.display = 'block';
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'block';
    nextBtn.textContent = 'Далі';
  } else if (step === 2) {
    q2.style.display = 'block';
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
    nextBtn.textContent = 'Далі';
  } else if (step === 3) {
    q3.style.display = 'block';
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
    nextBtn.textContent = 'Розрахувати кошторис';
  } else if (step === 4) {
    quizResult.style.display = 'block';
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'none';

    // Calculate result
    const area = parseInt(areaSlider.value);
    const pricePerMeter = 1850;
    const total = area * pricePerMeter;
    resultAmount.textContent = `${total.toLocaleString('uk-UA')} ₴`;
  }
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (currentStep < 4) {
      currentStep++;
      showStep(currentStep);
    }
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
    }
  });
}

const quizSubmitBtn = document.getElementById('quizSubmitBtn');
if (quizSubmitBtn) {
  quizSubmitBtn.addEventListener('click', () => {
    const name = document.getElementById('quizName').value;
    const phone = document.getElementById('quizPhone').value;
    if (name && phone) {
      alert(`Дякуємо, ${name}! Детальний кошторис та приклад креслень надіслано в Telegram за номером ${phone}`);
    } else {
      alert('Будь ласка, заповніть ім\'я та номер телефону');
    }
  });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
const formSuccessMsg = document.getElementById('formSuccessMsg');

if (contactForm && formSuccessMsg) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactForm.style.display = 'none';
    formSuccessMsg.style.display = 'block';
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
