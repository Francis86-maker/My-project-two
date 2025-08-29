
<script>                  
  let letters =                   
  document.querySelectorAll("span");                  
   letters.forEach(( letter,i) => {                  
      letter.addEventListener("mouseover",() => {                  
      letter.style.transform = "translateY(-10px)";                  
      setTimeout(()  => {                  
         letter.style.transform = "translateY(0)";                  
          }, 300);                  
         });                  
   });                  
   let currentSlide = 0;                  
    const Slides = document.querySelectorAll('.slide');                  
    function showSlide(index) {                  
        Slides.forEach(( slide,i) => {                  
           slide.classList.remove('active');             
          Slides[index].classList.add('active');             
      }                  
   });                  
  }                  
  function nextSlide () {                  
     currentSlide = (currentSlide+ 1) %                  
   slides.length;                  
      showSlide(currentSlide);                  
   }                  
     showSlide(currentSlide);                  
     setInterval(nextSlide,3000);                
     function toggleForm(id) {
  const form = document.getElementById(id);
  const currentDisplay = window.getComputedStyle(form).display;

  if (currentDisplay === 'none') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }
     }
    const registerForm = document.getElementById('registerForm');                  
 registerForm.addEventListener('submit', async function(event) {                  
       event.preventDefault();                  
        const username = document.getElementById('registerUsername').value;                  
         const email = document.getElementById('registerEmail').value;                  
          const password = document.getElementById('registerPassword').value;                  
           const data = {username, email, password}                   
              try {                  
                 const response = await fetch('http://localhost:4000/register', {                  
                  method: 'POST',                  
                  headers: {'Content-Type': 'application/json'},                   
                 body: JSON.stringify(data)                  
            });                  
             const result = await response.json();                  
               if (response.ok) {                  
                 console.log('Success:', result);                  
               } else {                  
                 console.error('Error:', result.message);                  
             }                  
          } catch(err) {                  
               console.error('Network or server error:',err);                  
         }                  
     });                  
    const loginForm = document.getElementById('loginForm');                  
    loginForm.addEventListener('submit', async function(event) {                  
       event.preventDefault();                  
       const email = document.getElementById('loginEmail').value;                  
        const password = document.getElementById('loginPassword').value;                  
        const data = {email, password}                  
           try {                  
             const response = await fetch('http://localhost:4000/login', {                  
              method: 'POST',                  
              headers: {'Content-Type': 'application/json'},                  
              body: JSON.stringify(data)                  
          });                  
          const  result = await response.json();                  
            if (response.ok) {                  
               console.log('Success:', result);                  
            } else {                  
               console.error('Error:',result.message);                  
            }                  
         } catch(err) {                  
            console.error('Network or server error:',error);                  
        }                  
    });                  
     const adminLoginForm = document.getElementById('adminLoginForm');                  
     adminLoginForm.addEventListener('submit', async function(event) {                  
         const email  = document.getElementById('adminEmail').value;                  
         const password = document.getElementById('adminPassword').value;                  
          const data = {email, password}                  
           try {                  
             const response = await fetch('http://localhost:4000/admin/login', {                  
              method: 'POST',                  
              headers: {'Content-Type': 'application/json'},                  
               body: JSON.stringify(data)                  
           });                  
            const result = await response.json();                  
             if (response.ok) {                  
                console.log('Success:',result);                  
             } else {                  
                 console.error('Error:',result.message);                  
            }                  
         } catch(err) {                  
             console.error('Network or server error:',err);                  
        }                  
   });                  
   async function fetchDashboard(endpoint) {                  
       const token = localStorage.getItem("adminToken");                  
        const response = await fetch(`http://localhost:4000/admin/${endpoint}`,{                  
           method: "GET",                  
           headers: { "Content-type": "application/json", "Authorization": `Bearer ${token}`}                  
         });                  
           if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);                  
            return await response.json();                  
       }                  
     async function loadUsers () {                  
       const users = await fetchDashboard ("users");                  
        const tbody = document.querySelector("#usersTabletbody");                  
         tbody.innerHTML = "";                  
          users.forEach(user => {                  
           const tr = document.createElement("tr");                  
           tr.innerHTML = `<td>${user.id}</td><td>${user.username}</td><td>${user.email}</td>`;                  
           tbody.appendChild(tr);                  
       });                  
     }                  
    async function loadProducts() {                  
      const products = await fetchDashboard ("products");                  
      const tbody = document.querySelector("#productsTabletbody");                  
       tbody.innerHTML = "";                  
       products.forEach(product=> {                  
         const tr = document.createElement("tr");                  
         tr.innerHTML = `<td>${product.id}</td><td>${product.name}</td><td>{product.price}</td>`;                  
         tbody.appendChild(tr);                  
    });                  
 }                  
   loadUsers ();                  
   loadProducts ();                  
   const productsTableBody = document.querySelector('#productsTabletbody');                  
      const addProductForm = document.getElementById('addProductForm');                  
      async function fetchProducts() {                  
        const token = localStorage.getItem('token');                  
        fetch('http://localhost:4000/product',{                  
            headers: {'Authorization': `Bearer${token}`}                  
        });                  
         const products= await response.json();                  
            renderProducts(products);                  
         }                  
      function renderProducts (products) {                  
        productsTableBody.innerHTML = "";                  
         products.forEach(p => {                  
           const tr = document.createElement('tr')                  
            tr.innerHTML = `                  
                  <td>${p.id}</td>                  
                  <td>${p.name}</td>                  
                  <td>${p.price}</td>                  
                   <button onclick = "editProduct(${p.id}, '${p.name}' ${p.price}") Edit</button>                  
              `;                  
              productsTableBody.appendChild(tr);                  
           });                  
         }                  
        addProductForm.addEventListener('submit', async(e) => {                  
       e.preventDefault();                  
       const productName = document.getElementById('productName').value;                  
       const productPrice = document.getElementById('productPrice').value;                  
       const token = localStorage.getItem('token');                  
       await fetch('http://localhost:4000/product', {                  
         method: 'POST',                  
         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer${token}`},                  
         body: JSON.stringify({ productName, productPrice});                  
        });                  
        addProductForm.reset();                  
        fetchProducts();                  
    });                  
    async function editProduct(id,currentName, currentPrice) {                  
       const name  = prompt('Enter new name:', currentName);                  
       const price = prompt('Enter new price:', currentPrice);                  
        if (!name || !price) return;                  
        const token = localStorage.getItem('token'); await fetch(`http://localhost:4000/product/${id}`, {                  
          method: 'PUT',                  
          headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`},                  
          body: JSON.stringify({ name, price});                  
       });                  
        fetchProducts();                  
      }                  
    async function deleteProduct(id) {                  
        const token = localStorage.getItem('token'); await fetch(`http://localhost:4000/product/${id}`, {                  
          method: 'DELETE',                  
          headers: {'Authorization': `Bearer${token}`}                  
         });                  
         fetchProducts();                  
       }                  
</script>                  

