const jwt = require('jsonwebtoken');
require('dotenv').config(); // Загрузка переменных окружения
const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
    console.error('SECRET_KEY is not defined in .env file');
    process.exit(1); // Остановка сервера, если ключ отсутствует
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };