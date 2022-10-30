const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.get('/login',(req,res)=>{
    res.render("Entry/login")
})
router.get('/register',(req,res)=>{
    res.render("Entry/register")
})
router.post('/login', authController.login)
router.post('/register',authController.register)
router.get('/logout',authController.logout)
module.exports = router