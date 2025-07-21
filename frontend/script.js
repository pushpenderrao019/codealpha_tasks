// Auto-detect environment (localhost vs production)
const BASE_URL = "https://codealphatasks-production-de11.up.railway.app";

let allProducts = [];

function displayProducts(products) {
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  products.forEach(product => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${product.name}</h3>
      <img src="${product.imageUrl}" width="150" />
      <p>₹${product.price}</p>
      <a href="product.html?id=${product._id}">View</a>
      <button class="cart-btn" onclick="addToCart('${product._id}')">Add to Cart</button>
    `;
    list.appendChild(div);
  });
}

function filterAndSortProducts() {
  const searchQuery = document.getElementById("searchInput").value.toLowerCase();
  const selectedCategory = document.getElementById("categoryFilter").value;
  const sortOption = document.getElementById("sortPrice").value;

  let filtered = allProducts;

  // Search filter
  if (searchQuery) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery));
  }

  // Category filter
  if (selectedCategory !== "All") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  // Sorting
  if (sortOption === "lowToHigh") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === "highToLow") {
    filtered.sort((a, b) => b.price - a.price);
  }

  displayProducts(filtered);
}

// Fetch all products on load
fetch(`${BASE_URL}/api/products`)
  .then(res => res.json())
  .then(products => {
    allProducts = products;
    filterAndSortProducts(); // initial display
  })
  .catch(err => {
    console.error("Error fetching products:", err);
    alert("Failed to load products. Please try again later.");
  });

// Attach event listeners
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("searchInput").addEventListener("input", filterAndSortProducts);
  document.getElementById("categoryFilter").addEventListener("change", filterAndSortProducts);
  document.getElementById("sortPrice").addEventListener("change", filterAndSortProducts);
});

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
}
