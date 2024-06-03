document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#loginForm');
  
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.querySelector('#name').value;
      const password = document.querySelector('#password').value;
      const Users = JSON.parse(localStorage.getItem('users')) || [];
      const validUser = Users.find(user => user.name === name && user.password === password);
      if (!validUser) {
        return showAlert('Usuario y/o contraseña incorrectos!', 'error');
      }
      showAlert(`Bienvenido ${validUser.name}`, 'success');
  
      localStorage.setItem('login_success', JSON.stringify(validUser));
      setTimeout(() => {
        window.location.href = 'index.html';
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
  