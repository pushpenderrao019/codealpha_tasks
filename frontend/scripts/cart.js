const BASE_URL = "https://codealpha-tasks-3c9t.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty</p>";
  } else {
    cart.forEach((item) => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price} x ${item.quantity}</p>
      `;
      container.appendChild(div);
      total += item.price * item.quantity;
    });
  }

  document.getElementById("cart-total").textContent = total.toFixed(2);
});

function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please log in to place an order.");
    window.location.href = "login.html";
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const order = {
    userId,
    cart,
  };

  fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Order placed successfully") {
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
      } else {
        alert("Failed to place order: " + (data.error || "Unknown error"));
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Error placing order.");
    });
}