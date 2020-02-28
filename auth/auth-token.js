const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');

function generateToken(user){
    const payload = {
        username: user.username,
        loggedIn: true
    }

    const options = {
        expiresIn: '1hr' 
    }

    return jwt.sign(payload, jwtSecret, options);
}

module.exports = generateToken;