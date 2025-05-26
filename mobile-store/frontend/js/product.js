// frontend/js/product.js

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) {
    window.location.href = '404.html';
    return;
  }

  const res = await fetch(`http://localhost:3000/api/products/${productId}`);
  if (!res.ok) {
    window.location.href = '404.html';
    return;
  }

  const product = await res.json();
  renderProduct(product);
});

function renderProduct(product) {
  const container = document.getElementById('product-detail');
  container.innerHTML = `
    <img src="assets/images/${product.image}" class="product-detail__image">
    <div class="product-detail__info">
      <h2 class="product-detail__name">${product.name}</h2>
      <p class="product-detail__description">${product.description || 'No description available.'}</p>
      <p class="product-detail__price">$${product.price}</p>
      <button class="form__button" onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `;
}

async function addToCart(productId) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login to add to cart.');
    window.location.href = 'login.html';
    return;
  }

  const res = await fetch(`http://localhost:3000/api/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ productId })
  });

  if (res.ok) {
    alert('Product added to cart!');
  } else {
    const data = await res.json();
    alert(data.message || 'Failed to add to cart');
  }
}
