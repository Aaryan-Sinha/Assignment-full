document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => renderProducts(data.products))
    .catch(err => console.error('Error loading products:', err));
});

function renderProducts(products) {
  const container = document.getElementById('product-list');
  container.innerHTML = '';

  if (!Array.isArray(products)) {
    console.error('Invalid product data:', products);
    return;
  }

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.image_url}" alt="${product.name}" class="product-card__image">
      <h3 class="product-card__name">${product.name}</h3>
      <p class="product-card__price">$${product.price}</p>
    `;

    container.appendChild(card);
  });
}
