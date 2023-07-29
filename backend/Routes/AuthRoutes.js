const router = require('express').Router();
const AuthController = require('../controller/AuthControllers')
const authorization = require('../middlewares/authorization')

router.post('/signup',AuthController.signup);
router.post('/signin',AuthController.signin);
router.get('/users',authorization,AuthController.getAllData);
router.get('/logout',AuthController.logout);


module.exports = router;