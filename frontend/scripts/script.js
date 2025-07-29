document.addEventListener('DOMContentLoaded', () => {
  const BASE_URL = 'https://codealpha-tasks-3c9t.onrender.com';
  const container = document.getElementById('products');

  async function fetchProducts() {
    const res = await fetch(`${BASE_URL}/api/products`);
    const products = await res.json();

    products.forEach(p => {
      const div = document.createElement('div');
      div.className = 'product';

      div.innerHTML = `
        <a href="product.html?id=${p._id}">
          <img src="${p.imageUrl}" alt="${p.name}">
          <h3>${p.name}</h3>
        </a>
        <strong>₹${p.price}</strong>
        <button class="btn add-to-cart" data-id='${p._id}'>Add to Cart</button>
      `;

      container.appendChild(div);
    });

    // Attach event listeners after rendering
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', event => {
        const productId = event.target.dataset.id;
        const product = products.find(p => p._id === productId);
        addToCart(product);
      });
    });
  }

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const index = cart.findIndex(p => p._id === product._id);
    if (index > -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart`);
  }

  fetchProducts();
});
