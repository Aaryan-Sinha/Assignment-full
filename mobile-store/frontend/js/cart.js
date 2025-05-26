// frontend/js/cart.js

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please log in first.');
    window.location.href = 'login.html';
    return;
  }

  fetch('http://localhost:3000/api/cart', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(cart => renderCart(cart))
    .catch(err => console.error('Error loading cart:', err));

  document.getElementById('place-order').addEventListener('click', placeOrder);
});

function renderCart(cart) {
  const container = document.getElementById('cart-list');
  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="assets/images/${item.image}" class="product-card__image">
      <h3 class="product-card__name">${item.name}</h3>
      <p class="product-card__price">$${item.price}</p>
    `;
    container.appendChild(div);
  });
}

function placeOrder() {
  const token = localStorage.getItem('token');
  fetch('http://localhost:3000/api/order', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(() => {
      alert('Order placed successfully!');
      window.location.href = 'order.html';
    })
    .catch(err => console.error('Order failed:', err));
}

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}
