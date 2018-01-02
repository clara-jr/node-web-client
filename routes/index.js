var express = require('express');
var router = express.Router();

var webController = require('../controllers/webController');
var sessionController = require('../controllers/sessionController');

// Definición de rutas

router.route('/').get(sessionController.index);
router.route('/login').post(sessionController.login);

router.get('/logout', sessionController.loginRequired, sessionController.logout);

router.get('/webs', sessionController.loginRequired, webController.list); 
router.get('/webs/:webId', sessionController.loginRequired, webController.findById);

router.get('/new', sessionController.loginRequired, webController.formAddWeb);
router.post('/new', sessionController.loginRequired, webController.addWeb);
router.delete('/webs/:webId', sessionController.loginRequired, webController.deleteWeb);

router.put('/webs/:webId', sessionController.loginRequired, webController.addFilterToWeb);
router.get('/webs/:webId/:filterId', sessionController.loginRequired, webController.formUpdateFilterOfWeb);
router.put('/webs/:webId/:filterId', sessionController.loginRequired, webController.updateFilterOfWeb);
router.delete('/webs/:webId/:filterId', sessionController.loginRequired, webController.deleteFilterOfWeb);

module.exports = router;