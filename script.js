// === Drawer Menu ===
const menuBtn = document.querySelector(".icon-btn");
const drawer = document.querySelector(".drawer");
if (menuBtn && drawer) {
  menuBtn.addEventListener("click", () => {
    const hidden = drawer.getAttribute("aria-hidden") === "true";
    drawer.setAttribute("aria-hidden", hidden ? "false" : "true");
  });
}

// === Toast Notification ===
function showToast(message, type = "success") {
  // remove old toast if any
  const oldToast = document.querySelector(".toast");
  if (oldToast) oldToast.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  if (type === "warn") toast.classList.add("warn");
  if (type === "danger") toast.classList.add("danger");

  toast.innerHTML = `<span>${message}</span>`;
  document.body.appendChild(toast);

  // auto remove after 3s
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// === Add to Cart Buttons ===
document.querySelectorAll(".product-card button").forEach(btn => {
  btn.addEventListener("click", () => {
    const productName = btn.closest(".product-card").querySelector("h4").innerText;
    showToast(`${productName} added to cart 🛒`);
  });
});

// === CTA Scroll ===
const ctaBtn = document.querySelector(".cta .join-btn");
if (ctaBtn) {
  ctaBtn.addEventListener("click", () => {
    const products = document.querySelector("#products");
    if (products) {
      products.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// === Welcome Notes Animation ===
window.addEventListener("DOMContentLoaded", () => {
  const notes = document.querySelectorAll(".welcome-notes li");
  notes.forEach((note, i) => {
    note.style.opacity = "0";
    note.style.transform = "translateY(10px)";
    setTimeout(() => {
      note.style.transition = "all .5s ease";
      note.style.opacity = "1";
      note.style.transform = "translateY(0)";
    }, i * 200);
  });
});

// // === Notifications ===
// const notifyBell = document.getElementById("notifyBell");
// const notifDot = document.getElementById("notifDot");

// let notifications = [
//   "Your order of Tomatoes has been confirmed ✅",
//   "New message from Farmer John 💬",
//   "Order #1023 is ready for pickup 🚜",
// ];

// function showNotifications() {
//   if (!notifications.length) {
//     showToast("No new notifications 📭", "warn");
//     return;
//   }

//   // Build simple modal content
//   const notifModal = document.getElementById("notifModal");
//   notifModal.innerHTML = `
//     <div class="content">
//       <h3>Notifications</h3>
//       <ul style="list-style:none; padding:0; margin:1rem 0;">
//         ${notifications.map(n => `<li style="margin-bottom:.6rem;">🔔 ${n}</li>`).join("")}
//       </ul>
//       <button id="clearNotifs" class="btn small secondary">Clear</button>
//     </div>
//   `;
//   notifModal.showModal();

//   notifDot.hidden = true; // clear red dot when opened

//   // Clear button
//   document.getElementById("clearNotifs").onclick = () => {
//     notifications = [];
//     notifModal.close();
//     showToast("Notifications cleared ✔️");
//   };
// }

// if (notifyBell) {
//   notifyBell.addEventListener("click", showNotifications);
//   // show red dot if notifications exist
//   if (notifications.length) notifDot.hidden = false;
// }

// // === Logout ===
// const logoutBtn = document.getElementById("logoutBtn");

// function simulateLogin() {
//   // Fake login: show logout & dashboards
//   logoutBtn.hidden = false;
//   document.querySelectorAll(".authed-only").forEach(el => el.hidden = false);
// }

// function logout() {
//   logoutBtn.hidden = true;
//   document.querySelectorAll(".authed-only").forEach(el => el.hidden = true);
//   showToast("You have logged out 🚪", "warn");
// }

// if (logoutBtn) {
//   logoutBtn.addEventListener("click", logout);
// }

// // Simulate that user is logged in when page loads
// window.addEventListener("DOMContentLoaded", simulateLogin);


// === Elements ===
const logoutBtn = document.getElementById("logoutBtn");
const loginModal = document.getElementById("loginModal");
const loginSubmit = document.getElementById("loginSubmit");

let currentUser = null; // { name, role }

// === Show Login Modal if not logged in ===
function ensureLogin() {
  if (!currentUser) {
    loginModal.showModal();
  }
}

// === Apply Role Permissions ===
function applyRoleUI(role) {
  document.querySelectorAll(".only-farmer").forEach(el => el.style.display = role === "farmer" ? "" : "none");
  document.querySelectorAll(".only-buyer").forEach(el => el.style.display = role === "buyer" ? "" : "none");
  document.querySelectorAll(".only-admin").forEach(el => el.style.display = role === "admin" ? "" : "none");

  // show generic authed items
  document.querySelectorAll(".authed-only").forEach(el => el.style.display = "");
}

// === Login Handler ===
if (loginSubmit) {
  loginSubmit.addEventListener("click", () => {
    const name = document.getElementById("loginName").value.trim();
    const role = document.getElementById("loginRole").value;

    if (!name) {
      showToast("Please enter a name ❗", "warn");
      return;
    }

    currentUser = { name, role };
    loginModal.close();

    // Show logout button
    logoutBtn.hidden = false;

    // Apply role
    applyRoleUI(role);

    showToast(`${name} logged in as ${role.toUpperCase()} ✔️`);
  });
}

// === Logout Handler ===
function logout() {
  currentUser = null;
  logoutBtn.hidden = true;

  // Hide all role-based menus
  document.querySelectorAll(".only-farmer, .only-buyer, .only-admin, .authed-only")
    .forEach(el => el.style.display = "none");

  showToast("You have logged out 🚪", "warn");

  // Show login modal again
  setTimeout(() => ensureLogin(), 500);
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}

// === On Page Load ===
window.addEventListener("DOMContentLoaded", () => {
  // Hide all menus by default
  document.querySelectorAll(".only-farmer, .only-buyer, .only-admin, .authed-only")
    .forEach(el => el.style.display = "none");

  ensureLogin(); // force login
});

const userInfo = document.getElementById("userInfo");

// === Apply Role Permissions ===
function applyRoleUI(role, name) {
  document.querySelectorAll(".only-farmer").forEach(el => el.style.display = role === "farmer" ? "" : "none");
  document.querySelectorAll(".only-buyer").forEach(el => el.style.display = role === "buyer" ? "" : "none");
  document.querySelectorAll(".only-admin").forEach(el => el.style.display = role === "admin" ? "" : "none");

  // show generic authed items
  document.querySelectorAll(".authed-only").forEach(el => el.style.display = "");

  // update topbar user info
  if (userInfo) {
    userInfo.textContent = `Hi, ${name} (${role}) 👋`;
    userInfo.hidden = false;
  }
}

// === Login Handler ===
if (loginSubmit) {
  loginSubmit.addEventListener("click", () => {
    const name = document.getElementById("loginName").value.trim();
    const role = document.getElementById("loginRole").value;

    if (!name) {
      showToast("Please enter a name ❗", "warn");
      return;
    }

    currentUser = { name, role };
    loginModal.close();

    logoutBtn.hidden = false;

    applyRoleUI(role, name);

    showToast(`${name} logged in as ${role.toUpperCase()} ✔️`);
  });
}

// === Logout Handler ===
function logout() {
  currentUser = null;
  logoutBtn.hidden = true;
  userInfo.hidden = true;

  document.querySelectorAll(".only-farmer, .only-buyer, .only-admin, .authed-only")
    .forEach(el => el.style.display = "none");

  showToast("You have logged out 🚪", "warn");

  setTimeout(() => ensureLogin(), 500);
}

// // === CART SYSTEM ===
// const cartBtn = document.getElementById("cartBtn");
// const cartCount = document.getElementById("cartCount");
// const cartModal = document.getElementById("cartModal");

// let cart = [];

// function addToCart(product) {
//   cart.push(product);
//   updateCartUI();
//   showToast(`${product.title} added to cart ✔️`);
// }

// function updateCartUI() {
//   if (cart.length > 0) {
//     cartCount.hidden = false;
//     cartCount.textContent = cart.length;
//   } else {
//     cartCount.hidden = true;
//   }
// }

// function showCart() {
//   if (!cart.length) {
//     cartModal.innerHTML = `<div class="content"><h3>Your Cart</h3><p>No items in cart 🛒</p></div>`;
//     cartModal.showModal();
//     return;
//   }

//   cartModal.innerHTML = `
//     <div class="content">
//       <h3>Your Cart</h3>
//       <ul style="list-style:none; padding:0; margin:1rem 0;">
//         ${cart
//           .map(
//             (item, i) => `
//           <li class="card" style="margin-bottom:.6rem;">
//             <img src="${item.img}" alt="${item.title}" class="product-img" />
//             <div><b>${item.title}</b> - <span class="price">$${item.price}</span></div>
//             <button class="btn small danger" onclick="removeFromCart(${i})">Remove</button>
//           </li>
//         `
//           )
//           .join("")}
//       </ul>
//       <button id="checkoutBtn" class="btn">Checkout</button>
//     </div>
//   `;
//   cartModal.showModal();

//   document.getElementById("checkoutBtn").onclick = () => {
//     showToast("Order placed successfully ✔️");
//     cart = [];
//     updateCartUI();
//     cartModal.close();
//   };
// }

// function removeFromCart(index) {
//   cart.splice(index, 1);
//   updateCartUI();
//   cartModal.close();
//   showCart(); // reopen with updated list
// }

// if (cartBtn) {
//   cartBtn.addEventListener("click", showCart);
// }

// // Show cart icon for buyers
// document.getElementById("cartBtn").hidden = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const cartBtn = document.getElementById("cartBtn");
//   const cartCount = document.getElementById("cartCount");
//   let cart = [];

//   // === BUY BUTTONS ===
//    // === BUY BUTTONS (New Version) ===
//   document.addEventListener("click", (e) => {
//     if (e.target.classList.contains("buyBtn")) {
//       const card = e.target.closest(".product-card");
//       const productName = e.target.dataset.title || card.querySelector("h4").textContent;
//       const productPrice = card.querySelector("p").textContent;
//       const productImg = card.querySelector("img").src;

//       // Add product to cart
//       cart.push({ name: productName, price: productPrice, img: productImg });

//       // Update count
//       cartCount.textContent = cart.length;
//       cartCount.hidden = false;

//       alert(`${productName} added to cart!`);
//     }
//   });

//   // === CART MODAL ===
//   cartBtn.addEventListener("click", () => {
//     if (cart.length === 0) {
//       alert("Your cart is empty.");
//       return;
//     }

//     let cartItems = cart.map(
//       (item, i) => `${i + 1}. ${item.name} - ${item.price}`
//     ).join("\n");

//     alert("🛒 Your Cart:\n\n" + cartItems);
//   });


//       // Update badge count
//       cartCount.textContent = cart.length;
//       cartCount.hidden = cart.length === 0;

//       console.log("🛒 Cart updated:", cart);
//     }
//   });

//   // === CART MODAL ===
//   if (cartBtn) {
//     cartBtn.addEventListener("click", () => {
//       const cartModal = document.createElement("dialog");
//       cartModal.classList.add("modal");

//       let html = `<div class="content"><h2>🛒 Your Cart</h2>`;
//       if (cart.length === 0) {
//         html += `<p>Your cart is empty.</p>`;
//       } else {
//         html += `<ul>`;
//         cart.forEach((item, i) => {
//           html += `<li>${i + 1}. ${item}</li>`;
//         });
//         html += `</ul>`;
//       }
//       html += `<button class="btn" id="closeCartBtn">Close</button></div>`;

//       cartModal.innerHTML = html;
//       document.body.appendChild(cartModal);
//       cartModal.showModal();

//       cartModal.querySelector("#closeCartBtn").addEventListener("click", () => {
//         cartModal.close();
//         cartModal.remove();
//       });
//     });
//   }
// });


document.addEventListener("DOMContentLoaded", () => {
  // ==============================
  // ROLE POPUP (Farmer / Buyer / Admin)
  // ==============================
  let userRole = null;

  const showRolePopup = () => {
    const popup = document.createElement("div");
    popup.id = "rolePopup";
    popup.style.position = "fixed";
    popup.style.top = "0";
    popup.style.left = "0";
    popup.style.width = "100%";
    popup.style.height = "100%";
    popup.style.background = "rgba(0,0,0,0.5)";
    popup.style.display = "flex";
    popup.style.alignItems = "center";
    popup.style.justifyContent = "center";
    popup.style.zIndex = "1000";

    popup.innerHTML = `
      <div style="background:white; padding:20px; border-radius:12px; text-align:center; width:300px;">
        <h3>Select Role</h3>
        <button class="btn" id="farmerRole">👨‍🌾 Farmer</button>
        <button class="btn" id="buyerRole">🛒 Buyer</button>
        <button class="btn" id="adminRole">🛡️ Admin</button>
      </div>
    `;

    document.body.appendChild(popup);

    document.getElementById("farmerRole").addEventListener("click", () => setRole("farmer"));
    document.getElementById("buyerRole").addEventListener("click", () => setRole("buyer"));
    document.getElementById("adminRole").addEventListener("click", () => setRole("admin"));
  };

  const setRole = (role) => {
    userRole = role;
    document.body.classList.add(`role-${role}`);
    localStorage.setItem("userRole", role);

    document.getElementById("rolePopup").remove();

    // Show/hide UI based on role
    document.querySelectorAll(".only-farmer").forEach(el => el.hidden = role !== "farmer");
    document.querySelectorAll(".only-buyer").forEach(el => el.hidden = role !== "buyer");
    document.querySelectorAll(".only-admin").forEach(el => el.hidden = role !== "admin");
    document.querySelectorAll(".authed-only").forEach(el => el.hidden = false);

    // Cart is only for buyer
    document.getElementById("cartBtn").hidden = role !== "buyer";
    document.getElementById("logoutBtn").hidden = false;
  };

  // Restore role if previously chosen
  const savedRole = localStorage.getItem("userRole");
  if (savedRole) {
    setRole(savedRole);
  } else {
    showRolePopup();
  }

  // ==============================
  // LOGOUT
  // ==============================
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("userRole");
    location.reload();
  });

  // ==============================
  // NOTIFICATIONS
  // ==============================
  const notifyBell = document.getElementById("notifyBell");
  const notifDot = document.getElementById("notifDot");

  notifyBell.addEventListener("click", () => {
    notifDot.hidden = true;
    alert("You have no new notifications ✅");
  });

  // Example: trigger notification after 5s
  setTimeout(() => {
    notifDot.hidden = false;
  }, 5000);

  // ==============================
  // CART SYSTEM (Buyer only)
  // ==============================
  const cartBtn = document.getElementById("cartBtn");
  const cartCount = document.getElementById("cartCount");
  let cart = [];

  // BUY button click
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("buyBtn")) {
      const card = e.target.closest(".product-card");
      const productName = e.target.dataset.title || card.querySelector("h4").textContent;
      const productPrice = card.querySelector("p").textContent;
      const productImg = card.querySelector("img").src;

      // Check if item already exists in cart
      const existing = cart.find(item => item.name === productName);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ name: productName, price: productPrice, img: productImg, qty: 1 });
      }

      updateCartUI();
    }
  });

  // Update cart counter
  const updateCartUI = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = totalItems;
    cartCount.hidden = totalItems === 0;
  };

  // Render cart modal
  const renderCart = () => {
    let cartHtml = `<h3>Your Cart</h3>`;
    cart.forEach((item, index) => {
      cartHtml += `
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px; justify-content:space-between;">
          <img src="${item.img}" alt="${item.name}" style="width:50px; height:50px; border-radius:6px; object-fit:cover;">
          <div style="flex:1;">
            <strong>${item.name}</strong><br>
            ${item.price} × ${item.qty}
          </div>
          <div style="display:flex; gap:5px; align-items:center;">
            <button class="btn small qtyBtn" data-action="decrease" data-index="${index}">➖</button>
            <span>${item.qty}</span>
            <button class="btn small qtyBtn" data-action="increase" data-index="${index}">➕</button>
          </div>
          <button class="btn danger small removeBtn" data-index="${index}">❌</button>
        </div>
      `;
    });

    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.background = "rgba(0,0,0,0.6)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "2000";

    modal.innerHTML = `
      <div style="background:white; padding:20px; border-radius:12px; width:350px; max-height:80vh; overflow:auto;">
        ${cartHtml}
        <button class="btn" id="closeCart">Close</button>
      </div>
    `;

    document.body.appendChild(modal);

    // Close modal
    document.getElementById("closeCart").addEventListener("click", () => modal.remove());

    // Quantity buttons
    modal.querySelectorAll(".qtyBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        const action = btn.dataset.action;

        if (action === "increase") {
          cart[index].qty += 1;
        } else if (action === "decrease") {
          cart[index].qty -= 1;
          if (cart[index].qty <= 0) {
            cart.splice(index, 1); // remove item
          }
        }

        modal.remove();
        updateCartUI();
        if (cart.length > 0) cartBtn.click(); // reopen updated cart
      });
    });

    // Remove item buttons
    modal.querySelectorAll(".removeBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        cart.splice(index, 1);
        modal.remove();
        updateCartUI();
        if (cart.length > 0) cartBtn.click(); // reopen updated cart
      });
    });
  };

  // Show cart when clicked
  cartBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty 🛒");
      return;
    }
    renderCart();
  });
});


