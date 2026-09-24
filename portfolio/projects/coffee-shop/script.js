// ZERNO & PECH - INTERACTIVE SCRIPT

// Cart State
let cart = [];

// DOM Elements
const cartBadge = document.getElementById('cartBadge');
const cartModal = document.getElementById('cartModal');
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotalSum = document.getElementById('cartTotalSum');
const checkoutBtn = document.getElementById('checkoutBtn');

// Menu Filter Tabs
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCards = document.querySelectorAll('.menu-card');

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    menuTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const selectedCategory = tab.dataset.tab;

    menuCards.forEach(card => {
      if (selectedCategory === 'coffee' || card.dataset.category === selectedCategory) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Cart Drawer open / close
openCartBtn.addEventListener('click', () => {
  cartModal.classList.add('active');
  document.body.style.overflow = 'hidden';
});

closeCartBtn.addEventListener('click', () => {
  cartModal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

cartModal.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Add to cart buttons
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const id = btn.dataset.id;
    const title = btn.dataset.title;
    const price = parseInt(btn.dataset.price);

    // Check if item exists in cart
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id, title, price, quantity: 1 });
    }

    updateCartUI();

    // Small bounce animation on cart button
    openCartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
      openCartBtn.style.transform = 'scale(1)';
    }, 200);
  });
});

function updateCartUI() {
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalSum = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  cartBadge.textContent = totalCount;
  cartTotalSum.textContent = `${totalSum} ₴`;

  if (cart.length === 0) {
    cartItemsList.innerHTML = '<div class="empty-cart-msg">Ваш кошик поки порожній. Оберіть смачненьке в меню!</div>';
    checkoutBtn.disabled = true;
  } else {
    checkoutBtn.disabled = false;
    cartItemsList.innerHTML = cart.map(item => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.08);">
        <div>
          <strong style="display: block; font-size: 15px;">${item.title}</strong>
          <span style="font-size: 13px; color: #888;">${item.price} ₴ × ${item.quantity}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button onclick="changeQty('${item.id}', -1)" style="width: 28px; height: 28px; border: 1px solid #ccc; background: white; border-radius: 50%; cursor: pointer;">-</button>
          <span style="font-weight: 600;">${item.quantity}</span>
          <button onclick="changeQty('${item.id}', 1)" style="width: 28px; height: 28px; border: 1px solid #ccc; background: white; border-radius: 50%; cursor: pointer;">+</button>
        </div>
      </div>
    `).join('');
  }
}

window.changeQty = function(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    updateCartUI();
  }
};

// Checkout action
checkoutBtn.addEventListener('click', () => {
  alert('Дякуємо за замовлення! Бариста вже починає готувати ваше замовлення. Час готовності: 15 хвилин.');
  cart = [];
  updateCartUI();
  cartModal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Booking Form
const bookingForm = document.getElementById('bookingForm');
const bookSuccess = document.getElementById('bookSuccess');
const openBookModalBtn = document.getElementById('openBookModalBtn');
const heroBookBtn = document.getElementById('heroBookBtn');

function scrollToBooking() {
  document.getElementById('contacts').scrollIntoView({ behavior: 'smooth' });
}

if (openBookModalBtn) openBookModalBtn.addEventListener('click', scrollToBooking);
if (heroBookBtn) heroBookBtn.addEventListener('click', scrollToBooking);

// Set default date to today
const dateInput = document.getElementById('bookDate');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;
  dateInput.min = today;
}

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    bookingForm.style.display = 'none';
    bookSuccess.style.display = 'block';
  });
}
