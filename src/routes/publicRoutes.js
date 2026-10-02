const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Rotas públicas prontas' }));

module.exports = router;