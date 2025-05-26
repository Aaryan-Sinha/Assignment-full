// frontend/js/order.js

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login to view your orders.');
    window.location.href = 'login.html';
    return;
  }

  fetch('http://localhost:3000/api/order', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => renderOrders(data))
    .catch(err => {
      console.error('Failed to load orders', err);
      document.getElementById('order-list').innerHTML = '<p>Unable to load order history.</p>';
    });
});

function renderOrders(orders) {
  const container = document.getElementById('order-list');
  container.innerHTML = '';

  if (orders.length === 0) {
    container.innerHTML = '<p>You haven\'t placed any orders yet.</p>';
    return;
  }

  orders.forEach((order, index) => {
    const orderCard = document.createElement('div');
    orderCard.className = 'order__card';
    orderCard.innerHTML = `
      <h3 class="order__title">Order #${index + 1}</h3>
      <ul class="order__items">
        ${order.items.map(item => `
          <li>${item.name} - $${item.price}</li>
        `).join('')}
      </ul>
      <p class="order__total">Total: $${order.total}</p>
    `;
    container.appendChild(orderCard);
  });
}