// Dummy data for product listings
const listings = [
  { product: "Tomatoes", stock: 8, price: 2.5 },
  { product: "Potatoes", stock: 50, price: 1.2 },
  { product: "Carrots", stock: 30, price: 1.8 },
];

// Populate listings table
function loadListings() {
  const tableBody = document.getElementById("listingTableBody");
  tableBody.innerHTML = "";
  listings.forEach(item => {
    const row = `<tr>
      <td>${item.product}</td>
      <td>${item.stock}</td>
      <td>$${item.price}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

// Quick action handlers
function addProduct() {
  alert("➕ Add product form coming soon!");
}
function manageInventory() {
  alert("📦 Inventory management panel coming soon!");
}

// Chart.js Sales Overview
function loadSalesChart() {
  const ctx = document.getElementById("salesChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [{
        label: "Sales ($)",
        data: [500, 800, 600, 1200, 900],
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.2)",
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } }
    }
  });
}

// Initialize dashboard
window.onload = () => {
  loadListings();
  loadSalesChart();
};

const closeBtn = document.getElementById('closeDrawer');

closeBtn.addEventListener('click', () => {
  drawer.setAttribute('aria-hidden', 'true');
});


// Router: handle sidebar navigation
document.querySelectorAll('.menu a[data-route]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    // 1. Remove active class from all links
    document.querySelectorAll('.menu a').forEach(a => a.classList.remove('active'));

    // 2. Add active class to clicked link
    link.classList.add('active');

    // 3. Hide all pages
    document.querySelectorAll('main .page').forEach(page => page.hidden = true);

    // 4. Show the target page
    const targetId = link.getAttribute('data-route');
    const targetPage = document.getElementById(targetId);
    if (targetPage) targetPage.hidden = false;
  });
});


// --- Auto-generate Chart Data from Orders ---
function getOrdersData() {
  const rows = document.querySelectorAll('#orders tbody tr');
  const products = {};
  const sales = [];

  rows.forEach((row, index) => {
    const cells = row.querySelectorAll('td');
    const product = cells[1].innerText;
    const qtyText = cells[2].innerText.replace(/[^0-9.]/g, ''); // strip kg
    const qty = parseFloat(qtyText) || 0;
    const totalText = cells[3].innerText.replace(/[^0-9.]/g, '');
    const total = parseFloat(totalText) || 0;

    // Sum quantities by product
    products[product] = (products[product] || 0) + qty;

    // Collect totals in order sequence
    sales.push({ order: index + 1, total });
  });

  return { products, sales };
}

// --- Build Charts ---
function renderCharts() {
  const { products, sales } = getOrdersData();

  // ✅ Production Report (Bar chart: product vs qty)
  const prodCanvas = document.getElementById('productionChart');
  if (prodCanvas) {
    new Chart(prodCanvas, {
      type: 'bar',
      data: {
        labels: Object.keys(products),
        datasets: [{
          label: 'Harvest (kg)',
          data: Object.values(products),
          backgroundColor: '#3ecf8e'
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  // ✅ Sales Overview (Line chart: order vs total)
  const salesCanvas = document.getElementById('salesChart');
  if (salesCanvas) {
    new Chart(salesCanvas, {
      type: 'line',
      data: {
        labels: sales.map(s => "Order " + s.order),
        datasets: [{
          label: 'Sales ($)',
          data: sales.map(s => s.total),
          borderColor: '#0b3d2e',
          backgroundColor: 'rgba(11,61,46,0.2)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'top' } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}

// Run charts after DOM loads
document.addEventListener('DOMContentLoaded', renderCharts);







