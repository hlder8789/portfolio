// APEX DETAILING LAB - Interactive Script

// Calculator Logic
const bodyCards = document.querySelectorAll('.body-card');
const calcCheckboxes = document.querySelectorAll('.calc-checkbox');
const calcTotalPrice = document.getElementById('calcTotalPrice');
const calcSendBtn = document.getElementById('calcSendBtn');

let selectedMultiplier = 1.0;
let baseTotal = 0;

// Body type selection
bodyCards.forEach(card => {
  card.addEventListener('click', () => {
    bodyCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    selectedMultiplier = parseFloat(card.dataset.multiplier);
    updateCalcTotal();
  });
});

// Service checkboxes
calcCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', updateCalcTotal);
});

function updateCalcTotal() {
  baseTotal = 0;
  calcCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      baseTotal += parseInt(checkbox.value);
    }
  });

  const finalTotal = Math.round(baseTotal * selectedMultiplier);
  calcTotalPrice.textContent = `${finalTotal.toLocaleString('uk-UA')} ₴`;
}

updateCalcTotal(); // Initial calculation

// Calculator form submit
if (calcSendBtn) {
  calcSendBtn.addEventListener('click', () => {
    const phoneInput = document.getElementById('calcPhone');
    if (phoneInput && phoneInput.value.trim()) {
      alert(`Дякуємо! Ваша заявка прийнята. Знижка 10% зафіксована. Ми зателефонуємо вам протягом 10 хвилин на номер ${phoneInput.value}`);
      phoneInput.value = '';
    } else {
      alert('Будь ласка, вкажіть номер телефону');
    }
  });
}

// Before/After Slider
const baSlider = document.getElementById('baSlider');
const baAfter = document.getElementById('baAfter');
const baHandle = document.getElementById('baHandle');

if (baSlider && baAfter && baHandle) {
  let isDragging = false;

  function updateSlider(clientX) {
    const rect = baSlider.getBoundingClientRect();
    let x = clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const percentage = (x / rect.width) * 100;

    baAfter.style.width = `${percentage}%`;
    baHandle.style.left = `${percentage}%`;
  }

  // Mouse events
  baSlider.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      updateSlider(e.clientX);
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch events
  baSlider.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  });

  baSlider.addEventListener('touchmove', (e) => {
    if (isDragging) {
      e.preventDefault();
      updateSlider(e.touches[0].clientX);
    }
  });

  baSlider.addEventListener('touchend', () => {
    isDragging = false;
  });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const carModel = document.getElementById('carModel').value;
    const clientName = document.getElementById('clientName').value;
    const clientPhone = document.getElementById('clientPhone').value;

    // Hide form, show success
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';

    console.log('Booking submitted:', { carModel, clientName, clientPhone });
  });
}

// Smooth scroll for header links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
  } else {
    header.style.boxShadow = 'none';
  }
});
