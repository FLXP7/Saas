const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const { nome, email, senha } = req.body;
    
    // Criptografar a senha usando Bcrypt (Requisito de Segurança)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    res.status(201).json({
      success: true,
      message: 'Usuário registrado com sucesso. Aguardando integração com o banco de dados.'
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    // Simulando um usuário no banco para testarmos o login
    const user = { 
      id: 1, 
      email: 'teste@teste.com', 
      senha: await bcrypt.hash('123456', 10), 
      plano: 'pro' 
    };

    // Comparar a senha enviada com o hash
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Credenciais inválidas' });
    }

    // Gerar o Token JWT
    const payload = {
      id: user.id,
      plano: user.plano
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(200).json({
      success: true,
      token,
      message: 'Login realizado com sucesso.'
    });
  } catch (error) {
    next(error);
  }
};