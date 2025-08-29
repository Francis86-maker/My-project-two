<script>
  // Toggle form visibility
  function toggleForm(id) {
    const form = document.getElementById(id);
    const currentDisplay = window.getComputedStyle(form).display;
    form.style.display = currentDisplay === 'none' ? 'block' : 'none';
  }

  // ----------------------------
  // REGISTER FORM
  // ----------------------------
  const registerForm = document.getElementById('registerForm');
  registerForm?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (!username || !email || !password) {
      alert('Fill all fields');
      return;
    }

    // Get existing users or empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check for duplicate email
    if (users.some(u => u.email === email)) {
      alert('Email already registered');
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registered successfully');
    registerForm.reset();
  });

  // ----------------------------
  // LOGIN FORM
  // ----------------------------
  const loginForm = document.getElementById('loginForm');
  loginForm?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert(`Welcome ${user.username}`);
      loginForm.reset();
    } else {
      alert('Invalid email or password');
    }
  });

  // ----------------------------
  // PRODUCT MANAGEMENT
  // ----------------------------
  const addProductForm = document.getElementById('addProductForm');
  addProductForm?.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;

    if (!name || !price) {
      alert('Fill all product fields');
      return;
    }

    let products = JSON.parse(localStorage.getItem('products')) || [];
    const id = products.length ? products[products.length - 1].id + 1 : 1;
    products.push({ id, name, price });
    localStorage.setItem('products', JSON.stringify(products));
    addProductForm.reset();
    renderProducts();
  });

  function renderProducts() {
    const productsTableBody = document.getElementById('productsTabletbody');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    productsTableBody.innerHTML = '';

    products.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>
          <button onclick="editProduct(${p.id})">Edit</button>
          <button onclick="deleteProduct(${p.id})">Delete</button>
        </td>
      `;
      productsTableBody.appendChild(tr);
    });
  }

  function editProduct(id) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === id);
    if (!product) return;

    const name = prompt('New name:', product.name);
    const price = prompt('New price:', product.price);
    if (!name || !price) return;

    product.name = name;
    product.price = price;
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
  }

  function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
  }

  // Initial render
  renderProducts();
</script>
