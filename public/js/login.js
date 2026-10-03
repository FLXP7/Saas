document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const alertBox = document.getElementById('loginAlert');
  const submitBtn = document.getElementById('loginBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Reset de alertas
    alertBox.className = 'alert';
    alertBox.textContent = '';
    alertBox.style.display = 'none';

    if (submitBtn) submitBtn.disabled = true;

    try {
      // Chama o endpoint de login (ajuste a rota se no seu backend for /auth/login)
      const data = await API.post('/auth/login', { email, password });

      // Salva o token JWT retornado pelo backend
      if (data.token) {
        API.setToken(data.token);
      }

      alertBox.className = 'alert alert-success';
      alertBox.textContent = 'Autenticado com sucesso! A redirecionar...';
      alertBox.style.display = 'block';

      // Redireciona para o dashboard
      setTimeout(() => {
        window.location.href = '/dashboard.html';
      }, 1000);

    } catch (err) {
      alertBox.className = 'alert alert-danger';
      alertBox.textContent = err.message || 'Falha ao autenticar. Verifique os seus dados.';
      alertBox.style.display = 'block';
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});