const express = require('express');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/auth', require('./routes/authRoutes'));
//app.use('/api/events', require('./routes/eventRoutes'));
// app.use('/api/plans', require('./routes/planRoutes'));
// app.use('/api/public', require('./routes/publicRoutes'));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({
      success: false,
      error: 'Rota não encontrada'
    });
  }
  next();
});

app.use(errorHandler);

module.exports = app;
