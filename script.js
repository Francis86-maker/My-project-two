<script>

const letters = document.querySelectorAll("span");
letters.forEach((letter) => {
  letter.addEventListener("mouseover", () => {
    letter.style.transform = "translateY(-10px)";
    setTimeout(() => {
      letter.style.transform = "translateY(0)";
    }, 300);
  });
});

// Slide show
let currentSlide = 0;
const Slides = document.querySelectorAll('.slide');

function showSlide(index) {
  Slides.forEach((slide) => slide.classList.remove('active'));
  Slides[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % Slides.length;
  showSlide(currentSlide);
}

showSlide(currentSlide);
setInterval(nextSlide, 3000);

// Toggle form visibility
function toggleForm(id) {
  const form = document.getElementById(id);
  const currentDisplay = window.getComputedStyle(form).display;
  form.style.display = currentDisplay === 'none' ? 'block' : 'none';
}

// Register form
const registerForm = document.getElementById('registerForm');
registerForm?.addEventListener('submit', async function(event) {
  event.preventDefault();
  const username = document.getElementById('registerUsername').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  try {
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, email, password})
    });
    const result = await response.json();
    if (response.ok) {
      console.log('Success:', result);
    } else {
      console.error('Error:', result.message);
    }
  } catch(err) {
    console.error('Network or server error:', err);
  }
});

// Login form
const loginForm = document.getElementById('loginForm');
loginForm?.addEventListener('submit', async function(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    });
    const result = await response.json();
    if (response.ok) {
      console.log('Success:', result);
    } else {
      console.error('Error:', result.message);
    }
  } catch(err) {
    console.error('Network or server error:', err);
  }
});

// Admin login form
const adminLoginForm = document.getElementById('adminLoginForm');
adminLoginForm?.addEventListener('submit', async function(event) {
  event.preventDefault();
  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;

  try {
    const response = await fetch('http://localhost:4000/admin/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    });
    const result = await response.json();
    if (response.ok) {
      console.log('Success:', result);
    } else {
      console.error('Error:', result.message);
    }
  } catch(err) {
    console.error('Network or server error:', err);
  }
});

// Admin dashboard fetching
async function fetchDashboard(endpoint) {
  const token = localStorage.getItem("adminToken");
  const response = await fetch(`http://localhost:4000/admin/${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return await response.json();
}

// Load users in admin dashboard
async function loadUsers() {
  const users = await fetchDashboard("users");
  const tbody = document.querySelector("#usersTabletbody");
  tbody.innerHTML = "";
  users.forEach(user => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${user.id}</td><td>${user.username}</td><td>${user.email}</td>`;
    tbody.appendChild(tr);
  });
}

// Load products in admin dashboard
async function loadProducts() {
  const products = await fetchDashboard("products");
  const tbody = document.querySelector("#productsTabletbody");
  tbody.innerHTML = "";
  products.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.price}</td>
      <td><button onclick="editProduct(${p.id}, '${p.name}', ${p.price})">Edit</button>
      <button onclick="deleteProduct(${p.id})">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
}

loadUsers();
loadProducts();

// Add product
const addProductForm = document.getElementById('addProductForm');
addProductForm?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const productName = document.getElementById('productName').value;
  const productPrice = document.getElementById('productPrice').value;
  const token = localStorage.getItem('token');

  try {
    await fetch('http://localhost:4000/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({name: productName, price: productPrice})
    });
    addProductForm.reset();
    loadProducts();
  } catch(err) {
    console.error('Error adding product:', err);
  }
});

// Edit product
async function editProduct(id, currentName, currentPrice) {
  const name = prompt('Enter new name:', currentName);
  const price = prompt('Enter new price:', currentPrice);
  if (!name || !price) return;

  const token = localStorage.getItem('token');
  await fetch(`http://localhost:4000/product/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({name, price})
  });
  loadProducts();
}

// Delete product
async function deleteProduct(id) {
  const token = localStorage.getItem('token');
  await fetch(`http://localhost:4000/product/${id}`, {
    method: 'DELETE',
    headers: {'Authorization': `Bearer ${token}`}
  });
  loadProducts();
}
</script>
