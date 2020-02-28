const bcrypt = require('bcryptjs');
const Users = require('./auth-model');

const router = require('express').Router();

router.get('/', (req, res) => {
  Users.find()
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    res.status(500).json({error: 'There was a problem retrieving users'});
  })
});


router.post('/register', (req, res) => {
  const user = req.body;

  const salt = bcrypt.genSaltSync(14); 
  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

  Users.register(user)
  .then(user => {
    req.session.logged = true;
    req.session.user = user;

    res.status(201).json(user);
  })
  .catch(error => {
    res.status(500).json({error: 'There was a problem creating the user.'});
  });

});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
