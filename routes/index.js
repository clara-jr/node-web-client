var express = require('express');
var router = express.Router();

var webController = require('../controllers/webController');

// Definición de rutas

router.get('/', function(req, res) {
  res.render('index', {title: "Welcome"});
});

router.get('/webs', webController.list); 
router.get('/webs/:webId', webController.findById);

router.get('/new', webController.formAddWeb);
router.post('/new', webController.addWeb);
router.delete('/webs/:webId', webController.deleteWeb);

router.put('/webs/:webId', webController.addFilterToWeb);
router.get('/webs/:webId/:filterId', webController.formUpdateFilterOfWeb);
router.put('/webs/:webId/:filterId', webController.updateFilterOfWeb);
router.delete('/webs/:webId/:filterId', webController.deleteFilterOfWeb);

module.exports = router;