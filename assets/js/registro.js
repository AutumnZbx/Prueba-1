document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('#signupForm');
  
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.querySelector('#name').value;
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
  
      const Users = JSON.parse(localStorage.getItem('users')) || [];
      const isUserRegistered = Users.find(user => user.email === email);
      if (isUserRegistered) {
        return showAlert('El usuario ya está registrado!', 'error');
      }
  
      Users.push({ name: name, email: email, password: password });
      localStorage.setItem('users', JSON.stringify(Users));
      showAlert('Registro exitoso!', 'success');
  
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    });
  
    function showAlert(message, type) {
      const alertContainer = document.getElementById('alertContainer');
      const alert = document.createElement('div');
      alert.className = `alert ${type}`;
      alert.textContent = message;
  
      const closeButton = document.createElement('span');
      closeButton.className = 'closebtn';
      closeButton.innerHTML = '&times;';
      closeButton.onclick = function() {
        alert.remove();
      };
      alert.appendChild(closeButton);
  
      alertContainer.appendChild(alert);
  
      setTimeout(() => {
        alert.remove();
      }, 3000);
    }
  });
  