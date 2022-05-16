const express = require('express');
const checkAuth = require('../middleware/auth');
const router = express.Router();

const signsController = require('../controllers/signs');

router.post('/signUp',signsController.postSignUp);
router.post('/signIn',signsController.postSignIn);
router.post('/isValid',signsController.postIsValid);
/* router.use(checkAuth); */

router.post('/signOut',signsController.postLogout);



module.exports = router;
