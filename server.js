require('dotenv').config();
const express = require('express');
const path = require('path');
const sequelize = require('./src/config/database');

const app = express(); // <-- Faltava declarar esta linha

// Middlewares essenciais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir os ficheiros estáticos da pasta public (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// (Aqui ficam as suas rotas, ex: app.use('/api', rotas))

// Sincronizar banco e iniciar o servidor
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