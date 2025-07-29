document.addEventListener('DOMContentLoaded', () => {
  const BASE_URL = 'https://codealpha-tasks-3c9t.onrender.com';
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  async function fetchProduct() {
    try {
      const res = await fetch(`${BASE_URL}/api/products/${productId}`);
      const p = await res.json();

      document.getElementById('product-name').textContent = p.name;
      document.getElementById('product-img').src = p.imageUrl;
      document.getElementById('product-desc').textContent = p.description;
      document.getElementById('product-price').textContent = `₹${p.price}`;

      // Attach event listener after rendering
      document.getElementById('add-to-cart').addEventListener('click', () => {
        const product = {
          _id: productId,
          name: p.name,
          imageUrl: p.imageUrl,
          price: p.price
        };
        addToCart(product);
      });
    } catch (err) {
      console.error('Error fetching product:', err);
      alert('❌ Failed to load product details. Please try again later.');
    }
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

  fetchProduct();
});
