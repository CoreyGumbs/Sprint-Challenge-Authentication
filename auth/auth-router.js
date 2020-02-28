const bcrypt = require('bcryptjs');
const Users = require('./auth-model');
const generateToken = require('./auth-token');
const router = require('express').Router();

router.get('/', (req, res) => {
  console.log(req.session);
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
    req.loggedIn = true;
    res.status(201).json(user);
  })
  .catch(error => {
    res.status(500).json({error: 'There was a problem creating the user.'});
  });

});

router.post('/login', (req, res) => {
  const {username, password} = req.body;

  Users.findBy({username})
  .first()
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)){
      const token = generateToken(user);
      req.loggedIn = true;
  
      res.status(200).json({message: {
        user: `Welcome ${user.username}`,
        pass: `${user.password}`,
        token
      }});
    }
  });
});

module.exports = router;
