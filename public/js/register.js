document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm') || document.querySelector('form');
  const alertBox = document.getElementById('registerAlert') || document.querySelector('.alert');
  const submitBtn = document.querySelector('button[type="submit"]');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const payload = {
      name: nameInput ? nameInput.value.trim() : undefined,
      email: emailInput ? emailInput.value.trim() : '',
      password: passwordInput ? passwordInput.value : ''
    };

    if (alertBox) {
      alertBox.className = 'alert';
      alertBox.textContent = '';
      alertBox.style.display = 'none';
    }

    if (submitBtn) submitBtn.disabled = true;

    try {
      // Chama o endpoint de registo (ajuste a rota se no seu backend for /auth/register)
      await API.post('/auth/register', payload);

      if (alertBox) {
        alertBox.className = 'alert alert-success';
        alertBox.textContent = 'Conta criada com sucesso! A redirecionar para o login...';
        alertBox.style.display = 'block';
      }

      setTimeout(() => {
        window.location.href = '/login.html';
      }, 1500);

    } catch (err) {
      if (alertBox) {
        alertBox.className = 'alert alert-danger';
        alertBox.textContent = err.message || 'Erro ao criar conta.';
        alertBox.style.display = 'block';
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});