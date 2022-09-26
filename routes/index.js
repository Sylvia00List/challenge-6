var express = require('express');
var router = express.Router();
var users = require('../users.json')
var superuser = require('../superuser.json');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/play', function(req, res) {
  res.render('play');
});

router.get('/dashboard', function(req, res) {
  res.render('dashboard');
});

router.get('/articles/create', function(req, res) {
  res.render('articles/create');
});

router.get('/articles/list', function(req, res) {
  res.render('articles/list');
});


router.get('/users', function(req, res) {
  res.json(users);
});




router.get('/login', function(req, res) {
  res.render('login');
});
router.post('/user/login', function(req, res) {
  res.render('login');
});
//    const users = [
//       {
//         name: 'sylvial',
//         username: 'sylvial',
//         password: '123456'
//       }
//     ]
//     const {username, password} = req.body;
//     console.log(req.body);

//   if(users.username === username && users.password === password){
//       res.send('Berhasil Login')
//   }
//       return res.send('username atau password tidak sesuai');
//       res.json(users);
// });

//import model user_game//
const {user_game} = require('../models'); 
router.get('/usergame', async (req, res) => {
  const data = await user_game.findAll();
  console.log(data);
    res.json(data);
});
router.post('/usergame', async (req, res) => {
  const {name, email, paswword, approved } = req.body;
  const data = await user_game.create();
  console.log(data);
   res.json(data);
});

//import model user_game_biodata//
const {user_game_biodata} = require('../models'); 
router.get('/biodata', async (req, res) => {
  const data = await user_game_biodata.findAll();
  console.log(data);
    res.json(data);
});
router.post('/biodata', async (req, res) => {
  const {name, userId, address,phone, approved } = req.body;
  const data = await user_game_biodata.create();
  console.log(data);
   res.json(data);
});
//import model user_game_history//
const {user_game_history} = require('../models'); 
router.get('/history', async (req, res) => {
  const data = await user_game_history.findAll();
  console.log(data);
    res.json(data);
});
router.post('/history', async (req, res) => {
  const {name, userId, match, level, approved } = req.body;
  const data = await user_game_history.create();
  console.log(data);
    res.json(data);
  });
//

router.get('/logout', function (req, res, next) {
	req.session.is_logged_in = false;
	res.send('berhasil logout');
});

router.post('/login', function (req, res, next) {
	const { username, password } = req.body;

	if (username === superuser.username && password === superuser.password) {
		req.session.is_logged_in = true;
		return res.redirect('/dashboard');
	}

	req.session.is_logged_in = false;
	return res.send('username atau password salah');
});


module.exports = router;
