const bcrypt = require('bcryptjs');
const Users = require('./auth-model');

const router = require('express').Router();

router.get('/', (req, res) => {
  // implement registration
  res.status(200).json({message: 'working'})
});


router.post('/register', (req, res) => {
  const user = req.body;

  const salt = bcrypt.genSaltSync(14); 
  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
