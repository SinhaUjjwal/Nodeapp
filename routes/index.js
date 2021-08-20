var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*router.post('/login', function(req, res, next) {
	var name = req.body.name;
	var pwd = req.body.pwd;
	
	if(name == 'Ujjwal' && pwd =='1234')
  res.render('index', { title: 'Express' });
});*/
module.exports = router;
