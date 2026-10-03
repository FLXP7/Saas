require('dotenv').config();
const express = require('express');
const path = require('path');
const sequelize = require('./src/config/database');

// Importar as rotas
const authRoutes = require('./src/routes/authRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const publicRoutes = require('./src/routes/publicRoutes');

const app = express();

// Middlewares essenciais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir os ficheiros estáticos da pasta public (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Registar as rotas da API com o prefixo /api
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/public', publicRoutes);

// Rota raiz para abrir a página de login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Sincronizar a base de dados e iniciar o servidor
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexão com o MySQL do Aiven estabelecida com sucesso!');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor a correr na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erro no servidor ou banco:', err);
  });