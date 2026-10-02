const express = require('express');
const router = express.Router();

// Rota de teste temporária
router.get('/', (req, res) => {
  res.json({ message: 'Rotas de eventos funcionando!' });
});

module.exports = router;