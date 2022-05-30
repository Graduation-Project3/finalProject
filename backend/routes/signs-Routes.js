const express = require('express');

const router = express.Router();

const signsController = require('../controllers/signs');

router.post('/signUp',signsController.postSignUp);
router.post('/signIn',signsController.postSignIn);
router.post('/isValid',signsController.postIsValid);
router.post('/forget',signsController.postReset);
router.get('/reset',signsController.getNewPassword);
router.post('/reset',signsController.postNewPassword);



module.exports = router;